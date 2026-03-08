const rand = (a, b) => Math.random() * (b - a) + a;

const Petals = () => {
    const items = Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: `${rand(0, 100)}%`,
        animDur: `${rand(8, 18)}s`,
        animDelay: `${rand(0, 10)}s`,
        size: rand(6, 14),
        opacity: rand(0.15, 0.45),
        rotate: rand(0, 360),
    }));

    return (
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1, overflow: "hidden" }}>
            <style>{`
            @keyframes petalFall {
              0%   { transform: translateY(-40px) rotate(0deg) translateX(0px); opacity: 0; }
              10%  { opacity: 1; }
              90%  { opacity: 0.8; }
              100% { transform: translateY(110vh) rotate(720deg) translateX(60px); opacity: 0; }
            }
          `}</style>
            {items.map((p) => (
                <div
                    key={p.id}
                    style={{
                        position: "absolute",
                        left: p.left,
                        top: 0,
                        width: p.size,
                        height: p.size,
                        background: "radial-gradient(circle at 40% 40%, #f5e0a0, #c8a055)",
                        borderRadius: "50% 0 50% 50%",
                        transform: `rotate(${p.rotate}deg)`,
                        opacity: p.opacity,
                        animation: `petalFall ${p.animDur} ${p.animDelay} linear infinite`,
                    }}
                />
            ))}
        </div>
    );
}

export default Petals