from sqlalchemy import Boolean, Column, Integer, String

from app.database.database import Base


class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String, nullable=False)
    company = Column(String, nullable=False)
    location = Column(String, nullable=False)

    salary = Column(String, nullable=True)

    sponsorship = Column(Boolean, default=False)

    apply_url = Column(String, nullable=True)

    slug = Column(String, unique=True, index=True, nullable=True)