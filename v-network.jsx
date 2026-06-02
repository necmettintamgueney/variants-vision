/* v-network.jsx — SemanticNetwork visualization with multiple layout modes.
   Modes: organic | radial | layered | discovery
   Built as a brainstorming surface — flip between directions via Tweaks. */

const { useState: useStateN, useRef: useRefN, useEffect: useEffectN } = React;

/* ---------- datasets (concrete examples) ---------- */
const NET_DATA = {
  chips: {
    label: "Potato chips",
    hub: "Lay's · Potato Chips",
    hubImg: "images/classic.png",
    cores: ["Brand: Lay's", "Category: Chips", "Base: Potato"],
    sibling: "Pringles",
    dims: [
      { label: "Style / cut", tone: "amber",
        values: [{ l: "Classic", img: "images/classic.png" }, { l: "Baked", img: "images/baked.png" }, { l: "Max ridged", img: "images/max-paprika.png" }],
        discovered: { l: "Oven Baked", img: "images/oven-yoghurt.png" } },
      { label: "Flavor", tone: "blue",
        values: [{ l: "Salted", img: "images/salted.png" }, { l: "Salt & Vinegar", img: "images/salt-vinegar.png" }, { l: "Red Sweet Chilli", img: "images/max-chilli.png" }] },
    ],
  },
  protein: {
    label: "Protein powder",
    hub: "Optimum · Whey Protein",
    cores: ["Brand: Optimum", "Category: Supplement", "Form: Powder"],
    sibling: "Myprotein",
    dims: [
      { label: "Flavor", tone: "purple", values: ["Vanilla", "Chocolate", "Cookies"], discovered: "Salted Caramel" },
      { label: "Protein type", tone: "green", values: ["Whey", "Isolate", "Plant"] },
    ],
  },
};

/* node ids: hub, core0..2, sib, d0v0..2, d1v0..2, disc */
function nodeList(d) {
  const lab = (v) => (typeof v === "object" ? v.l : v);
  const im = (v) => (typeof v === "object" ? v.img : null);
  const nodes = [{ id: "hub", role: "hub", label: d.hub, img: d.hubImg || null, tone: "red" }];
  d.cores.forEach((c, i) => nodes.push({ id: "core" + i, role: "core", label: c, tone: "ink" }));
  nodes.push({ id: "sib", role: "sibling", label: d.sibling, tone: "neutral" });
  d.dims.forEach((dim, di) => dim.values.forEach((v, vi) =>
    nodes.push({ id: `d${di}v${vi}`, role: "var", label: lab(v), img: im(v), tone: dim.tone, dim: di })));
  const disc = d.dims[0].discovered;
  nodes.push({ id: "disc", role: "discovered", label: lab(disc), img: im(disc), tone: "green", dim: 0 });
  return nodes;
}

/* ---------- position tables (x,y in 0..1) ---------- */
const POS = {
  organic: {
    hub: [.50, .50],
    core0: [.50, .16], core1: [.25, .27], core2: [.73, .25],
    sib: [.92, .20],
    d0v0: [.11, .45], d0v1: [.15, .70], d0v2: [.34, .89],
    d1v0: [.91, .47], d1v1: [.89, .655], d1v2: [.775, .835],
    disc: [.555, .915],
  },
  radial: {
    hub: [.50, .50],
    core0: [.50, .335], core1: [.355, .585], core2: [.645, .585],
    sib: [.50, .90],
    d0v0: [.165, .33], d0v1: [.10, .55], d0v2: [.185, .77],
    d1v0: [.835, .33], d1v1: [.90, .55], d1v2: [.815, .77],
    disc: [.31, .88],
  },
  layered: {
    hub: [.115, .50],
    core0: [.31, .50], core1: [.50, .50], core2: [.685, .50],
    sib: [.90, .50],
    d0v0: [.38, .22], d0v1: [.53, .14], d0v2: [.66, .24],
    d1v0: [.40, .78], d1v1: [.545, .86], d1v2: [.70, .78],
    disc: [.85, .18],
  },
};
POS.discovery = POS.organic;

/* ---------- links per mode ---------- */
function linksFor(mode) {
  const hubCentric = [
    ["hub", "core0", "core"], ["hub", "core1", "core"], ["hub", "core2", "core"],
    ["sib", "core1", "share"], ["sib", "core2", "share"],
    ["hub", "d0v0", "var"], ["hub", "d0v1", "var"], ["hub", "d0v2", "var"],
    ["hub", "d1v0", "var"], ["hub", "d1v1", "var"], ["hub", "d1v2", "var"],
    ["hub", "disc", "disc"],
  ];
  if (mode !== "layered") return hubCentric;
  // layered: spine chain + nearest-core branches
  const pos = POS.layered;
  const spineIds = ["hub", "core0", "core1", "core2", "sib"];
  const chain = [];
  for (let i = 0; i < spineIds.length - 1; i++) chain.push([spineIds[i], spineIds[i + 1], "core"]);
  const branchTo = (id) => {
    const x = pos[id][0];
    let best = "core1", bd = 9;
    ["core0", "core1", "core2"].forEach((c) => { const dd = Math.abs(pos[c][0] - x); if (dd < bd) { bd = dd; best = c; } });
    return best;
  };
  const branches = ["d0v0", "d0v1", "d0v2", "d1v0", "d1v1", "d1v2", "disc"].map((id) =>
    [branchTo(id), id, id === "disc" ? "disc" : "var"]);
  return [...chain, ...branches];
}

