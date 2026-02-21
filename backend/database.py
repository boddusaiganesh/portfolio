import aiosqlite
import os
from datetime import datetime

DB_PATH = os.path.join(os.path.dirname(__file__), "portfolio.db")


async def init_db():
    """Initialize the SQLite database and create tables."""
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute("""
            CREATE TABLE IF NOT EXISTS chat_messages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                session_id TEXT NOT NULL,
                role TEXT NOT NULL CHECK(role IN ('user', 'assistant')),
                content TEXT NOT NULL,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        """)
        await db.execute("""
            CREATE INDEX IF NOT EXISTS idx_session_id ON chat_messages(session_id)
        """)
        await db.commit()


async def save_message(session_id: str, role: str, content: str):
    """Save a chat message to the database."""
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute(
            "INSERT INTO chat_messages (session_id, role, content) VALUES (?, ?, ?)",
            (session_id, role, content),
        )
        await db.commit()


async def get_history(session_id: str, limit: int = 50):
    """Retrieve chat history for a session."""
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        cursor = await db.execute(
            """
            SELECT role, content, timestamp
            FROM chat_messages
            WHERE session_id = ?
            ORDER BY timestamp ASC
            LIMIT ?
            """,
            (session_id, limit),
        )
        rows = await cursor.fetchall()
        return [
            {"role": row["role"], "content": row["content"], "timestamp": row["timestamp"]}
            for row in rows
        ]


async def clear_history(session_id: str):
    """Clear chat history for a session."""
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute(
            "DELETE FROM chat_messages WHERE session_id = ?",
            (session_id,),
        )
        await db.commit()
