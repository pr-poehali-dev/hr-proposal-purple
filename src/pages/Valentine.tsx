import { useState, useEffect, useRef, useCallback } from "react";

const DENIS_PHOTO = "https://cdn.poehali.dev/projects/6a20b3ba-2ddc-4572-8d85-e4c62f8d7e40/bucket/3c190eea-e041-4841-b769-284b6570939f.jpg";
const AURORA_PHOTO = "https://cdn.poehali.dev/projects/6a20b3ba-2ddc-4572-8d85-e4c62f8d7e40/bucket/e37526b1-7ed7-47b2-8364-3a18f8abaafc.jpg";
const AKSINIA_1 = "https://cdn.poehali.dev/projects/6a20b3ba-2ddc-4572-8d85-e4c62f8d7e40/bucket/957e3bcf-bb03-4864-a25c-187913323315.jpg";
const AKSINIA_2 = "https://cdn.poehali.dev/projects/6a20b3ba-2ddc-4572-8d85-e4c62f8d7e40/bucket/5761686f-bee5-486b-9109-ce2b92303d08.jpg";
const AKSINIA_3 = "https://cdn.poehali.dev/projects/6a20b3ba-2ddc-4572-8d85-e4c62f8d7e40/bucket/ab451697-26a3-405a-8284-e87ff32d7769.jpg";
const AKSINIA_4 = "https://cdn.poehali.dev/projects/6a20b3ba-2ddc-4572-8d85-e4c62f8d7e40/bucket/69f33c5b-411c-4fd4-892e-5043eb51840d.jpg";
const AKSINIA_5 = "https://cdn.poehali.dev/projects/6a20b3ba-2ddc-4572-8d85-e4c62f8d7e40/bucket/7397ac7b-e549-4932-bd8e-740b8767abf8.jpg";
const AKSINIA_6 = "https://cdn.poehali.dev/projects/6a20b3ba-2ddc-4572-8d85-e4c62f8d7e40/bucket/f35478dd-51b8-489a-8aa8-2d28bc014ff5.jpg";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  hue: number;
  brightness: number;
  pulseSpeed: number;
  pulsePhase: number;
}

