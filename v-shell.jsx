/* v-shell.jsx — Scene wrapper, hooks, comparison table, shared scene bits. */

const { useState: useStateS, useEffect: useEffectS, useRef: useRefS } = React;

/* ---------- hooks ---------- */
function useInView(ref, opts = {}) {
  const [inView, setInView] = useStateS(false);
  useEffectS(() => {
    const el = ref.current; if (!el) return;
    let fired = false;
    const io = new IntersectionObserver(([e]) => {
      fired = true; setInView(e.isIntersecting);
    }, {
      threshold: opts.threshold ?? 0.3, rootMargin: opts.rootMargin || "0px",
    });
    io.observe(el);
    // Fallback: if IntersectionObserver never reports (some embedded/preview
    // iframes), reveal content so it's never stuck invisible.
    const fb = setTimeout(() => { if (!fired) setInView(true); }, 700);
    return () => { io.disconnect(); clearTimeout(fb); };
  }, []);
  return inView;
}

function useSceneSteps(total, intervalMs, ref, opts = {}) {
  const inView = useInView(ref, opts);
  const [step, setStep] = useStateS(0);
  const [playing, setPlaying] = useStateS(false);
  useEffectS(() => {
    if (!inView) return;
    setPlaying(true);
    let i = step;
    const id = setInterval(() => {
      i += 1;
      if (i >= total) { clearInterval(id); setPlaying(false); return; }
      setStep(i);
    }, intervalMs);
    return () => clearInterval(id);
  }, [inView]);
  return { step, inView, playing, setStep };
}

