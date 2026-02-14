import { useState, useEffect, useRef, useCallback } from "react";

const POEM_STANZAS = [
  `Шумел кабак, и музыка гремела,
Девчонки вились в танце у стола.
Но только сердце вдруг оцепенело,
Когда Аксинья мимо проплыла.`,

  `Она — как лёд из северного края,
Где в Мурманске холодная пурга.
Гитарой звонкой струны задевая,
В душе растаяла моя струна.`,

  `Я к ним за стол подсел неосторожно,
Мешал поесть и путал все слова.
Я был хмельной, нескладный и нелепый,
Но взгляд её, таинственный и светлый,
Манил меня, сквозь шум и облака.`,

  `Ты — мечта и вдохновенье,
В твоих глазах — сиянье чистоты.
Хоть был я пьян в то краткое мгновенье,
В душе моей зажглись твои черты.`,

  `Мы встретимся на площади красивой,
На самой лучшей, где все Пять Углов.
Под небом заполярным и счастливым,
Под шёпот близких северных ветров.`,

  `Я верю в свет твоей души прекрасной,
В завет семьи и в чистоту речей.
Пусть первый вечер был не сильно ясный,
Но впереди — Аврора ста лучей.`,

  `С любовью, Денис ♥`
];

interface Snowflake {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  wobble: number;
}

interface FloatingHeart {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  drift: number;
}