const createGoosebumpMelody = (ctx: AudioContext) => {
  const master = ctx.createGain();
  master.gain.value = 0.12;
  master.connect(ctx.destination);

  const convolver = ctx.createConvolver();
  const rate = ctx.sampleRate;
  const len = rate * 4;
  const buf = ctx.createBuffer(2, len, rate);
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    for (let i = 0; i < len; i++) {
      d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2);
    }
  }
  convolver.buffer = buf;
  const wetGain = ctx.createGain();
  wetGain.gain.value = 0.5;
  convolver.connect(wetGain);
  wetGain.connect(master);
  const dryGain = ctx.createGain();
  dryGain.gain.value = 0.6;
  dryGain.connect(master);

  const pad = (freq: number, start: number, dur: number, vol: number = 0.06) => {
    const o1 = ctx.createOscillator();
    const o2 = ctx.createOscillator();
    const o3 = ctx.createOscillator();
    const g = ctx.createGain();
    o1.type = "sine"; o1.frequency.value = freq;
    o2.type = "sine"; o2.frequency.value = freq * 1.002;
    o3.type = "sine"; o3.frequency.value = freq * 0.998;
    const g1 = ctx.createGain(); g1.gain.value = 0.5;
    const g2 = ctx.createGain(); g2.gain.value = 0.3;
    const g3 = ctx.createGain(); g3.gain.value = 0.2;
    o1.connect(g1); o2.connect(g2); o3.connect(g3);
    g1.connect(g); g2.connect(g); g3.connect(g);
    g.gain.setValueAtTime(0, start);
    g.gain.linearRampToValueAtTime(vol, start + dur * 0.3);
    g.gain.setValueAtTime(vol, start + dur * 0.7);
    g.gain.linearRampToValueAtTime(0.001, start + dur);
    g.connect(dryGain); g.connect(convolver);
    o1.start(start); o1.stop(start + dur);
    o2.start(start); o2.stop(start + dur);
    o3.start(start); o3.stop(start + dur);
  };

  const note = (freq: number, start: number, dur: number, vol: number = 0.2) => {
    const o = ctx.createOscillator();
    const o2 = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine"; o.frequency.value = freq;
    o2.type = "triangle"; o2.frequency.value = freq * 1.001;
    const g1 = ctx.createGain(); g1.gain.value = 0.7;
    const g2 = ctx.createGain(); g2.gain.value = 0.3;
    o.connect(g1); o2.connect(g2);
    g1.connect(g); g2.connect(g);
    g.gain.setValueAtTime(0, start);
    g.gain.linearRampToValueAtTime(vol, start + 0.08);
    g.gain.exponentialRampToValueAtTime(vol * 0.4, start + dur * 0.6);
    g.gain.exponentialRampToValueAtTime(0.001, start + dur);
    g.connect(dryGain); g.connect(convolver);
    o.start(start); o.stop(start + dur);
    o2.start(start); o2.stop(start + dur);
  };

  const t = ctx.currentTime + 0.2;
  const b = 60 / 58;

  const Am = [220, 261.63, 329.63];
  const F = [174.61, 261.63, 349.23];
  const C = [130.81, 196, 261.63];
  const G = [196, 246.94, 392];
  const Dm = [146.83, 220, 293.66];
  const Em = [164.81, 246.94, 329.63];

  const chordSeq: [number[], number, number][] = [
    [Am, 0, 8], [F, 8, 8], [C, 16, 8], [G, 24, 8],
    [Am, 32, 8], [Dm, 40, 8], [F, 48, 4], [Em, 52, 4], [Am, 56, 8],
    [F, 64, 8], [C, 72, 8], [G, 80, 4], [Am, 84, 4],
    [Dm, 88, 8], [Am, 96, 8], [F, 104, 4], [G, 108, 4], [Am, 112, 8],
  ];

  chordSeq.forEach(([ch, start, dur]) => {
    ch.forEach(f => pad(f, t + start * b, dur * b, 0.04));
    ch.forEach(f => pad(f * 2, t + start * b, dur * b, 0.015));
  });

  const A4 = 440, B4 = 493.88, C5 = 523.25, D5 = 587.33, E5 = 659.25;
  const G4 = 392, F4 = 349.23, E4 = 329.63, D4 = 293.66, C4 = 261.63, A3 = 220;

  const mel: [number, number, number, number?][] = [
    [E4, 2, 3], [D4, 5, 1], [C4, 6, 2],
    [E4, 10, 2], [G4, 12, 2], [A4, 14, 2],
    [G4, 18, 3], [E4, 21, 1], [D4, 22, 2],
    [C4, 26, 2], [D4, 28, 2], [E4, 30, 2],

    [A4, 34, 3], [G4, 37, 1], [E4, 38, 2],
    [D4, 42, 2], [E4, 44, 2], [G4, 46, 2],
    [A4, 50, 2], [C5, 52, 3], [B4, 55, 1],
    [A4, 56, 4],

    [E5, 66, 3], [D5, 69, 1], [C5, 70, 2],
    [B4, 74, 2], [A4, 76, 2], [G4, 78, 2],
    [A4, 82, 3], [G4, 85, 1], [E4, 86, 2],
    [D4, 90, 2], [C4, 92, 2], [E4, 94, 2],

    [A4, 98, 3], [C5, 101, 1], [B4, 102, 2],
    [A4, 106, 2], [G4, 108, 2], [A4, 110, 2],
    [E4, 114, 4], [A3, 118, 4],
  ];

  mel.forEach(([freq, beatStart, dur]) => {
    note(freq, t + beatStart * b, dur * b, 0.18);
  });

  const arp: [number, number, number][] = [];
  chordSeq.forEach(([ch, start, dur]) => {
    const extended = [...ch, ch[0] * 2, ch[1] * 2];
    const step = dur / extended.length;
    extended.forEach((f, i) => {
      arp.push([f, start + i * step, step * 1.5]);
    });
  });
  arp.forEach(([freq, beatStart, dur]) => {
    note(freq * 2, t + beatStart * b, dur * b, 0.04);
  });

  return 122 * b;
};

