import { useState, useEffect, useRef } from "react";

const CHAPTERS = [
  {
    id: 1,
    title: "Глава первая. Шум",
    subtitle: "Она приходит с севера — создавая тишину",
    emoji: "🌌",
    color: "#7c3aed",
    glow: "rgba(124,58,237,0.4)",
    particles: "stars",
    text: [
      "Он не должен был там оказаться.",
      "Вообще-то он не любит уже давно такие заведения. Слишком громко, слишком фальшиво, слишком много людей, которые хотят казаться теми, кем не являются. Он предпочитал тишину. Работу. Редкие встречи с друзьями. Спорт. Или хотя бы осмысленные разговоры.",
      "Но друзья позвали. А он за последний год так много работал, что забыл, когда в последний раз просто сидел с кем-то в одном помещении без ноутбука. Без графиков. Без дедлайнов.",
      "Он пошёл. Было весело и шумно — шум, который он сам создавал, чтобы всем было весело. Но потом наступила тишина.",
      "Он смотрел на людей вокруг. На девушек, которые подсаживались к нему. На их улыбки, их попытки заговорить, их искусственную лёгкость. Он вежливо кивал, что-то отвечал, но внутри было пусто. Как будто он смотрел фильм на чужом языке без субтитров.",
      "А потом он перестал смотреть по сторонам.",
      "Он просто смотрел на неё.",
      "Она сидела напротив. С подругой. О чём-то говорила, улыбалась. И ему показалось, что вокруг неё воздух другой. Прохладнее. Чище. Как будто она привезла с собой кусочек того самого города, где солнце зимой — редкий гость.",
      "Он вообще не был из тех, кто подходит первым. Но ни разу не было той женщины, которая притянет его. Заставит встать.",
      "А тут встал и пошёл.",
      "Он не знал, что скажет. Не знал, зачем идёт. Просто ноги сами понесли. Как будто кто-то внутри взял управление и сказал: «Иди. Это твоя. Не потеряй. Не в этот раз. Не её»",
      "Он подошёл. Нелепо, сбивчиво, с глупыми шутками. Мешал ей есть. Путал имена. Был смешным. А она смотрела на него так, будто видела не пьяного болтуна, а того, кого в нём ещё никто не видел.",
      "Он понял, что ей нужно дать пространство. Скрипя зубами, но понял. Хотя так хотелось не отрываясь смотреть в её прекрасные глаза, которые олицетворяют абсолютную глубину — бескрайний мир, в котором можно утонуть.",
      "И он ушёл. Ушёл, но сердце в тот же момент оставил там.",
      "Но уже тогда он понял: тот магнит, который он почувствовал внутри — он не чувствовал никогда. Это абсолютно тёплое чувство гармонии. Это свобода. И возникло это не когда он увидел её глаза, а когда она только появилась в помещении.",
      "А дальше… Глаза… Полярная звезда…",
      "Они обменялись контактами. Она улыбнулась на прощание. Не дежурно, не вежливо, а как-то по-своему. Так, что он запомнил эту улыбку навсегда.",
      "Он поехал домой и всю дорогу не мог понять, что это было. А наутро проснулся с мыслью: Напиши ей. Сейчас. Не думай.",
      "Он написал.",
      "Потом, спустя некоторое время он вспомнит фотографию Мамы, когда ему было 5 лет. И всё поймёт. Но фотографию так и не найдёт…",
    ],
  },
  {
    id: 2,
    title: "Глава вторая. Та, которая не греет",
    subtitle: "",
    emoji: "❄️",
    color: "#06b6d4",
    glow: "rgba(6,182,212,0.4)",
    particles: "snow",
    text: [
      "Она говорила, что привозит холод.",
      "Не в шутку. Не для красного словца. Она действительно чувствовала это — когда приезжала в Москву, погода портилась, начинался ветер, небо затягивало. Она смеялась, но в смехе было что-то другое. Что-то, что она не договаривала.",
      "Он думал об этом ночью, когда не мог уснуть. О том, что значит — привозить холод. О том, что значит — быть тем, рядом с кем зябко. О том, что значит — нести в себе зиму и не знать, как её растопить.",
      "Холод привозят не те, у кого внутри минус. Холод привозят те, кто слишком долго ждал тепла и перестал в него верить. Те, кто привык, что солнце — это редкость. Те, кто вырос в полярную ночь и считает, что так и должно быть.",
      "Он хотел сказать ей: «Ты не холод привозишь. Ты привозишь честность. Ты привозишь себя — без масок, без улыбок для чужих. Ты привозишь север, а север — это не холод. Это чистота».",
      "Но не сказал.",
      "Потому что она ещё не была готова это услышать.",
    ],
  },
  {
    id: 3,
    title: "Глава третья. Тот, который ждал",
    subtitle: "",
    emoji: "⏳",
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.4)",
    particles: "dust",
    text: [
      "Он никогда не умел ждать.",
      "В бизнесе он привык решать быстро. Есть проблема — ищи решение. Есть цель — строй план. Всё просто.",
      "С ней было не просто.",
      "С ней нужно было ждать. Часами. Днями. Неделями. Ждать, когда она ответит. Ждать, когда она созреет. Ждать, когда она перестанет бояться. Ах да… Эта гребаная связь…",
      "Но однажды он поймал себя на мысли, что ждать — это не про отсутствие действий. Ждать — это про присутствие.",
      "Можно сидеть и нервничать. А можно просто быть. Здесь. Сейчас. В том же времени, в том же пространстве, в той же тишине, что и она.",
      "Он выбрал второе.",
      "Оказывается, он умеет ждать. Оказывается, он может не дёргаться. Оказывается, его мысли к ней и чувства — сильнее его нетерпения.",
      "Он не знал, оценит ли она это когда-нибудь. Но ему уже не нужна была оценка. Ему нужно было просто быть.",
      "Когда она плакала — это значило: кто-то зашёл туда, куда она никого не пускала. Она плакала, потому что он увидел её. Настоящую. Ту, которую она сама боялась в себе разглядеть.",
      "И это было страшнее любого признания в любви.",
    ],
  },
  {
    id: 4,
    title: "Глава четвёртая. Тот, который умеет молчать",
    subtitle: "",
    emoji: "🤫",
    color: "#8b5cf6",
    glow: "rgba(139,92,246,0.4)",
    particles: "orbs",
    text: [
      "Он раньше не умел молчать.",
      "В разговорах он всегда был тем, кто ведёт, кто задаёт тон, кто заполняет паузы. Молчание его напрягало. Казалось — потеряешь контроль, упустишь нить, проиграешь.",
      "С ней пришлось учиться заново.",
      "Она могла молчать часами. Не потому что обижалась или играла. А потому что так было удобно. Потому что молчание для неё — не пустота, а пространство.",
      "В её молчании можно было услышать больше, чем в любых словах. Там было доверие. Там было: «Я не боюсь, что ты уйдёшь, пока я молчу».",
      "Он научился слушать это молчание. И однажды понял, что оно стало для него родным.",
      "Она боялась потерять себя. Ей казалось: если почувствует по-настоящему — растворится. Потеряет ту независимость, которую так долго строила.",
      "Но он знал то, чего она ещё не знала: настоящие чувства не отнимают тебя у тебя. Они возвращают тебя себе — настоящему.",
      "Он не говорил ей этого. Потому что такие вещи не говорят. Их показывают. Годами. Терпением. Присутствием.",
    ],
  },
  {
    id: 5,
    title: "Глава пятая. Мы построили мост",
    subtitle: "",
    emoji: "🌉",
    color: "#10b981",
    glow: "rgba(16,185,129,0.4)",
    particles: "bridges",
    text: [
      "Между Москвой и Костромой и Мурманском нет моста.",
      "Три тысячи километров. Два часовых пояса. Две разные жизни.",
      "Но они построили мост.",
      "Из слов. Из стихов. Из цветов, которые отправлял не только ей, но и бабушке. Из сайта с планктоном, который светится — а она говорила лучшее «спасибо» в его жизни. Из голосовых, которые слушал по два раза. Из пауз, которые научился выдерживать.",
      "Этот мост никто не видел. Его нельзя было потрогать.",
      "Когда ей было грустно — она шла по этому мосту к нему. Когда она не знала, куда деть пустоту — пробегала по этому мосту.",
      "Он не знал, заметит ли она этот мост когда-нибудь.",
      "Но мост стоял. И будет стоять, пока она по нему ходит.",
    ],
  },
  {
    id: 6,
    title: "Глава шестая. Северное сияние",
    subtitle: "",
    emoji: "🌠",
    color: "#ec4899",
    glow: "rgba(236,72,153,0.5)",
    particles: "aurora",
    text: [
      "Она рассказывала ему про северное сияние.",
      "Про то, как оно выглядит на самом деле — не такое яркое, как на фото, но в сто раз более живое. Про то, как трудно его поймать. Про то, как люди часами стоят на морозе в надежде увидеть.",
      "Он слушал и думал: северное сияние не приходит по расписанию. Его нельзя заказать, купить, ускорить. Можно только ждать. И быть готовым, когда оно появится.",
      "С ней было так же.",
      "Каждый раз, когда она писала, когда присылала голосовое — в этом было что-то от северного сияния. Редкое. Хрупкое. Бесценное.",
      "Он смотрел на экран телефона и думал: Вот оно. Сейчас. Светится.",
      "И улыбался.",
    ],
  },
  {
    id: 7,
    title: "Последняя глава",
    subtitle: "Полярная звезда",
    emoji: "⭐",
    color: "#fbbf24",
    glow: "rgba(251,191,36,0.6)",
    particles: "stars_gold",
    text: [
      "Когда-нибудь эта история закончится.",
      "Или началом. Или точкой. Или многоточием.",
      "Он не знал, чем она кончится. Но знал другое.",
      "Он не пожалеет.",
      "Не пожалеет ни об одном слове. Ни об одном цветке. Ни об одной бессонной ночи. Ни об одном «привет, как ты?», написанном в три часа ночи.",
      "Потому что это была его лучшая история.",
      "История о том, как московский парень, у которого всё было по полочкам, вдруг потерял голову из-за девушки с севера.",
      "История о том, как двое людей, разделённых тысячами километров, оказались ближе, чем те, кто спит рядом.",
      "История о том, как один взгляд может изменить всё.",
      "Он не знал, будет ли у этой истории продолжение. Но знал, что она уже стоила того, чтобы её прожить.",
      "Ведь это Полярная звезда.",
      "Она — Полярная Звезда.",
    ],
  },
];

