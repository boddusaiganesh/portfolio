const API_BASE = import.meta.env.PROD
  ? 'https://portfolio-backend-hmub.onrender.com'
  : 'http://localhost:8000';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

export interface ChatResponse {
  response: string;
  session_id: string;
}

export interface ResumeData {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  bio: string;
  skills: Record<string, string[]>;
  experience: {
    company: string;
    role: string;
    period: string;
    location: string;
    highlights: string[];
  }[];
  projects: {
    name: string;
    description: string;
    tech: string[];
    link: string;
    github: string;
  }[];
  education: {
    institution: string;
    degree: string;
    period: string;
    highlights: string[];
  }[];
  certifications: string[];
}

export async function fetchResume(): Promise<ResumeData> {
  const res = await fetch(`${API_BASE}/api/resume`);
  if (!res.ok) throw new Error('Failed to fetch resume');
  return res.json();
}

export async function sendChatMessage(
  message: string,
  sessionId?: string,
  history?: ChatMessage[]
): Promise<ChatResponse> {
  const res = await fetch(`${API_BASE}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message,
      session_id: sessionId,
      history: history?.slice(-10),
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Unknown error' }));
    throw new Error(err.detail || 'Chat request failed');
  }
  return res.json();
}

export async function fetchChatHistory(
  sessionId: string
): Promise<{ session_id: string; messages: ChatMessage[] }> {
  const res = await fetch(`${API_BASE}/api/chat/history/${sessionId}`);
  if (!res.ok) throw new Error('Failed to fetch chat history');
  return res.json();
}
