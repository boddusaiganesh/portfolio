import { useEffect, useRef, useState } from 'react';
import './Skills.css';

const skillsData: Record<string, { skills: string[]; icon: string }> = {
    'AI & ML Frameworks': {
        icon: '🧠',
        skills: ['PyTorch', 'TensorFlow', 'Hugging Face Transformers', 'SpaCy', 'BERT', 'rembg (U-2-Net)', 'OpenCV'],
    },
    'Generative AI': {
        icon: '✨',
        skills: ['LLMs', 'Google Gemini API', 'Groq (Llama 3)', 'Prompt Engineering', 'RAG Pipelines', 'Model Fallback'],
    },
    'RAG & Vector DBs': {
        icon: '🔍',
        skills: ['ChromaDB', 'FAISS', 'Semantic Search', 'Document Chunking', 'Sentence-Transformers', 'HuggingFace Embeddings'],
    },
    'Agentic AI': {
        icon: '🤖',
        skills: ['Multi-Agent Systems', 'Agent Orchestration', 'Chain-of-Thought', 'Self-Critique Agents', 'Risk Detection Agents'],
    },
    'NLP & Computer Vision': {
        icon: '👁️',
        skills: ['NER', 'Dependency Parsing', 'Coreference Resolution', 'OCR', 'Facial Recognition', 'Liveness Detection'],
    },
    'Frontend': {
        icon: '🎨',
        skills: ['React', 'TypeScript', 'Vite', 'TailwindCSS', 'Framer Motion', 'HTML5/CSS3'],
    },
    'Backend': {
        icon: '⚙️',
        skills: ['Python FastAPI', 'Node.js', 'Express.js', 'Java Spring Boot', 'RESTful APIs', 'JWT Auth'],
    },
    'Databases & DevOps': {
        icon: '🗄️',
        skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQLite', 'Docker', 'Git/GitHub'],
    },
};

const Skills = () => {
    const [visible, setVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section id="skills" className="section skills" ref={ref}>
            <div className="container">
                <h2 className="section-title">Tech Stack</h2>
                <p className="section-subtitle">Technologies and tools I work with</p>

                <div className={`skills__grid ${visible ? 'skills__grid--visible' : ''}`}>
                    {Object.entries(skillsData).map(([category, data], catIdx) => (
                        <div
                            key={category}
                            className="skills__category glass-card"
                            style={{ animationDelay: `${catIdx * 0.1}s` }}
                        >
                            <div className="skills__category-header">
                                <span className="skills__category-icon">{data.icon}</span>
                                <h3 className="skills__category-name">{category}</h3>
                            </div>
                            <div className="skills__tags">
                                {data.skills.map((skill, i) => (
                                    <span
                                        key={skill}
                                        className="skills__tag"
                                        style={{ animationDelay: `${catIdx * 0.1 + i * 0.05}s` }}
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