const SECTIONS = [
  {
    type: "photo" as const,
    image: AKSINIA_1,
    title: "Аксинья",
    text: "Есть люди, рядом с которыми мир замирает. Ты — одна из них. Одного взгляда было достаточно, чтобы я понял: такие, как ты, встречаются раз в жизни.",
  },
  {
    type: "aurora" as const,
    image: AURORA_PHOTO,
    title: "Как северное сияние",
    text: "Ты — как полярное сияние над Мурманском. Невозможно предугадать, невозможно забыть, невозможно отвести взгляд. Ты появляешься — и всё вокруг наполняется светом.",
  },
  {
    type: "photo" as const,
    image: AKSINIA_2,
    title: "Твоя нежность",
    text: "Когда ты закрываешь глаза — мир вокруг замирает, будто боится потревожить. В каждой черте твоего лица — спокойствие, от которого сердце начинает биться чаще.",
  },
  {
    type: "plankton" as const,
    image: "",
    title: "Ты светишься",
    text: "Знаешь, в океане есть планктон, который светится в темноте. Он превращает обычную воду в звёздное небо. Вот и ты — превращаешь обычные дни в нечто волшебное. Каждое мгновение рядом с тобой наполнено светом.",
  },
  {
    type: "photo" as const,
    image: AKSINIA_4,
    title: "Та самая улыбка",
    text: "В тебе столько тепла, сколько нет во всех южных морях. Эта улыбка способна растопить самую долгую полярную ночь. Я не умею говорить красиво — но одно я знаю точно: с тех пор, как я тебя встретил, мне не нужно искать больше никого.",
  },
  {
    type: "photo" as const,
    image: AKSINIA_5,
    title: "Глаза, в которых тону",
    text: "Ты смотришь — и я забываю, о чём хотел сказать. Забываю, где нахожусь. Забываю обо всём. Потому что в этих глазах — целая вселенная, и я хочу заблудиться в ней навсегда.",
  },
  {
    type: "photo" as const,
    image: AKSINIA_6,
    title: "Моя слабость",
    text: "Я могу быть сильным. Могу не спать сутками, могу сдвинуть горы. Но стоит тебе вот так посмотреть — и я сдаюсь. Без боя, без слов. Просто сдаюсь. И мне нравится проигрывать именно тебе.",
  },
];

