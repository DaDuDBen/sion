import os
import secrets
import sqlite3
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from pydantic import BaseModel, EmailStr

app = FastAPI()
security = HTTPBasic()


def get_db_path():
    return os.getenv("DB_PATH", "waitlist.db")


def load_origins():
    default_origins = [
        "http://localhost:5173",
        "http://localhost:3000",
    ]
    env_origins = [
        origin.strip()
        for origin in os.getenv("FRONTEND_ORIGINS", "").split(",")
        if origin.strip()
    ]
    return sorted(set(default_origins + env_origins))


def load_origin_regex():
    regex = os.getenv("FRONTEND_ORIGIN_REGEX", "").strip()
    return regex or None


# CORS
origins = load_origins()
origin_regex = load_origin_regex()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_origin_regex=origin_regex,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Database Setup
def get_db_connection():
    db_path = get_db_path()
    db_dir = os.path.dirname(db_path)
    if db_dir:
        os.makedirs(db_dir, exist_ok=True)

    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_db_connection()
    # Create the table if it doesn't exist yet
    conn.execute(
        '''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL
        )
        '''
    )
    conn.commit()
    conn.close()


init_db()


# Data Models
class WaitlistUser(BaseModel):
    email: EmailStr


def verify_admin(credentials: HTTPBasicCredentials = Depends(security)):
    valid_username = os.getenv("ADMIN_USERNAME", "admin")
    valid_password = os.getenv("ADMIN_PASSWORD", "admin123")

    username_matches = secrets.compare_digest(credentials.username, valid_username)
    password_matches = secrets.compare_digest(credentials.password, valid_password)

    if not (username_matches and password_matches):
        raise HTTPException(
            status_code=401,
            detail="Invalid admin credentials",
            headers={"WWW-Authenticate": "Basic"},
        )

    return credentials.username


# API Endpoints
@app.post("/api/join-waitlist")
def join_waitlist(user: WaitlistUser):
    conn = get_db_connection()
    try:
        # Try insert the email
        conn.execute('INSERT INTO users (email) VALUES (?)', (user.email,))
        conn.commit()
    except sqlite3.IntegrityError:
        # This error if mail already exists
        conn.close()
        raise HTTPException(status_code=400, detail="Email is already on the waitlist!")
    except Exception as e:
        conn.close()
        raise HTTPException(status_code=500, detail=str(e))

    conn.close()
    return {"message": "Successfully joined the waitlist!", "email": user.email}


@app.get("/api/waitlist-count")
def get_waitlist_count():
    conn = get_db_connection()
    cursor = conn.execute('SELECT COUNT(*) FROM users')
    count = cursor.fetchone()[0]
    conn.close()
    return {"count": count}


@app.get("/api/admin/waitlist")
def get_waitlist_emails(_admin: str = Depends(verify_admin)):
    conn = get_db_connection()
    cursor = conn.execute("SELECT email FROM users ORDER BY id ASC")
    emails = [row["email"] for row in cursor.fetchall()]
    conn.close()
    return {"emails": emails, "count": len(emails)}


@app.get("/api/health")
def health_check():
    return {"status": "ok"}
