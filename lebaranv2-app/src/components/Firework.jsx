import { useCallback, useEffect, useRef } from "react"
import { rand } from "../utils/random"
import { randInt } from "../utils/random"


const FireworksCanvas = (active) => {

    const canvasRef = useRef(null)
    const particlesRef = useRef([])
    const rafRef = useRef(null)

    const launch = useCallback((cx, cy, count = 130) => {
        const COLORS = [
            "#C8A96E", "#E8D5A3", "#F5EDD6", "#ffffff",
            "#ffd0d0", "#ffc2e0", "#d0e8ff", "#aaffdd",
        ];
        for (let i = 0; i < count; i++) {
            const angle = rand(0, Math.PI * 2);
            const speed = rand(1.5, 7);
            particlesRef.current.push({
                x: cx, y: cy,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1,
                decay: rand(0.008, 0.02),
                r: rand(1, 3.5),
                color: COLORS[randInt(0, COLORS.length)],
                trail: [],
            });
        }
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return;
        const ctx = canvas.getContext("2d")

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resize()
        window.addEventListener("resize", resize)

        const draw = () => {
            rafRef.current = requestAnimationFrame(draw);
            if (!particlesRef.current.length) { ctx.clearRect(0, 0, canvas.width, canvas.height); return; }
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particlesRef.current.forEach((p) => {
                p.trail.push({ x: p.x, y: p.y });
                if (p.trail.length > 5) p.trail.shift();
                p.trail.forEach((t, i) => {
                    ctx.beginPath();
                    ctx.arc(t.x, t.y, p.r * (i / p.trail.length), 0, Math.PI * 2);
                    ctx.fillStyle = p.color;
                    ctx.globalAlpha = (i / p.trail.length) * p.life * 0.4;
                    ctx.fill();
                });
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = Math.max(0, p.life);
                ctx.fill();
                p.x += p.vx; p.y += p.vy;
                p.vy += 0.1; p.vx *= 0.98; p.vy *= 0.98;
                p.life -= p.decay;
            });
            ctx.globalAlpha = 1;
            particlesRef.current = particlesRef.current.filter((p) => p.life > 0);
        }

        draw()
        return () => {
            cancelAnimationFrame(rafRef.current); window.removeEventListener("resize", resize)
        }
    }, [])

    useEffect(() => {
        if (!active) return;
        const W = window.innerWidth, H = window.innerHeight;
        const positions = [
            [W * 0.2, H * 0.3], [W * 0.8, H * 0.25], [W * 0.5, H * 0.35],
            [W * 0.15, H * 0.5], [W * 0.85, H * 0.45], [W * 0.5, H * 0.15],
            [W * 0.35, H * 0.2], [W * 0.65, H * 0.28],
        ];
        positions.forEach(([cx, cy], i) =>
            setTimeout(() => launch(cx, cy, 110), i * 180)
        );
        setTimeout(() => launch(W * 0.5, H * 0.3, 200), 1500);
    }, [active, launch]);

    return (
        <canvas
            ref={canvasRef}
            style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 300 }}
        />
    );
}

export default FireworksCanvas