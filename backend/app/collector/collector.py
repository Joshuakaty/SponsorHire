import requests


def fetch_jobs():
    print("Collector started...")

    # Future sources will be added here
    jobs = []

    return jobs


def add_job(
    jobs,
    title,
    company,
    location,
    salary,
    sponsorship,
    apply_url,
):
    jobs.append(
        {
            "title": title,
            "company": company,
            "location": location,
            "salary": salary,
            "sponsorship": sponsorship,
            "apply_url": apply_url,
        }
    )


if __name__ == "__main__":
    jobs = fetch_jobs()

    add_job(
        jobs,
        title="Care Assistant",
        company="ABC Healthcare",
        location="London",
        salary="£25,000/year",
        sponsorship=True,
        apply_url="https://example.com/apply",
    )

    print(jobs)