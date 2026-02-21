import { useState, useEffect } from 'react';
import './Hero.css';

const roles = [
    'AI/ML Engineer',
    'Full-Stack Developer',
    'Generative AI Specialist',
    'GHCI 2025 Hackathon Finalist',
];

const Hero = () => {
    const [roleIndex, setRoleIndex] = useState(0);
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentRole = roles[roleIndex];
        let timeout: ReturnType<typeof setTimeout>;

        if (!isDeleting && text === currentRole) {
            timeout = setTimeout(() => setIsDeleting(true), 2000);
        } else if (isDeleting && text === '') {
            setIsDeleting(false);
            setRoleIndex((prev) => (prev + 1) % roles.length);
        } else {
            timeout = setTimeout(
                () => {
                    setText(
                        isDeleting
                            ? currentRole.substring(0, text.length - 1)
                            : currentRole.substring(0, text.length + 1)
                    );
                },
                isDeleting ? 40 : 80
            );
        }

        return () => clearTimeout(timeout);
    }, [text, isDeleting, roleIndex]);

    return (
        <section id="hero" className="hero">
            <div className="hero__gradient-orb hero__gradient-orb--1"></div>
            <div className="hero__gradient-orb hero__gradient-orb--2"></div>
            <div className="hero__gradient-orb hero__gradient-orb--3"></div>

            <div className="container hero__content">
                <div className="hero__badge animate-fade-up">
                    <span className="hero__badge-dot"></span>
                    Open to Opportunities · B.Tech 2026
                </div>

                <h1 className="hero__name animate-fade-up" style={{ animationDelay: '0.1s' }}>
                    Hi, I'm <span className="hero__name-highlight">Sai Ganesh</span>
                </h1>

                <div className="hero__role-wrapper animate-fade-up" style={{ animationDelay: '0.2s' }}>
                    <span className="hero__role">
                        {text}
                        <span className="hero__cursor">|</span>
                    </span>
                </div>

                <p className="hero__desc animate-fade-up" style={{ animationDelay: '0.3s' }}>
                    Building production-ready AI systems with LLMs, RAG pipelines, and multi-agent orchestration.
                    Passionate about turning cutting-edge AI research into real-world applications.
                </p>

                <div className="hero__actions animate-fade-up" style={{ animationDelay: '0.4s' }}>
                    <a
                        className="btn-gradient"
                        onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3v12" /><circle cx="18" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M18 9a9 9 0 0 1-9 9" /></svg>
                        View Projects
                    </a>
                    <a
                        className="btn-outline"
                        href="https://github.com/boddusaiganesh"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                        GitHub
                    </a>
                    <a
                        className="btn-outline"
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                        Contact Me
                    </a>
                </div>

                <div className="hero__stats animate-fade-up" style={{ animationDelay: '0.5s' }}>
                    <div className="hero__stat">
                        <span className="hero__stat-num">6+</span>
                        <span className="hero__stat-label">AI Projects</span>
                    </div>
                    <div className="hero__stat-divider"></div>
                    <div className="hero__stat">
                        <span className="hero__stat-num">8.88</span>
                        <span className="hero__stat-label">CGPA</span>
                    </div>
                    <div className="hero__stat-divider"></div>
                    <div className="hero__stat">
                        <span className="hero__stat-num">30+</span>
                        <span className="hero__stat-label">Technologies</span>
                    </div>
                </div>
            </div>

            <div className="hero__scroll-indicator animate-fade-in" style={{ animationDelay: '1s' }}>
                <div className="hero__scroll-mouse">
                    <div className="hero__scroll-dot"></div>
                </div>
                <span>Scroll Down</span>
            </div>
        </section>
    );
};

export default Hero;
