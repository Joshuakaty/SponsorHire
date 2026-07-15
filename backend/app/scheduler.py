from apscheduler.schedulers.background import BackgroundScheduler
from app.logger import logger

from app.collector.registry import COLLECTORS
from app.database.database import SessionLocal
from app.services.job_service import save_job


def collect_jobs():
    db = SessionLocal()

    jobs = []

    for name, collector in COLLECTORS:
        try:
            logger.info(f"Collecting from {name}...")
            jobs.extend(collector())
        except Exception as e:
            logger.error(f"{name} failed: {e}")

    saved = 0

    for job in jobs:
        if save_job(db, job):
            saved += 1

    db.close()

    logger.info(f"Saved {saved} new jobs.")


scheduler = BackgroundScheduler()

scheduler.add_job(
    collect_jobs,
    "interval",
    hours=6,
    id="job_collector",
    replace_existing=True,
)