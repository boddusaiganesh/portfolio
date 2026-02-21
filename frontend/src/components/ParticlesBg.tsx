import { useEffect, useRef } from 'react';

const ParticlesBg = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;
        let particles: Particle[] = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            opacity: number;
            color: string;

            constructor() {
                this.x = Math.random() * (canvas?.width || 1920);
                this.y = Math.random() * (canvas?.height || 1080);
                this.vx = (Math.random() - 0.5) * 0.3;
                this.vy = (Math.random() - 0.5) * 0.3;
                this.size = Math.random() * 2 + 0.5;
                this.opacity = Math.random() * 0.5 + 0.1;
                this.color = Math.random() > 0.5 ? '108, 99, 255' : '0, 217, 255';
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (canvas) {
                    if (this.x < 0) this.x = canvas.width;
                    if (this.x > canvas.width) this.x = 0;
                    if (this.y < 0) this.y = canvas.height;
                    if (this.y > canvas.height) this.y = 0;
                }
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
                ctx.fill();
            }
        }

        const init = () => {
            const count = Math.min(80, Math.floor((canvas!.width * canvas!.height) / 15000));
            particles = Array.from({ length: count }, () => new Particle());
        };

        const drawConnections = () => {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 150) {
                        ctx!.beginPath();
                        ctx!.moveTo(particles[i].x, particles[i].y);
                        ctx!.lineTo(particles[j].x, particles[j].y);
                        ctx!.strokeStyle = `rgba(108, 99, 255, ${0.08 * (1 - dist / 150)})`;
                        ctx!.lineWidth = 0.5;
                        ctx!.stroke();
                    }
                }
            }
        };

        const animate = () => {
            ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
            particles.forEach((p) => {
                p.update();
                p.draw();
            });
            drawConnections();
            animationId = requestAnimationFrame(animate);
        };

        resize();
        init();
        animate();

        const onResize = () => {
            resize();
            init();
        };
        window.addEventListener('resize', onResize);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', onResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 0,
            }}
        />
    );
};

export default ParticlesBg;