/* ---------- curved path between two fractional points ---------- */
function pathD(a, b, curve) {
  const [x1, y1] = [a[0] * 100, a[1] * 100], [x2, y2] = [b[0] * 100, b[1] * 100];
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
  const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy) || 1;
  const off = curve * len * 0.16;
  const cx = mx + (-dy / len) * off, cy = my + (dx / len) * off;
  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
}

/* ---------- node chip ---------- */
function NetNode({ n, pos, motion, hot, dim, onHover, visible, driftPhase }) {
  const c = toneColor(n.tone);
  const isHub = n.role === "hub";
  const isCore = n.role === "core";
  const isSib = n.role === "sibling";
  const isDisc = n.role === "discovered";
  const [k, v] = isCore && n.label.includes(":") ? n.label.split(":") : [null, n.label];

  let bg = "var(--surface)", border = `1px solid var(--border-strong)`, color = "var(--ink)";
  let pad = "7px 12px", fs = 12.5, fw = 600, shadow = "var(--shadow-1)";
  if (isHub) { bg = "var(--surface)"; border = `1.5px solid ${c}`; pad = "11px 16px"; fs = 14.5; shadow = "var(--shadow-3)"; }
  else if (n.role === "var") { bg = toneTint(n.tone); border = `1px solid ${toneEdge(n.tone)}`; color = toneColor(n.tone); pad = "6px 11px"; fs = 12; }
  else if (isDisc) { bg = "var(--green-tint)"; border = `1.5px solid var(--green-2)`; color = "var(--green-2)"; }
  else if (isSib) { bg = "var(--surface)"; border = `1.5px dashed var(--border-strong)`; color = "var(--ink-soft)"; }

  const dimmed = dim && !hot;
  return (
    <div
      onMouseEnter={() => onHover(n.id)} onMouseLeave={() => onHover(null)}
      style={{
        position: "absolute", left: `${pos[0] * 100}%`, top: `${pos[1] * 100}%`,
        transform: `translate(-50%,-50%) translateY(${motion === "lively" ? driftPhase : 0}px) scale(${hot ? 1.06 : 1})`,
        transition: "transform 360ms cubic-bezier(0.22,1,0.36,1), opacity 500ms ease",
        opacity: visible ? (dimmed ? 0.32 : 1) : 0,
        zIndex: hot ? 30 : isHub ? 20 : isDisc ? 18 : 10, cursor: "default",
      }}>
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 8, padding: pad,
        borderRadius: isHub ? 12 : 999, background: bg, border, color,
        boxShadow: hot ? "var(--shadow-3)" : shadow, whiteSpace: "nowrap",
        fontFamily: "var(--font)", fontSize: fs, fontWeight: fw, lineHeight: 1.15,
      }}>
        {isHub && (n.img
          ? <span style={{ width: 26, height: 26, borderRadius: 6, background: "#fff", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", padding: 2, flexShrink: 0 }}><img src={n.img} alt="" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} /></span>
          : <DCMark size={18} accent={c} />)}
        {!isHub && (n.img
          ? <span style={{ width: 22, height: 22, borderRadius: 5, background: "#fff", border: `1px solid ${isDisc ? "var(--green-edge)" : "var(--border)"}`, display: "flex", alignItems: "center", justifyContent: "center", padding: 1.5, flexShrink: 0 }}><img src={n.img} alt="" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} /></span>
          : (
          <span style={{
            width: isCore ? 8 : 7, height: isCore ? 8 : 7,
            borderRadius: isCore ? 2 : 99, background: color, flexShrink: 0,
            animation: motion !== "minimal" && (n.role === "var" || isDisc) ? "pulseDot 2.8s ease-in-out infinite" : "none",
          }} />
        ))}
        {k ? (
          <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.12 }}>
            <span className="eyebrow" style={{ fontSize: 8.5, color: "var(--ink-faint)" }}>{k.trim()}</span>
            <span style={{ fontWeight: 700, fontSize: 12.5 }}>{v.trim()}</span>
          </span>
        ) : <span>{v}</span>}
        {isDisc && <span className="mono" style={{ fontSize: 8.5, fontWeight: 600, color: "var(--green-2)", background: "#fff", border: "1px solid var(--green-edge)", borderRadius: 99, padding: "1px 5px" }}>NEW</span>}
      </div>
    </div>
  );
}

