import './Footer.css';

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container footer__inner">
                <div className="footer__brand">
                    <span className="footer__logo">
                        <span className="footer__logo-bracket">&lt;</span>
                        SGR
                        <span className="footer__logo-bracket"> /&gt;</span>
                    </span>
                    <p className="footer__tagline">Building intelligent systems, one model at a time.</p>
                </div>

                <div className="footer__divider"></div>

                <div className="footer__bottom">
                    <span className="footer__copyright">
                        © {year} Boddu Sai Ganesh Reddy. Crafted with ❤️ and lots of ☕
                    </span>
                    <span className="footer__tech">
                        Built with React + TypeScript + FastAPI + OpenRouter
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
