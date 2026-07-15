def normalize_job(job: dict) -> dict:
    return {
        "title": (job.get("title") or "").strip(),
        "company": (job.get("company") or "").strip(),
        "location": (job.get("location") or "Remote").strip(),
        "salary": (job.get("salary") or "").strip(),
        "sponsorship": bool(job.get("sponsorship", False)),
        "apply_url": (job.get("apply_url") or "").strip(),
    }