/* ---------- Scene wrapper ---------- */
function Scene({ id, num, total, kicker, eyebrowTone = "red", title, lede, message, messageTone, children, narrow = false, sceneRef }) {
  const innerRef = useRefS(null);
  const ref = sceneRef || innerRef;
  const inView = useInView(ref, { threshold: 0.15 });
  const mt = messageTone || eyebrowTone;
  return (
    <section id={id} ref={ref} data-screen-label={`Scene ${num}`} style={{
      minHeight: "100vh", padding: "104px clamp(28px,5vw,80px) 96px",
      maxWidth: narrow ? 920 : 1140, margin: "0 auto", position: "relative",
      display: "flex", flexDirection: "column", justifyContent: "center",
    }}>
      <div className={inView ? "fade-up" : ""} style={{ opacity: inView ? undefined : 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
          <SceneBadge num={num} tone={eyebrowTone} />
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <div className="eyebrow" style={{ color: toneColor(eyebrowTone), whiteSpace: "nowrap" }}>{kicker}</div>
            <div className="mono" style={{ fontSize: 11, color: "var(--ink-faint)" }}>{String(num).padStart(2, "0")} / {String(total).padStart(2, "0")}</div>
          </div>
        </div>
        <h2 style={{ fontFamily: "var(--font)", fontWeight: 700, fontSize: "clamp(34px,4.6vw,54px)", lineHeight: 1.04, letterSpacing: "-0.026em", color: "var(--ink)", margin: "0 0 18px", maxWidth: 18 + "em", textWrap: "balance" }}>{title}</h2>
        {lede && <p style={{ fontSize: 19, lineHeight: 1.55, color: "var(--ink-soft)", maxWidth: 760, fontWeight: 400, margin: "0 0 8px", textWrap: "pretty" }}>{lede}</p>}
      </div>

      <div style={{ marginTop: 36 }}>{children}</div>

      {message && (
        <div className={inView ? "fade-up" : ""} style={{
          marginTop: 40, padding: "18px 22px", borderRadius: "var(--radius-lg)",
          background: toneTint(mt), border: `1px solid ${toneEdge(mt)}`,
          display: "flex", gap: 14, alignItems: "flex-start", maxWidth: 880,
          animationDelay: "120ms",
        }}>
          <div style={{ marginTop: 1 }}><SparkIcon size={18} color={toneColor(mt)} /></div>
          <div style={{ fontSize: 16, lineHeight: 1.5, color: "var(--ink)", fontWeight: 500 }}>{message}</div>
        </div>
      )}
    </section>
  );
}

/* ---------- ComparisonTable (scene 3) ---------- */
function ComparisonTable({ rows }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(120px,0.9fr) 1fr 1fr", gap: 0, border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", overflow: "hidden", background: "var(--surface)", boxShadow: "var(--shadow-1)" }}>
      {/* header */}
      <div style={{ padding: "16px 18px", background: "var(--surface-2)", borderBottom: "1px solid var(--border)" }} />
      <div style={{ padding: "16px 18px", background: "var(--surface-2)", borderBottom: "1px solid var(--border)", borderLeft: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 9 }}>
        <span style={{ width: 9, height: 9, borderRadius: 3, background: "var(--ink-faint)" }} />
        <span style={{ fontWeight: 700, fontSize: 14, color: "var(--ink-soft)" }}>Schema-first <span style={{ fontWeight: 500, color: "var(--ink-faint)" }}>(today)</span></span>
      </div>
      <div style={{ padding: "16px 18px", background: "var(--red-tint)", borderBottom: "1px solid var(--red-edge)", borderLeft: "1px solid var(--red-edge)", display: "flex", alignItems: "center", gap: 9 }}>
        <span style={{ width: 9, height: 9, borderRadius: 99, background: "var(--dh-red)" }} />
        <span style={{ fontWeight: 700, fontSize: 14, color: "var(--dh-red)" }}>Semantic-first <span style={{ fontWeight: 500, opacity: 0.7 }}>(proposed)</span></span>
      </div>
      {/* rows */}
      {rows.map((r, i) => (
        <React.Fragment key={i}>
          <div style={{ padding: "16px 18px", borderBottom: i < rows.length - 1 ? "1px solid var(--border)" : "none", display: "flex", alignItems: "center" }}>
            <span className="eyebrow" style={{ fontSize: 10.5, color: "var(--ink-mute)" }}>{r.dim}</span>
          </div>
          <div style={{ padding: "16px 18px", borderLeft: "1px solid var(--border)", borderBottom: i < rows.length - 1 ? "1px solid var(--border)" : "none", display: "flex", gap: 9, alignItems: "flex-start" }}>
            <span style={{ marginTop: 1, flexShrink: 0 }}><XBig size={15} color="var(--ink-faint)" /></span>
            <span style={{ fontSize: 13.5, color: "var(--ink-mute)", lineHeight: 1.4 }}>{r.old}</span>
          </div>
          <div style={{ padding: "16px 18px", borderLeft: "1px solid var(--border)", borderBottom: i < rows.length - 1 ? "1px solid var(--border)" : "none", display: "flex", gap: 9, alignItems: "flex-start", background: "color-mix(in srgb, var(--red-tint) 35%, transparent)" }}>
            <span style={{ marginTop: 1, flexShrink: 0 }}><CheckBig size={15} color="var(--green-2)" /></span>
            <span style={{ fontSize: 13.5, color: "var(--ink)", lineHeight: 1.4, fontWeight: 500 }}>{r.neu}</span>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

/* ---------- ProblemCard (scene 2) ---------- */
function ProblemCard({ num, title, body, tone = "red", delay = 0, inView }) {
  return (
    <DCCard hover className={inView ? "fade-up" : ""} style={{ animationDelay: `${delay}ms`, opacity: inView ? undefined : 1, display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
        <span className="mono" style={{ fontSize: 12, fontWeight: 600, color: toneColor(tone), width: 26, height: 26, borderRadius: 8, border: `1.5px solid ${toneEdge(tone)}`, background: toneTint(tone), display: "flex", alignItems: "center", justifyContent: "center" }}>{String(num).padStart(2, "0")}</span>
        <div style={{ fontSize: 15.5, fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.01em" }}>{title}</div>
      </div>
      <div style={{ fontSize: 13.5, lineHeight: 1.5, color: "var(--ink-soft)" }}>{body}</div>
    </DCCard>
  );
}

/* ---------- FeatureRow (scene 6 / generic) ---------- */
function UseCaseCard({ icon, title, body, tone = "purple", inView, delay = 0 }) {
  return (
    <DCCard hover className={inView ? "fade-up" : ""} style={{ animationDelay: `${delay}ms`, opacity: inView ? undefined : 1 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        <div style={{ width: 34, height: 34, borderRadius: 9, background: toneTint(tone), border: `1px solid ${toneEdge(tone)}`, display: "flex", alignItems: "center", justifyContent: "center", color: toneColor(tone), fontWeight: 700, fontSize: 16 }}>{icon}</div>
        <div style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.01em" }}>{title}</div>
        <div style={{ fontSize: 13, lineHeight: 1.5, color: "var(--ink-soft)" }}>{body}</div>
      </div>
    </DCCard>
  );
}

/* ---------- ImagePlaceholder (striped) ---------- */
function ImageStripe({ label, height = 160, style = {} }) {
  return (
    <div style={{
      height, borderRadius: "var(--radius)", border: "1px solid var(--border)",
      background: "repeating-linear-gradient(135deg, var(--surface-2) 0 10px, var(--surface-3) 10px 20px)",
      display: "flex", alignItems: "center", justifyContent: "center", ...style,
    }}>
      <span className="mono" style={{ fontSize: 11, color: "var(--ink-faint)", background: "var(--surface)", padding: "4px 10px", borderRadius: 99, border: "1px solid var(--border)" }}>{label}</span>
    </div>
  );
}

Object.assign(window, { useInView, useSceneSteps, Scene, ComparisonTable, ProblemCard, UseCaseCard, ImageStripe });
