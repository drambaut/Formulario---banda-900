from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

from . import settings

if not settings.DATABASE_URL:
    raise RuntimeError(
        "Falta la variable de entorno DATABASE_URL (connection string de Supabase Postgres)."
    )

engine = create_engine(settings.DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
