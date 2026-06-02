/* v-scenes.jsx — Hero + 8 numbered scenes + closing. */

const { useState: useStateSc, useEffect: useEffectSc, useRef: useRefSc } = React;
const TOTAL = 8;

/* ============ HERO ============ */
function Hero() {
  const ref = useRefSc(null);
  const inView = useInView(ref, { threshold: 0.2 });
  return (
    <section id="hero" ref={ref} data-screen-label="Hero" style={{
      minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center",
      padding: "120px clamp(28px,5vw,80px) 80px", maxWidth: 1180, margin: "0 auto", position: "relative",
    }}>
      <div className={inView ? "fade-up" : ""} style={{ opacity: inView ? undefined : 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 30, flexWrap: "wrap" }}>
          <DCLockup size={30} fontSize={18} />
          <span style={{ width: 1, height: 20, background: "var(--border-strong)" }} />
          <DHBadge size={17} />
        </div>
        <div style={{ display: "flex", gap: 8, marginBottom: 26, flexWrap: "wrap" }}>
          <DCTag tone="red">Internal proposal</DCTag>
          <DCTag tone="neutral" mono>Q-Commerce · PIM &amp; Catalogue</DCTag>
          <DCTag tone="neutral">Eng review → Leadership</DCTag>
        </div>
      </div>
      <h1 className={inView ? "fade-up" : ""} style={{
        fontFamily: "var(--font)", fontWeight: 800, fontSize: "clamp(52px,8vw,104px)",
        lineHeight: 0.98, letterSpacing: "-0.045em", color: "var(--ink)", margin: "0 0 28px",
        maxWidth: 14 + "em", opacity: inView ? undefined : 1, animationDelay: "80ms", textWrap: "balance",
      }}>
        From attributes<br />to <span style={{ color: "var(--accent)", position: "relative" }}>meaning<span style={{ position: "absolute", left: 0, right: 0, bottom: "0.06em", height: "0.07em", background: "var(--accent)", opacity: 0.28, borderRadius: 99 }} /></span>.
      </h1>
      <p className={inView ? "fade-up" : ""} style={{
        fontSize: "clamp(18px,2.1vw,23px)", lineHeight: 1.5, color: "var(--ink-soft)", maxWidth: 680,
        fontWeight: 400, margin: "0 0 40px", opacity: inView ? undefined : 1, animationDelay: "160ms", textWrap: "pretty",
      }}>
        A proposal to group product variants by what they <i>mean</i> — not by the
        attributes we happened to extract first. Let&rsquo;s pressure-test the idea together.
      </p>
      <div className={inView ? "fade-up" : ""} style={{ opacity: inView ? undefined : 1, animationDelay: "240ms", maxWidth: 760, width: "100%" }}>
        <DCCard padded={false} style={{ padding: "10px 10px 10px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, color: "var(--ink-soft)", fontSize: 13.5 }}>
            <span style={{ width: 8, height: 8, borderRadius: 99, background: "var(--green-2)", animation: "pulseDot 2.4s ease-in-out infinite" }} />
            8 scenes · problem → network → product → questions
          </div>
          <a href="#problems" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 16px", borderRadius: 10, background: "var(--ink)", color: "#fff", textDecoration: "none", fontWeight: 600, fontSize: 13.5 }}>
            Start the walkthrough <ArrowRightSm size={15} color="#fff" />
          </a>
        </DCCard>
      </div>
      <div style={{ position: "absolute", bottom: 30, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, color: "var(--ink-faint)", animation: "drift 2.4s ease-in-out infinite" }}>
        <span className="eyebrow" style={{ fontSize: 9.5 }}>Scroll</span>
        <ArrowDownSm size={16} color="var(--ink-faint)" />
      </div>
    </section>
  );
}

/* ============ 1 · PROBLEMS ============ */
const PROBLEMS = [
  { t: "Attribute dependency", b: "A product can't join a group until its variant attributes are extracted. Dataforge coverage sits under 100%, and niche attributes are unreliable." },
  { t: "Static schema", b: "Each product type carries a fixed set of variant dimensions. Anything outside that set is invisible to grouping." },
  { t: "PIM rigidity", b: "Adding a new dimension means deleting and recreating the entire variant group. Expensive, manual, and error-prone." },
  { t: "Operational load", b: "Attribute QA, manual mapping, and rework scale linearly with the catalogue — every new market multiplies it." },
  { t: "Limited scalability", b: "New categories and long-tail products rarely fit a predefined template, so they fall out of grouping entirely." },
];
function SceneProblems() {
  const ref = useRefSc(null);
  const inView = useInView(ref, { threshold: 0.1 });
  return (
    <Scene sceneRef={ref} id="problems" num={1} total={TOTAL} kicker="The problem" eyebrowTone="red"
      title="The current approach hits a wall."
      lede="Today, grouping is attribute-first: a product type defines which variant dimensions exist, and a product can only be grouped once those exact attributes are extracted. Five things break."
      message="Grouping is gated on data we don't fully have — so coverage stays capped, no matter how much we tune extraction.">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16 }}>
        {PROBLEMS.map((p, i) => (
          <ProblemCard key={i} num={i + 1} title={p.t} body={p.b} tone="red" inView={inView} delay={i * 70} />
        ))}
      </div>
    </Scene>
  );
}

