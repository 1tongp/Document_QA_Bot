from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, create_engine
from sqlalchemy.orm import declarative_base, relationship, sessionmaker
from datetime import datetime
import os

Base = declarative_base()
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+psycopg2://docqa_user:securepassword@localhost/docqa")
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False)
    password_hash = Column(String, nullable=False)

    files = relationship('UploadedFile', back_populates='owner')


class UploadedFile(Base):
    __tablename__ = 'uploaded_files'

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, nullable=False)
    filepath = Column(String, nullable=False)
    upload_time = Column(DateTime, default=datetime.utcnow)

    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    owner = relationship('User', back_populates='files')
