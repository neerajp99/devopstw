from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# DATABASE_URL = "postgresql://user:password@db:5432/mydatabase"
DATABASE_URL = "postgresql://user:password@postgres-db-service:5432/mydatabase"


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class Item(Base):
    __tablename__ = "items"
    id = Column(Integer, primary_key=True, index=True)
    item = Column(String, index=True)

Base.metadata.create_all(bind=engine)

class ItemCreate(BaseModel):
    item: str

@app.get("/items")
def read_items():
    session = SessionLocal()
    items = session.query(Item).all()
    session.close()
    return items

@app.post("/items")
def create_item(item: ItemCreate):
    session = SessionLocal()
    db_item = Item(item=item.item)
    session.add(db_item)
    session.commit()
    session.refresh(db_item)
    session.close()
    return db_item
