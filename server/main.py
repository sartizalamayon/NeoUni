from fastapi import FastAPI, HTTPException, Body, Depends
from fastapi.middleware.cors import CORSMiddleware
from motor import motor_asyncio
from bson import ObjectId
import os
from contextlib import asynccontextmanager
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# MongoDB Configuration
MONGODB_URI = os.getenv("MONGODB_URI")
DB_NAME = os.getenv("DB_NAME", "app_database")

# Database connection setup
client = None

# Lifespan context manager
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup logic
    global client
    try:
        client = motor_asyncio.AsyncIOMotorClient(MONGODB_URI)
        await client.admin.command('ping')
        print("Connected to MongoDB Atlas")
        yield
    except Exception as e:
        print(f"Error connecting to MongoDB Atlas: {e}")
        raise
    finally:
        # Shutdown logic
        if client:
            client.close()
            print("MongoDB connection closed")

# Initialize FastAPI app with lifespan
app = FastAPI(title="NextJS-FastAPI-MongoDB API", lifespan=lifespan)

# Configure CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For production, specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database Dependency
async def get_database():
    return client[DB_NAME]

# API Routes
@app.get("/")
async def root():
    return {"message": "Welcome to the FastAPI with MongoDB Atlas API"}

# Create an item
@app.post("/items/")
async def create_item(item: dict = Body(...), db=Depends(get_database)):
    try:
        result = await db.items.insert_one(item)
        created_item = await db.items.find_one({"_id": result.inserted_id})
        if created_item:
            created_item["_id"] = str(created_item["_id"])
            return created_item
        raise HTTPException(status_code=500, detail="Failed to create item")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

# Get all items
@app.get("/items/")
async def get_items(db=Depends(get_database)):
    try: 
        items = await db.items.find().to_list(1000)
        for item in items:
            item["_id"] = str(item["_id"])
        return items
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
    
@app.get("/items/{item_id}")
async def get_item(item_id: str, db=Depends(get_database)):
    try:
        item = await db.items.find_one({"_id": ObjectId(item_id)})
        if item:
            item["_id"] = str(item["_id"])
            return item
        raise HTTPException(status_code=404, detail="Item not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

# This allows proper usage with Uvicorn
# Run with: uvicorn main:app --reload