/* ============ 2 · CORE SHIFT ============ */
const SHIFT_ROWS = [
  { dim: "Grouping basis", old: "Predefined attributes per product type", neu: "Shared meaning across products" },
  { dim: "New dimension", old: "Delete & recreate the variant group", neu: "Auto-added the moment it's discovered" },
  { dim: "Coverage", old: "Blocked until attributes are extracted", neu: "Every product participates from day one" },
  { dim: "Images", old: "Not used for grouping at all", neu: "Always-on signal that strengthens detection" },
  { dim: "Schema", old: "Fixed, central, slow to change", neu: "Emergent — learns from the catalogue" },
];
function SceneShift() {
  return (
    <Scene id="shift" num={2} total={TOTAL} kicker="The core shift" eyebrowTone="purple"
      title="One change of question."
      lede="We stop asking which attributes were extracted, and start asking what a product means. The mechanics follow from there."
      messageTone="purple"
      message="Same catalogue, same SKUs. The difference is what we group on — extracted fields become an input, not a gate.">
      <ComparisonTable rows={SHIFT_ROWS} />
    </Scene>
  );
}

/* ============ 3 · NEURAL CLASSIFICATION (network) ============ */
const NET_MODES = [
  { key: "organic", name: "Organic graph", desc: "Free-floating nodes, connections flex" },
  { key: "radial", name: "Radial orbit", desc: "Anchor in the centre, dimensions in rings" },
  { key: "layered", name: "Layered spine", desc: "Stable core spine, variations branch off" },
  { key: "discovery", name: "Live discovery", desc: "A new variation joins the group on its own" },
];
function SceneNetwork({ netMode = "organic", example = "chips", motion = "subtle" }) {
  const ref = useRefSc(null);
  const inView = useInView(ref, { threshold: 0.08 });
  const [mode, setMode] = useStateSc(netMode);
  const [step, setStep] = useStateSc(0);
  useEffectSc(() => setMode(netMode), [netMode]);

  // discovery cycle
  useEffectSc(() => {
    if (mode !== "discovery" || !inView) { setStep(0); return; }
    let s = 0; setStep(0);
    const id = setInterval(() => { s = s >= 3 ? 0 : s + 1; setStep(s); }, 1600);
    return () => clearInterval(id);
  }, [mode, inView]);

  return (
    <Scene sceneRef={ref} id="network" num={3} total={TOTAL} kicker="How it works" eyebrowTone="red" narrow={false}
      title="Products as a living network."
      lede="Every product is a node. Core attributes — brand, category, product type — are stable nodes that hold a group together. Granular attributes — flavor, size, protein type — are the threads where products differ. Dimensions emerge from the data instead of being declared up front."
      message="Two products sharing the same core nodes are variant candidates. Wherever their connections diverge is a variation dimension.">

      <DCCard padded={false} style={{ overflow: "hidden" }}>
        {/* mode switcher */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "14px 18px", borderBottom: "1px solid var(--border)", background: "var(--surface-2)", flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {NET_MODES.map((m) => (
              <button key={m.key} onClick={() => setMode(m.key)} title={m.desc} style={{
                padding: "7px 13px", borderRadius: 9, cursor: "pointer",
                border: mode === m.key ? "1.5px solid var(--dh-red)" : "1.5px solid var(--border)",
                background: mode === m.key ? "var(--surface)" : "transparent",
                color: mode === m.key ? "var(--dh-red)" : "var(--ink-mute)",
                fontFamily: "var(--font)", fontWeight: 600, fontSize: 12.5, boxShadow: mode === m.key ? "var(--shadow-1)" : "none",
                transition: "all 160ms ease",
              }}>{m.name}</button>
            ))}
          </div>
          <span className="mono" style={{ fontSize: 10.5, color: "var(--ink-faint)" }}>directions to explore — not a final pick</span>
        </div>

        <div style={{ padding: "8px 8px 0" }}>
          <SemanticNetwork mode={mode} example={example} motion={motion} height={520} step={step} />
        </div>

        <div style={{ padding: "16px 22px 20px", borderTop: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <NetLegend example={example} />
          <span style={{ fontSize: 12.5, color: "var(--ink-mute)", maxWidth: 260 }}>
            <b style={{ color: "var(--ink)" }}>{NET_MODES.find((m) => m.key === mode)?.name}.</b> {NET_MODES.find((m) => m.key === mode)?.desc}. Hover any node.
          </span>
        </div>
      </DCCard>
    </Scene>
  );
}

/* ============ 4 · VARIANT DISPLAY (phone) ============ */
function SceneDisplay({ example = "chips", motion = "subtle" }) {
  return (
    <Scene id="display" num={4} total={TOTAL} kicker="What the customer sees" eyebrowTone="green"
      title="From a flat listing to a complete shelf."
      lede="The same grouping flows straight to the product page. Classic, Baked, Max and Oven-Baked — every cut, flavor and size of Lay's in one place, with the details we read off the pack."
      messageTone="green"
      message="Toggle Today vs Imagined, then tap a style or flavor — the page is driven entirely by shared nodes.">
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) auto", gap: "clamp(24px,4vw,56px)", alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, minWidth: 0 }}>
          {[
            { c: "var(--ink-faint)", t: "Today", b: "Lay's Classic is one flat listing. Baked, Max and Oven-Baked live as separate SKUs — the customer can't see they're the same product, let alone compare cut, fat or size." },
            { c: "var(--dh-red)", t: "Imagined", b: "One variant group with three live dimensions — Style/cut, Flavor and Size — plus the things we read off the pack: 50% less fat, deep-ridged, Nutri-Score, and a New Sweet Chilli that joined on its own." },
          ].map((r, i) => (
            <div key={i} style={{ display: "flex", gap: 13 }}>
              <span style={{ width: 10, height: 10, borderRadius: 99, background: r.c, marginTop: 5, flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)" }}>{r.t}</div>
                <div style={{ fontSize: 13.5, lineHeight: 1.5, color: "var(--ink-soft)", marginTop: 3 }}>{r.b}</div>
              </div>
            </div>
          ))}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 6 }}>
            <DCTag tone="amber">Style / cut</DCTag>
            <DCTag tone="blue">Flavor</DCTag>
            <DCTag tone="ink">Pack size</DCTag>
            <DCTag tone="purple"><SparkIcon size={11} color="var(--purple)" /> Read from image</DCTag>
          </div>
        </div>
        <PhoneCompare example={example} motion={motion} />
      </div>
    </Scene>
  );
}

/* ============ 5 · STATIC vs DYNAMIC ============ */
function SceneStaticDynamic() {
  const stable = ["Brand", "Category", "Product type", "Base ingredient"];
  const emergent = ["Flavor", "Pack size", "Protein type", "Sugar level", "Scent", "Color", "…and whatever the data shows next"];
  return (
    <Scene id="static-dynamic" num={5} total={TOTAL} kicker="The hybrid model" eyebrowTone="blue"
      title="What stays fixed, and what is allowed to emerge."
      lede="We don't throw away structure — we shrink it. A small, predefined core keeps groups stable and predictable. Everything else is free to be discovered."
      messageTone="blue"
      message="A hybrid: predefined core for stability, self-learning dimensions for reach. Best of both, instead of either-or.">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 18 }}>
        <DCCard accent="var(--ink-mute)" hover>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <span style={{ width: 11, height: 11, borderRadius: 3, background: "var(--ink)" }} />
            <div style={{ fontSize: 17, fontWeight: 700 }}>Stable core</div>
            <DCTag tone="neutral" mono style={{ marginLeft: "auto" }}>predefined</DCTag>
          </div>
          <div style={{ fontSize: 13.5, color: "var(--ink-soft)", lineHeight: 1.5, marginBottom: 14 }}>The grouping anchors. Curated, slow-moving, the same across markets.</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {stable.map((s) => <DCTag key={s} tone="ink">{s}</DCTag>)}
          </div>
        </DCCard>
        <DCCard accent="var(--dh-red)" hover>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <span style={{ width: 11, height: 11, borderRadius: 99, background: "var(--dh-red)", animation: "pulseDot 2.6s ease-in-out infinite" }} />
            <div style={{ fontSize: 17, fontWeight: 700 }}>Emergent variation</div>
            <DCTag tone="red" mono style={{ marginLeft: "auto" }}>self-learning</DCTag>
          </div>
          <div style={{ fontSize: 13.5, color: "var(--ink-soft)", lineHeight: 1.5, marginBottom: 14 }}>The threads of difference. Discovered from text and images, added without schema edits.</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {emergent.map((s, i) => <DCTag key={s} tone={i === emergent.length - 1 ? "green" : "red"}>{s}</DCTag>)}
          </div>
        </DCCard>
      </div>
    </Scene>
  );
}

