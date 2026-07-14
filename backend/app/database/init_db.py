from app.database.database import Base, engine

# Import all models here
from app.models.job import Job

Base.metadata.create_all(bind=engine)

print("✅ Database tables created successfully.")