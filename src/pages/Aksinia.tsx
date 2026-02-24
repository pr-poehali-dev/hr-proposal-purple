import { useState, useEffect, useRef } from "react";
import Valentine from "./Valentine";

const API_URL = "https://functions.poehali.dev/1fd6b3fb-20ce-4c8f-8499-f1579b94d1ce";

const AKSINIA_1 = "https://cdn.poehali.dev/projects/6a20b3ba-2ddc-4572-8d85-e4c62f8d7e40/bucket/957e3bcf-bb03-4864-a25c-187913323315.jpg";
const AKSINIA_2 = "https://cdn.poehali.dev/projects/6a20b3ba-2ddc-4572-8d85-e4c62f8d7e40/bucket/5761686f-bee5-486b-9109-ce2b92303d08.jpg";
const AKSINIA_3 = "https://cdn.poehali.dev/projects/6a20b3ba-2ddc-4572-8d85-e4c62f8d7e40/bucket/ab451697-26a3-405a-8284-e87ff32d7769.jpg";
const AKSINIA_5 = "https://cdn.poehali.dev/projects/6a20b3ba-2ddc-4572-8d85-e4c62f8d7e40/bucket/7397ac7b-e549-4932-bd8e-740b8767abf8.jpg";

const CATEGORY_META: Record<string, { icon: string; color: string; label: string }> = {
  career:    { icon: "👑", color: "#f59e0b", label: "Карьера" },
  travel:    { icon: "✈️", color: "#06b6d4", label: "Путешествия" },
  nature:    { icon: "🌊", color: "#10b981", label: "Природа" },
  adventure: { icon: "🏔️", color: "#8b5cf6", label: "Приключения" },
  dream:     { icon: "⭐", color: "#ec4899", label: "Мечты" },
};

const NOTE_COLORS = ["#ff6b9d", "#a78bfa", "#34d399", "#fbbf24", "#60a5fa", "#f87171"];

interface Wish {
  id: number;
  title: string;
  description: string;
  category: string;
  progress: number;
  status: string;
  cover_url: string | null;
  links: string[];
  roadmap: { step: number; title: string; desc: string; done: boolean }[];
  is_preset: boolean;
  created_at: string;
}

interface Note {
  id: number;
  title: string;
  content: string;
  type: string;
  image_url: string | null;
  link: string | null;
  color: string;
  created_at: string;
}

const StarField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const stars: { x: number; y: number; r: number; speed: number; twinkle: number }[] = [];
    for (let i = 0; i < 180; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.8 + 0.2,
        speed: Math.random() * 0.3 + 0.05,
        twinkle: Math.random() * Math.PI * 2,
      });
    }
    let frame = 0;
    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;
      stars.forEach((s) => {
        s.twinkle += s.speed * 0.04;
        const alpha = 0.4 + 0.6 * Math.abs(Math.sin(s.twinkle));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,220,255,${alpha})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

const FloatingHearts = () => {
  const hearts = ["💖", "✨", "🌸", "💫", "🌙", "⭐", "💝", "🦋"];
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="absolute text-lg opacity-20"
          style={{
            left: `${5 + (i * 8.5) % 95}%`,
            animationName: "floatUp",
            animationDuration: `${8 + (i * 3) % 7}s`,
            animationDelay: `${(i * 1.3) % 6}s`,
            animationIterationCount: "infinite",
            animationTimingFunction: "ease-in-out",
            bottom: "-10%",
          }}
        >
          {hearts[i % hearts.length]}
        </div>
      ))}
    </div>
  );
};