const Valentine = () => {
  const [started, setStarted] = useState(false);
  const [currentSection, setCurrentSection] = useState(-1);
  const [fadeIn, setFadeIn] = useState(false);
  const [clickSparks, setClickSparks] = useState<{id: number; x: number; y: number}[]>([]);
  const [showFinal, setShowFinal] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const melodyTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartRef = useRef<number | null>(null);

  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    for (let i = 0; i < 200; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        life: Math.random() * 200,
        maxLife: 200 + Math.random() * 300,
        hue: 170 + Math.random() * 60,
        brightness: Math.random(),
        pulseSpeed: 0.02 + Math.random() * 0.03,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }
    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    if (!started || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx2d = canvas.getContext("2d");
    if (!ctx2d) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (particlesRef.current.length === 0) {
        initParticles(canvas.width, canvas.height);
      }
    };
    resize();
    window.addEventListener("resize", resize);

    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;
    const onMove = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY; };
    const onTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
      }
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouch);

    let time = 0;
    const draw = () => {
      time += 1;
      ctx2d.fillStyle = "rgba(5, 5, 25, 0.15)";
      ctx2d.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach(p => {
        p.life += 1;
        if (p.life > p.maxLife) {
          p.x = Math.random() * canvas.width;
          p.y = Math.random() * canvas.height;
          p.life = 0;
          p.maxLife = 200 + Math.random() * 300;
        }

        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          const force = (180 - dist) / 180;
          p.brightness = Math.min(1, p.brightness + force * 0.1);
          p.vx += (dx / dist) * force * 0.03;
          p.vy += (dy / dist) * force * 0.03;
        } else {
          p.brightness *= 0.995;
        }

        p.vx *= 0.99;
        p.vy *= 0.99;
        p.vx += (Math.random() - 0.5) * 0.05;
        p.vy += (Math.random() - 0.5) * 0.05;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const pulse = Math.sin(time * p.pulseSpeed + p.pulsePhase) * 0.5 + 0.5;
        const alpha = (0.2 + p.brightness * 0.8) * (0.5 + pulse * 0.5);
        const lifeRatio = p.life < 30 ? p.life / 30 : p.life > p.maxLife - 30 ? (p.maxLife - p.life) / 30 : 1;
        const finalAlpha = alpha * lifeRatio;
        const glowSize = p.size * (1 + p.brightness * 3);

        const grad = ctx2d.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowSize * 3);
        grad.addColorStop(0, `hsla(${p.hue}, 100%, 75%, ${finalAlpha})`);
        grad.addColorStop(0.3, `hsla(${p.hue}, 100%, 55%, ${finalAlpha * 0.5})`);
        grad.addColorStop(1, `hsla(${p.hue}, 100%, 40%, 0)`);

        ctx2d.beginPath();
        ctx2d.arc(p.x, p.y, glowSize * 3, 0, Math.PI * 2);
        ctx2d.fillStyle = grad;
        ctx2d.fill();

        ctx2d.beginPath();
        ctx2d.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
        ctx2d.fillStyle = `hsla(${p.hue}, 100%, 90%, ${finalAlpha})`;
        ctx2d.fill();
      });

      animFrameRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
    };
  }, [started, initParticles]);

  const startExperience = () => {
    setStarted(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    const actx = new AudioCtx();
    audioCtxRef.current = actx;
    const dur = createGoosebumpMelody(actx);
    melodyTimerRef.current = setInterval(() => {
      if (audioCtxRef.current) createGoosebumpMelody(audioCtxRef.current);
    }, dur * 1000 + 200);

    setTimeout(() => {
      setCurrentSection(0);
      setTimeout(() => setFadeIn(true), 100);
    }, 600);
  };

  const goNext = () => {
    if (currentSection >= SECTIONS.length - 1) {
      setFadeIn(false);
      setTimeout(() => setShowFinal(true), 600);
      return;
    }
    setFadeIn(false);
    setTimeout(() => {
      setCurrentSection(prev => prev + 1);
      setTimeout(() => setFadeIn(true), 100);
    }, 600);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!started) return;
    const id = Date.now() + Math.random();
    setClickSparks(prev => [...prev, { id, x: e.clientX, y: e.clientY }]);
    setTimeout(() => setClickSparks(prev => prev.filter(s => s.id !== id)), 1500);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartRef.current === null) return;
    const diff = touchStartRef.current - e.changedTouches[0].clientY;
    if (diff > 50 && started && !showFinal && currentSection >= 0) {
      goNext();
    }
    touchStartRef.current = null;
  };

  useEffect(() => {
    return () => {
      if (melodyTimerRef.current) clearInterval(melodyTimerRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  if (!started) {
    return (
      <div
        className="min-h-screen flex items-center justify-center overflow-hidden relative cursor-pointer"
        style={{ background: "linear-gradient(135deg, #050519 0%, #0a0a30 40%, #0f0525 100%)" }}
        onClick={startExperience}
      >
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 70 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 3 + 1,
                height: Math.random() * 3 + 1,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `hsl(${180 + Math.random() * 40}, 100%, ${60 + Math.random() * 30}%)`,
                animation: `starTwinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        <div className="text-center z-10 px-6">
          <div className="relative inline-block mb-10">
            <div className="w-36 h-36 mx-auto relative">
              <div
                className="absolute inset-0 rounded-full animate-pulse"
                style={{
                  background: "radial-gradient(circle, rgba(255,80,120,0.25) 0%, transparent 70%)",
                  filter: "blur(25px)",
                }}
              />
              <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl" style={{ filter: "drop-shadow(0 0 20px rgba(255,80,120,0.4))" }}>
                <defs>
                  <linearGradient id="hg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ff6b8a" />
                    <stop offset="50%" stopColor="#ff4571" />
                    <stop offset="100%" stopColor="#c93060" />
                  </linearGradient>
                </defs>
                <path
                  d="M50 88 C25 65, 2 45, 2 28 C2 14, 15 2, 30 2 C38 2, 45 7, 50 18 C55 7, 62 2, 70 2 C85 2, 98 14, 98 28 C98 45, 75 65, 50 88Z"
                  fill="url(#hg)"
                  style={{ animation: "heartPulse 1.5s ease-in-out infinite" }}
                />
              </svg>
            </div>
          </div>

          <h1
            className="text-4xl md:text-6xl font-bold mb-4"
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              background: "linear-gradient(135deg, #ffd4e0, #ff8aab, #ffd4e0)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundSize: "200% 200%",
              animation: "shimmer 3s ease-in-out infinite",
            }}
          >
            Для тебя, Аксинья
          </h1>

          <p className="text-pink-300/60 text-base md:text-lg mb-10" style={{ fontFamily: "Georgia, serif" }}>
            14 февраля
          </p>

          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-pink-400/30 bg-pink-400/5 backdrop-blur-sm animate-pulse">
            <span className="text-pink-300/80 text-sm tracking-wider">Нажми, чтобы открыть</span>
            <span className="text-pink-400">♥</span>
          </div>
        </div>

        <style>{`
          @keyframes starTwinkle {
            0%, 100% { opacity: 0.2; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1.2); }
          }
          @keyframes heartPulse {
            0%, 100% { transform: scale(1); }
            15% { transform: scale(1.12); }
            30% { transform: scale(1); }
            45% { transform: scale(1.08); }
            60% { transform: scale(1); }
          }
          @keyframes shimmer {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
        `}</style>
      </div>
    );
  }

  if (showFinal) {
    return (
      <div
        className="min-h-screen relative overflow-hidden flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, #050519 0%, #0a0a30 40%, #0f0525 100%)" }}
        onClick={handleClick}
      >
        <canvas ref={canvasRef} className="absolute inset-0" style={{ zIndex: 0 }} />

        {clickSparks.map(s => (
          <div key={s.id} className="fixed pointer-events-none" style={{ left: s.x - 15, top: s.y - 15, zIndex: 100, animation: "sparkUp 1.5s ease-out forwards" }}>
            <span className="text-2xl">✨</span>
          </div>
        ))}

        <div className="relative z-10 text-center px-6 max-w-lg mx-auto" style={{ animation: "fadeUp 1.5s ease-out" }}>
          <div
            className="w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden border-2 border-pink-400/40"
            style={{
              boxShadow: "0 0 40px rgba(255,80,120,0.2), 0 0 80px rgba(255,80,120,0.1)",
            }}
          >
            <img src={DENIS_PHOTO} alt="" className="w-full h-full object-cover" />
          </div>

          <p
            className="text-2xl md:text-3xl font-bold mb-6"
            style={{
              fontFamily: "Georgia, serif",
              background: "linear-gradient(135deg, #ffd4e0, #ff8aab)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            С Днём Святого Валентина, Аксинья
          </p>

          <div className="text-pink-200/60 text-base md:text-lg mb-10 leading-loose italic text-left max-w-md mx-auto" style={{ fontFamily: "Georgia, serif" }}>
            <p className="mb-1">Среди снегов, среди полярной тьмы,</p>
            <p className="mb-1">Где тишина звенит в морозном небе,</p>
            <p className="mb-1">Ты стала светом посреди зимы,</p>
            <p className="mb-4">Единственным, во что я верю слепо.</p>
            <p className="mb-1">Мне не нужны слова — достаточно тепла</p>
            <p className="mb-1">Твоих ладоней, шёпота и взгляда.</p>
            <p className="mb-1">Ты рядом — и метель вокруг светла,</p>
            <p className="mb-4">И большего мне в жизни и не надо.</p>
          </div>

          <p
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{
              fontFamily: "Georgia, serif",
              background: "linear-gradient(135deg, #ff8aab, #ffd4e0, #ff8aab)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "shimmer 3s ease-in-out infinite",
            }}
          >
            — Д.
          </p>

          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: 7 }).map((_, i) => (
              <span
                key={i}
                className="text-lg"
                style={{
                  animation: `floatHeart 2s ease-in-out infinite`,
                  animationDelay: `${i * 0.2}s`,
                  opacity: 0.4 + Math.random() * 0.4,
                }}
              >
                ♥
              </span>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes sparkUp { 0% { opacity: 1; transform: scale(0.5); } 100% { opacity: 0; transform: scale(1.5) translateY(-40px); } }
          @keyframes floatHeart { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
          @keyframes shimmer { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        `}</style>
      </div>
    );
  }

  const section = SECTIONS[currentSection];

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #050519 0%, #0a0a30 40%, #0f0525 100%)" }}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <canvas ref={canvasRef} className="absolute inset-0" style={{ zIndex: 0 }} />

      {clickSparks.map(s => (
        <div key={s.id} className="fixed pointer-events-none" style={{ left: s.x - 15, top: s.y - 15, zIndex: 100, animation: "sparkUp 1.5s ease-out forwards" }}>
          <span className="text-2xl">✨</span>
        </div>
      ))}

      {currentSection >= 0 && section && (
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
          <div className={`max-w-lg w-full transition-all duration-700 ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {section.type === "aurora" && (
              <div className="mb-8 rounded-2xl overflow-hidden" style={{ boxShadow: "0 0 60px rgba(0,255,150,0.15)" }}>
                <img src={section.image} alt="" className="w-full h-56 md:h-72 object-cover" />
              </div>
            )}

            {section.type === "photo" && section.image && (
              <div className="mb-8 flex justify-center">
                <div
                  className="w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-2"
                  style={{
                    borderColor: "rgba(255,130,170,0.3)",
                    boxShadow: "0 0 50px rgba(255,80,120,0.15), 0 0 100px rgba(255,80,120,0.08)",
                  }}
                >
                  <img src={section.image} alt="" className="w-full h-full object-cover" />
                </div>
              </div>
            )}

            {section.type === "plankton" && (
              <div className="mb-8 text-center">
                <div className="inline-block relative">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute rounded-full"
                      style={{
                        width: 3 + Math.random() * 5,
                        height: 3 + Math.random() * 5,
                        left: `${Math.random() * 200 - 50}px`,
                        top: `${Math.random() * 100 - 50}px`,
                        background: `hsl(${170 + Math.random() * 50}, 100%, 70%)`,
                        boxShadow: `0 0 ${8 + Math.random() * 12}px hsl(${170 + Math.random() * 50}, 100%, 60%)`,
                        animation: `planktonFloat ${3 + Math.random() * 4}s ease-in-out infinite`,
                        animationDelay: `${Math.random() * 3}s`,
                      }}
                    />
                  ))}
                  <span className="text-7xl md:text-8xl" style={{ filter: "drop-shadow(0 0 30px rgba(0,255,200,0.3))" }}>
                    🌊
                  </span>
                </div>
              </div>
            )}

            <h2
              className="text-2xl md:text-4xl font-bold text-center mb-5"
              style={{
                fontFamily: "Georgia, serif",
                background: section.type === "aurora"
                  ? "linear-gradient(135deg, #80ffdb, #a0f0ff, #80ffdb)"
                  : section.type === "plankton"
                  ? "linear-gradient(135deg, #64ffda, #80e8ff, #64ffda)"
                  : "linear-gradient(135deg, #ffd4e0, #ff8aab, #ffd4e0)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "shimmer 3s ease-in-out infinite",
              }}
            >
              {section.title}
            </h2>

            <p
              className="text-base md:text-lg leading-relaxed text-center mb-10"
              style={{
                fontFamily: "Georgia, serif",
                color: "rgba(220, 200, 230, 0.85)",
                textShadow: "0 0 40px rgba(180,100,255,0.1)",
              }}
            >
              {section.text}
            </p>

            <div className="flex justify-center">
              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="group flex items-center gap-3 px-8 py-3 rounded-full border transition-all duration-300 hover:scale-105"
                style={{
                  borderColor: "rgba(255,130,170,0.3)",
                  background: "rgba(255,80,120,0.08)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <span className="text-pink-300/80 text-sm tracking-wider" style={{ fontFamily: "Georgia, serif" }}>
                  {currentSection < SECTIONS.length - 1 ? "Дальше" : "Финал"}
                </span>
                <span className="text-pink-400 group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {SECTIONS.map((_, idx) => (
              <div
                key={idx}
                className="w-2 h-2 rounded-full transition-all duration-500"
                style={{
                  background: idx === currentSection ? "rgba(255,130,170,0.8)" : "rgba(255,255,255,0.2)",
                  boxShadow: idx === currentSection ? "0 0 8px rgba(255,130,170,0.5)" : "none",
                }}
              />
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes sparkUp {
          0% { opacity: 1; transform: scale(0.5); }
          100% { opacity: 0; transform: scale(1.5) translateY(-40px); }
        }
        @keyframes planktonFloat {
          0%, 100% { opacity: 0.3; transform: translateY(0) scale(0.8); }
          50% { opacity: 1; transform: translateY(-15px) scale(1.2); }
        }
      `}</style>
    </div>
  );
};

export default Valentine;