/* ---------- SemanticNetwork ---------- */
function SemanticNetwork({ mode = "organic", example = "chips", motion = "subtle", height = 560, step = 99 }) {
  const d = NET_DATA[example] || NET_DATA.chips;
  const nodes = nodeList(d);
  const pos = POS[mode] || POS.organic;
  const links = linksFor(mode);
  const [hover, setHover] = useStateN(null);
  const [tick, setTick] = useStateN(0);

  // gentle drift clock (only when lively)
  useEffectN(() => {
    if (motion !== "lively") return;
    let raf; const start = performance.now();
    const loop = (t) => { setTick((t - start) / 1000); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop); return () => cancelAnimationFrame(raf);
  }, [motion]);

  const isDiscovery = mode === "discovery";
  const discVisible = !isDiscovery || step >= 2;
  const curve = mode === "layered" ? 0.35 : mode === "radial" ? 0.9 : 1;

  const nodeHot = (id) => hover === id || (hover && links.some(([a, b]) => (a === hover && b === id) || (b === hover && a === id)));
  const linkHot = (a, b) => hover === a || hover === b;

  return (
    <div style={{ position: "relative", width: "100%", height, userSelect: "none" }}>
      {/* faint guide rings for radial */}
      {mode === "radial" && (
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
          {[26, 41].map((r, i) => (
            <ellipse key={i} cx="50" cy="50" rx={r} ry={r * 0.92} fill="none"
              stroke="var(--border)" strokeWidth="1" vectorEffect="non-scaling-stroke" strokeDasharray="2 4" />
          ))}
        </svg>
      )}

      {/* connections */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" width="100%" height="100%" style={{ position: "absolute", inset: 0, overflow: "visible" }}>
        {links.map(([a, b, kind], i) => {
          if (kind === "disc" && !discVisible) return null;
          const pa = pos[a], pb = pos[b]; if (!pa || !pb) return null;
          const hot = linkHot(a, b);
          const col = kind === "disc" ? "var(--green-2)" : kind === "share" ? "var(--ink-faint)" : kind === "var" ? "var(--border-strong)" : "var(--border-strong)";
          const w = hot ? 2.4 : kind === "core" ? 1.8 : 1.2;
          const flow = motion === "lively" && (kind === "var" || kind === "disc");
          return (
            <path key={i} d={pathD(pa, pb, curve)} fill="none"
              stroke={hot ? toneColor("red") : col}
              strokeWidth={w} vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              strokeDasharray={kind === "share" ? "3 4" : kind === "disc" ? "5 6" : flow ? "5 7" : "none"}
              className={flow ? "flow-path" : ""}
              style={{ opacity: hover ? (hot ? 1 : 0.25) : kind === "disc" ? 0.9 : 0.7, transition: "opacity 300ms ease, stroke-width 240ms ease" }} />
          );
        })}
      </svg>

      {/* nodes */}
      {nodes.map((n) => {
        if (n.role === "discovered" && !discVisible) return <NetNode key={n.id} n={n} pos={pos[n.id]} motion={motion} hot={false} dim={!!hover} onHover={setHover} visible={false} driftPhase={0} />;
        const phase = Math.sin(tick * 1.1 + (n.id.charCodeAt(n.id.length - 1) || 0)) * 3;
        return <NetNode key={n.id} n={n} pos={pos[n.id]} motion={motion} hot={nodeHot(n.id)} dim={!!hover} onHover={setHover} visible={true} driftPhase={phase} />;
      })}
    </div>
  );
}

/* ---------- compact legend ---------- */
function NetLegend({ example = "chips" }) {
  const d = NET_DATA[example] || NET_DATA.chips;
  const items = [
    { c: "var(--dh-red)", label: "Group anchor", sub: "the product itself" },
    { c: "var(--ink)", label: "Core attributes", sub: "stable · grouping nodes", sq: true },
    { c: toneColor(d.dims[0].tone), label: d.dims[0].label, sub: "variation dimension" },
    { c: toneColor(d.dims[1].tone), label: d.dims[1].label, sub: "variation dimension" },
    { c: "var(--green-2)", label: "Discovered", sub: "auto-joined from data" },
  ];
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 18 }}>
      {items.map((it, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 11, height: 11, borderRadius: it.sq ? 3 : 99, background: it.c, flexShrink: 0 }} />
          <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
            <span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)" }}>{it.label}</span>
            <span className="mono" style={{ fontSize: 10, color: "var(--ink-faint)" }}>{it.sub}</span>
          </span>
        </div>
      ))}
    </div>
  );
}

Object.assign(window, { SemanticNetwork, NetLegend, NET_DATA });