const LogoHeader = () => (
  <div className="relative z-10 text-center pt-10 pb-6 select-none">
    <div
      className="inline-block relative"
      style={{ filter: "drop-shadow(0 0 40px rgba(236,72,153,0.5))" }}
    >
      <div
        className="text-6xl md:text-8xl font-black tracking-tight"
        style={{
          background: "linear-gradient(135deg, #f9a8d4 0%, #ec4899 30%, #a78bfa 60%, #c084fc 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          letterSpacing: "-2px",
          fontFamily: "'Georgia', serif",
        }}
      >
        Аксинья
      </div>
      <div
        className="text-xs md:text-sm tracking-[0.4em] uppercase mt-1 opacity-60"
        style={{ color: "#f9a8d4", fontFamily: "monospace" }}
      >
        ✦ личная вселенная ✦
      </div>
    </div>
    <div className="mt-3 flex justify-center gap-3">
      {[AKSINIA_1, AKSINIA_2, AKSINIA_3, AKSINIA_5].map((src, i) => (
        <div
          key={i}
          className="rounded-full overflow-hidden border-2 w-10 h-10 md:w-12 md:h-12"
          style={{
            borderColor: i === 0 ? "#ec4899" : i === 1 ? "#a78bfa" : i === 2 ? "#34d399" : "#fbbf24",
            boxShadow: `0 0 12px ${i === 0 ? "#ec489980" : i === 1 ? "#a78bfa80" : i === 2 ? "#34d39980" : "#fbbf2480"}`,
            transition: "transform 0.2s",
          }}
        >
          <img src={src} alt="" className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  </div>
);

const TabBar = ({
  active,
  onChange,
}: {
  active: string;
  onChange: (t: string) => void;
}) => {
  const tabs = [
    { id: "wishes", label: "🌟 Мечты", desc: "Карта желаний" },
    { id: "notes", label: "📝 Заметки", desc: "Мысли и идеи" },
    { id: "valentine", label: "💌 Валентинка", desc: "Сюрприз" },
  ];
  return (
    <div className="relative z-10 flex justify-center px-4 mb-8">
      <div
        className="flex gap-1 p-1 rounded-2xl"
        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
      >
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            className="px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 whitespace-nowrap"
            style={
              active === t.id
                ? {
                    background: "linear-gradient(135deg, #ec4899, #a78bfa)",
                    color: "#fff",
                    boxShadow: "0 4px 20px rgba(236,72,153,0.4)",
                    transform: "scale(1.05)",
                  }
                : { color: "rgba(255,255,255,0.5)" }
            }
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
};

const ProgressRing = ({ pct, color }: { pct: number; color: string }) => {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <svg width={70} height={70} className="flex-shrink-0">
      <circle cx={35} cy={35} r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={5} />
      <circle
        cx={35} cy={35} r={r}
        fill="none"
        stroke={color}
        strokeWidth={5}
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 35 35)"
        style={{ transition: "stroke-dashoffset 1s ease", filter: `drop-shadow(0 0 6px ${color})` }}
      />
      <text x={35} y={40} textAnchor="middle" fill="#fff" fontSize={13} fontWeight="bold">
        {pct}%
      </text>
    </svg>
  );
};

const WishCard = ({
  wish,
  onUpdate,
  onDelete,
}: {
  wish: Wish;
  onUpdate: (id: number, data: Partial<Wish>) => void;
  onDelete: (id: number) => void;
}) => {
  const [expanded, setExpanded] = useState(false);
  const [editProgress, setEditProgress] = useState(false);
  const [progVal, setProgVal] = useState(wish.progress);
  const meta = CATEGORY_META[wish.category] || CATEGORY_META.dream;

  const saveProgress = () => {
    onUpdate(wish.id, { progress: progVal });
    setEditProgress(false);
  };

  const toggleStep = (stepIdx: number) => {
    const newRoadmap = wish.roadmap.map((s, i) =>
      i === stepIdx ? { ...s, done: !s.done } : s
    );
    const done = newRoadmap.filter((s) => s.done).length;
    const pct = Math.round((done / newRoadmap.length) * 100);
    onUpdate(wish.id, { roadmap: newRoadmap, progress: pct });
  };

  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: `1px solid ${meta.color}33`,
        boxShadow: expanded ? `0 8px 40px ${meta.color}22` : "none",
      }}
    >
      <div
        className="flex items-center gap-4 p-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
          style={{ background: `${meta.color}22`, border: `1px solid ${meta.color}44` }}
        >
          {meta.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-white text-sm md:text-base truncate">{wish.title}</div>
          <div className="text-xs opacity-50 mt-0.5">{meta.label}</div>
        </div>
        <ProgressRing pct={wish.progress} color={meta.color} />
        <div
          className="text-white opacity-30 transition-transform duration-300"
          style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          ▼
        </div>
      </div>

      {expanded && (
        <div className="px-4 pb-4 space-y-4">
          {wish.description && (
            <p className="text-sm opacity-60 leading-relaxed">{wish.description}</p>
          )}

          <div className="flex items-center gap-3">
            {editProgress ? (
              <div className="flex items-center gap-2 flex-1">
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={progVal}
                  onChange={(e) => setProgVal(+e.target.value)}
                  className="flex-1"
                  style={{ accentColor: meta.color }}
                />
                <span className="text-white text-sm w-10 text-center">{progVal}%</span>
                <button
                  onClick={saveProgress}
                  className="px-3 py-1 rounded-lg text-xs font-semibold text-white"
                  style={{ background: meta.color }}
                >
                  ✓
                </button>
              </div>
            ) : (
              <button
                onClick={() => setEditProgress(true)}
                className="text-xs px-3 py-1 rounded-lg opacity-50 hover:opacity-100 transition-opacity"
                style={{ border: `1px solid ${meta.color}66`, color: meta.color }}
              >
                Обновить прогресс
              </button>
            )}
            {!wish.is_preset && (
              <button
                onClick={() => onDelete(wish.id)}
                className="text-xs px-2 py-1 rounded-lg opacity-30 hover:opacity-70 transition-opacity text-red-400"
              >
                ✕
              </button>
            )}
          </div>

          {wish.roadmap && wish.roadmap.length > 0 && (
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider opacity-40 mb-2">
                Дорожная карта
              </div>
              <div className="space-y-2">
                {wish.roadmap.map((step, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 cursor-pointer group"
                    onClick={() => toggleStep(i)}
                  >
                    <div
                      className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-xs mt-0.5 transition-all duration-300"
                      style={
                        step.done
                          ? { background: meta.color, boxShadow: `0 0 8px ${meta.color}` }
                          : { border: `2px solid ${meta.color}66` }
                      }
                    >
                      {step.done && "✓"}
                    </div>
                    <div>
                      <div
                        className="text-sm font-medium transition-colors"
                        style={{ color: step.done ? meta.color : "rgba(255,255,255,0.7)" }}
                      >
                        {step.title}
                      </div>
                      <div className="text-xs opacity-40 mt-0.5">{step.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const WishesTab = () => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newCat, setNewCat] = useState("dream");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch(`${API_URL}/wishes`)
      .then((r) => r.json())
      .then((d) => { setWishes(d.wishes || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const updateWish = async (id: number, data: Partial<Wish>) => {
    await fetch(`${API_URL}/wishes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setWishes((prev) =>
      prev.map((w) => (w.id === id ? { ...w, ...data } : w))
    );
  };

  const deleteWish = async (id: number) => {
    await fetch(`${API_URL}/wishes/${id}`, { method: "DELETE" });
    setWishes((prev) => prev.filter((w) => w.id !== id));
  };

  const addWish = async () => {
    if (!newTitle.trim()) return;
    const res = await fetch(`${API_URL}/wishes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle, description: newDesc, category: newCat }),
    });
    const data = await res.json();
    setWishes((prev) => [
      {
        id: data.id, title: newTitle, description: newDesc,
        category: newCat, progress: 0, status: "active",
        cover_url: null, links: [], roadmap: [], is_preset: false,
        created_at: new Date().toISOString(),
      },
      ...prev,
    ]);
    setNewTitle("");
    setNewDesc("");
    setShowAdd(false);
  };

  const filtered = filter === "all" ? wishes : wishes.filter((w) => w.category === filter);
  const totalProgress = wishes.length
    ? Math.round(wishes.reduce((s, w) => s + w.progress, 0) / wishes.length)
    : 0;

  return (
    <div className="space-y-6">
      <div
        className="rounded-2xl p-5 text-center"
        style={{
          background: "linear-gradient(135deg, rgba(236,72,153,0.15), rgba(167,139,250,0.15))",
          border: "1px solid rgba(236,72,153,0.2)",
        }}
      >
        <div className="text-4xl font-black text-white mb-1">{totalProgress}%</div>
        <div className="text-xs opacity-50 uppercase tracking-widest">Общий прогресс мечты</div>
        <div className="mt-3 h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{
              width: `${totalProgress}%`,
              background: "linear-gradient(90deg, #ec4899, #a78bfa)",
              boxShadow: "0 0 12px rgba(236,72,153,0.6)",
            }}
          />
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {["all", ...Object.keys(CATEGORY_META)].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className="px-3 py-1 rounded-xl text-xs font-semibold transition-all duration-200"
            style={
              filter === cat
                ? {
                    background: cat === "all" ? "#ec4899" : CATEGORY_META[cat]?.color,
                    color: "#fff",
                    boxShadow: `0 0 10px ${cat === "all" ? "#ec4899" : CATEGORY_META[cat]?.color}66`,
                  }
                : { background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }
            }
          >
            {cat === "all" ? "✨ Все" : `${CATEGORY_META[cat].icon} ${CATEGORY_META[cat].label}`}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-12 opacity-40 text-white">Загружаю звёзды...</div>
      ) : (
        <div className="space-y-3">
          {filtered.map((w) => (
            <WishCard key={w.id} wish={w} onUpdate={updateWish} onDelete={deleteWish} />
          ))}
        </div>
      )}

      {showAdd ? (
        <div
          className="rounded-2xl p-4 space-y-3"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(236,72,153,0.3)" }}
        >
          <input
            placeholder="Название мечты..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full bg-transparent text-white placeholder-white/30 text-sm outline-none border-b border-white/10 pb-2"
            autoFocus
          />
          <textarea
            placeholder="Описание (необязательно)..."
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            className="w-full bg-transparent text-white placeholder-white/30 text-sm outline-none resize-none"
            rows={2}
          />
          <select
            value={newCat}
            onChange={(e) => setNewCat(e.target.value)}
            className="w-full bg-black/40 text-white text-sm rounded-lg px-3 py-2 outline-none border border-white/10"
          >
            {Object.entries(CATEGORY_META).map(([k, v]) => (
              <option key={k} value={k}>{v.icon} {v.label}</option>
            ))}
          </select>
          <div className="flex gap-2">
            <button
              onClick={addWish}
              className="flex-1 py-2 rounded-xl text-sm font-bold text-white"
              style={{ background: "linear-gradient(135deg, #ec4899, #a78bfa)" }}
            >
              Добавить мечту ✨
            </button>
            <button
              onClick={() => setShowAdd(false)}
              className="px-4 py-2 rounded-xl text-sm text-white/40"
            >
              Отмена
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowAdd(true)}
          className="w-full py-4 rounded-2xl text-sm font-semibold text-white/50 hover:text-white transition-all duration-300 hover:border-pink-400/40"
          style={{ border: "2px dashed rgba(255,255,255,0.1)" }}
        >
          + Добавить новую мечту
        </button>
      )}
    </div>
  );
};

const NoteCard = ({ note, onDelete }: { note: Note; onDelete: (id: number) => void }) => {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className="rounded-2xl p-4 cursor-pointer transition-all duration-300 hover:scale-[1.02]"
      style={{
        background: `${note.color}15`,
        border: `1px solid ${note.color}44`,
        boxShadow: flipped ? `0 8px 30px ${note.color}33` : "none",
        position: "relative",
      }}
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full"
        style={{ background: note.color, boxShadow: `0 0 8px ${note.color}` }}
      />
      {note.title && (
        <div className="font-bold text-sm text-white mb-1">{note.title}</div>
      )}
      <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
        {note.content}
      </p>
      {note.link && (
        <a
          href={note.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs mt-2 block truncate"
          style={{ color: note.color }}
          onClick={(e) => e.stopPropagation()}
        >
          🔗 {note.link}
        </a>
      )}
      {note.image_url && (
        <img
          src={note.image_url}
          alt=""
          className="mt-2 w-full rounded-xl object-cover max-h-32"
        />
      )}
      <div className="text-xs opacity-30 mt-2">
        {new Date(note.created_at).toLocaleDateString("ru-RU")}
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); onDelete(note.id); }}
        className="absolute bottom-2 right-2 text-xs opacity-20 hover:opacity-60 text-red-400 transition-opacity"
      >
        ✕
      </button>
    </div>
  );
};

const NotesTab = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ title: "", content: "", link: "", color: "#ff6b9d" });

  useEffect(() => {
    fetch(`${API_URL}/notes`)
      .then((r) => r.json())
      .then((d) => { setNotes(d.notes || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const addNote = async () => {
    if (!form.content.trim()) return;
    const res = await fetch(`${API_URL}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setNotes((prev) => [
      {
        id: data.id, title: form.title, content: form.content,
        type: "note", image_url: null, link: form.link || null,
        color: form.color, created_at: new Date().toISOString(),
      },
      ...prev,
    ]);
    setForm({ title: "", content: "", link: "", color: "#ff6b9d" });
    setShowAdd(false);
  };

  const deleteNote = async (id: number) => {
    await fetch(`${API_URL}/notes/${id}`, { method: "DELETE" });
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm opacity-40 text-white">
          {notes.length} {notes.length === 1 ? "заметка" : notes.length < 5 ? "заметки" : "заметок"}
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="px-4 py-2 rounded-xl text-sm font-semibold text-white"
          style={{ background: "linear-gradient(135deg, #ec4899, #a78bfa)" }}
        >
          + Заметка
        </button>
      </div>

      {showAdd && (
        <div
          className="rounded-2xl p-4 space-y-3"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(167,139,250,0.3)" }}
        >
          <input
            placeholder="Заголовок (необязательно)..."
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            className="w-full bg-transparent text-white placeholder-white/30 text-sm outline-none border-b border-white/10 pb-2"
            autoFocus
          />
          <textarea
            placeholder="Напиши что угодно — мысль, идею, мечту, ссылку..."
            value={form.content}
            onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
            className="w-full bg-transparent text-white placeholder-white/30 text-sm outline-none resize-none"
            rows={3}
          />
          <input
            placeholder="Ссылка (необязательно)..."
            value={form.link}
            onChange={(e) => setForm((f) => ({ ...f, link: e.target.value }))}
            className="w-full bg-transparent text-white placeholder-white/30 text-sm outline-none border-b border-white/10 pb-2"
          />
          <div className="flex gap-2 items-center">
            <span className="text-xs opacity-40 text-white">Цвет:</span>
            {NOTE_COLORS.map((c) => (
              <button
                key={c}
                onClick={() => setForm((f) => ({ ...f, color: c }))}
                className="w-6 h-6 rounded-full transition-transform"
                style={{
                  background: c,
                  transform: form.color === c ? "scale(1.3)" : "scale(1)",
                  boxShadow: form.color === c ? `0 0 10px ${c}` : "none",
                }}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={addNote}
              className="flex-1 py-2 rounded-xl text-sm font-bold text-white"
              style={{ background: "linear-gradient(135deg, #a78bfa, #ec4899)" }}
            >
              Сохранить 💫
            </button>
            <button
              onClick={() => setShowAdd(false)}
              className="px-4 py-2 rounded-xl text-sm text-white/40"
            >
              Отмена
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12 opacity-40 text-white">Загружаю заметки...</div>
      ) : notes.length === 0 ? (
        <div className="text-center py-16 opacity-30 text-white">
          <div className="text-4xl mb-3">📝</div>
          <div>Здесь будут твои мысли и идеи</div>
        </div>
      ) : (
        <div className="columns-1 md:columns-2 gap-3 space-y-3">
          {notes.map((n) => (
            <div key={n.id} className="break-inside-avoid">
              <NoteCard note={n} onDelete={deleteNote} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const SurprisesSection = () => {
  const surprises = [
    { icon: "💌", title: "Валентинка", desc: "Письмо написанное от сердца", tab: "valentine" },
  ];
  return (
    <div className="space-y-3">
      <div className="text-xs font-semibold uppercase tracking-widest opacity-30 text-white text-center mb-4">
        Сюрпризы от Дениса
      </div>
      {surprises.map((s, i) => (
        <div
          key={i}
          className="flex items-center gap-4 p-4 rounded-2xl"
          style={{
            background: "rgba(236,72,153,0.08)",
            border: "1px solid rgba(236,72,153,0.2)",
          }}
        >
          <div className="text-3xl">{s.icon}</div>
          <div>
            <div className="text-white font-semibold text-sm">{s.title}</div>
            <div className="text-xs opacity-40 mt-0.5">{s.desc}</div>
          </div>
          <div className="ml-auto">
            <div className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default function Aksinia() {
  const [tab, setTab] = useState("wishes");

  return (
    <div
      className="min-h-screen relative"
      style={{
        background: "linear-gradient(160deg, #0f0515 0%, #0a0a1a 40%, #0d0520 100%)",
        color: "#fff",
      }}
    >
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.2; }
          90% { opacity: 0.1; }
          100% { transform: translateY(-110vh) rotate(20deg); opacity: 0; }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(236,72,153,0.3); }
          50% { box-shadow: 0 0 40px rgba(236,72,153,0.6); }
        }
      `}</style>

      <StarField />
      <FloatingHearts />

      <div className="relative z-10 max-w-2xl mx-auto px-4 pb-20">
        <LogoHeader />
        <TabBar active={tab} onChange={setTab} />

        {tab === "wishes" && <WishesTab />}
        {tab === "notes" && (
          <div className="space-y-6">
            <NotesTab />
            <SurprisesSection />
          </div>
        )}
        {tab === "valentine" && (
          <div className="rounded-3xl overflow-hidden" style={{ border: "1px solid rgba(236,72,153,0.2)" }}>
            <Valentine />
          </div>
        )}
      </div>
    </div>
  );
}
