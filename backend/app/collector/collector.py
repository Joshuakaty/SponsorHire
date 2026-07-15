import time
import requests

from app.collector.sources import SOURCES
from app.database.database import SessionLocal
from app.services.job_service import save_job


def fetch_json(url, retries=3):
    for attempt in range(retries):
        try:
            response = requests.get(
                url,
                timeout=15,
                headers={
                    "User-Agent": "SponsorHire/1.0"
                },
            )
            response.raise_for_status()
            return response.json()

        except Exception:
            if attempt == retries - 1:
                raise

            time.sleep(2)


def fetch_the_muse():
    data = fetch_json(SOURCES[0]["url"])

    jobs = []

    for job in data["results"][:10]:
        jobs.append(
            {
                "title": job["name"],
                "company": job["company"]["name"],
                "location": job["locations"][0]["name"] if job["locations"] else "Remote",
                "salary": "",
                "sponsorship": False,
                "apply_url": job["refs"]["landing_page"],
            }
        )

    return jobs


def fetch_arbeitnow():
    data = fetch_json(SOURCES[1]["url"])

    jobs = []

    for job in data["data"][:10]:
        jobs.append(
            {
                "title": job["title"],
                "company": job["company_name"],
                "location": job["location"],
                "salary": "",
                "sponsorship": job.get("visa_sponsorship", False),
                "apply_url": job["url"],
            }
        )

    return jobs


def fetch_remotive():
    data = fetch_json(SOURCES[2]["url"])

    jobs = []

    for job in data["jobs"][:10]:
        jobs.append(
            {
                "title": job["title"],
                "company": job["company_name"],
                "location": job["candidate_required_location"],
                "salary": job.get("salary", ""),
                "sponsorship": False,
                "apply_url": job["url"],
            }
        )

    return jobs


if __name__ == "__main__":
    db = SessionLocal()

    jobs = []

    try:
        print("Collecting from The Muse...")
        jobs.extend(fetch_the_muse())
    except Exception as e:
        print(f"❌ The Muse failed: {e}")

    try:
        print("Collecting from ArbeitNow...")
        jobs.extend(fetch_arbeitnow())
    except Exception as e:
        print(f"❌ ArbeitNow failed: {e}")

    try:
        print("Collecting from Remotive...")
        jobs.extend(fetch_remotive())
    except Exception as e:
        print(f"❌ Remotive failed: {e}")

    print(f"Collected {len(jobs)} jobs")

    saved = 0
    skipped = 0

    for job in jobs:
        if save_job(db, job):
            saved += 1
        else:
            skipped += 1

    db.close()

    print(f"✅ Saved: {saved}")
    print(f"⏭️ Skipped duplicates: {skipped}")