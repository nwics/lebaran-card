import { useEffect } from "react";

const TypingText = (text, delay = 0, style) => {
    const [shown, setShown] = useState("");
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setStarted(true), delay);
        return () => clearTimeout(t);
    }, [delay]);

    useEffect(() => {
        if (!started) return;
        let i = 0;
        const iv = setInterval(() => {
            setShown(text.slice(0, ++i));
            if (i >= text.length) clearInterval(iv);
        }, 45);
        return () => clearInterval(iv);
    }, [started, text]);

    return <span style={style}>{shown}<span style={{ opacity: shown.length < text.length ? 1 : 0, borderRight: "2px solid #C8A96E" }}>&nbsp;</span></span>;
}