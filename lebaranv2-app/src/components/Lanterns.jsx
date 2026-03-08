

const Lanterns = () => {

    const count = Math.max(7, Math.floor(window.innerWidth / 90));
    const colors = [
        ["#E8C97A", "#C9A84C"], ["#e07070", "#c03030"], ["#7aaae0", "#3060c0"],
        ["#a0e090", "#509060"], ["#e0a070", "#c06030"],
    ];

    return (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 10, pointerEvents: "none", display: "flex", justifyContent: "space-around" }}>
            <style>{`
            @keyframes sway { 0%,100%{transform:rotate(-9deg)} 50%{transform:rotate(9deg)} }
            @keyframes glow { 0%,100%{box-shadow:0 0 12px 4px rgba(200,160,50,.5)} 50%{box-shadow:0 0 22px 8px rgba(200,160,50,.8)} }
          `}</style>
            {Array.from({ length: count }, (_, i) => {
                const c = colors[i % colors.length];
                const strH = 25 + (i % 3) * 15;
                const animDelay = `${(i * 0.4) % 3}s`;
                return (
                    <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <div style={{ width: 1, height: strH, background: `linear-gradient(to bottom, ${c[0]}, transparent)` }} />
                        <div style={{
                            width: 16, height: 26,
                            background: `radial-gradient(ellipse at 50% 30%, ${c[0]}, ${c[1]})`,
                            borderRadius: "3px 3px 6px 6px",
                            animation: `sway ${2.5 + (i % 3) * 0.5}s ${animDelay} ease-in-out infinite alternate, glow 2s ${animDelay} ease-in-out infinite`,
                            transformOrigin: "top center",
                        }} />
                    </div>
                );
            })}
        </div>
    );
}

export default Lanterns