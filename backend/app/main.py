from fastapi import Depends, FastAPI
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.services.job_service import get_all_jobs
from app.schemas.job import JobResponse
from app.schemas.job import JobResponse

app = FastAPI(
    title="SponsorHire API",
    version="1.0.0"
)


@app.get("/")
def root():
    return {
        "message": "Welcome to SponsorHire API 🚀"
    }


@app.get("/jobs", response_model=list[JobResponse])
def get_jobs(db: Session = Depends(get_db)):
    return get_all_jobs(db)