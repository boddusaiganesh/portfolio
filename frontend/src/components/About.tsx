import './About.css';

const About = () => {
    return (
        <section id="about" className="section about">
            <div className="container">
                <h2 className="section-title">About Me</h2>
                <p className="section-subtitle">Get to know the person behind the code</p>

                <div className="about__grid">
                    <div className="about__text glass-card">
                        <div className="about__avatar">
                            <div className="about__avatar-ring">
                                <div className="about__avatar-placeholder">SG</div>
                            </div>
                        </div>
                        <p>
                            I'm an <strong>AI/ML Engineer</strong> and <strong>Full-Stack Developer</strong> currently
                            pursuing my B.Tech in Computer Science at VIT-AP University. I specialize in building
                            production-ready intelligent systems using{' '}
                            <span className="about__highlight">Generative AI</span>,{' '}
                            <span className="about__highlight">Large Language Models</span>,{' '}
                            <span className="about__highlight">RAG Pipelines</span>, and{' '}
                            <span className="about__highlight">Multi-Agent AI Systems</span>.
                        </p>
                        <p>
                            As a <strong>GHCI 2025 Hackathon Finalist</strong>, I demonstrated my ability to build
                            AI-powered solutions that achieve 99% performance improvements. I'm passionate about turning
                            cutting-edge AI research into real-world applications — from automated financial report
                            generation to intelligent KYC verification systems.
                        </p>
                        <div className="about__tags">
                            <span className="about__tag">🤖 AI/ML Engineer</span>
                            <span className="about__tag">🏆 Hackathon Finalist</span>
                            <span className="about__tag">🥋 Gold Medalist</span>
                            <span className="about__tag">🚀 Open Source</span>
                        </div>
                    </div>

                    <div className="about__cards">
                        <div className="about__info-card glass-card">
                            <div className="about__info-icon">📍</div>
                            <div>
                                <span className="about__info-label">Location</span>
                                <span className="about__info-value">Andhra Pradesh, India</span>
                            </div>
                        </div>
                        <div className="about__info-card glass-card">
                            <div className="about__info-icon">🎓</div>
                            <div>
                                <span className="about__info-label">Education</span>
                                <span className="about__info-value">B.Tech CSE, VIT-AP · 8.88 CGPA</span>
                            </div>
                        </div>
                        <div className="about__info-card glass-card">
                            <div className="about__info-icon">💼</div>
                            <div>
                                <span className="about__info-label">Status</span>
                                <span className="about__info-value">Fresher · Graduating June 2026</span>
                            </div>
                        </div>
                        <div className="about__info-card glass-card">
                            <div className="about__info-icon">🏆</div>
                            <div>
                                <span className="about__info-label">Recognition</span>
                                <span className="about__info-value">GHCI 2025 Hackathon Finalist</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
