import { useRef, useEffect } from "react"
import { rand } from "../utils/random";

const StarField = () => {
    const canvasRef = useRef(null)
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let raf;
        const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
        resize();
        window.addEventListener("resize", resize);

        const stars = Array.from({ length: 180 }, () => ({
            x: rand(0, canvas.width), y: rand(0, canvas.height),
            r: rand(0.3, 1.8), phase: rand(0, Math.PI * 2), speed: rand(0.003, 0.015),
        }));
        const draw = (t) => {
            raf = requestAnimationFrame(draw);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            stars.forEach((s) => {
                const a = 0.2 + 0.8 * Math.abs(Math.sin(t * s.speed + s.phase));
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,245,200,${a})`;
                ctx.fill();
            });
        };
        draw(0);
        return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
    }, []);
    return (
        <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }} />
    );
}
export default StarField