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
            background: "radial-gradient(ellipse at 50% 55%,#1e0818 0%,#0d040f 100%)",
            padding: "32px 24px",
            transition: justUnlocked ? "opacity 1.5s 0.5s ease" : "none",
            opacity: justUnlocked ? 0 : 1,
        }}>
            <style>{`
          @keyframes cdIn      { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }
          @keyframes lockPulse { 0%,100%{box-shadow:0 0 20px rgba(249,168,212,.2)} 50%{box-shadow:0 0 40px rgba(249,168,212,.45)} }
          @keyframes shake     { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-8px)} 40%{transform:translateX(8px)} 60%{transform:translateX(-5px)} 80%{transform:translateX(5px)} }
          @keyframes ringGlow  { 0%,100%{filter:drop-shadow(0 0 6px rgba(249,168,212,.4))} 50%{filter:drop-shadow(0 0 16px rgba(249,168,212,.8))} }
          @keyframes unlockPop { 0%{transform:scale(1)} 40%{transform:scale(1.3)} 70%{transform:scale(0.9)} 100%{transform:scale(1.15)} }
          @keyframes digitFlip { 0%{transform:translateY(-6px);opacity:0} 100%{transform:translateY(0);opacity:1} }
          @keyframes shimmerPink{ 0%{background-position:200% center} 100%{background-position:-200% center} }
          .shimmer-pink{background:linear-gradient(90deg,#f9a8d4 0%,#fff 35%,#f9a8d4 55%,#fda4af 100%);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmerPink 3s linear infinite}
        `}</style>

            {/* top label */}
            <div style={{ fontFamily: "'Nunito',sans-serif", fontSize: 11, letterSpacing: 5, color: "#f9a8d4", textTransform: "uppercase", fontWeight: 700, marginBottom: 36, animation: "cdIn .8s .2s ease both" }}>
                🌸 Surprise Lebaran 🌸
            </div>

            {/* LOCK / UNLOCK ICON */}
            <div
                onClick={timeLeft ? handleLockedTap : undefined}
                style={{
                    width: 88, height: 88, borderRadius: "50%",
                    background: "linear-gradient(135deg,rgba(249,168,212,.12),rgba(244,114,182,.06))",
                    border: "1.5px solid rgba(249,168,212,.35)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 36,
                    marginBottom: 28,
                    cursor: timeLeft ? "pointer" : "default",
                    animation: shaking
                        ? "shake .6s ease"
                        : justUnlocked
                            ? "unlockPop .8s ease"
                            : "cdIn .8s .35s ease both, lockPulse 3s 1s ease infinite",
                    transition: "background .5s",
                }}
            >
                {justUnlocked ? "🔓" : "🔒"}
            </div>

            {justUnlocked ? (
                /* UNLOCKED STATE */
                <div style={{ textAlign: "center", animation: "cdIn .7s ease both" }}>
                    <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontStyle: "italic", color: "#fda4af", marginBottom: 8 }}>
                        Waktunyaaa!! 🎉
                    </div>
                    <div style={{ fontFamily: "'Nunito',sans-serif", fontSize: 14, color: "rgba(249,168,212,.6)" }}>
                        Membuka surat untukmu...
                    </div>
                </div>
            ) : (
                <>
                    {/* RING TIMER */}
                    <div style={{ position: "relative", width: 120, height: 120, marginBottom: 28, animation: "cdIn .8s .5s ease both" }}>
                        <svg width="120" height="120" style={{ transform: "rotate(-90deg)", animation: "ringGlow 2s ease-in-out infinite" }}>
                            {/* track */}
                            <circle cx="60" cy="60" r={R} fill="none" stroke="rgba(249,168,212,.1)" strokeWidth="4" />
                            {/* progress */}
                            <circle
                                cx="60" cy="60" r={R}
                                fill="none"
                                stroke="url(#pinkGrad)"
                                strokeWidth="4"
                                strokeDasharray={C}
                                strokeDashoffset={dash}
                                strokeLinecap="round"
                                style={{ transition: "stroke-dashoffset 1s ease" }}
                            />
                            <defs>
                                <linearGradient id="pinkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#f9a8d4" />
                                    <stop offset="100%" stopColor="#f472b6" />
                                </linearGradient>
                            </defs>
                        </svg>
                        {/* center text */}
                        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                            <div style={{ fontFamily: "'Nunito',sans-serif", fontSize: 11, color: "rgba(249,168,212,.5)", letterSpacing: 2, marginBottom: 2 }}>tersisa</div>
                            <div style={{ fontFamily: "'Nunito',sans-serif", fontSize: 14, fontWeight: 700, color: "#f9a8d4" }}>
                                {timeLeft ? `${timeLeft.d}h ${pad(timeLeft.h)}j` : "—"}
                            </div>
                        </div>
                    </div>

                    {/* COUNTDOWN DIGITS */}
                    <div style={{ display: "flex", gap: 10, marginBottom: 28, animation: "cdIn .8s .65s ease both" }}>
                        {[
                            { label: "Hari", val: timeLeft?.d ?? 0 },
                            { label: "Jam", val: timeLeft?.h ?? 0 },
                            { label: "Menit", val: timeLeft?.m ?? 0 },
                            { label: "Detik", val: timeLeft?.s ?? 0 },
                        ].map((u, i) => (
                            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                                <div style={{
                                    width: 58, height: 62,
                                    background: "rgba(249,168,212,.07)",
                                    border: "1px solid rgba(249,168,212,.2)",
                                    borderRadius: 14,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontFamily: "'Nunito',sans-serif", fontWeight: 700, fontSize: 26,
                                    color: "#f9a8d4",
                                    boxShadow: "inset 0 0 20px rgba(249,168,212,.05)",
                                    position: "relative", overflow: "hidden",
                                }}>
                                    {/* shimmer line */}
                                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "rgba(249,168,212,.15)" }} />
                                    <span key={`${u.label}-${u.val}`} style={{ animation: "digitFlip .25s ease both" }}>
                                        {pad(u.val)}
                                    </span>
                                </div>
                                <div style={{ fontFamily: "'Nunito',sans-serif", fontSize: 9, letterSpacing: 2, color: "rgba(249,168,212,.4)", textTransform: "uppercase", fontWeight: 600 }}>
                                    {u.label}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* message */}
                    <div style={{ textAlign: "center", maxWidth: 280, animation: "cdIn .8s .8s ease both" }}>
                        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontStyle: "italic", color: "#fda4af", marginBottom: 10 }}>
                            Sabar ya, bestie! 🌸
                        </div>
                        <div style={{ fontFamily: "'Nunito',sans-serif", fontSize: 13, color: "rgba(249,168,212,.45)", lineHeight: 1.7, fontWeight: 400 }}>
                            Ada sesuatu spesial yang menunggumu saat 1 Syawal tiba. Jangan dibuka dulu ya! 🔒
                        </div>
                    </div>

                    {/* tap hint */}
                    <div style={{ marginTop: 24, fontFamily: "'Nunito',sans-serif", fontSize: 11, color: "rgba(249,168,212,.22)", letterSpacing: 2, animation: "cdIn .8s 1s ease both" }}>
                        coba ketuk kalau penasaran 👀
                    </div>

                    {/* locked message on shake */}
                    {shaking && (
                        <div style={{ position: "absolute", bottom: 80, left: "50%", transform: "translateX(-50%)", whiteSpace: "nowrap", fontFamily: "'Nunito',sans-serif", fontSize: 13, color: "#fda4af", background: "rgba(249,168,212,.12)", border: "1px solid rgba(249,168,212,.25)", borderRadius: 20, padding: "8px 20px", fontWeight: 600 }}>
                            Belum boleh dibuka! 🔒✨
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default CountdownScreen