/* v-brand.jsx — Brand marks, tags, cards, icons. Shared via window. */

const { useState, useEffect, useRef } = React;

/* ---------- tone helpers ---------- */
function toneColor(tone) {
  return {
    red: "var(--dh-red)", green: "var(--green-2)", amber: "var(--amber)",
    blue: "var(--blue-2)", purple: "var(--purple)", ink: "var(--ink)",
    neutral: "var(--ink-mute)",
  }[tone] || "var(--dh-red)";
}
function toneTint(tone) {
  return {
    red: "var(--red-tint)", green: "var(--green-tint)", amber: "var(--amber-tint)",
    blue: "var(--blue-tint)", purple: "var(--purple-tint)", ink: "var(--surface-3)",
    neutral: "var(--surface-3)",
  }[tone] || "var(--red-tint)";
}
function toneEdge(tone) {
  return {
    red: "var(--red-edge)", green: "var(--green-edge)", amber: "var(--amber-edge)",
    blue: "var(--blue-edge)", purple: "var(--purple-edge)", ink: "var(--border-strong)",
    neutral: "var(--border-strong)",
  }[tone] || "var(--red-edge)";
}

/* ---------- DCMark : abstract tier-stack logo ---------- */
function DCMark({ size = 32, accent = "var(--accent)" }) {
  const bars = [
    { w: 0.86, o: 1 }, { w: 0.66, o: 0.74 }, { w: 0.46, o: 0.5 }, { w: 0.28, o: 0.32 },
  ];
  const unit = size / 4.4;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: unit * 0.34, justifyContent: "center" }}>
      {bars.map((b, i) => (
        <div key={i} style={{
          width: size * b.w, height: unit * 0.8, borderRadius: 99,
          background: accent, opacity: b.o,
        }} />
      ))}
    </div>
  );
}

/* ---------- DCLockup : mark + wordmark ---------- */
function DCLockup({ size = 30, fontSize = 18, color = "var(--ink)" }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
      <DCMark size={size} />
      <span style={{ fontFamily: "var(--font)", fontWeight: 700, fontSize, letterSpacing: "-0.02em", color }}>
        Variants<span style={{ color: "var(--ink-faint)", fontWeight: 500 }}>Vision</span>
      </span>
    </div>
  );
}

/* ---------- DHBadge : co-brand ---------- */
function DHBadge({ size = 16 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 7, color: "var(--ink-faint)" }}>
      <span style={{ fontSize: 11.5, fontWeight: 500 }}>by</span>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 3h6.5a6.5 6.5 0 0 1 0 13H9v5H5V3Z" fill="var(--dh-red)" />
        <circle cx="9" cy="9.5" r="2.1" fill="#fff" />
      </svg>
      <span style={{ fontSize: 12, fontWeight: 600, color: "var(--ink-soft)" }}>Delivery&nbsp;Hero</span>
    </div>
  );
}

/* ---------- DCTag : pill ---------- */
function DCTag({ tone = "neutral", mono = false, children, style = {}, solid = false }) {
  const c = toneColor(tone), t = toneTint(tone), e = toneEdge(tone);
  return (
    <span className={mono ? "mono" : ""} style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      padding: "3px 9px", borderRadius: 999,
      fontSize: 11.5, fontWeight: 600, lineHeight: 1.4,
      letterSpacing: mono ? "0" : "0.005em",
      color: solid ? "#fff" : c,
      background: solid ? c : t,
      border: `1px solid ${solid ? c : e}`,
      whiteSpace: "nowrap", ...style,
    }}>{children}</span>
  );
}

/* ---------- DCCard ---------- */
function DCCard({ padded = true, accent, children, style = {}, hover = false, ...rest }) {
  const [h, setH] = useState(false);
  return (
    <div
      onMouseEnter={() => hover && setH(true)}
      onMouseLeave={() => hover && setH(false)}
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderTop: accent ? `3px solid ${accent}` : "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        boxShadow: h ? "var(--shadow-3)" : "var(--shadow-1)",
        padding: padded ? 22 : 0,
        transition: "box-shadow 240ms ease, transform 240ms ease",
        transform: h ? "translateY(-3px)" : "none",
        ...style,
      }}
      {...rest}
    >{children}</div>
  );
}

/* ---------- SceneBadge ---------- */
function SceneBadge({ num, tone = "red" }) {
  const c = toneColor(tone);
  return (
    <div className="mono" style={{
      width: 38, height: 38, borderRadius: 11,
      border: `1.5px solid ${c}`, color: c,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 14, fontWeight: 600, flexShrink: 0,
      background: toneTint(tone),
    }}>{String(num).padStart(2, "0")}</div>
  );
}

/* ---------- StepIndicator ---------- */
function StepIndicator({ step, total, tone = "purple" }) {
  const c = toneColor(tone);
  return (
    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          height: 6, borderRadius: 99,
          width: i === step ? 24 : 6,
          background: i <= step ? c : "var(--border-strong)",
          transition: "all 320ms cubic-bezier(0.22,1,0.36,1)",
        }} />
      ))}
    </div>
  );
}

/* ---------- Icons ---------- */
function CheckBig({ size = 18, color = "var(--green-2)" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12.5l4.2 4.3L19 7" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function XBig({ size = 18, color = "var(--dh-red)" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}
function ArrowRightSm({ size = 16, color = "var(--ink-mute)" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ArrowDownSm({ size = 16, color = "var(--ink-mute)" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 5v13M6 11l6 6 6-6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function SparkIcon({ size = 16, color = "var(--accent)" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3l1.7 5.6L19 10l-5.3 1.4L12 17l-1.7-5.6L5 10l5.3-1.4L12 3Z" fill={color} />
    </svg>
  );
}

Object.assign(window, {
  toneColor, toneTint, toneEdge,
  DCMark, DCLockup, DHBadge, DCTag, DCCard,
  SceneBadge, StepIndicator,
  CheckBig, XBig, ArrowRightSm, ArrowDownSm, SparkIcon,
});
