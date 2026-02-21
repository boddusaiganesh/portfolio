import { useState } from 'react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [sent, setSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSent(true);
        setTimeout(() => setSent(false), 3000);
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <section id="contact" className="section contact">
            <div className="container">
                <h2 className="section-title">Get In Touch</h2>
                <p className="section-subtitle">Have a project or opportunity in mind? Let's connect!</p>

                <div className="contact__grid">
                    <form className="contact__form glass-card" onSubmit={handleSubmit}>
                        <div className="contact__form-group">
                            <label className="contact__label">Name</label>
                            <input
                                type="text"
                                className="contact__input"
                                placeholder="Your name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="contact__form-group">
                            <label className="contact__label">Email</label>
                            <input
                                type="email"
                                className="contact__input"
                                placeholder="your@email.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>
                        <div className="contact__form-group">
                            <label className="contact__label">Message</label>
                            <textarea
                                className="contact__textarea"
                                placeholder="Tell me about your project or opportunity..."
                                rows={5}
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className={`btn-gradient contact__submit ${sent ? 'contact__submit--sent' : ''}`}
                        >
                            {sent ? (
                                <>✓ Message Sent!</>
                            ) : (
                                <>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                                    Send Message
                                </>
                            )}
                        </button>
                    </form>

                    <div className="contact__info">
                        <div className="contact__info-card glass-card">
                            <div className="contact__info-icon">📧</div>
                            <div>
                                <span className="contact__info-label">Email</span>
                                <a className="contact__info-value" href="mailto:boddusaiganesh81@gmail.com">
                                    boddusaiganesh81@gmail.com
                                </a>
                            </div>
                        </div>

                        <div className="contact__info-card glass-card">
                            <div className="contact__info-icon">📱</div>
                            <div>
                                <span className="contact__info-label">Phone</span>
                                <a className="contact__info-value" href="tel:+919392359162">
                                    +91 9392359162
                                </a>
                            </div>
                        </div>

                        <div className="contact__info-card glass-card">
                            <div className="contact__info-icon">📍</div>
                            <div>
                                <span className="contact__info-label">Location</span>
                                <span className="contact__info-value">Andhra Pradesh, India</span>
                            </div>
                        </div>

                        <div className="contact__info-card glass-card">
                            <div className="contact__info-icon">🔗</div>
                            <div>
                                <span className="contact__info-label">Social</span>
                                <div className="contact__socials">
                                    <a className="contact__social-link" href="https://github.com/boddusaiganesh" target="_blank" rel="noopener noreferrer" title="GitHub">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