const ParticleCanvas = ({ type, color }: { type: string; color: string }) => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d")!;
    const W = c.width = c.offsetWidth;
    const H = c.height = c.offsetHeight;
    const pts = Array.from({ length: type === "snow" ? 60 : type === "aurora" ? 5 : 40 }, (_, i) => {
      if (type === "aurora") {
        return { x: (i / 4) * W, y: H * 0.3, vy: 0, phase: Math.random() * Math.PI * 2, amp: 30 + Math.random() * 40, speed: 0.008 + Math.random() * 0.005 };
      }
      return {
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.4,
        vy: type === "snow" ? 0.4 + Math.random() * 0.6 : (Math.random() - 0.5) * 0.3,
        r: Math.random() * 3 + 1,
        life: Math.random(),
        speed: Math.random() * 0.005 + 0.002,
      };
    });
    let id: number;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      if (type === "aurora") {
        (pts as {x:number;y:number;phase:number;amp:number;speed:number}[]).forEach((p) => {
          p.phase += p.speed;
          ctx.beginPath();
          for (let x = 0; x < W; x += 4) {
            const y = p.y + Math.sin(x * 0.01 + p.phase) * p.amp;
            if (x === 0) { ctx.moveTo(x, y); } else { ctx.lineTo(x, y); }
          }
          ctx.strokeStyle = color + "55";
          ctx.lineWidth = 8;
          ctx.stroke();
        });
      } else {
        (pts as {x:number;y:number;vx:number;vy:number;r:number;life:number;speed:number}[]).forEach((p) => {
          p.life += p.speed;
          if (p.life > 1) { p.life = 0; p.x = Math.random() * W; p.y = type === "snow" ? -5 : Math.random() * H; }
          p.x += p.vx; p.y += p.vy;
          if (p.y > H + 5) { p.y = -5; p.x = Math.random() * W; }
          const alpha = type === "snow" ? 0.6 : Math.sin(p.life * Math.PI);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = color + Math.floor(alpha * 200).toString(16).padStart(2, "0");
          ctx.fill();
        });
      }
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(id);
  }, [type, color]);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }} />;
};

