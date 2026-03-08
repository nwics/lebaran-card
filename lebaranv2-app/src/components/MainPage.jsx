import { useState } from "react"
import Moon from "../utils/Moon"
import Reveal from "../utils/Reveal"
import GoldBar from "../utils/Goldbar"

const MainPage = (visible) => {

    const [miniFirework, setMiniFirework] = useState(false)
    const handleMiniFirework = () => {
        setMiniFirework(true)
        setTimeout(() => setMiniFirework(false), 100)
    }

    return (
        <div style={{ opacity: visible ? 1 : 0, transition: "opacity 1s ease", pointerEvents: visible ? "auto" : "none", minHeight: "100vh", position: "relative" }}>
            <style>{`
          @keyframes titleIn { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:none} }
          @keyframes subtitleIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }
          @keyframes heartbeat { 0%,100%{transform:scale(1)} 14%{transform:scale(1.2)} 28%{transform:scale(1)} 42%{transform:scale(1.15)} }
          @keyframes scrollDrop { 0%{transform:scaleY(0);transform-origin:top} 50%{transform:scaleY(1);transform-origin:top} 51%{transform:scaleY(1);transform-origin:bottom} 100%{transform:scaleY(0);transform-origin:bottom} }
          @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
          .shimmer-text { background: linear-gradient(90deg, #C8A96E 0%, #F5EDD6 40%, #C8A96E 60%, #E8D5A3 100%); background-size:200% auto; -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; animation:shimmer 4s linear infinite; }
        `}</style>

            {/* HERO */}
            <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 28px 60px", textAlign: "center", position: "relative" }}>
                {visible && <Moon />}

                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, letterSpacing: 5, color: "#C8A96E", textTransform: "uppercase", marginBottom: 24, animation: visible ? "titleIn .8s .1s ease both" : "none" }}>
                    Idul Fitri · 1 Syawal 1447 H
                </div>

                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(28px,8vw,46px)", color: "#E8D5A3", lineHeight: 1.5, marginBottom: 20, animation: visible ? "titleIn .8s .3s ease both" : "none" }}>
                    تَقَبَّلَ اللَّهُ مِنَّا وَمِنْكُمْ
                </div>

                <div style={{ width: 1, height: 60, background: "linear-gradient(to bottom,transparent,#C8A96E,transparent)", margin: "0 auto 20px", animation: visible ? "titleIn .8s .5s ease both" : "none" }} />

                <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(40px,12vw,76px)", fontWeight: 300, lineHeight: 1.1, animation: visible ? "titleIn .8s .6s ease both" : "none" }}>
                    Selamat Hari Raya<br />
                    <em className="shimmer-text" style={{ fontStyle: "italic" }}>Idul Fitri</em>
                </h1>

                <div style={{ marginTop: 20, fontFamily: "'DM Sans',sans-serif", fontSize: 13, letterSpacing: 2, color: "rgba(253,251,247,.45)", animation: visible ? "subtitleIn .8s 1s ease both" : "none" }}>
                    Mohon Maaf Lahir &amp; Batin
                </div>

                <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, fontFamily: "'DM Sans',sans-serif", fontSize: 10, letterSpacing: 3, color: "rgba(253,251,247,.3)", animation: visible ? "subtitleIn .8s 1.4s ease both" : "none" }}>
                    <span>Scroll</span>
                    <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom,#C8A96E,transparent)", animation: "scrollDrop 1.5s ease infinite" }} />
                </div>
            </section>

            {/* GOLD RULE */}
            <div style={{ height: 1, background: "rgba(200,169,110,.15)", maxWidth: 520, margin: "0 auto" }} />

            {/* PERSONAL NOTE */}
            <section style={{ maxWidth: 520, margin: "0 auto", padding: "80px 28px" }}>
                <Reveal>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, letterSpacing: 4, color: "#C8A96E", textTransform: "uppercase", marginBottom: 20 }}>Khusus untukmu</div>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(28px,8vw,40px)", fontStyle: "italic", color: "#F5EDD6", marginBottom: 28, lineHeight: 1.2 }}>
                        Sayangku,
                    </div>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, lineHeight: 1.95, color: "rgba(253,251,247,.75)" }}>
                        <p>Di hari yang fitri ini, aku ingin kamu tahu bahwa kamu adalah salah satu hal terbaik yang hadir dalam hidupku.</p>
                    </div>
                </Reveal>

                <Reveal delay={0.2}>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, lineHeight: 1.95, color: "rgba(253,251,247,.75)", marginTop: 16 }}>
                        <p>Setiap momen bersamamu terasa lebih berharga — dan di hari yang penuh berkah ini, aku bersyukur bisa merayakannya denganmu.</p>
                    </div>
                </Reveal>

                <Reveal delay={0.3}>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, lineHeight: 1.95, color: "rgba(253,251,247,.75)", marginTop: 16 }}>
                        <p>Semoga Allah SWT menerima seluruh amal ibadah kita, mengampuni segala khilaf kita, dan mempertemukan kita kembali di Lebaran-Lebaran berikutnya dengan kebahagiaan yang lebih. 🤍</p>
                    </div>
                </Reveal>

                {/* <SecretMessage onReveal={handleSecretReveal} /> */}
            </section>

            {/* GOLD RULE */}
            <div style={{ height: 1, background: "rgba(200,169,110,.15)", maxWidth: 520, margin: "0 auto" }} />

            {/* STATS / FUN BARS */}
            <section style={{ maxWidth: 520, margin: "0 auto", padding: "80px 28px" }}>
                <Reveal>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, letterSpacing: 4, color: "#C8A96E", textTransform: "uppercase", marginBottom: 32 }}>Seberapa spesial kamu bagiku</div>
                </Reveal>
                <GoldBar label="Ketulusan hati" value={100} delay={0.1} />
                <GoldBar label="Rasa syukur karena kamu" value={99} delay={0.25} />
                <GoldBar label="Kerinduan untukmu" value={97} delay={0.4} />
                <GoldBar label="Doa terbaik untukmu" value={100} delay={0.55} />
            </section>

            {/* GOLD RULE */}
            <div style={{ height: 1, background: "rgba(200,169,110,.15)", maxWidth: 520, margin: "0 auto" }} />

            {/* QUOTE */}
            <section style={{ maxWidth: 520, margin: "0 auto", padding: "80px 28px" }}>
                <Reveal direction="left">
                    <blockquote style={{ borderLeft: "1px solid #C8A96E", paddingLeft: 28, margin: 0 }}>
                        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(18px,5vw,26px)", color: "#E8D5A3", lineHeight: 1.7, marginBottom: 12, direction: "rtl" }}>
                            إِنَّ مَعَ الْعُسْرِ يُسْرًا
                        </div>
                        <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "rgba(253,251,247,.45)", fontStyle: "italic", lineHeight: 1.7 }}>
                            "Sesungguhnya bersama kesulitan ada kemudahan." — QS. Al-Insyirah: 6
                        </div>
                    </blockquote>
                </Reveal>
            </section>

            {/* GOLD RULE */}
            <div style={{ height: 1, background: "rgba(200,169,110,.15)", maxWidth: 520, margin: "0 auto" }} />

            {/* INTERACTIVE HEART ZONE */}
            <section style={{ maxWidth: 520, margin: "0 auto", padding: "80px 28px" }}>
                <Reveal>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, letterSpacing: 4, color: "#C8A96E", textTransform: "uppercase", marginBottom: 16, textAlign: "center" }}>
                        Sebuah sentuhan untuk kamu
                    </div>
                    <div style={{ position: "relative", border: "1px solid rgba(200,169,110,.2)", borderRadius: 12, padding: "50px 20px", textAlign: "center", overflow: "hidden", background: "rgba(255,253,247,.03)", cursor: "pointer" }}>
                        {/* <HeartBurst /> */}
                        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(36px,10vw,56px)", fontStyle: "italic", color: "#F5EDD6", pointerEvents: "none", userSelect: "none" }}>♡</div>
                        <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, letterSpacing: 2, color: "rgba(253,251,247,.35)", marginTop: 12, pointerEvents: "none" }}>Ketuk di sini</div>
                    </div>
                </Reveal>
            </section>

            {/* SIGN OFF */}
            <section style={{ padding: "80px 28px 120px", textAlign: "center" }}>
                <Reveal>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, letterSpacing: 4, color: "rgba(253,251,247,.35)", textTransform: "uppercase", marginBottom: 16 }}>Dengan cinta tulus, dari</div>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(28px,8vw,42px)", fontStyle: "italic", color: "#FDFBF7" }}>
                        — namamu —
                    </div>
                    <div style={{ fontSize: 22, color: "#C8A96E", marginTop: 20, animation: "heartbeat 2.5s ease infinite" }}>♡</div>
                    {/* <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, letterSpacing: 3, color: "rgba(253,251,247,.18)", marginTop: 36 }}>
                        RAMADAN 1446 H · 2025
                    </div> */}
                </Reveal>
            </section>

            {miniFirework && <FireworksCanvas active={true} />}

        </div>
    )
}


export default MainPage