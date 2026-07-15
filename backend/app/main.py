from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from app.api.jobs import router as jobs_router
from app.api.job_details import router as job_details_router
from app.database.database import SessionLocal
from app.scheduler import scheduler
app = FastAPI(
    title="SponsorHire API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def update_database():
    db = SessionLocal()
    try:
        db.execute(
            text(
                """
                ALTER TABLE jobs
                ADD COLUMN IF NOT EXISTS slug VARCHAR;
                """
            )
        )
        db.commit()

        db.execute(
            text(
                """
                CREATE UNIQUE INDEX IF NOT EXISTS ix_jobs_slug
                ON jobs(slug);
                """
            )
        )
        db.commit()

        print("✅ Database updated.")
    finally:
        db.close()



update_database()


@app.get("/")
def root():
    return {"message": "Welcome to SponsorHire API 🚀"}

@app.on_event("startup")
def startup_event():
    scheduler.start()
    print("✅ Job scheduler started")


@app.on_event("shutdown")
def shutdown_event():
    scheduler.shutdown()
    print("🛑 Job scheduler stopped")

app.include_router(jobs_router)
app.include_router(job_details_router)