const ChapterCard = ({ ch, isActive, isRead, onClick }: { ch: typeof CHAPTERS[0]; isActive: boolean; isRead: boolean; onClick: () => void }) => (
  <button onClick={onClick}
    className="w-full text-left p-4 rounded-2xl transition-all duration-500 relative overflow-hidden"
    style={{
      background: isActive ? `${ch.color}22` : isRead ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
      border: `1px solid ${isActive ? ch.color + "66" : "rgba(255,255,255,0.08)"}`,
      boxShadow: isActive ? `0 0 30px ${ch.glow}` : "none",
      transform: isActive ? "scale(1.02)" : "scale(1)",
    }}>
    <div className="flex items-center gap-3">
      <div className="text-2xl">{ch.emoji}</div>
      <div className="flex-1 min-w-0">
        <div className="font-bold text-sm" style={{ color: isActive ? ch.color : isRead ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.3)" }}>{ch.title}</div>
        {ch.subtitle && <div className="text-xs opacity-50 mt-0.5">{ch.subtitle}</div>}
      </div>
      {isRead && !isActive && <div className="text-xs" style={{ color: ch.color }}>✓</div>}
      {isActive && <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: ch.color }} />}
    </div>
  </button>
);

const StoryView = ({ ch, onDone }: { ch: typeof CHAPTERS[0]; onDone: () => void }) => {
  const [shown, setShown] = useState(0);
  const [finished, setFinished] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setShown(0); setFinished(false); }, [ch]);

  useEffect(() => {
    if (shown < ch.text.length) {
      const t = setTimeout(() => setShown((s) => s + 1), shown === 0 ? 300 : 800);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setFinished(true), 600);
      return () => clearTimeout(t);
    }
  }, [shown, ch.text.length]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [shown]);

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="absolute inset-0 overflow-hidden">
        <ParticleCanvas type={ch.particles} color={ch.color} />
      </div>
      <div className="relative z-10 flex flex-col flex-1 px-4 py-8 max-w-2xl mx-auto w-full">
        <div className="text-center mb-10">
          <div className="text-5xl mb-3" style={{ filter: `drop-shadow(0 0 20px ${ch.glow})` }}>{ch.emoji}</div>
          <h2 className="text-xl font-black text-white" style={{ textShadow: `0 0 30px ${ch.glow}` }}>{ch.title}</h2>
          {ch.subtitle && <p className="text-sm mt-1" style={{ color: ch.color }}>{ch.subtitle}</p>}
        </div>

        <div className="space-y-5 flex-1">
          {ch.text.slice(0, shown).map((para, i) => (
            <p key={i} className="text-base leading-relaxed text-white/80 transition-all duration-700"
              style={{
                opacity: shown - i < 3 ? (shown - i) / 3 : 1,
                transform: `translateY(${shown - i < 3 ? (3 - (shown - i)) * 4 : 0}px)`,
                fontStyle: para.startsWith("«") || para.startsWith('"') ? "italic" : "normal",
                fontWeight: para === "Ведь это Полярная звезда." || para === "Она — Полярная Звезда." ? "bold" : "normal",
                fontSize: para === "Она — Полярная Звезда." ? "1.2rem" : undefined,
                color: para === "Она — Полярная Звезда." ? ch.color : undefined,
                textShadow: para === "Она — Полярная Звезда." ? `0 0 20px ${ch.glow}` : undefined,
              }}>
              {para}
            </p>
          ))}

          {shown < ch.text.length && (
            <div className="flex items-center gap-2 opacity-40">
              {[0, 1, 2].map((i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: ch.color, animation: `pulse 1s ${i * 0.2}s infinite` }} />
              ))}
            </div>
          )}
        </div>

        <div ref={endRef} />

        {finished && (
          <div className="mt-10 text-center">
            <button onClick={onDone}
              className="px-8 py-3 rounded-2xl font-bold text-white transition-all duration-300 hover:scale-105"
              style={{ background: `linear-gradient(135deg, ${ch.color}, ${ch.color}88)`, boxShadow: `0 8px 30px ${ch.glow}` }}>
              Дальше →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const FireworksCanvas = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d")!;
    c.width = window.innerWidth; c.height = window.innerHeight;
    type FW = { x: number; y: number; tx: number; ty: number; color: string; speed: number };
    type PT = { x: number; y: number; vx: number; vy: number; life: number; color: string };
    const fireworks: FW[] = [];
    const particles: PT[] = [];
    const colors = ["#ec4899","#a78bfa","#fbbf24","#34d399","#60a5fa","#f87171"];

    const launch = () => {
      fireworks.push({
        x: Math.random() * c.width,
        y: c.height,
        tx: Math.random() * c.width,
        ty: Math.random() * c.height * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: 8 + Math.random() * 4,
      });
    };
    for (let i = 0; i < 5; i++) setTimeout(launch, i * 400);
    const iv = setInterval(launch, 1200);

    let id: number;
    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.15)";
      ctx.fillRect(0, 0, c.width, c.height);
      fireworks.forEach((fw, fi) => {
        const dx = fw.tx - fw.x, dy = fw.ty - fw.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 8) {
          for (let i = 0; i < 60; i++) {
            const angle = (i / 60) * Math.PI * 2;
            const speed = 2 + Math.random() * 4;
            particles.push({ x: fw.x, y: fw.y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 1, color: fw.color });
          }
          fireworks.splice(fi, 1);
        } else {
          const s = fw.speed / dist;
          fw.x += dx * s; fw.y += dy * s;
          ctx.beginPath(); ctx.arc(fw.x, fw.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = fw.color; ctx.fill();
        }
      });
      particles.forEach((p, pi) => {
        p.life -= 0.018; p.x += p.vx; p.y += p.vy; p.vy += 0.05;
        if (p.life <= 0) { particles.splice(pi, 1); return; }
        ctx.beginPath(); ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.life * 255).toString(16).padStart(2, "0");
        ctx.fill();
      });
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(id); clearInterval(iv); };
  }, []);
  return <canvas ref={ref} className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }} />;
};