/* ============ 6 · IMAGE ROLE ============ */
const IMAGE_CASES = [
  { i: "◎", t: "Attribute extraction", b: "Read flavor, size, and pack claims straight off the packaging." },
  { i: "⟁", t: "Variant confirmation", b: "Confirm two SKUs belong together when their text is thin or inconsistent." },
  { i: "✦", t: "Dimension discovery", b: "Spot a variation dimension that no extracted attribute ever captured." },
  { i: "⧉", t: "Duplicate detection", b: "Catch the same product listed twice under different titles." },
  { i: "◐", t: "Pack & size reading", b: "Recover content size and net weight when the field is missing." },
  { i: "⚐", t: "Language-agnostic", b: "Works across markets and scripts where the text won't." },
];
function SceneImage() {
  const ref = useRefSc(null);
  const inView = useInView(ref, { threshold: 0.08 });
  return (
    <Scene sceneRef={ref} id="image" num={6} total={TOTAL} kicker="The image" eyebrowTone="amber"
      title="The image is always-on intelligence."
      lede="A photo is attached to almost every product, in every market. Instead of treating it as decoration, we treat it as a continuous signal feeding six jobs at once."
      messageTone="amber"
      message="Text tells us what was typed. The image tells us what's true — and it never goes missing.">
      <div style={{ display: "grid", gridTemplateColumns: "minmax(220px,300px) 1fr", gap: "clamp(20px,3vw,40px)", alignItems: "start" }}>
        <div style={{ position: "sticky", top: 90 }}>
          <image-slot id="img-hero" style={{ width: "100%", height: 300, display: "block" }} shape="rounded" radius="16" placeholder="Drop a product photo"></image-slot>
          <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 7 }}>
            <DCTag tone="amber" mono>1 image</DCTag>
            <ArrowRightSm size={14} />
            <DCTag tone="amber">6 jobs</DCTag>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 14 }}>
          {IMAGE_CASES.map((c, i) => (
            <UseCaseCard key={i} icon={c.i} title={c.t} body={c.b} tone="amber" inView={inView} delay={i * 60} />
          ))}
        </div>
      </div>
    </Scene>
  );
}

