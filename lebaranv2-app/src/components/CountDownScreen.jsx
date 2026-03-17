import { useState, useRef, useEffect } from "react";

const CountdownScreen = ({ timeLeft, onUnlock }) => {
    const [shaking, setShaking] = useState(false);
    const [justUnlocked, setJustUnlocked] = useState(false);
    const prevTotal = useRef(timeLeft?.total ?? 0);

    /* detect when countdown hits zero */
    useEffect(() => {
        if (prevTotal.current > 0 && !timeLeft) {
            setJustUnlocked(true);
            setTimeout(() => onUnlock(), 2200);
        }
        if (timeLeft) prevTotal.current = timeLeft.total;
    }, [timeLeft, onUnlock]);

    const handleLockedTap = () => {
        setShaking(true);
        setTimeout(() => setShaking(false), 600);
    };

    const pad = n => String(n).padStart(2, "0");

    /* progress ring — based on % of last 24 hours remaining */
    const pct = timeLeft ? Math.max(0, Math.min(1, timeLeft.total / (24 * 3600 * 1000))) : 0;
    const R = 52, C = 2 * Math.PI * R;
    const dash = C * (1 - pct);

    return (
        <div style={{
            position: "fixed", inset: 0, zIndex: 200,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            background: "#0f0f21",
            padding: "32px 24px",
            transition: justUnlocked ? "opacity 1.5s 0.5s ease" : "none",
            opacity: justUnlocked ? 0 : 1,
        }}>
            <style>{`
                    @keyframes cdIn      { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }
                    @keyframes lockPulse { 0%,100%{box-shadow:0 0 20px rgba(200,169,110,.15)} 50%{box-shadow:0 0 45px rgba(200,169,110,.4)} }
                    @keyframes shake     { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-8px)} 40%{transform:translateX(8px)} 60%{transform:translateX(-5px)} 80%{transform:translateX(5px)} }
                    @keyframes ringGlow  { 0%,100%{filter:drop-shadow(0 0 6px rgba(200,169,110,.3))} 50%{filter:drop-shadow(0 0 18px rgba(200,169,110,.7))} }
                    @keyframes unlockPop { 0%{transform:scale(1)} 40%{transform:scale(1.3)} 70%{transform:scale(0.9)} 100%{transform:scale(1.15)} }
                    @keyframes digitFlip { 0%{transform:translateY(-6px);opacity:0} 100%{transform:translateY(0);opacity:1} }
                    @keyframes shimmerGold { 0%{background-position:200% center} 100%{background-position:-200% center} }
                    @keyframes shimLine { 0%{left:-100%} 100%{left:200%} }

                    .shimmer-gold {
                        background: linear-gradient(90deg, #C8A96E 0%, #F5EDD6 40%, #C8A96E 60%, #E8D5A3 100%);
                        background-size: 200% auto;
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                        animation: shimmerGold 3s linear infinite;
                    }
                `}</style>

            {/* top label */}
            <div style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 10, letterSpacing: 6,
                color: "#C8A96E",
                textTransform: "uppercase", fontWeight: 500,
                marginBottom: 40,
                animation: "cdIn .8s .2s ease both",
            }}>
                ✦ &nbsp; Surprise Lebaran &nbsp; ✦
            </div>
            {/* LOCK / UNLOCK ICON */}
            <div
                onClick={timeLeft ? handleLockedTap : undefined}
                style={{
                    width: 90, height: 90, borderRadius: "50%",
                    background: "radial-gradient(circle at 40% 35%, rgba(200,169,110,.1), rgba(200,169,110,.04))",
                    border: "1px solid rgba(200,169,110,.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 34,
                    marginBottom: 32,
                    cursor: timeLeft ? "pointer" : "default",
                    animation: shaking
                        ? "shake .6s ease"
                        : justUnlocked
                            ? "unlockPop .8s ease"
                            : "cdIn .8s .35s ease both, lockPulse 3s 1s ease infinite",
                    transition: "background .5s, border-color .5s",
                }}
            >
                {justUnlocked ? "🔓" : "🔒"}
            </div>

            {justUnlocked ? (
                /* UNLOCKED STATE */
                <div style={{ textAlign: "center", animation: "cdIn .7s ease both" }}>
                    <div style={{
                        fontFamily: "'Cormorant Garamond',serif",
                        fontSize: 28, fontStyle: "italic",
                        color: "#E8D5A3", marginBottom: 10,
                    }}>
                        Waktunya tiba... ✦
                    </div>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "rgba(200,169,110,.55)", letterSpacing: 1 }}>
                        Membuka surat untukmu...
                    </div>
                </div>
            ) : (
                <>
                    {/* RING TIMER */}
                    <div style={{ position: "relative", width: 130, height: 130, marginBottom: 32, animation: "cdIn .8s .5s ease both" }}>
                        <svg width="130" height="130" style={{ transform: "rotate(-90deg)", animation: "ringGlow 2.5s ease-in-out infinite" }}>
                            {/* outer decorative ring */}
                            <circle cx="65" cy="65" r={R + 10} fill="none" stroke="rgba(200,169,110,.06)" strokeWidth="1" />
                            {/* track */}
                            <circle cx="65" cy="65" r={R} fill="none" stroke="rgba(200,169,110,.08)" strokeWidth="5" />
                            {/* progress */}
                            <circle
                                cx="65" cy="65" r={R}
                                fill="none"
                                stroke="url(#goldGrad)"
                                strokeWidth="5"
                                strokeDasharray={C}
                                strokeDashoffset={dash}
                                strokeLinecap="round"
                                style={{ transition: "stroke-dashoffset 1s ease" }}
                            />
                            <defs>
                                <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#C8A96E" />
                                    <stop offset="50%" stopColor="#F5EDD6" />
                                    <stop offset="100%" stopColor="#C8A96E" />
                                </linearGradient>
                            </defs>
                        </svg>
                        {/* center */}
                        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 9, color: "rgba(200,169,110,.4)", letterSpacing: 3, textTransform: "uppercase", marginBottom: 4 }}>tersisa</div>
                            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, fontWeight: 500, color: "#C8A96E" }}>
                                {timeLeft ? `${timeLeft.d}h ${pad(timeLeft.h)}j` : "—"}
                            </div>
                        </div>
                    </div>

                    {/* DIVIDER */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28, animation: "cdIn .8s .6s ease both" }}>
                        <div style={{ width: 40, height: 1, background: "linear-gradient(to right,transparent,rgba(200,169,110,.3))" }} />
                        <div style={{ fontSize: 10, color: "rgba(200,169,110,.4)" }}>✦</div>
                        <div style={{ width: 40, height: 1, background: "linear-gradient(to left,transparent,rgba(200,169,110,.3))" }} />
                    </div>

                    {/* COUNTDOWN DIGITS */}
                    <div style={{ display: "flex", gap: 12, marginBottom: 32, animation: "cdIn .8s .65s ease both" }}>
                        {[
                            { label: "Hari", val: timeLeft?.d ?? 0 },
                            { label: "Jam", val: timeLeft?.h ?? 0 },
                            { label: "Menit", val: timeLeft?.m ?? 0 },
                            { label: "Detik", val: timeLeft?.s ?? 0 },
                        ].map((u, i) => (
                            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                                <div style={{
                                    width: 60, height: 66,
                                    background: "rgba(200,169,110,.05)",
                                    border: "1px solid rgba(200,169,110,.18)",
                                    borderRadius: 12,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 26,
                                    color: "#E8D5A3",
                                    position: "relative", overflow: "hidden",
                                }}>
                                    {/* shimmer sweep */}
                                    <div style={{
                                        position: "absolute", top: 0, bottom: 0, width: "40%",
                                        background: "linear-gradient(90deg,transparent,rgba(200,169,110,.08),transparent)",
                                        animation: `shimLine ${2 + i * 0.4}s ${i * 0.3}s linear infinite`,
                                    }} />
                                    {/* top line accent */}
                                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "rgba(200,169,110,.2)" }} />
                                    <span key={`${u.label}-${u.val}`} style={{ animation: "digitFlip .22s ease both", position: "relative" }}>
                                        {pad(u.val)}
                                    </span>
                                </div>
                                <div style={{
                                    fontFamily: "'DM Sans',sans-serif", fontSize: 9,
                                    letterSpacing: 3, color: "rgba(200,169,110,.35)",
                                    textTransform: "uppercase", fontWeight: 400,
                                }}>
                                    {u.label}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* message */}
                    {/* <div style={{ textAlign: "center", maxWidth: 280, animation: "cdIn .8s .8s ease both" }}>
                            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontStyle: "italic", color: "#fda4af", marginBottom: 10 }}>
                                Sabar ya, bestie! 🌸
                            </div>
                            <div style={{ fontFamily: "'Nunito',sans-serif", fontSize: 13, color: "rgba(249,168,212,.45)", lineHeight: 1.7, fontWeight: 400 }}>
                                Ada sesuatu spesial yang menunggumu saat 1 Syawal tiba. Jangan dibuka dulu ya! 🔒
                            </div>
                        </div> */}

                    {/* tap hint */}
                    {/* <div style={{ marginTop: 24, fontFamily: "'Nunito',sans-serif", fontSize: 11, color: "rgba(249,168,212,.22)", letterSpacing: 2, animation: "cdIn .8s 1s ease both" }}>
                            coba ketuk kalau penasaran 👀
                        </div> */}

                    {/* locked message on shake */}
                    {shaking && (
                        <div style={{
                            position: "absolute", bottom: 80, left: "50%", transform: "translateX(-50%)",
                            whiteSpace: "nowrap",
                            fontFamily: "'DM Sans',sans-serif", fontSize: 13,
                            color: "#E8D5A3",
                            background: "rgba(200,169,110,.08)",
                            border: "1px solid rgba(200,169,110,.2)",
                            borderRadius: 30, padding: "9px 24px",
                            fontWeight: 400, letterSpacing: 1,
                        }}>
                            Belum waktunya ✦
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default CountdownScreen