const FinalScreen = ({ onRestart }: { onRestart: () => void }) => {
  const [hearts, setHearts] = useState<{ id: number; x: number; size: number; delay: number }[]>([]);
  useEffect(() => {
    setHearts(Array.from({ length: 20 }, (_, i) => ({ id: i, x: Math.random() * 100, size: 20 + Math.random() * 30, delay: Math.random() * 3 })));
  }, []);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6 text-center"
      style={{ background: "linear-gradient(160deg,#0f0515,#1a0520,#0a0a1a)" }}>
      <FireworksCanvas />
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 2 }}>
        {hearts.map((h) => (
          <div key={h.id} className="absolute" style={{
            left: `${h.x}%`, bottom: "-10%", fontSize: h.size,
            animation: `floatUp ${6 + h.delay}s ${h.delay}s infinite ease-in-out`,
          }}>💖</div>
        ))}
      </div>
      <div className="relative z-10">
        <div className="text-8xl mb-6" style={{ filter: "drop-shadow(0 0 40px rgba(251,191,36,0.8))", animation: "pulse 2s infinite" }}>⭐</div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ textShadow: "0 0 40px rgba(251,191,36,0.6)" }}>
          Полярная Звезда
        </h1>
        <div className="text-2xl text-pink-300 font-semibold mb-6">С Днём Рождения, Аксинья</div>
        <p className="text-white/60 text-lg leading-relaxed max-w-md mx-auto mb-10">
          Пусть каждый твой день светится так же ярко, как ты светишь для меня. Ты — моя Полярная Звезда.
        </p>
        <div className="text-5xl mb-8">💝</div>
        <button onClick={onRestart}
          className="px-8 py-3 rounded-2xl font-bold text-white transition-all hover:scale-105"
          style={{ background: "linear-gradient(135deg,#ec4899,#a78bfa)", boxShadow: "0 8px 30px rgba(236,72,153,0.5)" }}>
          Читать снова ✨
        </button>
      </div>
    </div>
  );
};

