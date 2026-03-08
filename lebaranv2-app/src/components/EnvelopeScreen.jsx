import { useState } from "react";


const EnvelopeScreen = (onOpen) => {
    const [opening, setOpening] = useState(false);
    const [gone, setGone] = useState(false);

    const handleOpen = () => {
        if (opening) return;
        setOpening(true);
        setTimeout(() => { onOpen(); setGone(true); }, 1200);
    };

    if (gone) return null;

    return (
        <div style={{
            position: "fixed", inset: 0, zIndex: 200,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            background: "radial-gradient(ellipse at 50% 60%, #12122a 0%, #080810 100%)",
            transition: opening ? "opacity 0.8s 0.8s ease" : "none",
            opacity: opening ? 0 : 1,
        }}>
            <style>{`
            @keyframes envFadeIn { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:none} }
            @keyframes envPulse  { 0%,100%{opacity:.3} 50%{opacity:.9} }
            @keyframes envFloat  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
            .env-pre  { animation: envFadeIn .8s .3s ease both; }
            .env-wrap { animation: envFadeIn .8s .6s ease both, envFloat 3s 2s ease-in-out infinite; }
            .env-hint { animation: envPulse 2s 1.5s ease infinite; }
            .flap { transform-origin: top center; transition: transform .7s cubic-bezier(.4,0,.2,1); }
            .flap.open { transform: rotateX(185deg); }
            .letter { transition: transform .9s .15s cubic-bezier(.4,0,.2,1); }
            .letter.open { transform: translateY(-130px); }
            .seal { transition: opacity .3s .1s; }
            .seal.open { opacity: 0; }
            .env-body:hover { filter: drop-shadow(0 0 60px rgba(200,169,110,.5)); }
          `}</style>

            <div className="env-pre" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, letterSpacing: 5, color: "#C8A96E", textTransform: "uppercase", marginBottom: 36 }}>
                Sebuah surat spesial untukmu
            </div>

            <div className="env-wrap" onClick={handleOpen} style={{ cursor: "pointer", position: "relative", width: 260, height: 185, filter: "drop-shadow(0 0 30px rgba(200,169,110,.18))" }}>
                {/* Body */}
                <div className="env-body" style={{ position: "absolute", inset: 0, background: "linear-gradient(155deg,#1c1c30,#10101e)", border: "1px solid rgba(200,169,110,.3)", borderRadius: 6 }} />
                {/* Flap */}
                <div className={`flap ${opening ? "open" : ""}`} style={{ position: "absolute", top: 0, left: 0, right: 0, height: 120, background: "linear-gradient(170deg,#201e35,#13111f)", clipPath: "polygon(0 0,100% 0,50% 68%)", borderRadius: "6px 6px 0 0", zIndex: 3 }} />
                {/* Seal */}
                <div className={`seal ${opening ? "open" : ""}`} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 50, height: 50, border: "1px solid #C8A96E", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: "#C8A96E", background: "#10101e", zIndex: 4 }}>✦</div>
                {/* Letter */}
                <div className={`letter ${opening ? "open" : ""}`} style={{ position: "absolute", left: 18, right: 18, bottom: 12, height: 100, background: "linear-gradient(180deg,#1e1c30,#131120)", border: "1px solid rgba(200,169,110,.15)", borderRadius: 4, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, zIndex: 2 }}>
                    {[70, 45, 55].map((w, i) => <div key={i} style={{ width: `${w}%`, height: 1, background: "rgba(200,169,110,.25)" }} />)}
                </div>
            </div>

            <div className="env-hint" style={{ marginTop: 28, fontFamily: "'DM Sans',sans-serif", fontSize: 12, letterSpacing: 2, color: "rgba(253,251,247,.45)" }}>
                ✦ Ketuk untuk membuka
            </div>
        </div>
    );
}

export default EnvelopeScreen