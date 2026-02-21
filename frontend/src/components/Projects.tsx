import { useState } from 'react';
import './Projects.css';

const projects = [
    {
        name: 'AI-Powered KYC Verification',
        description:
            'GHCI 2025 Hackathon Finalist — Production-ready KYC platform reducing verification from 2-7 days to 5-10 seconds. Industry-first bias detection with EEOC 80% Rule monitoring. Google Gemini AI for multi-modal OCR, facial recognition & liveness detection.',
        tech: ['Node.js', 'React', 'TypeScript', 'PostgreSQL', 'Gemini AI', 'Docker'],
        gradient: 'linear-gradient(135deg, #6C63FF 0%, #00D9FF 100%)',
        icon: '🛡️',
    },
    {
        name: 'AI MD&A Generator',
        description:
            'Agentic AI with multi-agent orchestration (Critique, Risk Detection, Comparative Analysis agents) for automated SEC financial report generation. RAG pipeline with ChromaDB, 14+ KPIs, 6-layer guardrails, 95%+ factuality.',
        tech: ['Python', 'Gemini API', 'Groq (Llama 3)', 'ChromaDB', 'RAG', 'FastAPI'],
        gradient: 'linear-gradient(135deg, #00D9FF 0%, #00E676 100%)',
        icon: '📊',
    },
    {
        name: 'Tesco Creative Studio',
        description:
            'Tesco Hackathon — AI creative builder for retail media. AI background removal via rembg (U-2-Net), 18-rule compliance engine, Gemini-powered text compliance & layout suggestions, interactive Fabric.js canvas editor.',
        tech: ['React 18', 'Vite', 'Fabric.js', 'FastAPI', 'Gemini AI', 'rembg'],
        gradient: 'linear-gradient(135deg, #FF5252 0%, #FFD600 100%)',
        icon: '🎨',
    },
    {
        name: 'Crime Info Extraction System',
        description:
            'Deep learning crime text analysis with custom BertWithFeatures model. BERT transformer + 6 SpaCy features for severity classification. NER, coreference resolution, and event extraction across multi-sentence narratives.',
        tech: ['Python', 'PyTorch', 'BERT', 'Hugging Face', 'SpaCy', 'Streamlit'],
        gradient: 'linear-gradient(135deg, #9c27b0 0%, #6C63FF 100%)',
        icon: '🔍',
    },
    {
        name: 'Your Health Compass',
        description:
            'Agentic RAG system with ChromaDB vector store and Tavily AI for real-time web search and intelligent health document retrieval. Google Gemini for context-aware answers with automatic source citations.',
        tech: ['FastAPI', 'React', 'ChromaDB', 'Gemini', 'Tavily AI', 'Vector DB'],
        gradient: 'linear-gradient(135deg, #00E676 0%, #00D9FF 100%)',
        icon: '🏥',
    },
    {
        name: 'ChatQuick Chrome Extension',
        description:
            'Chrome Extension with on-demand AI assistance and dynamic injectable UI. AI browser agent that parses live DOM to programmatically execute clicks, form filling, and document generation via single-request API batching.',
        tech: ['JavaScript', 'Chrome Manifest V3', 'Generative AI', 'DOM API'],
        gradient: 'linear-gradient(135deg, #FFD600 0%, #FF5252 100%)',
        icon: '⚡',
    },
];

const Projects = () => {
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

    return (
        <section id="projects" className="section projects">
            <div className="container">
                <h2 className="section-title">Featured Projects</h2>
                <p className="section-subtitle">AI-powered systems and full-stack applications I've built</p>

                <div className="projects__grid">
                    {projects.map((project, idx) => (
                        <div
                            key={idx}
                            className="projects__card glass-card"
                            onMouseEnter={() => setHoveredIdx(idx)}
                            onMouseLeave={() => setHoveredIdx(null)}
                        >
                            <div
                                className="projects__card-glow"
                                style={{
                                    background: project.gradient,
                                    opacity: hoveredIdx === idx ? 0.15 : 0,
                                }}
                            ></div>

                            <div className="projects__card-header">
                                <span className="projects__icon">{project.icon}</span>
                                <div className="projects__links">
                                    <a className="projects__link" href="https://github.com/boddusaiganesh" target="_blank" rel="noopener noreferrer" title="Source Code">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
                                    </a>
                                </div>
                            </div>

                            <h3 className="projects__name">{project.name}</h3>
                            <p className="projects__desc">{project.description}</p>

                            <div className="projects__tech">
                                {project.tech.map((t) => (
                                    <span key={t} className="projects__tech-tag">
                                        {t}
                                    </span>
                                ))}
                            </div>

                            <div
                                className="projects__card-border"
                                style={{ background: project.gradient }}
                            ></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
