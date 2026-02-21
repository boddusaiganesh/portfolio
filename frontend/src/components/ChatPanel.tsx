import { useState, useRef, useEffect, useCallback } from 'react';
import { sendChatMessage } from '../api';
import type { ChatMessage } from '../api';
import './ChatPanel.css';

interface ChatPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

const SUGGESTED_QUESTIONS = [
    "What AI/ML projects has Sai Ganesh built?",
    "Tell me about the GHCI 2025 hackathon project",
    "What are Sai Ganesh's key technical skills?",
    "What is the experience with RAG and Agentic AI?",
];

const ChatPanel = ({ isOpen, onClose }: ChatPanelProps) => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            role: 'assistant',
            content:
                "👋 Hey there! I'm Sai Ganesh's AI assistant. Ask me anything about his skills, projects, AI/ML expertise, or experience. I'd love to help!",
        },
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [sessionId, setSessionId] = useState<string | undefined>(undefined);
    const [error, setError] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, scrollToBottom]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen]);

    const sendMessage = async (text?: string) => {
        const messageText = text || input.trim();
        if (!messageText || loading) return;

        setInput('');
        setError(null);

        const userMessage: ChatMessage = { role: 'user', content: messageText };
        setMessages((prev) => [...prev, userMessage]);
        setLoading(true);

        try {
            const res = await sendChatMessage(messageText, sessionId, messages);
            setSessionId(res.session_id);
            const assistantMessage: ChatMessage = {
                role: 'assistant',
                content: res.response,
            };
            setMessages((prev) => [...prev, assistantMessage]);
        } catch (err: any) {
            setError(err.message || 'Something went wrong');
            const errorMessage: ChatMessage = {
                role: 'assistant',
                content: "Sorry, I'm having trouble connecting right now. Please make sure the backend server is running on port 8000.",
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <>
            <div
                className={`chat-overlay ${isOpen ? 'chat-overlay--visible' : ''}`}
                onClick={onClose}
            />
            <div className={`chat-panel ${isOpen ? 'chat-panel--open' : ''}`}>
                {/* Header */}
                <div className="chat-panel__header">
                    <div className="chat-panel__header-info">
                        <div className="chat-panel__avatar">
                            <span>🤖</span>
                        </div>
                        <div>
                            <h3 className="chat-panel__title">AI Resume Assistant</h3>
                            <span className="chat-panel__status">
                                <span className="chat-panel__status-dot"></span>
                                Online
                            </span>
                        </div>
                    </div>
                    <button className="chat-panel__close" onClick={onClose}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                    </button>
                </div>

                {/* Messages */}
                <div className="chat-panel__messages">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`chat-msg chat-msg--${msg.role}`}>
                            {msg.role === 'assistant' && (
                                <div className="chat-msg__avatar">🤖</div>
                            )}
                            <div className="chat-msg__bubble">
                                <p>{msg.content}</p>
                            </div>
                        </div>
                    ))}

                    {loading && (
                        <div className="chat-msg chat-msg--assistant">
                            <div className="chat-msg__avatar">🤖</div>
                            <div className="chat-msg__bubble chat-msg__typing">
                                <span className="chat-typing-dot"></span>
                                <span className="chat-typing-dot"></span>
                                <span className="chat-typing-dot"></span>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="chat-panel__error">
                            ⚠️ {error}
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Suggested questions */}
                {messages.length <= 1 && (
                    <div className="chat-panel__suggestions">
                        {SUGGESTED_QUESTIONS.map((q, i) => (
                            <button
                                key={i}
                                className="chat-panel__suggestion"
                                onClick={() => sendMessage(q)}
                            >
                                {q}
                            </button>
                        ))}
                    </div>
                )}

                {/* Input */}
                <div className="chat-panel__input-area">
                    <textarea
                        ref={inputRef}
                        className="chat-panel__input"
                        placeholder="Ask about skills, experience, projects..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        rows={1}
                        disabled={loading}
                    />
                    <button
                        className="chat-panel__send"
                        onClick={() => sendMessage()}
                        disabled={!input.trim() || loading}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                    </button>
                </div>
            </div>
        </>
    );
};

export default ChatPanel;
