import { useState } from "react";

const FinalScreen = ({ onReset }) => {

    const [stars] = useState(() =>
        Array.from({ length: 70 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            top: Math.random() * 100,
            size: 1 + Math.random() * 2,
            opacity: 0.1 + Math.random() * 0.5,
            dur: 2 + Math.random() * 3,
            delay: Math.random() * 3,
        }))
    );

    return (
        <div style={{ position: "fixed", inset: 0, background: "#080816", zIndex: 600, overflowY: "auto" }}>
            <style>{`
        @keyframes starTwinkle { 0%,100%{opacity:.15;transform:scale(.8)} 50%{opacity:.7;transform:scale(1.1)} }
        @keyframes sealPop { 0%{transform:scale(0) rotate(-20deg);opacity:0} 60%{transform:scale(1.2) rotate(4deg);opacity:1} 100%{transform:scale(1) rotate(0);opacity:1} }
        @keyframes heartbeat { 0%,100%{transform:scale(1)} 14%{transform:scale(1.2)} 28%{transform:scale(1)} 42%{transform:scale(1.15)} }
        @keyframes fadeUpF { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:none} }
        @keyframes fadeInF { from{opacity:0} to{opacity:1} }
        @keyframes shimmerF { 0%{background-position:200% center} 100%{background-position:-200% center} }
      `}</style>
            <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
                {stars.map(s => (
                    <div key={s.id} style={{ position: "absolute", left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size, borderRadius: "50%", background: `rgba(200,169,110,${s.opacity})`, animation: `starTwinkle ${s.dur}s ${s.delay}s ease-in-out infinite` }} />
                ))}
            </div>
            <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 28px", textAlign: "center", position: "relative", zIndex: 2 }}>
                <div style={{ maxWidth: 400 }}>
                    <div style={{ width: 72, height: 72, borderRadius: "50%", background: "radial-gradient(circle at 38% 35%,#d4a843,#a07830)", border: "2px solid rgba(200,169,110,.4)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 32px", animation: "sealPop .8s .2s cubic-bezier(.34,1.56,.64,1) both", boxShadow: "0 0 40px rgba(200,169,110,.22)" }}>
                        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, color: "#080816" }}>✦</div>
                    </div>
                    <div style={{ fontSize: 10, letterSpacing: 4, color: "rgba(200,169,110,.55)", textTransform: "uppercase", marginBottom: 20, animation: "fadeUpF .8s .5s ease both" }}>Ceritanya suratnya udah ketutup</div>
                    {/* <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(26px,7vw,40px)", fontStyle: "italic", color: "#F5EDD6", lineHeight: 1.35, marginBottom: 28, animation: "fadeUpF .8s .7s ease both" }}>
                        Disimpan di sini,<br />untuk selamanya 🌸
                    </div> */}
                    <div style={{ height: 1, background: "linear-gradient(to right,transparent,rgba(200,169,110,.3),transparent)", marginBottom: 28, animation: "fadeInF 1s .9s ease both" }} />
                    {/* <p style={{ fontSize: 14, lineHeight: 1.9, color: "rgba(253,251,247,.55)", marginBottom: 20, animation: "fadeUpF .8s 1s ease both" }}>
                        Setiap kata di dalamnya ditulis dengan tulus. Setiap kalimat adalah bukti bahwa persahabatan ini bukan kebetulan.
                    </p> */}
                    <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(17px,4.5vw,22px)", fontStyle: "italic", color: "rgba(200,169,110,.85)", marginBottom: 40, animation: "fadeUpF .8s 1.2s ease both" }}>
                        "Mon maap kalau hasilnya kureng, soalnya ngga kepikiran mau bikin kayak gimana, lagi ngga ada ide wkwkwkwk"
                    </p>
                    <div style={{ fontSize: 10, letterSpacing: 3, color: "rgba(253,251,247,.15)", marginBottom: 40, animation: "fadeInF 1s 1.5s ease both" }}>IDUL FITRI 1447 H</div>
                    {/* <div style={{ fontSize: 28, animation: "heartbeat 2.5s ease infinite" }}>🌸</div> */}
                    <button onClick={onReset} style={{ marginTop: 48, fontSize: 11, letterSpacing: 2, color: "rgba(200,169,110,.4)", textTransform: "uppercase", padding: "10px 24px", border: "1px solid rgba(200,169,110,.15)", borderRadius: 2, background: "transparent", cursor: "pointer", animation: "fadeInF 1s 2s ease both" }}>
                        ↩ &nbsp;Buka lagi dari awal
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FinalScreen