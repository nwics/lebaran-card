import UseReveal from "./UseReveal";


const GoldBar = ({ label, value, delay }) => {
    const { ref, visible } = UseReveal();
    return (
        <div ref={ref} style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontFamily: "'DM Sans',sans-serif", fontSize: 12, letterSpacing: 2, color: "rgba(253,251,247,.55)" }}>
                <span>{label}</span><span style={{ color: "#C8A96E" }}>{value}%</span>
            </div>
            <div style={{ height: 1, background: "rgba(200,169,110,.15)", borderRadius: 1, overflow: "hidden" }}>
                <div style={{ height: "100%", width: visible ? `${value}%` : "0%", background: "linear-gradient(90deg,#C8A96E,#F5EDD6)", transition: `width 1.6s ${delay}s cubic-bezier(.4,0,.2,1)` }} />
            </div>
        </div>
    );
}

export default GoldBar