const playRomanticMelody = (audioCtx: AudioContext) => {
  const masterGain = audioCtx.createGain();
  masterGain.gain.value = 0.15;
  masterGain.connect(audioCtx.destination);

  const reverb = audioCtx.createConvolver();
  const reverbTime = 3;
  const sampleRate = audioCtx.sampleRate;
  const length = sampleRate * reverbTime;
  const impulse = audioCtx.createBuffer(2, length, sampleRate);
  for (let channel = 0; channel < 2; channel++) {
    const data = impulse.getChannelData(channel);
    for (let i = 0; i < length; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2.5);
    }
  }
  reverb.buffer = impulse;
  
  const reverbGain = audioCtx.createGain();
  reverbGain.gain.value = 0.3;
  reverb.connect(reverbGain);
  reverbGain.connect(masterGain);

  const dryGain = audioCtx.createGain();
  dryGain.gain.value = 0.7;
  dryGain.connect(masterGain);

  const playNote = (freq: number, startTime: number, duration: number, vol: number = 0.5) => {
    const osc = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = "sine";
    osc.frequency.value = freq;
    osc2.type = "triangle";
    osc2.frequency.value = freq * 1.001;
    
    const oscGain1 = audioCtx.createGain();
    const oscGain2 = audioCtx.createGain();
    oscGain1.gain.value = 0.7;
    oscGain2.gain.value = 0.3;
    
    osc.connect(oscGain1);
    osc2.connect(oscGain2);
    oscGain1.connect(gain);
    oscGain2.connect(gain);
    
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(vol, startTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(vol * 0.6, startTime + duration * 0.4);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    
    gain.connect(dryGain);
    gain.connect(reverb);
    
    osc.start(startTime);
    osc.stop(startTime + duration);
    osc2.start(startTime);
    osc2.stop(startTime + duration);
  };

  const playChord = (freqs: number[], startTime: number, duration: number, vol: number = 0.15) => {
    freqs.forEach(f => playNote(f, startTime, duration, vol));
  };

  const C4 = 261.63, D4 = 293.66, E4 = 329.63, F4 = 349.23, G4 = 392.00;
  const A4 = 440.00, B4 = 493.88;
  const C5 = 523.25, D5 = 587.33, E5 = 659.25, F5 = 698.46, G5 = 783.99;
  const A3 = 220.00, B3 = 246.94, C3 = 130.81, E3 = 164.81, F3 = 174.61, G3 = 196.00;

  const now = audioCtx.currentTime + 0.1;
  const bpm = 72;
  const beat = 60 / bpm;

  const melody: [number, number, number][] = [
    [E4, 0, 1.5], [D4, 1.5, 0.5], [C4, 2, 1], [E4, 3, 1],
    [G4, 4, 1.5], [F4, 5.5, 0.5], [E4, 6, 1.5], [D4, 7.5, 0.5],
    
    [C4, 8, 1.5], [D4, 9.5, 0.5], [E4, 10, 1], [G4, 11, 1],
    [A4, 12, 1.5], [G4, 13.5, 0.5], [F4, 14, 1], [E4, 15, 1],

    [F4, 16, 1.5], [E4, 17.5, 0.5], [D4, 18, 1], [C4, 19, 1],
    [D4, 20, 1.5], [E4, 21.5, 0.5], [F4, 22, 1], [D4, 23, 1],

    [E4, 24, 2], [G4, 26, 1], [A4, 27, 1],
    [G4, 28, 1.5], [E4, 29.5, 0.5], [C4, 30, 2],

    [A4, 32, 1.5], [G4, 33.5, 0.5], [F4, 34, 1], [E4, 35, 1],
    [D4, 36, 1.5], [E4, 37.5, 0.5], [F4, 38, 1], [G4, 39, 1],

    [C5, 40, 2], [B4, 42, 1], [A4, 43, 1],
    [G4, 44, 1.5], [F4, 45.5, 0.5], [E4, 46, 2],

    [F4, 48, 1.5], [G4, 49.5, 0.5], [A4, 50, 1], [G4, 51, 1],
    [E4, 52, 1.5], [D4, 53.5, 0.5], [C4, 54, 2],

    [D4, 56, 1.5], [E4, 57.5, 0.5], [C4, 58, 2],
    [C4, 60, 4],
  ];

  const highMelody: [number, number, number][] = [
    [G5, 4, 2], [F5, 6, 2],
    [E5, 10, 2], [D5, 12, 2],
    [C5, 16, 2], [D5, 20, 2],
    [E5, 24, 4],
    [G5, 32, 2], [F5, 36, 2],
    [E5, 40, 4],
    [D5, 48, 2], [C5, 52, 2],
    [C5, 58, 6],
  ];

  const chords: [number[], number, number][] = [
    [[C3, G3, E4], 0, 4],
    [[C3, G3, E4], 4, 4],
    [[A3, E3, C4], 8, 4],
    [[F3, C4, A4], 12, 4],
    [[F3, C4, A4], 16, 4],
    [[G3, B3, D4], 20, 4],
    [[C3, G3, E4], 24, 4],
    [[C3, G3, E4], 28, 4],
    [[F3, C4, A4], 32, 4],
    [[G3, B3, D4], 36, 4],
    [[A3, E3, C4], 40, 4],
    [[F3, C4, A4], 44, 4],
    [[F3, C4, A4], 48, 4],
    [[G3, B3, D4], 52, 4],
    [[C3, G3, E4], 56, 4],
    [[C3, G3, E4], 60, 4],
  ];

  melody.forEach(([freq, beatStart, dur]) => {
    playNote(freq, now + beatStart * beat, dur * beat, 0.35);
  });

  highMelody.forEach(([freq, beatStart, dur]) => {
    playNote(freq, now + beatStart * beat, dur * beat, 0.08);
  });

  chords.forEach(([freqs, beatStart, dur]) => {
    playChord(freqs, now + beatStart * beat, dur * beat, 0.1);
  });

  const totalDuration = 64 * beat;
  return totalDuration;
};