/* ============ 7 · BONUS USE CASES ============ */
const BONUS = [
  { i: "⧉", t: "Duplicate detection", b: "Two listings, one product. Merge them before they split demand and confuse customers.", tone: "blue" },
  { i: "⊘", t: "Shrinkflation tracking", b: "Same product, quietly smaller pack. Flag the change over time for buyers and pricing.", tone: "amber" },
  { i: "⟲", t: "Product change detection", b: "Recipe or packaging changed → re-evaluate the grouping and downstream content automatically.", tone: "purple" },
  { i: "✓", t: "Category quality", b: "Surface mis-categorized, thin, or orphaned listings as a by-product of grouping.", tone: "green" },
];
function SceneBonus() {
  const ref = useRefSc(null);
  const inView = useInView(ref, { threshold: 0.1 });
  return (
    <Scene sceneRef={ref} id="bonus" num={7} total={TOTAL} kicker="Beyond grouping" eyebrowTone="green"
      title="The network pays for itself."
      lede="Once products live in a shared semantic network, several long-standing catalogue problems become near-free side effects."
      messageTone="green">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16 }}>
        {BONUS.map((c, i) => (
          <UseCaseCard key={i} icon={c.i} title={c.t} body={c.b} tone={c.tone} inView={inView} delay={i * 70} />
        ))}
      </div>
    </Scene>
  );
}

