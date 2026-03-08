

const Moon = () => {
    return (
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
            <style>{`
            @keyframes moonFloat { 0%,100%{transform:translateY(0) rotate(-5deg)} 50%{transform:translateY(-16px) rotate(5deg)} }
            @keyframes moonGlow  { 0%,100%{box-shadow:0 0 40px 12px rgba(200,169,110,.4),0 0 80px 30px rgba(200,169,110,.15)} 50%{box-shadow:0 0 60px 20px rgba(200,169,110,.6),0 0 120px 50px rgba(200,169,110,.25)} }
          `}</style>
            <div style={{
                width: 120, height: 120, borderRadius: "50%",
                background: "radial-gradient(circle at 38% 35%, #FFF8C0, #E8C97A 55%, #C8A84C 100%)",
                animation: "moonFloat 5s ease-in-out infinite, moonGlow 3s ease-in-out infinite",
                position: "relative",
            }}>
                {[[22, 50, 14], [55, 30, 10], [75, 65, 12]].map(([t, l, s], i) => (
                    <div key={i} style={{ position: "absolute", top: t, left: l, width: s, height: s, borderRadius: "50%", background: "rgba(160,120,20,.25)" }} />
                ))}
            </div>
        </div>
    );
}

export default Moon