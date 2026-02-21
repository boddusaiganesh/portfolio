import os
import json
import uuid
import httpx
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from dotenv import load_dotenv
from database import init_db, save_message, get_history, clear_history

load_dotenv()

# ── Configuration ───────────────────────────────────────────────────────
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY", "")
OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"
AI_MODEL = "meta-llama/llama-4-maverick:free"

# Load resume data
RESUME_PATH = os.path.join(os.path.dirname(__file__), "resume_data.json")
with open(RESUME_PATH, "r", encoding="utf-8") as f:
    RESUME_DATA = json.load(f)

# Build system prompt from resume
SYSTEM_PROMPT = f"""You are an AI assistant embedded in {RESUME_DATA['name']}'s personal portfolio website. 
Your role is to answer questions about {RESUME_DATA['name']}'s professional background, skills, experience, and projects.

Here is the complete resume data you should use to answer questions:

---
**Name:** {RESUME_DATA['name']}
**Title:** {RESUME_DATA['title']}
**Location:** {RESUME_DATA['location']}
**Bio:** {RESUME_DATA['bio']}

**Skills:**
{json.dumps(RESUME_DATA['skills'], indent=2)}

**Experience:**
{json.dumps(RESUME_DATA['experience'], indent=2)}

**Projects:**
{json.dumps(RESUME_DATA['projects'], indent=2)}

**Education:**
{json.dumps(RESUME_DATA['education'], indent=2)}

**Certifications:**
{json.dumps(RESUME_DATA['certifications'], indent=2)}

**Contact:**
- Email: {RESUME_DATA['email']}
- LinkedIn: {RESUME_DATA['linkedin']}
- GitHub: {RESUME_DATA['github']}
- Website: {RESUME_DATA['website']}
---

Guidelines:
1. Only answer questions based on the resume data above. If asked about something not in the resume, politely say you don't have that information.
2. Be friendly, professional, and concise.
3. When listing skills or experiences, format them nicely.
4. If asked about availability or hiring, direct them to the contact information.
5. You can make reasonable inferences from the data but don't fabricate information.
6. Keep responses conversational and engaging — you represent {RESUME_DATA['name']}'s professional brand.
"""


# ── Models ──────────────────────────────────────────────────────────────
class ChatMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None
    history: Optional[List[ChatMessage]] = []


class ChatResponse(BaseModel):
    response: str
    session_id: str


# ── App Setup ───────────────────────────────────────────────────────────
@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield


app = FastAPI(
    title="Portfolio AI Chat API",
    description="Backend API for AI-powered portfolio chat",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Endpoints ───────────────────────────────────────────────────────────
@app.get("/")
async def root():
    return {"status": "ok", "message": "Portfolio AI Chat API is running"}


@app.get("/api/resume")
async def get_resume():
    """Return the full resume data."""
    return RESUME_DATA


@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """Process a chat message and return AI response."""
    api_key = os.getenv("OPENROUTER_API_KEY", "")
    if not api_key or api_key == "your-key-here":
        raise HTTPException(
            status_code=500,
            detail="OpenRouter API key not configured. Set OPENROUTER_API_KEY in .env",
        )

    session_id = request.session_id or str(uuid.uuid4())

    # Build message history for the API call
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]

    # Add conversation history from request or database
    if request.history:
        for msg in request.history[-10:]:  # Last 10 messages for context
            messages.append({"role": msg.role, "content": msg.content})
    else:
        db_history = await get_history(session_id, limit=10)
        for msg in db_history:
            messages.append({"role": msg["role"], "content": msg["content"]})

    # Add current user message
    messages.append({"role": "user", "content": request.message})

    # Save user message to DB
    await save_message(session_id, "user", request.message)

    # Call OpenRouter API
    try:
        async with httpx.AsyncClient(timeout=60.0) as client:
            response = await client.post(
                OPENROUTER_URL,
                headers={
                    "Authorization": f"Bearer {api_key}",
                    "Content-Type": "application/json",
                    "HTTP-Referer": RESUME_DATA.get("website", "https://portfolio.dev"),
                    "X-Title": f"{RESUME_DATA['name']}'s Portfolio Chat",
                },
                json={
                    "model": AI_MODEL,
                    "messages": messages,
                    "max_tokens": 500,
                    "temperature": 0.7,
                },
            )

        if response.status_code != 200:
            error_detail = response.text
            raise HTTPException(
                status_code=response.status_code,
                detail=f"OpenRouter API error: {error_detail}",
            )

        result = response.json()
        ai_message = result["choices"][0]["message"]["content"]

        # Save assistant response to DB
        await save_message(session_id, "assistant", ai_message)

        return ChatResponse(response=ai_message, session_id=session_id)

    except httpx.TimeoutException:
        raise HTTPException(status_code=504, detail="AI service timed out")
    except httpx.RequestError as e:
        raise HTTPException(status_code=502, detail=f"Failed to connect to AI service: {str(e)}")
    except KeyError:
        raise HTTPException(status_code=502, detail="Unexpected response format from AI service")


@app.get("/api/chat/history/{session_id}")
async def get_chat_history(session_id: str, limit: int = 50):
    """Retrieve chat history for a session."""
    history = await get_history(session_id, limit)
    return {"session_id": session_id, "messages": history}


@app.delete("/api/chat/history/{session_id}")
async def delete_chat_history(session_id: str):
    """Clear chat history for a session."""
    await clear_history(session_id)
    return {"status": "ok", "message": "Chat history cleared"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
