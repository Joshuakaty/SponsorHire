from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.job import JobResponse
from app.services.job_service import (
    get_all_jobs,
    search_jobs,
    filter_jobs,
)

router = APIRouter(prefix="/jobs", tags=["Jobs"])


@router.get("", response_model=list[JobResponse])
def get_jobs(
    page: int = 1,
    limit: int = 20,
    db: Session = Depends(get_db),
):
    jobs = get_all_jobs(db)

    start = (page - 1) * limit
    end = start + limit

    return jobs[start:end]


@router.get("/search", response_model=list[JobResponse])
def search(q: str, db: Session = Depends(get_db)):
    return search_jobs(db, q)


@router.get("/latest", response_model=list[JobResponse])
def latest_jobs(db: Session = Depends(get_db)):
    return get_all_jobs(db)[:20]

@router.get("/filter", response_model=list[JobResponse])
def filter(
    location: str | None = None,
    sponsorship: bool | None = None,
    db: Session = Depends(get_db),
):
    return filter_jobs(
        db,
        location=location,
        sponsorship=sponsorship,
    )