/* ============ 8 · OPEN QUESTIONS ============ */
const QUESTIONS = [
  { t: "Core vs granular boundary", b: "Which attributes are predefined anchors, and which are left for the model to learn?" },
  { t: "Confidence & thresholds", b: "How strong must a shared-node connection be before two products are grouped?" },
  { t: "Conflict resolution", b: "Text says one thing, the image says another. What is the tie-breaking rule?" },
  { t: "PIM representation", b: "How do emergent dimensions persist so downstream apps can consume them cleanly?" },
  { t: "Reliability & retries", b: "Idempotent reprocessing, robust retries — what does production-grade look like?" },
  { t: "Multi-dimensional analytics", b: "Hierarchy plus min / max / avg / median per dimension — how do we model it?" },
];
function SceneQuestions() {
  const ref = useRefSc(null);
  const inView = useInView(ref, { threshold: 0.08 });
  return (
    <Scene sceneRef={ref} id="questions" num={8} total={TOTAL} kicker="For engineering" eyebrowTone="ink"
      title="Six things to pressure-test."
      lede="This is a vision, not a spec. These are the open questions where the engineering conversation should start.">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 14 }}>
        {QUESTIONS.map((q, i) => (
          <DCCard key={i} hover className={inView ? "fade-up" : ""} style={{ animationDelay: `${i * 60}ms`, opacity: inView ? undefined : 1, display: "flex", gap: 14, alignItems: "flex-start" }}>
            <span className="mono" style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)", flexShrink: 0 }}>Q{i + 1}</span>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.01em" }}>{q.t}</div>
              <div style={{ fontSize: 13.5, lineHeight: 1.5, color: "var(--ink-soft)", marginTop: 4 }}>{q.b}</div>
            </div>
          </DCCard>
        ))}
      </div>
    </Scene>
  );
}

/* ============ CLOSING · NEXT STEPS ============ */
const PHASES = [
  { n: "01", t: "Prove the signal", b: "Offline study on one sample category: can shared-node grouping beat the current attribute baseline on coverage and accuracy?", tone: "red" },
  { n: "02", t: "Pipeline & PIM", b: "A retry-safe classification service, a way to represent emergent dimensions in PIM, and multi-dimensional analytics.", tone: "purple" },
  { n: "03", t: "Universal rollout", b: "One flow for new and existing products; downstream apps consume variant groups directly.", tone: "green" },
];
function Closing() {
  const ref = useRefSc(null);
  const inView = useInView(ref, { threshold: 0.12 });
  return (
    <section id="next" ref={ref} data-screen-label="Next steps" style={{
      minHeight: "100vh", padding: "104px clamp(28px,5vw,80px) 120px", maxWidth: 1140, margin: "0 auto",
      display: "flex", flexDirection: "column", justifyContent: "center",
    }}>
      <div className={inView ? "fade-up" : ""} style={{ opacity: inView ? undefined : 1 }}>
        <div className="eyebrow" style={{ color: "var(--accent)", marginBottom: 14 }}>Next steps</div>
        <h2 style={{ fontFamily: "var(--font)", fontWeight: 800, fontSize: "clamp(34px,5vw,62px)", lineHeight: 1.02, letterSpacing: "-0.035em", margin: "0 0 18px", maxWidth: 14 + "em", textWrap: "balance" }}>
          A three-phase path, starting small.
        </h2>
        <p style={{ fontSize: 19, lineHeight: 1.55, color: "var(--ink-soft)", maxWidth: 680, margin: "0 0 40px" }}>
          We don&rsquo;t need to commit the catalogue to prove the idea. We need one category and one honest comparison.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16, marginBottom: 44 }}>
        {PHASES.map((p, i) => (
          <DCCard key={i} accent={toneColor(p.tone)} hover className={inView ? "fade-up" : ""} style={{ animationDelay: `${i * 90}ms`, opacity: inView ? undefined : 1 }}>
            <div className="mono" style={{ fontSize: 13, color: toneColor(p.tone), fontWeight: 600, marginBottom: 10 }}>PHASE {p.n}</div>
            <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.015em", marginBottom: 8 }}>{p.t}</div>
            <div style={{ fontSize: 13.5, lineHeight: 1.5, color: "var(--ink-soft)" }}>{p.b}</div>
          </DCCard>
        ))}
      </div>
      <DCCard className={inView ? "fade-up" : ""} style={{ animationDelay: "300ms", opacity: inView ? undefined : 1, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap", borderTop: "3px solid var(--accent)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.015em" }}>Let&rsquo;s pressure-test the feasibility together.</div>
          <div style={{ fontSize: 14, color: "var(--ink-soft)" }}>Bring the hard questions — that&rsquo;s the point of this document.</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <DCLockup size={28} fontSize={16} />
          <DHBadge size={16} />
        </div>
      </DCCard>
    </section>
  );
}

Object.assign(window, {
  Hero, SceneProblems, SceneShift, SceneNetwork, SceneDisplay,
  SceneStaticDynamic, SceneImage, SceneBonus, SceneQuestions, Closing, TOTAL,
});
