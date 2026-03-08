import UseReveal from "./UseReveal";

const Reveal = ({ children, delay = 0, direction = "up" }) => {
    const { ref, visible } = UseReveal();
    const transforms = { up: "translateY(32px)", down: "translateY(-32px)", left: "translateX(-32px)", right: "translateX(32px)" };
    return (
        <div ref={ref} style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : transforms[direction],
            transition: `opacity .9s ${delay}s ease, transform .9s ${delay}s ease`,
        }}>
            {children}
        </div>
    );
}

export default Reveal