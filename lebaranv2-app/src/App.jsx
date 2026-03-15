import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import StarField from './components/StarField';
import Petals from './components/Petals';
import Lanterns from './components/Lanterns';
import FireworksCanvas from './components/Firework';
import EnvelopeScreen from './components/EnvelopeScreen';
import MainPage from './components/MainPage';
import CountdownScreen from './components/CountDownScreen';

const FontLink = () => {
  useEffect(() => {
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href =
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap";
    document.head.appendChild(l);
  }, []);
  return null;
};

const TARGET_DATE = new Date(2026, 2, 21, 6, 0, 0);

const getTimeLeft = (target) => {
  const diff = target - Date.now();
  if (diff <= 0) return null;
  const total = diff;
  const d = Math.floor(total / (1000 * 60 * 60 * 24));
  const h = Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((total % (1000 * 60)) / 1000);
  return { d, h, m, s, total };
}

function App() {

  // const [count, setCount] = useState(0)

  const [phase, setPhase] = useState("countdown");
  // const [opened, setOpened] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(TARGET_DATE));

  const handleOpen = () => {
    setOpened(true);
    setShowFireworks(true);
    setTimeout(() => setShowFireworks(false), 3500);
  };


  useEffect(() => {
    const iv = setInterval(() => {
      const t = getTimeLeft(TARGET_DATE);
      setTimeLeft(t);
      if (!t && phase === "countdown") {
        /* auto-transition to envelope after unlock anim */
        setTimeout(() => setPhase("envelope"), 2800);
        clearInterval(iv);
      }
    }, 1000);
    return () => clearInterval(iv);
  }, [phase]);

  useEffect(() => {
    if (!timeLeft && phase === "countdown") {
      setTimeout(() => setPhase("envelope"), 100);
    }
  }, []);

  const handleEnvelopeOpen = () => {
    setPhase("main");
    setShowFireworks(true);
    setTimeout(() => setShowFireworks(false), 3500);
  };


  return (
    <>
      {/* <div>hello world</div> */}
      <div style={{ background: "radial-gradient(ellipse at 50% 60%,#12122a 0%,#080810 100%)", minHeight: "100vh", position: "relative" }}>
        <FontLink />
        <StarField />
        <Petals />
        <Lanterns />
        <FireworksCanvas active={showFireworks} />

        {phase === "countdown" && (
          <CountdownScreen timeLeft={timeLeft} onUnlock={() => setPhase("envelope")} />
        )}
        {/* <EnvelopeScreen onOpen={handleOpen} /> */}
        {phase === "envelope" && (
          <EnvelopeScreen onOpen={handleEnvelopeOpen} />
        )}
        <MainPage visible={phase === "main"} onRestart={() => setPhase("envelope")} />
      </div>
    </>
  )
}

export default App
