from app.collector.collector import (
    fetch_the_muse,
    fetch_arbeitnow,
    fetch_remotive,
)

COLLECTORS = [
    ("The Muse", fetch_the_muse),
    ("ArbeitNow", fetch_arbeitnow),
    ("Remotive", fetch_remotive),
]