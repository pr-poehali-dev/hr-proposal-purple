import { useState, useEffect, useRef, useCallback } from "react";
import Valentine from "./Valentine";
import Birthday from "./Birthday";

const API = "https://functions.poehali.dev/1fd6b3fb-20ce-4c8f-8499-f1579b94d1ce";
const api = (action: string) => `${API}?action=${action}`;

const AKSINIA_1 = "https://cdn.poehali.dev/projects/6a20b3ba-2ddc-4572-8d85-e4c62f8d7e40/bucket/957e3bcf-bb03-4864-a25c-187913323315.jpg";
const AKSINIA_2 = "https://cdn.poehali.dev/projects/6a20b3ba-2ddc-4572-8d85-e4c62f8d7e40/bucket/5761686f-bee5-486b-9109-ce2b92303d08.jpg";
const AKSINIA_3 = "https://cdn.poehali.dev/projects/6a20b3ba-2ddc-4572-8d85-e4c62f8d7e40/bucket/ab451697-26a3-405a-8284-e87ff32d7769.jpg";
const AKSINIA_5 = "https://cdn.poehali.dev/projects/6a20b3ba-2ddc-4572-8d85-e4c62f8d7e40/bucket/7397ac7b-e549-4932-bd8e-740b8767abf8.jpg";

const CAT: Record<string, { icon: string; color: string; label: string }> = {
  career:    { icon: "👑", color: "#f59e0b", label: "Карьера" },
  travel:    { icon: "✈️", color: "#06b6d4", label: "Путешествия" },
  nature:    { icon: "🌊", color: "#10b981", label: "Природа" },
  adventure: { icon: "🏔️", color: "#8b5cf6", label: "Приключения" },
  dream:     { icon: "⭐", color: "#ec4899", label: "Мечты" },
};
const NOTE_COLORS = ["#ff6b9d", "#a78bfa", "#34d399", "#fbbf24", "#60a5fa", "#f87171"];

interface Wish {
  id: number; title: string; description: string; category: string;
  progress: number; status: string; cover_url: string | null;
  links: string[]; roadmap: { step: number; title: string; desc: string; done: boolean }[];
  is_preset: boolean; created_at: string;
}
interface Note {
  id: number; title: string; content: string; type: string;
  image_url: string | null; link: string | null; color: string;
  file_urls: string[]; created_at: string;
}
interface Msg {
  id: number; sender: string; content: string; type: string;
  file_url: string | null; file_name: string | null; file_type: string | null;
  duration_sec: number | null; read_at: string | null; created_at: string;
}

const toB64 = (file: File): Promise<string> =>
  new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res((r.result as string).split(",")[1]);
    r.onerror = rej;
    r.readAsDataURL(file);
  });

