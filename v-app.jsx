/* v-app.jsx — Root: tweaks, rail nav, progress, scene assembly. */

const { useState: useStateA, useEffect: useEffectA, useRef: useRefA } = React;

const RAIL = [
  { id: "hero", label: "Vision" },
  { id: "problems", label: "Problem" },
  { id: "shift", label: "Core shift" },
  { id: "network", label: "Network" },
  { id: "display", label: "On the app" },
  { id: "static-dynamic", label: "Hybrid model" },
  { id: "image", label: "Image" },
  { id: "bonus", label: "Bonus" },
  { id: "questions", label: "Questions" },
  { id: "next", label: "Next steps" },
];

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "netMode": "organic",
  "motion": "subtle",
  "example": "chips",
  "accent": "#D61F26"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [active, setActive] = useStateA("hero");
  const [progress, setProgress] = useStateA(0);

  // accent → CSS var
  useEffectA(() => {
    document.documentElement.style.setProperty("--accent", t.accent || "#D61F26");
  }, [t.accent]);

  // scroll spy + progress
  useEffectA(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: "-45% 0px -45% 0px" });
    RAIL.forEach((r) => { const el = document.getElementById(r.id); if (el) io.observe(el); });
    return () => { window.removeEventListener("scroll", onScroll); io.disconnect(); };
  }, []);

  return (
    <React.Fragment>
      <div className="progress-track"><div className="progress-fill" style={{ width: `${progress}%` }} /></div>

      <nav className="rail" aria-label="Scenes">
        {RAIL.map((r) => (
          <a key={r.id} href={`#${r.id}`} className={active === r.id ? "active" : ""}>
            <span className="dot" />
            <span className="rail-label">{r.label}</span>
          </a>
        ))}
      </nav>

      <Hero />
      <SceneProblems />
      <SceneShift />
      <SceneNetwork netMode={t.netMode} example={t.example} motion={t.motion} />
      <SceneDisplay example={t.example} motion={t.motion} />
      <SceneStaticDynamic />
      <SceneImage />
      <SceneBonus />
      <SceneQuestions />
      <Closing />

      <TweaksPanel>
        <TweakSection label="Network visualization" />
        <TweakSelect label="Default style" value={t.netMode}
          options={[
            { value: "organic", label: "Organic graph" },
            { value: "radial", label: "Radial orbit" },
            { value: "layered", label: "Layered spine" },
            { value: "discovery", label: "Live discovery" },
          ]}
          onChange={(v) => setTweak("netMode", v)} />
        <TweakRadio label="Example" value={t.example}
          options={[{ value: "chips", label: "Chips" }, { value: "protein", label: "Protein" }]}
          onChange={(v) => setTweak("example", v)} />
        <TweakSection label="Motion" />
        <TweakRadio label="Intensity" value={t.motion}
          options={[{ value: "minimal", label: "Minimal" }, { value: "subtle", label: "Subtle" }, { value: "lively", label: "Lively" }]}
          onChange={(v) => setTweak("motion", v)} />
        <TweakSection label="Brand" />
        <TweakColor label="Accent" value={t.accent}
          options={["#D61F26", "#7B3FA0", "#0066B3", "#008C58", "#1B1F2A"]}
          onChange={(v) => setTweak("accent", v)} />
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
