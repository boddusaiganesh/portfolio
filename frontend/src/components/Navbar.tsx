import { useState, useEffect } from 'react';
import './Navbar.css';

const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
];

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 50);

            const sections = navLinks.map((l) => document.getElementById(l.id));
            const scrollPos = window.scrollY + 200;

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section && section.offsetTop <= scrollPos) {
                    setActiveSection(navLinks[i].id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
            setMenuOpen(false);
        }
    };

    return (
        <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
            <div className="navbar__inner container">
                <a className="navbar__logo" onClick={() => scrollTo('hero')}>
                    <span className="navbar__logo-bracket">&lt;</span>
                    SGR
                    <span className="navbar__logo-bracket"> /&gt;</span>
                </a>

                <button
                    className={`navbar__hamburger ${menuOpen ? 'active' : ''}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <ul className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
                    {navLinks.map((link) => (
                        <li key={link.id}>
                            <a
                                className={`navbar__link ${activeSection === link.id ? 'navbar__link--active' : ''}`}
                                onClick={() => scrollTo(link.id)}
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                    <li>
                        <a
                            className="navbar__link navbar__github"
                            href="https://github.com/boddusaiganesh"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="GitHub Profile"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
