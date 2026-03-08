import { useEffect, useRef, useState } from "react";

const UseReveal = (delay = 0) => {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) {
                setTimeout(() => setVisible(true), delay);
            }
        }, { threshold: 0.15 });
        obs.observe(el);
        return () => obs.disconnect();
    }, [delay]);
    return { ref, visible };
}

export default UseReveal