const post = (action: string, body: object) =>
  fetch(api(action), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then((r) => r.json());

const StarField = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d")!;
    c.width = window.innerWidth; c.height = window.innerHeight;
    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * c.width, y: Math.random() * c.height,
      r: Math.random() * 1.6 + 0.2, t: Math.random() * Math.PI * 2,
      sp: Math.random() * 0.03 + 0.01,
    }));
    let id: number;
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      stars.forEach((s) => {
        s.t += s.sp;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,220,255,${0.3 + 0.7 * Math.abs(Math.sin(s.t))})`;
        ctx.fill();
      });
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(id);
  }, []);
  return <canvas ref={ref} className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} />;
};

const Floaters = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
    {["💖","✨","🌸","💫","🌙","⭐","💝","🦋","🌺","💕","🎀","🌟"].map((e, i) => (
      <div key={i} className="absolute text-lg opacity-15"
        style={{ left: `${5 + (i * 8.1) % 92}%`, bottom: "-5%",
          animation: `floatUp ${9 + (i * 2.3) % 7}s ${(i * 1.1) % 5}s infinite ease-in-out` }}>{e}</div>
    ))}
  </div>
);

const InstallPWA = () => {
  const [prompt, setPrompt] = useState<Event | null>(null);
  const [installed, setInstalled] = useState(false);
  useEffect(() => {
    const handler = (e: Event) => { e.preventDefault(); setPrompt(e); };
    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", () => setInstalled(true));
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);
  if (installed) return <div className="text-xs text-center opacity-40 text-green-400 mb-2">✓ Приложение установлено!</div>;
  if (!prompt) return null;
  const install = async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const p = prompt as any;
    p.prompt();
    await p.userChoice;
    setPrompt(null);
  };
  return (
    <div className="mb-4 flex justify-center">
      <button onClick={install} className="flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-semibold text-white animate-pulse"
        style={{ background: "linear-gradient(135deg,rgba(236,72,153,0.3),rgba(167,139,250,0.3))", border: "1px solid rgba(236,72,153,0.4)", boxShadow: "0 0 20px rgba(236,72,153,0.2)" }}>
        📱 Установить на телефон
      </button>
    </div>
  );
};

const Header = () => (
  <div className="relative z-10 text-center pt-10 pb-5 select-none">
    <div style={{ filter: "drop-shadow(0 0 50px rgba(236,72,153,0.5))" }}>
      <div className="text-6xl md:text-8xl font-black" style={{
        background: "linear-gradient(135deg,#fda4d3,#ec4899,#a78bfa,#c084fc)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        backgroundClip: "text", fontFamily: "'Georgia',serif", letterSpacing: "-2px",
      }}>Аксинья</div>
      <div className="text-xs tracking-[0.5em] uppercase mt-1 opacity-50" style={{ color: "#f9a8d4", fontFamily: "monospace" }}>
        ✦ личная вселенная ✦
      </div>
    </div>
    <div className="mt-3 flex justify-center gap-2">
      {[AKSINIA_1, AKSINIA_2, AKSINIA_3, AKSINIA_5].map((src, i) => (
        <div key={i} className="rounded-full overflow-hidden w-10 h-10 border-2"
          style={{ borderColor: ["#ec4899","#a78bfa","#34d399","#fbbf24"][i], boxShadow: `0 0 12px ${["#ec489960","#a78bfa60","#34d39960","#fbbf2460"][i]}` }}>
          <img src={src} alt="" className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
    <div className="mt-4"><InstallPWA /></div>
  </div>
);

const TABS = [
  { id: "wishes", label: "🌟 Мечты" },
  { id: "notes", label: "📝 Заметки" },
  { id: "chat", label: "💬 Чат" },
  { id: "valentine", label: "💌 Валентинка" },
  { id: "birthday", label: "🎂 День Рождения" },
];
const TabBar = ({ active, onChange }: { active: string; onChange: (t: string) => void }) => (
  <div className="relative z-10 flex justify-center px-4 mb-8">
    <div className="flex gap-1 p-1 rounded-2xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
      {TABS.map((t) => (
        <button key={t.id} onClick={() => onChange(t.id)}
          className="px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-300 whitespace-nowrap"
          style={active === t.id
            ? { background: "linear-gradient(135deg,#ec4899,#a78bfa)", color: "#fff", boxShadow: "0 4px 20px rgba(236,72,153,0.4)", transform: "scale(1.05)" }
            : { color: "rgba(255,255,255,0.45)" }}>
          {t.label}
        </button>
      ))}
    </div>
  </div>
);

const Ring = ({ pct, color }: { pct: number; color: string }) => {
  const r = 28, circ = 2 * Math.PI * r, off = circ - (pct / 100) * circ;
  return (
    <svg width={70} height={70} className="flex-shrink-0">
      <circle cx={35} cy={35} r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={5} />
      <circle cx={35} cy={35} r={r} fill="none" stroke={color} strokeWidth={5}
        strokeDasharray={circ} strokeDashoffset={off} strokeLinecap="round"
        transform="rotate(-90 35 35)"
        style={{ transition: "stroke-dashoffset 1s ease", filter: `drop-shadow(0 0 6px ${color})` }} />
      <text x={35} y={40} textAnchor="middle" fill="#fff" fontSize={13} fontWeight="bold">{pct}%</text>
    </svg>
  );
};

const WishCard = ({ wish, onUpdate, onDelete }: { wish: Wish; onUpdate: (id: number, d: Partial<Wish>) => void; onDelete: (id: number) => void }) => {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editProg, setEditProg] = useState(false);
  const [prog, setProg] = useState(wish.progress);
  const [editTitle, setEditTitle] = useState(wish.title);
  const [editDesc, setEditDesc] = useState(wish.description);
  const [editCat, setEditCat] = useState(wish.category);
  const [localRoadmap, setLocalRoadmap] = useState(wish.roadmap || []);
  const [newStep, setNewStep] = useState({ title: "", desc: "" });
  const [addingStep, setAddingStep] = useState(false);
  const m = CAT[editCat] || CAT.dream;

  useEffect(() => { setProg(wish.progress); setEditTitle(wish.title); setEditDesc(wish.description); setEditCat(wish.category); setLocalRoadmap(wish.roadmap || []); }, [wish]);

  const saveProg = () => { onUpdate(wish.id, { progress: prog }); setEditProg(false); };
  const toggleStep = (i: number) => {
    const rm = localRoadmap.map((s, j) => j === i ? { ...s, done: !s.done } : s);
    const pct = rm.length ? Math.round(rm.filter((s) => s.done).length / rm.length * 100) : prog;
    setLocalRoadmap(rm);
    onUpdate(wish.id, { roadmap: rm, progress: pct });
  };
  const deleteStep = (i: number) => {
    const rm = localRoadmap.filter((_, j) => j !== i);
    const pct = rm.length ? Math.round(rm.filter((s) => s.done).length / rm.length * 100) : 0;
    setLocalRoadmap(rm);
    onUpdate(wish.id, { roadmap: rm, progress: pct });
  };
  const addStep = () => {
    if (!newStep.title.trim()) return;
    const rm = [...localRoadmap, { step: localRoadmap.length + 1, title: newStep.title, desc: newStep.desc, done: false }];
    setLocalRoadmap(rm);
    onUpdate(wish.id, { roadmap: rm });
    setNewStep({ title: "", desc: "" }); setAddingStep(false);
  };
  const saveEdit = () => {
    onUpdate(wish.id, { title: editTitle, description: editDesc, category: editCat });
    setEditing(false);
  };

  return (
    <div className="rounded-2xl overflow-hidden transition-all duration-300"
      style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${m.color}33`, boxShadow: open ? `0 8px 40px ${m.color}22` : "none" }}>
      <div className="flex items-center gap-4 p-4 cursor-pointer" onClick={() => setOpen(!open)}>
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
          style={{ background: `${m.color}22`, border: `1px solid ${m.color}44` }}>{m.icon}</div>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-white text-sm md:text-base truncate">{wish.title}</div>
          <div className="text-xs opacity-50 mt-0.5">{m.label}</div>
        </div>
        <Ring pct={wish.progress} color={m.color} />
        <div className="text-white opacity-30 transition-transform duration-300" style={{ transform: open ? "rotate(180deg)" : "none" }}>▼</div>
      </div>
      {open && (
        <div className="px-4 pb-4 space-y-4">
          {editing ? (
            <div className="space-y-2 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.04)" }}>
              <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)}
                className="w-full bg-transparent text-white text-sm outline-none border-b border-white/10 pb-1" placeholder="Название..." />
              <textarea value={editDesc} onChange={(e) => setEditDesc(e.target.value)}
                className="w-full bg-transparent text-white text-sm outline-none resize-none" rows={2} placeholder="Описание..." />
              <select value={editCat} onChange={(e) => setEditCat(e.target.value)}
                className="w-full bg-black/40 text-white text-xs rounded-lg px-2 py-1.5 outline-none border border-white/10">
                {Object.entries(CAT).map(([k, v]) => <option key={k} value={k}>{v.icon} {v.label}</option>)}
              </select>
              <div className="flex gap-2">
                <button onClick={saveEdit} className="flex-1 py-1.5 rounded-lg text-xs font-bold text-white" style={{ background: m.color }}>Сохранить</button>
                <button onClick={() => setEditing(false)} className="px-3 py-1.5 rounded-lg text-xs text-white/40">Отмена</button>
              </div>
            </div>
          ) : (
            <p className="text-sm opacity-60 leading-relaxed">{wish.description}</p>
          )}

          <div className="flex items-center gap-2 flex-wrap">
            {editProg ? (
              <div className="flex items-center gap-2 flex-1">
                <input type="range" min={0} max={100} value={prog} onChange={(e) => setProg(+e.target.value)} className="flex-1" style={{ accentColor: m.color }} />
                <span className="text-white text-sm w-10 text-center">{prog}%</span>
                <button onClick={saveProg} className="px-3 py-1 rounded-lg text-xs font-semibold text-white" style={{ background: m.color }}>✓</button>
              </div>
            ) : (
              <button onClick={() => setEditProg(true)} className="text-xs px-3 py-1 rounded-lg opacity-50 hover:opacity-100"
                style={{ border: `1px solid ${m.color}66`, color: m.color }}>Прогресс</button>
            )}
            {!editing && <button onClick={() => setEditing(true)} className="text-xs px-3 py-1 rounded-lg opacity-50 hover:opacity-100"
              style={{ border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.6)" }}>✏️ Редактировать</button>}
            <button onClick={() => onDelete(wish.id)} className="text-xs px-2 py-1 rounded-lg opacity-30 hover:opacity-70 text-red-400">✕</button>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs font-semibold uppercase tracking-wider opacity-40">Дорожная карта</div>
              <button onClick={() => setAddingStep(true)} className="text-xs px-2 py-1 rounded-lg opacity-50 hover:opacity-100"
                style={{ border: `1px solid ${m.color}44`, color: m.color }}>+ этап</button>
            </div>
            <div className="space-y-2">
              {localRoadmap.map((s, i) => (
                <div key={i} className="flex items-start gap-3 group">
                  <div className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-xs mt-0.5 cursor-pointer transition-all"
                    style={s.done ? { background: m.color, boxShadow: `0 0 8px ${m.color}` } : { border: `2px solid ${m.color}66` }}
                    onClick={() => toggleStep(i)}>
                    {s.done && "✓"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium" style={{ color: s.done ? m.color : "rgba(255,255,255,0.7)" }}>{s.title}</div>
                    <div className="text-xs opacity-40 mt-0.5">{s.desc}</div>
                  </div>
                  <button onClick={() => deleteStep(i)} className="text-xs opacity-0 group-hover:opacity-50 hover:opacity-100 text-red-400 transition-opacity flex-shrink-0">✕</button>
                </div>
              ))}
              {addingStep && (
                <div className="p-3 rounded-xl space-y-2" style={{ background: `${m.color}11`, border: `1px solid ${m.color}33` }}>
                  <input value={newStep.title} onChange={(e) => setNewStep((s) => ({ ...s, title: e.target.value }))} autoFocus
                    placeholder="Название этапа..." className="w-full bg-transparent text-white text-xs outline-none border-b border-white/10 pb-1" />
                  <input value={newStep.desc} onChange={(e) => setNewStep((s) => ({ ...s, desc: e.target.value }))}
                    placeholder="Описание..." className="w-full bg-transparent text-white text-xs outline-none" />
                  <div className="flex gap-2">
                    <button onClick={addStep} className="flex-1 py-1 rounded-lg text-xs font-bold text-white" style={{ background: m.color }}>Добавить</button>
                    <button onClick={() => { setAddingStep(false); setNewStep({ title: "", desc: "" }); }} className="px-3 py-1 rounded-lg text-xs text-white/40">Отмена</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const WishesTab = () => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ title: "", desc: "", cat: "dream" });
  const [newSteps, setNewSteps] = useState<{ title: string; desc: string }[]>([]);
  const [addingStep, setAddingStep] = useState(false);
  const [stepForm, setStepForm] = useState({ title: "", desc: "" });
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch(api("wishes")).then((r) => r.json())
      .then((d) => { setWishes(d.wishes || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const update = async (id: number, data: Partial<Wish>) => {
    await post("wish_update", { id, ...data });
    setWishes((p) => p.map((w) => w.id === id ? { ...w, ...data } : w));
  };
  const del = async (id: number) => { await post("wish_delete", { id }); setWishes((p) => p.filter((w) => w.id !== id)); };
  const addStepToNew = () => {
    if (!stepForm.title.trim()) return;
    setNewSteps((p) => [...p, stepForm]);
    setStepForm({ title: "", desc: "" }); setAddingStep(false);
  };
  const add = async () => {
    if (!form.title.trim()) return;
    const roadmap = newSteps.map((s, i) => ({ step: i + 1, title: s.title, desc: s.desc, done: false }));
    const d = await post("wishes", { title: form.title, description: form.desc, category: form.cat, roadmap });
    setWishes((p) => [{ id: d.id, title: form.title, description: form.desc, category: form.cat, progress: 0, status: "active", cover_url: null, links: [], roadmap, is_preset: false, created_at: new Date().toISOString() }, ...p]);
    setForm({ title: "", desc: "", cat: "dream" }); setNewSteps([]); setShowAdd(false);
  };

  const total = wishes.length ? Math.round(wishes.reduce((s, w) => s + w.progress, 0) / wishes.length) : 0;
  const filtered = filter === "all" ? wishes : wishes.filter((w) => w.category === filter);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl p-5 text-center"
        style={{ background: "linear-gradient(135deg,rgba(236,72,153,0.15),rgba(167,139,250,0.15))", border: "1px solid rgba(236,72,153,0.2)" }}>
        <div className="text-5xl font-black text-white mb-1">{total}%</div>
        <div className="text-xs opacity-50 uppercase tracking-widest">Общий прогресс мечты</div>
        <div className="mt-3 h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
          <div className="h-full rounded-full transition-all duration-1000"
            style={{ width: `${total}%`, background: "linear-gradient(90deg,#ec4899,#a78bfa)", boxShadow: "0 0 12px rgba(236,72,153,0.6)" }} />
        </div>
      </div>
      <div className="flex gap-2 flex-wrap">
        {["all", ...Object.keys(CAT)].map((cat) => (
          <button key={cat} onClick={() => setFilter(cat)} className="px-3 py-1 rounded-xl text-xs font-semibold transition-all"
            style={filter === cat
              ? { background: cat === "all" ? "#ec4899" : CAT[cat]?.color, color: "#fff", boxShadow: `0 0 10px ${cat === "all" ? "#ec489966" : (CAT[cat]?.color || "#ec4899") + "66"}` }
              : { background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}>
            {cat === "all" ? "✨ Все" : `${CAT[cat].icon} ${CAT[cat].label}`}
          </button>
        ))}
      </div>
      {loading ? <div className="text-center py-12 opacity-40 text-white">Загружаю звёзды...</div> : (
        <div className="space-y-3">{filtered.map((w) => <WishCard key={w.id} wish={w} onUpdate={update} onDelete={del} />)}</div>
      )}
      {showAdd ? (
        <div className="rounded-2xl p-4 space-y-3" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(236,72,153,0.3)" }}>
          <input placeholder="Название мечты..." value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            className="w-full bg-transparent text-white placeholder-white/30 text-sm outline-none border-b border-white/10 pb-2" autoFocus />
          <textarea placeholder="Описание..." value={form.desc} onChange={(e) => setForm((f) => ({ ...f, desc: e.target.value }))}
            className="w-full bg-transparent text-white placeholder-white/30 text-sm outline-none resize-none" rows={2} />
          <select value={form.cat} onChange={(e) => setForm((f) => ({ ...f, cat: e.target.value }))}
            className="w-full bg-black/40 text-white text-sm rounded-lg px-3 py-2 outline-none border border-white/10">
            {Object.entries(CAT).map(([k, v]) => <option key={k} value={k}>{v.icon} {v.label}</option>)}
          </select>

          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs opacity-40 text-white">Дорожная карта ({newSteps.length} этапов)</div>
              <button onClick={() => setAddingStep(true)} className="text-xs px-2 py-1 rounded-lg"
                style={{ border: "1px solid rgba(236,72,153,0.4)", color: "#ec4899" }}>+ этап</button>
            </div>
            {newSteps.length > 0 && (
              <div className="space-y-1 mb-2">
                {newSteps.map((s, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full flex-shrink-0" style={{ background: "rgba(236,72,153,0.3)", border: "1px solid rgba(236,72,153,0.5)" }} />
                    <div className="flex-1 text-xs text-white/70">{s.title}</div>
                    <button onClick={() => setNewSteps((p) => p.filter((_, j) => j !== i))} className="text-xs text-red-400 opacity-50 hover:opacity-100">✕</button>
                  </div>
                ))}
              </div>
            )}
            {addingStep && (
              <div className="p-3 rounded-xl space-y-2" style={{ background: "rgba(236,72,153,0.08)", border: "1px solid rgba(236,72,153,0.2)" }}>
                <input value={stepForm.title} onChange={(e) => setStepForm((s) => ({ ...s, title: e.target.value }))} autoFocus
                  placeholder="Название этапа..." className="w-full bg-transparent text-white text-xs outline-none border-b border-white/10 pb-1" />
                <input value={stepForm.desc} onChange={(e) => setStepForm((s) => ({ ...s, desc: e.target.value }))}
                  placeholder="Описание..." className="w-full bg-transparent text-white text-xs outline-none" />
                <div className="flex gap-2">
                  <button onClick={addStepToNew} className="flex-1 py-1 rounded-lg text-xs font-bold text-white" style={{ background: "#ec4899" }}>Добавить</button>
                  <button onClick={() => { setAddingStep(false); setStepForm({ title: "", desc: "" }); }} className="px-3 text-xs text-white/40">Отмена</button>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <button onClick={add} className="flex-1 py-2 rounded-xl text-sm font-bold text-white"
              style={{ background: "linear-gradient(135deg,#ec4899,#a78bfa)" }}>Добавить ✨</button>
            <button onClick={() => { setShowAdd(false); setNewSteps([]); }} className="px-4 py-2 rounded-xl text-sm text-white/40">Отмена</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setShowAdd(true)} className="w-full py-4 rounded-2xl text-sm font-semibold text-white/40 hover:text-white transition-all"
          style={{ border: "2px dashed rgba(255,255,255,0.1)" }}>+ Добавить мечту</button>
      )}
    </div>
  );
};

const FileUploadBtn = ({ onUploaded, label = "📎 Прикрепить" }: { onUploaded: (url: string, name: string, mime: string) => void; label?: string }) => {
  const ref = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const handle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    setUploading(true);
    try {
      const b64 = await toB64(file);
      const d = await post("upload", { file_b64: b64, file_name: file.name, mime: file.type, folder: "aksinia" });
      onUploaded(d.url, file.name, file.type);
    } finally { setUploading(false); e.target.value = ""; }
  };
  return (
    <>
      <input ref={ref} type="file" className="hidden" accept="image/*,video/*,audio/*,.pdf,.doc,.docx" onChange={handle} />
      <button onClick={() => ref.current?.click()} disabled={uploading} className="text-xs px-3 py-1.5 rounded-lg transition-all"
        style={{ border: "1px solid rgba(167,139,250,0.4)", color: "rgba(167,139,250,0.8)" }}>
        {uploading ? "⏳ Загрузка..." : label}
      </button>
    </>
  );
};

const NoteCard = ({ note, onDelete, onUpdate }: { note: Note; onDelete: (id: number) => void; onUpdate: (id: number, d: Partial<Note>) => void }) => {
  const isImg = (url: string) => /\.(jpg|jpeg|png|gif|webp|heic)$/i.test(url);
  const isVid = (url: string) => /\.(mp4|mov|webm)$/i.test(url);
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(note.title);
  const [editContent, setEditContent] = useState(note.content);
  const [editLink, setEditLink] = useState(note.link || "");
  const [editColor, setEditColor] = useState(note.color);

  const saveEdit = () => {
    onUpdate(note.id, { title: editTitle, content: editContent, link: editLink || null, color: editColor });
    setEditing(false);
  };

  return (
    <div className="rounded-2xl p-4 transition-all duration-300"
      style={{ background: `${editColor}15`, border: `1px solid ${editColor}44`, position: "relative" }}>
      <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 rounded-full" style={{ background: editColor, boxShadow: `0 0 8px ${editColor}` }} />
      {editing ? (
        <div className="space-y-2">
          <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} placeholder="Заголовок..."
            className="w-full bg-transparent text-white text-sm font-bold outline-none border-b border-white/10 pb-1" autoFocus />
          <textarea value={editContent} onChange={(e) => setEditContent(e.target.value)}
            className="w-full bg-transparent text-white text-sm outline-none resize-none" rows={3} />
          <input value={editLink} onChange={(e) => setEditLink(e.target.value)} placeholder="Ссылка..."
            className="w-full bg-transparent text-white text-xs outline-none border-b border-white/10 pb-1" />
          <div className="flex gap-1.5 flex-wrap">
            {NOTE_COLORS.map((c) => (
              <button key={c} onClick={() => setEditColor(c)} className="w-5 h-5 rounded-full transition-transform"
                style={{ background: c, transform: editColor === c ? "scale(1.4)" : "scale(1)", boxShadow: editColor === c ? `0 0 8px ${c}` : "none" }} />
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={saveEdit} className="flex-1 py-1.5 rounded-lg text-xs font-bold text-white" style={{ background: editColor }}>Сохранить</button>
            <button onClick={() => setEditing(false)} className="px-3 py-1.5 rounded-lg text-xs text-white/40">Отмена</button>
          </div>
        </div>
      ) : (
        <>
          {note.title && <div className="font-bold text-sm text-white mb-1 pr-5">{note.title}</div>}
          {note.content && <p className="text-sm leading-relaxed opacity-80 text-white">{note.content}</p>}
          {note.link && <a href={note.link} target="_blank" rel="noopener noreferrer" className="text-xs mt-2 block truncate" style={{ color: editColor }}>🔗 {note.link}</a>}
          {note.image_url && <img src={note.image_url} alt="" className="mt-2 w-full rounded-xl object-cover max-h-48" />}
          {note.file_urls?.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {note.file_urls.map((url, i) => (
                isImg(url) ? <img key={i} src={url} alt="" className="rounded-lg object-cover h-24 w-24" /> :
                isVid(url) ? <video key={i} src={url} controls className="rounded-lg max-h-36 w-full" /> :
                <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="text-xs px-2 py-1 rounded-lg" style={{ background: `${editColor}33`, color: editColor }}>📄 Файл</a>
              ))}
            </div>
          )}
          <div className="flex items-center justify-between mt-2">
            <div className="text-xs opacity-25">{new Date(note.created_at).toLocaleDateString("ru-RU")}</div>
            <div className="flex gap-2">
              <button onClick={() => setEditing(true)} className="text-xs opacity-30 hover:opacity-70 transition-opacity" style={{ color: editColor }}>✏️</button>
              <button onClick={() => onDelete(note.id)} className="text-xs opacity-20 hover:opacity-60 text-red-400 transition-opacity">✕</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const NotesTab = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ title: "", content: "", link: "", color: "#ff6b9d" });
  const [pendingFiles, setPendingFiles] = useState<{ url: string; name: string; mime: string }[]>([]);

  useEffect(() => {
    fetch(api("notes")).then((r) => r.json())
      .then((d) => { setNotes(d.notes || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const add = async () => {
    if (!form.content.trim() && pendingFiles.length === 0) return;
    const file_urls = pendingFiles.map((f) => f.url);
    const image_url = pendingFiles.find((f) => /\.(jpg|jpeg|png|gif|webp)$/i.test(f.url))?.url || null;
    const d = await post("notes", { ...form, file_urls, image_url });
    setNotes((p) => [{ id: d.id, title: form.title, content: form.content, type: "note", image_url, link: form.link || null, color: form.color, file_urls, created_at: new Date().toISOString() }, ...p]);
    setForm({ title: "", content: "", link: "", color: "#ff6b9d" }); setPendingFiles([]); setShowAdd(false);
  };
  const del = async (id: number) => { await post("note_delete", { id }); setNotes((p) => p.filter((n) => n.id !== id)); };
  const updateNote = async (id: number, data: Partial<Note>) => {
    await post("note_update", { id, ...data });
    setNotes((p) => p.map((n) => n.id === id ? { ...n, ...data } : n));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm opacity-40 text-white">{notes.length} заметок</div>
        <button onClick={() => setShowAdd(!showAdd)} className="px-4 py-2 rounded-xl text-sm font-semibold text-white"
          style={{ background: "linear-gradient(135deg,#ec4899,#a78bfa)" }}>+ Заметка</button>
      </div>
      {showAdd && (
        <div className="rounded-2xl p-4 space-y-3" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(167,139,250,0.3)" }}>
          <input placeholder="Заголовок..." value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            className="w-full bg-transparent text-white placeholder-white/30 text-sm outline-none border-b border-white/10 pb-2" autoFocus />
          <textarea placeholder="Напиши что угодно — мысль, идею, мечту, ссылку..." value={form.content}
            onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
            className="w-full bg-transparent text-white placeholder-white/30 text-sm outline-none resize-none" rows={3} />
          <input placeholder="Ссылка..." value={form.link} onChange={(e) => setForm((f) => ({ ...f, link: e.target.value }))}
            className="w-full bg-transparent text-white placeholder-white/30 text-sm outline-none border-b border-white/10 pb-2" />
          {pendingFiles.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {pendingFiles.map((f, i) => (
                <div key={i} className="relative group">
                  {/\.(jpg|jpeg|png|gif|webp)$/i.test(f.url)
                    ? <img src={f.url} alt="" className="h-16 w-16 rounded-lg object-cover" />
                    : <div className="h-16 w-16 rounded-lg flex items-center justify-center text-xs text-white/60" style={{ background: "rgba(167,139,250,0.2)" }}>📄</div>
                  }
                  <button onClick={() => setPendingFiles((p) => p.filter((_, j) => j !== i))}
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100">✕</button>
                </div>
              ))}
            </div>
          )}
          <div className="flex items-center gap-3 flex-wrap">
            <FileUploadBtn onUploaded={(url, name, mime) => setPendingFiles((p) => [...p, { url, name, mime }])} label="📎 Фото/Видео/Файл" />
            <div className="flex gap-1.5">
              {NOTE_COLORS.map((c) => (
                <button key={c} onClick={() => setForm((f) => ({ ...f, color: c }))} className="w-5 h-5 rounded-full transition-transform"
                  style={{ background: c, transform: form.color === c ? "scale(1.4)" : "scale(1)", boxShadow: form.color === c ? `0 0 8px ${c}` : "none" }} />
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={add} className="flex-1 py-2 rounded-xl text-sm font-bold text-white"
              style={{ background: "linear-gradient(135deg,#a78bfa,#ec4899)" }}>Сохранить 💫</button>
            <button onClick={() => { setShowAdd(false); setPendingFiles([]); }} className="px-4 py-2 rounded-xl text-sm text-white/40">Отмена</button>
          </div>
        </div>
      )}
      {loading ? <div className="text-center py-12 opacity-40 text-white">Загружаю...</div> :
        notes.length === 0 ? <div className="text-center py-16 opacity-30 text-white"><div className="text-4xl mb-3">📝</div>Здесь будут твои мысли</div> :
        <div className="columns-1 md:columns-2 gap-3 space-y-3">
          {notes.map((n) => <div key={n.id} className="break-inside-avoid"><NoteCard note={n} onDelete={del} onUpdate={updateNote} /></div>)}
        </div>
      }
    </div>
  );
};

const WHO = "aksinia";
const ChatTab = () => {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [text, setText] = useState("");
  const [recording, setRecording] = useState(false);
  const [mediaRec, setMediaRec] = useState<MediaRecorder | null>(null);
  const [uploading, setUploading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const lastId = useRef(0);

  const load = useCallback(async () => {
    try {
      const d = await fetch(api("messages") + `&since_id=${lastId.current}`).then((r) => r.json());
      if (d.messages?.length) {
        setMsgs((p) => { const next = [...p, ...d.messages]; lastId.current = d.messages[d.messages.length - 1].id; return next; });
      }
    } catch (e) { void e; }
  }, []);

  useEffect(() => {
    fetch(api("messages")).then((r) => r.json()).then((d) => {
      setMsgs(d.messages || []);
      if (d.messages?.length) lastId.current = d.messages[d.messages.length - 1].id;
    }).catch(() => {});
    const iv = setInterval(load, 3000);
    return () => clearInterval(iv);
  }, [load]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  const send = async (content = text, type = "text", extras: Partial<Msg> = {}) => {
    if (!content.trim() && type === "text") return;
    const tmp: Msg = { id: Date.now(), sender: WHO, content, type, file_url: null, file_name: null, file_type: null, duration_sec: null, read_at: null, created_at: new Date().toISOString(), ...extras };
    setMsgs((p) => [...p, tmp]);
    setText("");
    const d = await post("send_message", { sender: WHO, content, type, ...extras });
    setMsgs((p) => p.map((m) => m.id === tmp.id ? { ...tmp, id: d.id } : m));
    lastId.current = Math.max(lastId.current, d.id);
  };

  const sendFile = async (file: File) => {
    setUploading(true);
    try {
      const b64 = await toB64(file);
      const d = await post("upload", { file_b64: b64, file_name: file.name, mime: file.type, folder: "aksinia-chat" });
      const type = file.type.startsWith("image/") ? "image" : file.type.startsWith("video/") ? "video" : "file";
      await send("", type, { file_url: d.url, file_name: file.name, file_type: file.type });
    } finally { setUploading(false); }
  };

  const startRec = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const rec = new MediaRecorder(stream);
      const chunks: Blob[] = [];
      rec.ondataavailable = (e) => chunks.push(e.data);
      rec.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunks, { type: "audio/webm" });
        const file = new File([blob], `voice-${Date.now()}.webm`, { type: "audio/webm" });
        const b64 = await toB64(file);
        const d = await post("upload", { file_b64: b64, file_name: file.name, mime: file.type, folder: "aksinia-chat" });
        await send("🎤 Голосовое", "audio", { file_url: d.url, file_name: file.name, file_type: file.type });
      };
      rec.start();
      setMediaRec(rec);
      setRecording(true);
    } catch { alert("Нет доступа к микрофону"); }
  };
  const stopRec = () => { mediaRec?.stop(); setRecording(false); setMediaRec(null); };

  const bStyle = (sender: string) => sender === WHO
    ? { background: "linear-gradient(135deg,#ec4899,#a78bfa)", borderRadius: "18px 18px 4px 18px" }
    : { background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "18px 18px 18px 4px" };

  return (
    <div className="flex flex-col" style={{ height: "62vh" }}>
      <div className="flex items-center gap-3 mb-4 p-3 rounded-2xl flex-shrink-0"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(236,72,153,0.2)" }}>
        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0"><img src={AKSINIA_1} alt="" className="w-full h-full object-cover" /></div>
        <div>
          <div className="text-white font-semibold text-sm">Денис 💝</div>
          <div className="text-xs opacity-40 flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />всегда онлайн для тебя</div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto space-y-2 pr-1 mb-3 flex flex-col" style={{ scrollbarWidth: "none" }}>
        {msgs.length === 0 && (
          <div className="text-center py-12 opacity-30 text-white m-auto"><div className="text-3xl mb-2">💌</div>Напиши первое сообщение</div>
        )}
        {msgs.map((m) => (
          <div key={m.id} className="flex" style={{ justifyContent: m.sender === WHO ? "flex-end" : "flex-start" }}>
            <div className="flex flex-col max-w-[78%]">
              <div className="px-4 py-2.5 text-sm text-white" style={bStyle(m.sender)}>
                {m.type === "text" && m.content}
                {m.type === "image" && m.file_url && <img src={m.file_url} alt="" className="rounded-xl max-h-48 max-w-full" />}
                {m.type === "video" && m.file_url && <video src={m.file_url} controls className="rounded-xl max-h-48 max-w-full" />}
                {m.type === "audio" && m.file_url && (
                  <div className="flex items-center gap-2">
                    <span>🎤</span>
                    <audio src={m.file_url} controls className="h-8" style={{ maxWidth: "180px" }} />
                  </div>
                )}
                {m.type === "file" && m.file_url && (
                  <a href={m.file_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 underline opacity-90">📄 {m.file_name || "Файл"}</a>
                )}
              </div>
              <div className="text-xs opacity-25 mt-0.5 px-1" style={{ textAlign: m.sender === WHO ? "right" : "left" }}>
                {new Date(m.created_at).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}
                {m.sender === WHO && m.read_at && " ✓✓"}
              </div>
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="flex items-center gap-2 flex-shrink-0" style={{ background: "rgba(255,255,255,0.04)", borderRadius: "16px", padding: "8px 12px", border: "1px solid rgba(255,255,255,0.08)" }}>
        <input ref={fileRef} type="file" className="hidden" accept="image/*,video/*,audio/*,.pdf" onChange={(e) => { const f = e.target.files?.[0]; if (f) sendFile(f); e.target.value = ""; }} />
        <button onClick={() => fileRef.current?.click()} className="text-lg opacity-50 hover:opacity-90 transition-opacity flex-shrink-0" disabled={uploading}>📎</button>
        <input value={text} onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), send())}
          placeholder={recording ? "🔴 Говори..." : "Напиши Денису..."}
          className="flex-1 bg-transparent text-white placeholder-white/30 text-sm outline-none min-w-0"
          disabled={recording} />
        {text.trim() ? (
          <button onClick={() => send()} className="w-9 h-9 rounded-xl flex items-center justify-center text-white flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#ec4899,#a78bfa)" }}>➤</button>
        ) : (
          <button onMouseDown={startRec} onMouseUp={stopRec} onTouchStart={startRec} onTouchEnd={stopRec}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-lg transition-all flex-shrink-0"
            style={{ background: recording ? "linear-gradient(135deg,#ef4444,#f97316)" : "rgba(255,255,255,0.08)", boxShadow: recording ? "0 0 20px rgba(239,68,68,0.5)" : "none" }}>
            🎤
          </button>
        )}
      </div>
      {uploading && <div className="text-xs text-center opacity-40 text-white mt-1">⏳ Загружаю файл...</div>}
    </div>
  );
};

export default function Aksinia() {
  const [tab, setTab] = useState("wishes");
  return (
    <div className="min-h-screen relative" style={{ background: "linear-gradient(160deg,#0f0515 0%,#0a0a1a 40%,#0d0520 100%)", color: "#fff" }}>
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.2; }
          90% { opacity: 0.1; }
          100% { transform: translateY(-110vh) rotate(20deg); opacity: 0; }
        }
      `}</style>
      <StarField />
      <Floaters />
      <div className="relative z-10 max-w-2xl mx-auto px-4 pb-20">
        <Header />
        <TabBar active={tab} onChange={setTab} />
        {tab === "wishes" && <WishesTab />}
        {tab === "notes" && <NotesTab />}
        {tab === "chat" && <ChatTab />}
        {tab === "valentine" && (
          <div className="rounded-3xl overflow-hidden" style={{ border: "1px solid rgba(236,72,153,0.2)" }}>
            <Valentine />
          </div>
        )}
        {tab === "birthday" && <Birthday />}
      </div>
    </div>
  );
}