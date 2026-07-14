from sqlalchemy.orm import Session

from app.models.job import Job


def get_all_jobs(db: Session):
    return db.query(Job).all()