import { useEffect, useState } from "react";


const EnvelopeSeal = ({ onComplete }) => {

    const [status, setStatus] = useState("melipat surat...");
    const [flapClosed, setFlapClosed] = useState(false);
    const [sealVisible, setSealVisible] = useState(false);
    const [linesVisible, setLinesVisible] = useState(true);
    const [particles, setParticles] = useState([]);
    const [fading, setFading] = useState(false);

    useEffect(() => {
        setTimeout(() => setLinesVisible(false), 400);
        setTimeout(() => { setFlapClosed(true); }, 900);
        setTimeout(() => {
            setStatus("menyegel dengan lilin...");
            setSealVisible(true);
            const items = ["✦", "🌸", "✨", "·", "°", "*"];
            setParticles(Array.from({ length: 32 }, (_, i) => ({
                id: i,
                char: items[Math.floor(Math.random() * items.length)],
                tx: (Math.random() - 0.5) * 320,
                ty: (Math.random() - 1.3) * 280,
                size: 8 + Math.random() * 16,
                opacity: 0.3 + Math.random() * 0.6,
                dur: 1 + Math.random() * 1.2,
                delay: Math.random() * 0.4,
            })));
        }, 1800);
        setTimeout(() => setStatus("tersegel ✦"), 2500);
        setTimeout(() => setFading(true), 3400);
        setTimeout(() => onComplete(), 4200);
    }, [onComplete]);

    return (
        <div style={{ position: "fixed", inset: 0, background: "#080816", zIndex: 500, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: fading ? 0 : 1, transition: "opacity .8s ease" }}>
            <style>{`
          @keyframes particleFly { 0%{opacity:1;transform:translate(0,0) scale(1)} 100%{opacity:0;transform:translate(var(--tx),var(--ty)) scale(0)} }
        `}</style>
            <div style={{ position: "relative", width: 280, height: 200, marginBottom: 40 }}>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,#1a1630,#120f28)", border: "1px solid rgba(200,169,110,.3)", borderRadius: 4, overflow: "hidden" }}>
                    <div style={{ position: "absolute", inset: "28px 24px", display: "flex", flexDirection: "column", gap: 9, opacity: linesVisible ? 1 : 0, transition: "opacity .4s ease" }}>
                        {[85, 65, 75, 55, 70].map((w, i) => <div key={i} style={{ height: 1, background: `rgba(200,169,110,${0.14 + i * 0.03})`, width: `${w}%` }} />)}
                    </div>
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, borderLeft: "140px solid transparent", borderRight: "140px solid transparent", borderBottom: "90px solid rgba(200,169,110,.07)" }} />
                    <div style={{ position: "absolute", top: 0, left: 0, borderLeft: "140px solid rgba(200,169,110,.05)", borderBottom: "200px solid transparent" }} />
                    <div style={{ position: "absolute", top: 0, right: 0, borderRight: "140px solid rgba(200,169,110,.05)", borderBottom: "200px solid transparent" }} />
                </div>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, borderLeft: "140px solid transparent", borderRight: "140px solid transparent", borderTop: "100px solid rgba(200,169,110,.14)", transformOrigin: "top center", transform: flapClosed ? "rotateX(180deg)" : "rotateX(0deg)", transition: "transform .9s cubic-bezier(.4,0,.2,1)" }} />
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: sealVisible ? "translate(-50%,-50%) scale(1)" : "translate(-50%,-50%) scale(0)", width: 60, height: 60, borderRadius: "50%", background: "radial-gradient(circle at 38% 35%,#d4a843,#a07830)", border: "2px solid rgba(200,169,110,.5)", display: "flex", alignItems: "center", justifyContent: "center", transition: "transform .6s cubic-bezier(.34,1.56,.64,1)", zIndex: 10, boxShadow: "0 0 24px rgba(200,169,110,.3)" }}>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, color: "#080816" }}>✦</div>
                </div>
            </div>
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
                {particles.map(p => (
                    <div key={p.id} style={{ position: "absolute", left: "50%", top: "50%", fontSize: p.size, color: `rgba(200,169,110,${p.opacity})`, "--tx": `${p.tx}px`, "--ty": `${p.ty}px`, animation: `particleFly ${p.dur}s ${p.delay}s ease forwards` }}>
                        {p.char}
                    </div>
                ))}
            </div>
            <div style={{ fontSize: 11, letterSpacing: 3, color: "rgba(200,169,110,.45)", textTransform: "uppercase" }}>{status}</div>
        </div>
    )
}

export default EnvelopeSeal