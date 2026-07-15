from sqlalchemy.orm import Session
from sqlalchemy import or_
from sqlalchemy.exc import IntegrityError
from slugify import slugify

from app.models.job import Job
from app.collector.normalizer import normalize_job


def get_all_jobs(db: Session):
    return db.query(Job).order_by(Job.id.desc()).all()


def search_jobs(db: Session, query: str):
    return (
        db.query(Job)
        .filter(
            or_(
                Job.title.ilike(f"%{query}%"),
                Job.company.ilike(f"%{query}%"),
                Job.location.ilike(f"%{query}%"),
            )
        )
        .order_by(Job.id.desc())
        .all()
    )


def filter_jobs(
    db: Session,
    location: str | None = None,
    sponsorship: bool | None = None,
):
    query = db.query(Job)

    if location:
        query = query.filter(Job.location.ilike(f"%{location}%"))

    if sponsorship is not None:
        query = query.filter(Job.sponsorship == sponsorship)

    return query.order_by(Job.id.desc()).all()


def job_exists(
    db: Session,
    title: str,
    company: str,
    location: str,
) -> bool:
    return (
        db.query(Job)
        .filter(
            Job.title == title,
            Job.company == company,
            Job.location == location,
        )
        .first()
        is not None
    )


def generate_slug(job_data: dict) -> str:
    return slugify(
        f"{job_data['title']} {job_data['company']} {job_data['location']}"
    )


def save_job(db: Session, job_data: dict):
    job_data = normalize_job(job_data)

    if job_exists(
        db,
        job_data["title"],
        job_data["company"],
        job_data["location"],
    ):
        return False

    job_data["slug"] = generate_slug(job_data)

    job = Job(**job_data)

    try:
        db.add(job)
        db.commit()
        db.refresh(job)
        return True

    except IntegrityError:
        db.rollback()
        return False