const Valentine = () => {
  const [started, setStarted] = useState(false);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [visibleStanzas, setVisibleStanzas] = useState(0);
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const [clickHearts, setClickHearts] = useState<{id: number; x: number; y: number}[]>([]);
  const [auroraPhase, setAuroraPhase] = useState(0);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const melodyIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const createSnowflakes = useCallback(() => {
    const flakes: Snowflake[] = [];
    for (let i = 0; i < 60; i++) {
      flakes.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100 - 100,
        size: Math.random() * 4 + 1,
        speed: Math.random() * 0.3 + 0.1,
        opacity: Math.random() * 0.7 + 0.3,
        wobble: Math.random() * 360
      });
    }
    return flakes;
  }, []);

  const createHearts = useCallback(() => {
    const h: FloatingHeart[] = [];
    for (let i = 0; i < 15; i++) {
      h.push({
        id: i,
        x: Math.random() * 100,
        y: 100 + Math.random() * 20,
        size: Math.random() * 20 + 10,
        opacity: Math.random() * 0.4 + 0.1,
        speed: Math.random() * 0.2 + 0.05,
        drift: (Math.random() - 0.5) * 0.3
      });
    }
    return h;
  }, []);

  useEffect(() => {
    if (!started) return;
    setSnowflakes(createSnowflakes());
    setHearts(createHearts());
  }, [started, createSnowflakes, createHearts]);

  useEffect(() => {
    if (!started) return;
    const interval = setInterval(() => {
      setSnowflakes(prev => prev.map(f => ({
        ...f,
        y: f.y > 110 ? -10 : f.y + f.speed,
        x: f.x + Math.sin((f.y + f.wobble) * 0.02) * 0.15
      })));
      setHearts(prev => prev.map(h => ({
        ...h,
        y: h.y < -20 ? 110 : h.y - h.speed,
        x: h.x + h.drift
      })));
      setAuroraPhase(p => p + 0.02);
    }, 50);
    return () => clearInterval(interval);
  }, [started]);

  useEffect(() => {
    if (!showContent) return;
    if (visibleStanzas >= POEM_STANZAS.length) return;
    const timer = setTimeout(() => {
      setVisibleStanzas(v => v + 1);
    }, 2500);
    return () => clearTimeout(timer);
  }, [showContent, visibleStanzas]);

  useEffect(() => {
    if (!started || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let phase = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const drawAurora = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      phase += 0.003;
      
      const colors = [
        "rgba(0, 255, 128, 0.04)",
        "rgba(0, 200, 255, 0.03)",
        "rgba(100, 0, 255, 0.03)",
        "rgba(0, 255, 200, 0.04)",
        "rgba(150, 50, 255, 0.02)",
      ];

      for (let band = 0; band < colors.length; band++) {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height * 0.15);
        
        for (let x = 0; x <= canvas.width; x += 3) {
          const normalX = x / canvas.width;
          const y = canvas.height * 0.15 + 
            Math.sin(normalX * 3 + phase + band * 0.8) * 60 +
            Math.sin(normalX * 5 + phase * 1.3 + band) * 30 +
            Math.sin(normalX * 7 + phase * 0.7) * 20 +
            band * 25;
          ctx.lineTo(x, y);
        }
        
        ctx.lineTo(canvas.width, 0);
        ctx.lineTo(0, 0);
        ctx.closePath();
        
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 0.4);
        gradient.addColorStop(0, "transparent");
        gradient.addColorStop(0.3, colors[band]);
        gradient.addColorStop(0.6, colors[band]);
        gradient.addColorStop(1, "transparent");
        
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      for (let i = 0; i < 80; i++) {
        const x = (Math.sin(i * 127.1 + phase * 0.1) * 0.5 + 0.5) * canvas.width;
        const y = (Math.sin(i * 311.7 + phase * 0.05) * 0.5 + 0.5) * canvas.height * 0.4;
        const brightness = Math.sin(phase * 2 + i * 0.5) * 0.5 + 0.5;
        const size = brightness * 2;
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${brightness * 0.8})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(drawAurora);
    };

    drawAurora();
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [started]);

  const startExperience = () => {
    setStarted(true);
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    audioCtxRef.current = ctx;
    
    const duration = playRomanticMelody(ctx);
    melodyIntervalRef.current = setInterval(() => {
      playRomanticMelody(ctx);
    }, duration * 1000 + 500);

    setTimeout(() => {
      setEnvelopeOpen(true);
      setTimeout(() => {
        setShowContent(true);
        setVisibleStanzas(1);
      }, 1500);
    }, 800);
  };

  const handlePageClick = (e: React.MouseEvent) => {
    if (!showContent) return;
    const id = Date.now();
    setClickHearts(prev => [...prev, { id, x: e.clientX, y: e.clientY }]);
    setTimeout(() => {
      setClickHearts(prev => prev.filter(h => h.id !== id));
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (melodyIntervalRef.current) clearInterval(melodyIntervalRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  if (!started) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a0a2e] via-[#1a1a4e] to-[#0d0d3a] flex items-center justify-center overflow-hidden relative">
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white animate-pulse"
              style={{
                width: Math.random() * 3 + 1,
                height: Math.random() * 3 + 1,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 2 + 1}s`,
                opacity: Math.random() * 0.8 + 0.2
              }}
            />
          ))}
        </div>

        <div className="text-center z-10 cursor-pointer" onClick={startExperience}>
          <div className="relative inline-block mb-8 group">
            <div className="w-32 h-32 mx-auto relative">
              <div 
                className="absolute inset-0 animate-pulse"
                style={{
                  background: "radial-gradient(circle, rgba(255,70,100,0.3) 0%, transparent 70%)",
                  filter: "blur(20px)"
                }}
              />
              <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl group-hover:scale-110 transition-transform duration-500">
                <defs>
                  <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ff6b8a" />
                    <stop offset="50%" stopColor="#ff4571" />
                    <stop offset="100%" stopColor="#d63060" />
                  </linearGradient>
                </defs>
                <path
                  d="M50 88 C25 65, 2 45, 2 28 C2 14, 15 2, 30 2 C38 2, 45 7, 50 18 C55 7, 62 2, 70 2 C85 2, 98 14, 98 28 C98 45, 75 65, 50 88Z"
                  fill="url(#heartGrad)"
                  className="animate-pulse"
                />
              </svg>
            </div>

            <div className="absolute -inset-8 pointer-events-none">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    background: i % 2 === 0 ? "#ff6b8a" : "#ffb3c6",
                    left: `${50 + 45 * Math.cos((i / 8) * Math.PI * 2)}%`,
                    top: `${50 + 45 * Math.sin((i / 8) * Math.PI * 2)}%`,
                    animation: `sparkle ${1.5 + i * 0.2}s ease-in-out infinite`,
                    animationDelay: `${i * 0.15}s`
                  }}
                />
              ))}
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "Georgia, serif" }}>
            Для тебя, Аксинья
          </h1>
          <p className="text-pink-300 text-lg mb-8 animate-pulse">
            Нажми на сердце...
          </p>
          
          <div className="flex justify-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span 
                key={i} 
                className="text-2xl animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                ✨
              </span>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes sparkle {
            0%, 100% { opacity: 0; transform: scale(0); }
            50% { opacity: 1; transform: scale(1); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{ background: "linear-gradient(to bottom, #070720, #0e1538, #0a0a2e, #121240)" }}
      onClick={handlePageClick}
    >
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }} />

      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
        {snowflakes.map(f => (
          <div
            key={f.id}
            className="absolute rounded-full bg-white"
            style={{
              width: f.size,
              height: f.size,
              left: `${f.x}%`,
              top: `${f.y}%`,
              opacity: f.opacity,
              filter: `blur(${f.size > 3 ? 1 : 0}px)`,
              transition: "left 0.5s ease, top 0.05s linear"
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
        {hearts.map(h => (
          <div
            key={h.id}
            className="absolute"
            style={{
              left: `${h.x}%`,
              top: `${h.y}%`,
              opacity: h.opacity,
              fontSize: h.size,
              transition: "top 0.5s linear"
            }}
          >
            ♥
          </div>
        ))}
      </div>

      {clickHearts.map(h => (
        <div
          key={h.id}
          className="fixed pointer-events-none"
          style={{
            left: h.x - 15,
            top: h.y - 15,
            zIndex: 100,
            animation: "clickHeart 2s ease-out forwards"
          }}
        >
          <span className="text-3xl">💖</span>
        </div>
      ))}

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-12">
        <div className={`transition-all duration-1000 ${envelopeOpen ? 'opacity-0 scale-50 -translate-y-20' : 'opacity-100'}`}>
          {!envelopeOpen && (
            <div className="flex justify-center pt-32">
              <div className="relative">
                <div className="w-64 h-44 bg-gradient-to-br from-pink-200 to-pink-300 rounded-lg shadow-2xl flex items-center justify-center">
                  <div 
                    className="absolute -top-20 w-0 h-0"
                    style={{
                      borderLeft: "128px solid transparent",
                      borderRight: "128px solid transparent",
                      borderBottom: "80px solid #f9a8c9",
                      animation: "envelopeOpen 1.5s ease-out forwards",
                      transformOrigin: "bottom center"
                    }}
                  />
                  <span className="text-4xl">💌</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {showContent && (
          <div className="space-y-12 pt-8">
            <div className="text-center animate-fadeInDown">
              <h1 
                className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text mb-4"
                style={{ 
                  backgroundImage: "linear-gradient(135deg, #ff6b8a, #ff9ec0, #ffd4e0, #ff9ec0, #ff6b8a)",
                  backgroundSize: "200% 200%",
                  animation: "shimmer 3s ease-in-out infinite",
                  fontFamily: "Georgia, serif"
                }}
              >
                Аксинья
              </h1>
              <div className="flex justify-center gap-3 mb-2">
                <span className="text-pink-400 animate-pulse">✦</span>
                <span className="text-pink-300 text-sm tracking-[0.3em] uppercase">14 февраля</span>
                <span className="text-pink-400 animate-pulse">✦</span>
              </div>
              <div className="w-24 h-0.5 mx-auto bg-gradient-to-r from-transparent via-pink-400 to-transparent" />
            </div>

            {POEM_STANZAS.map((stanza, idx) => (
              <div
                key={idx}
                className={`transition-all duration-1000 ${
                  idx < visibleStanzas 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${idx * 200}ms` }}
              >
                {idx === POEM_STANZAS.length - 1 ? (
                  <div className="text-center pt-4">
                    <div className="inline-block relative">
                      <p 
                        className="text-2xl md:text-3xl font-bold text-pink-300 italic"
                        style={{ fontFamily: "Georgia, serif" }}
                      >
                        {stanza}
                      </p>
                      <div 
                        className="absolute -inset-4 rounded-full opacity-30 animate-pulse"
                        style={{ background: "radial-gradient(circle, rgba(255,107,138,0.4) 0%, transparent 70%)" }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="relative group">
                    <div 
                      className="absolute -left-4 top-0 bottom-0 w-0.5 rounded-full"
                      style={{ 
                        background: `linear-gradient(to bottom, transparent, ${
                          idx % 3 === 0 ? 'rgba(255,107,138,0.5)' : 
                          idx % 3 === 1 ? 'rgba(147,130,255,0.5)' : 
                          'rgba(100,200,255,0.5)'
                        }, transparent)`
                      }}
                    />
                    <div className="pl-4">
                      {stanza.split('\n').map((line, lineIdx) => (
                        <p 
                          key={lineIdx} 
                          className="text-lg md:text-xl leading-relaxed mb-1"
                          style={{ 
                            color: "rgba(230, 210, 230, 0.9)",
                            fontFamily: "Georgia, serif",
                            textShadow: "0 0 30px rgba(255,107,138,0.15)"
                          }}
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {visibleStanzas >= POEM_STANZAS.length && (
              <div className="flex justify-center pt-8 animate-fadeInUp">
                <div className="relative">
                  <svg viewBox="0 0 100 100" className="w-20 h-20 drop-shadow-2xl" style={{ animation: "heartbeat 1.5s ease-in-out infinite" }}>
                    <defs>
                      <linearGradient id="finalHeart" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ff6b8a" />
                        <stop offset="100%" stopColor="#d63060" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M50 88 C25 65, 2 45, 2 28 C2 14, 15 2, 30 2 C38 2, 45 7, 50 18 C55 7, 62 2, 70 2 C85 2, 98 14, 98 28 C98 45, 75 65, 50 88Z"
                      fill="url(#finalHeart)"
                    />
                  </svg>
                  <div 
                    className="absolute -inset-6 rounded-full animate-pulse"
                    style={{ background: "radial-gradient(circle, rgba(255,70,100,0.2) 0%, transparent 70%)" }}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes envelopeOpen {
          0% { transform: rotateX(0deg); }
          100% { transform: rotateX(180deg); }
        }
        @keyframes shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          15% { transform: scale(1.15); }
          30% { transform: scale(1); }
          45% { transform: scale(1.1); }
          60% { transform: scale(1); }
        }
        @keyframes clickHeart {
          0% { opacity: 1; transform: scale(0.5) translateY(0); }
          50% { opacity: 0.8; transform: scale(1.5) translateY(-30px); }
          100% { opacity: 0; transform: scale(0.5) translateY(-80px); }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInDown {
          animation: fadeInDown 1.5s ease-out forwards;
        }
        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Valentine;