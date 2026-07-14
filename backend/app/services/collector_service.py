from app.collector.collector import fetch_jobs


def collect_jobs():
    jobs = fetch_jobs()

    print(f"Found {len(jobs)} job(s).")

    return jobs 