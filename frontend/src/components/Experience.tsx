import './Experience.css';

const experiences = [
    {
        company: 'Infosys Springboard',
        role: 'Java Developer Intern',
        period: 'Aug 2025 – Oct 2025',
        location: 'Remote',
        highlights: [
            'Engineered and launched MedVault, a full-stack hospital management web application with AI-powered features serving administrators, doctors, and patients',
            'Developed secure stateless REST API using Java Spring Boot with JWT-based authentication and role-based access control',
            'Built dynamic responsive UI with ReactJS — multi-page dashboard for appointment booking, patient management, and feedback collection',
            'Designed and optimized MySQL database schema using JPA and Hibernate for complex entity relationships',
            'Implemented Spring Security framework for authentication and authorization across application layers',
        ],
        color: '#6C63FF',
    },
    {
        company: 'VIT-AP University',
        role: 'B.Tech CSE Student · CGPA 8.88/10',
        period: 'Sept 2022 – Apr 2026',
        location: 'Amaravati, India',
        highlights: [
            'Pursuing Bachelor of Technology in Computer Science and Engineering with focus on AI/ML',
            'Relevant coursework: Machine Learning, Deep Learning, AI, NLP, Computer Vision, DSA',
            'GHCI 2025 Hackathon Finalist — built AI-Powered KYC Verification System',
            'Gold Medal in Inter-University Martial Arts Championship (2024)',
            'Club Manager of Dragon Fist Martial Arts Club — managed 150+ members',
        ],
        color: '#00D9FF',
    },
];

const Experience = () => {
    return (
        <section id="experience" className="section experience">
            <div className="container">
                <h2 className="section-title">Experience</h2>
                <p className="section-subtitle">My professional journey and education</p>

                <div className="experience__timeline">
                    <div className="experience__line"></div>

                    {experiences.map((exp, idx) => (
                        <div key={idx} className="experience__item">
                            <div className="experience__dot" style={{ borderColor: exp.color }}>
                                <div className="experience__dot-inner" style={{ background: exp.color }}></div>
                            </div>

                            <div className="experience__card glass-card">
                                <div className="experience__card-header">
                                    <div>
                                        <h3 className="experience__role">{exp.role}</h3>
                                        <span className="experience__company">{exp.company}</span>
                                    </div>
                                    <div className="experience__meta">
                                        <span className="experience__period">{exp.period}</span>
                                        <span className="experience__location">📍 {exp.location}</span>
                                    </div>
                                </div>
                                <ul className="experience__highlights">
                                    {exp.highlights.map((h, i) => (
                                        <li key={i}>
                                            <span className="experience__bullet" style={{ background: exp.color }}></span>
                                            {h}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