export default function Birthday() {
  const [phase, setPhase] = useState<"menu" | "reading" | "final">("menu");
  const [activeChapter, setActiveChapter] = useState(0);
  const [readChapters, setReadChapters] = useState<Set<number>>(new Set());

  const startChapter = (idx: number) => { setActiveChapter(idx); setPhase("reading"); };
  const finishChapter = () => {
    setReadChapters((s) => new Set([...s, activeChapter]));
    if (activeChapter < CHAPTERS.length - 1) {
      setActiveChapter((i) => i + 1);
    } else {
      setPhase("final");
    }
  };

  if (phase === "final") return <FinalScreen onRestart={() => { setPhase("menu"); setActiveChapter(0); setReadChapters(new Set()); }} />;
  if (phase === "reading") return (
    <div>
      <div className="fixed top-4 left-4 z-50">
        <button onClick={() => setPhase("menu")} className="px-3 py-1.5 rounded-xl text-xs text-white/50 hover:text-white transition-all"
          style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }}>← Главы</button>
      </div>
      <StoryView ch={CHAPTERS[activeChapter]} onDone={finishChapter} />
    </div>
  );

  const allRead = readChapters.size === CHAPTERS.length;
  return (
    <div className="min-h-screen relative" style={{ background: "linear-gradient(160deg,#0f0515,#0a0a1a,#0d0520)", color: "#fff" }}>
      <style>{`
        @keyframes floatUp { 0%{transform:translateY(0) rotate(0deg);opacity:0} 10%{opacity:0.3} 90%{opacity:0.1} 100%{transform:translateY(-110vh) rotate(20deg);opacity:0} }
      `}</style>

      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        {["💖","⭐","✨","💫","🌟","🎂","🎁","💝","🌸","🎀","💕","🌙"].map((e, i) => (
          <div key={i} className="absolute text-xl opacity-10"
            style={{ left: `${5 + (i * 8) % 92}%`, bottom: "-5%", animation: `floatUp ${10 + (i * 2) % 8}s ${(i * 1.2) % 6}s infinite` }}>{e}</div>
        ))}
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 pt-10 pb-20">
        <div className="text-center mb-10">
          <div className="text-6xl mb-4" style={{ filter: "drop-shadow(0 0 30px rgba(251,191,36,0.6))", animation: "pulse 2s infinite" }}>⭐</div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2" style={{ textShadow: "0 0 30px rgba(251,191,36,0.4)" }}>Полярная Звезда</h1>
          <p className="text-sm opacity-50 tracking-widest uppercase">рассказ посвящённый дню рождения</p>
          <div className="mt-4 flex justify-center gap-2 flex-wrap">
            {["С Днём Рождения", "🎂", "Аксинья", "💖", `${readChapters.size}/${CHAPTERS.length} глав`].map((t, i) => (
              <span key={i} className="px-3 py-1 rounded-full text-xs" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}>{t}</span>
            ))}
          </div>
        </div>

        {readChapters.size > 0 && (
          <div className="mb-6">
            <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
              <div className="h-full rounded-full transition-all duration-1000"
                style={{ width: `${(readChapters.size / CHAPTERS.length) * 100}%`, background: "linear-gradient(90deg,#ec4899,#fbbf24)", boxShadow: "0 0 12px rgba(236,72,153,0.5)" }} />
            </div>
            <div className="text-xs opacity-40 text-center mt-1">{readChapters.size} из {CHAPTERS.length} глав прочитано</div>
          </div>
        )}

        <div className="space-y-3 mb-8">
          {CHAPTERS.map((ch, i) => (
            <ChapterCard key={ch.id} ch={ch} isActive={i === activeChapter && phase === "reading"} isRead={readChapters.has(i)} onClick={() => startChapter(i)} />
          ))}
        </div>

        <div className="text-center">
          <button onClick={() => startChapter(readChapters.size > 0 ? Math.min(readChapters.size, CHAPTERS.length - 1) : 0)}
            className="px-8 py-4 rounded-2xl font-bold text-white text-lg transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg,#ec4899,#a78bfa,#fbbf24)", boxShadow: "0 8px 40px rgba(236,72,153,0.5)" }}>
            {readChapters.size === 0 ? "✨ Начать читать" : allRead ? "🎉 Читать снова" : "▶️ Продолжить"}
          </button>
        </div>
      </div>
    </div>
  );
}