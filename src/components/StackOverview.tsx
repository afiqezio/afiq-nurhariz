import { useEffect, useMemo, useRef } from "react";

type Skill = { name: string; category: string; level: number };

type Props = {
  skills: Skill[];
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
};

const META = [
  { key: "Frontend", label: "Frontend", color: "oklch(0.74 0.18 285)" },
  { key: "Backend", label: "Backend", color: "oklch(0.72 0.16 245)" },
  { key: "Mobile", label: "Mobile", color: "oklch(0.78 0.15 340)" },
  { key: "AI/ML", label: "AI / ML", color: "oklch(0.80 0.12 50)" },
  { key: "Database", label: "Database", color: "oklch(0.78 0.16 165)" },
  { key: "DevOps", label: "DevOps", color: "oklch(0.82 0.14 90)" },
];

const StackOverview = ({ skills, activeCategory, onSelectCategory }: Props) => {
  const wrapRef = useRef<HTMLDivElement>(null);

  const groups = useMemo(() => {
    const g: Record<string, Skill[]> = {};
    skills.forEach((s) => {
      (g[s.category] = g[s.category] || []).push(s);
    });
    return g;
  }, [skills]);

  // Reveal meters on scroll
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    wrap.querySelectorAll(".stack-card").forEach((c) => obs.observe(c));
    return () => obs.disconnect();
  }, []);

  // Cursor-following highlight position
  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--cx", `${((e.clientX - rect.left) / rect.width) * 100}%`);
    card.style.setProperty("--cy", `${((e.clientY - rect.top) / rect.height) * 100}%`);
  };

  return (
    <div className="stack-overview" id="stack-overview" ref={wrapRef}>
      {META.map((m) => {
        const items = (groups[m.key] || []).slice().sort((a, b) => b.level - a.level);
        const avg = items.length ? items.reduce((a, b) => a + b.level, 0) / items.length : 0;
        const chips = items.slice(0, 4);
        const isActive = activeCategory === m.key;
        const isDim = activeCategory !== "All" && activeCategory !== m.key;
        const cls = ["stack-card", isActive ? "is-active" : "", isDim ? "is-dim" : ""]
          .filter(Boolean)
          .join(" ");
        return (
          <div
            key={m.key}
            className={cls}
            data-cat={m.key}
            style={
              {
                "--cat-color": m.color,
                "--avg": avg.toFixed(3),
              } as React.CSSProperties
            }
            onMouseMove={handleMove}
            onClick={() => onSelectCategory(m.key)}
          >
            <div className="stack-card-head">
              <span className="stack-card-cat">{m.label}</span>
              <span className="stack-card-count">{String(items.length).padStart(2, "0")}</span>
            </div>
            <div className="stack-card-name">
              <em>{m.label.split(" ")[0]}</em>
              <br />
              stack
            </div>
            <div className="stack-card-meter" />
            <div className="stack-card-chips">
              {chips.map((s) => (
                <span key={s.name}>{s.name}</span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StackOverview;
