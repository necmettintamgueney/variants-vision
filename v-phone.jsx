/* v-phone.jsx — Product detail page: current vs imagined variant display.
   Uses the real Lay's catalogue (v-data.jsx) with embedded product images.
   Original grocery-app layout — not a recreation of any branded app. */

const { useState: useStateP } = React;

const STYLE_ICON = { "Classic": "◆", "Baked": "◐", "Max": "▮", "Oven Baked": "✦" };

/* ---------- status bar ---------- */
function StatusBar() {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 22px 4px", fontFamily: "var(--font)" }}>
      <span style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>9:41</span>
      <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
        <svg width="17" height="11" viewBox="0 0 17 11" fill="none"><rect x="0" y="6" width="3" height="5" rx="1" fill="var(--ink)"/><rect x="4.5" y="4" width="3" height="7" rx="1" fill="var(--ink)"/><rect x="9" y="2" width="3" height="9" rx="1" fill="var(--ink)"/><rect x="13.5" y="0" width="3" height="11" rx="1" fill="var(--ink-faint)"/></svg>
        <svg width="22" height="11" viewBox="0 0 24 12" fill="none"><rect x="0.5" y="0.5" width="20" height="11" rx="3" stroke="var(--ink)" opacity="0.5"/><rect x="2" y="2" width="15" height="8" rx="1.5" fill="var(--ink)"/><rect x="21.5" y="3.5" width="2" height="5" rx="1" fill="var(--ink)" opacity="0.5"/></svg>
      </div>
    </div>
  );
}

/* ---------- product image tile ---------- */
function ProductImg({ src, h = 168, radius = 16, pad = 10, bg = "var(--surface-2)" }) {
  return (
    <div style={{ width: "100%", height: h, borderRadius: radius, background: bg, border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", padding: pad, overflow: "hidden" }}>
      <img src={src} alt="" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", filter: "drop-shadow(0 6px 14px rgba(20,22,30,0.16))" }} />
    </div>
  );
}

function PillBtn({ active, children, onClick, accent = "var(--blue-2)" }) {
  return (
    <button onClick={onClick} style={{
      padding: "9px 12px", borderRadius: 10, cursor: "pointer",
      border: active ? `1.5px solid ${accent}` : "1.5px solid var(--border)",
      background: active ? "var(--ink)" : "var(--surface)",
      color: active ? "#fff" : "var(--ink-soft)",
      fontFamily: "var(--font)", fontWeight: 600, fontSize: 12.5,
      transition: "all 180ms ease", display: "flex", flexDirection: "column",
      alignItems: "flex-start", gap: 2, minWidth: 58,
    }}>{children}</button>
  );
}

/* ---------- CURRENT state ---------- */
function ScreenCurrent() {
  const d = LAYS, p = layById("classic");
  return (
    <div style={{ padding: "6px 16px 18px", animation: "fadeUp 0.45s ease both" }}>
      <ProductImg src={p.img} />
      <div style={{ marginTop: 14 }}>
        <div className="eyebrow" style={{ color: "var(--ink-faint)" }}>{d.brand}</div>
        <div style={{ fontSize: 19, fontWeight: 700, letterSpacing: "-0.01em", marginTop: 2 }}>Classic · {p.size}</div>
        <div style={{ fontSize: 18, fontWeight: 700, color: "var(--ink)", marginTop: 6 }}>{d.unit}{p.price}</div>
      </div>

      <div style={{ marginTop: 16 }}>
        <div className="eyebrow" style={{ marginBottom: 8 }}>Size</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 13px", border: "1.5px solid var(--border)", borderRadius: 10, background: "var(--surface-2)", color: "var(--ink-soft)", fontSize: 13.5, fontWeight: 600 }}>
          <span>{p.size}</span><ArrowDownSm size={15} />
        </div>
      </div>

      <div style={{ marginTop: 14, padding: "11px 13px", border: "1px dashed var(--border-strong)", borderRadius: 10, background: "var(--surface)" }}>
        <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
          <XBig size={15} color="var(--ink-faint)" />
          <div style={{ fontSize: 12, color: "var(--ink-mute)", lineHeight: 1.45 }}>
            Baked, Max and Oven-Baked are <b style={{ color: "var(--ink-soft)" }}>separate listings</b>. Flavors don&rsquo;t connect. No way to compare cut, fat or size.
          </div>
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <div className="eyebrow" style={{ marginBottom: 8 }}>You might also like</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {["salted", "maxpaprika"].map((id) => {
            const x = layById(id);
            return (
              <div key={id} style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 10, background: "var(--surface)" }}>
                <div style={{ height: 64, borderRadius: 8, background: "var(--surface-2)", display: "flex", alignItems: "center", justifyContent: "center", padding: 6 }}>
                  <img src={x.img} alt="" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
                </div>
                <div style={{ fontSize: 11.5, fontWeight: 600, marginTop: 7, color: "var(--ink-soft)" }}>Lay&rsquo;s {x.flavor}</div>
                <div style={{ fontSize: 11, color: "var(--ink-faint)" }}>{d.unit}{x.price}</div>
              </div>
            );
          })}
        </div>
      </div>

      <button style={{ width: "100%", marginTop: 18, padding: "14px", borderRadius: 12, border: "none", background: "var(--ink)", color: "#fff", fontFamily: "var(--font)", fontWeight: 700, fontSize: 14.5, cursor: "pointer" }}>Add to cart · {d.unit}{p.price}</button>
    </div>
  );
}

/* ---------- IMAGINED state ---------- */
function ScreenImagined() {
  const d = LAYS;
  const [sel, setSel] = useStateP("classic");
  const p = layById(sel);
  const stylesList = d.dims.style;

  // Get unique flavors within the current style (one entry per flavor, use first size as representative)
  const inStyle = d.products.filter((x) => x.style === p.style);
  const uniqueFlavors = [];
  const seenFlavors = new Set();
  inStyle.forEach((x) => {
    if (!seenFlavors.has(x.flavor)) {
      seenFlavors.add(x.flavor);
      uniqueFlavors.push(x);
    }
  });

  // Find all sizes available for the current style + flavor combo
  const sameFlavorInStyle = d.products.filter((x) => x.style === p.style && x.flavor === p.flavor);
  const availableSizes = sameFlavorInStyle.map((x) => x.size);

  const pickStyle = (st) => {
    const first = d.products.find((x) => x.style === st);
    if (first) setSel(first.id);
  };

  const pickFlavor = (flavor) => {
    // When picking a flavor, try to keep the same size if available, otherwise pick first
    const currentSize = p.size;
    const sameSize = d.products.find((x) => x.style === p.style && x.flavor === flavor && x.size === currentSize);
    if (sameSize) setSel(sameSize.id);
    else {
      const first = d.products.find((x) => x.style === p.style && x.flavor === flavor);
      if (first) setSel(first.id);
    }
  };

  const pickSize = (sz) => {
    const match = d.products.find((x) => x.style === p.style && x.flavor === p.flavor && x.size === sz);
    if (match) setSel(match.id);
  };

  return (
    <div style={{ padding: "6px 16px 18px", animation: "fadeUp 0.4s ease both" }}>
      <div style={{ position: "relative" }}>
        <ProductImg src={p.img} h={172} />
        <div style={{ position: "absolute", top: 10, left: 10, display: "flex", gap: 6, flexWrap: "wrap" }}>
          <DCTag tone="purple" solid style={{ boxShadow: "var(--shadow-2)" }}><SparkIcon size={11} color="#fff" /> Variant group</DCTag>
          {p.isNew && <DCTag tone="green" solid style={{ boxShadow: "var(--shadow-2)" }}>NEW</DCTag>}
        </div>
      </div>

      <div style={{ marginTop: 13 }}>
        <div className="eyebrow" style={{ color: "var(--ink-faint)" }}>{d.brand} · {p.cut}</div>
        <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.01em", marginTop: 2, lineHeight: 1.15 }}>{p.name}</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 6 }}>
          <span style={{ fontSize: 18, fontWeight: 700 }}>{d.unit}{p.price}</span>
          <span style={{ fontSize: 12, color: "var(--ink-faint)" }}>· {p.size}</span>
          <span className="mono" style={{ fontSize: 10.5, color: "var(--ink-faint)", marginLeft: "auto" }}>group {d.unit}{d.priceLow}–{d.unit}{d.priceHigh}</span>
        </div>
      </div>

      {/* Style / cut dimension */}
      <div style={{ marginTop: 15 }}>
        <div className="eyebrow" style={{ marginBottom: 8 }}>Style &amp; cut · {stylesList.length}</div>
        <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
          {stylesList.map((st) => {
            const on = p.style === st;
            return (
              <button key={st} onClick={() => pickStyle(st)} style={{
                display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 11px", borderRadius: 999, cursor: "pointer",
                border: on ? "1.5px solid var(--dh-red)" : "1.5px solid var(--border)",
                background: on ? "var(--red-tint)" : "var(--surface)", color: on ? "var(--dh-red)" : "var(--ink-soft)",
                fontFamily: "var(--font)", fontWeight: 600, fontSize: 12, transition: "all 160ms ease",
              }}>
                <span style={{ fontSize: 11 }}>{STYLE_ICON[st]}</span>{st}
              </button>
            );
          })}
        </div>
      </div>

      {/* Flavor dimension (images) - unique flavors only */}
      <div style={{ marginTop: 16 }}>
        <div className="eyebrow" style={{ marginBottom: 8 }}>Flavor · {p.style}</div>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 2 }}>
          {uniqueFlavors.map((x) => {
            const on = p.flavor === x.flavor;
            return (
              <button key={x.flavor} onClick={() => pickFlavor(x.flavor)} style={{
                flexShrink: 0, width: 70, border: on ? "2px solid var(--dh-red)" : "1.5px solid var(--border)",
                borderRadius: 12, padding: 5, background: "var(--surface)", cursor: "pointer", position: "relative", transition: "all 160ms ease",
              }}>
                <div style={{ height: 50, borderRadius: 8, background: "var(--surface-2)", display: "flex", alignItems: "center", justifyContent: "center", padding: 3 }}>
                  <img src={x.img} alt="" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
                </div>
                <div style={{ fontSize: 9.5, fontWeight: 600, marginTop: 5, color: on ? "var(--dh-red)" : "var(--ink-soft)", lineHeight: 1.1, textAlign: "left" }}>
                  {x.flavor}
                </div>
                {x.isNew && <span style={{ position: "absolute", top: -6, right: -6, fontSize: 8, fontWeight: 700, color: "#fff", background: "var(--green-2)", borderRadius: 99, padding: "1px 5px", boxShadow: "var(--shadow-1)" }}>NEW</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Size dimension - only show if multiple sizes available */}
      {availableSizes.length > 1 && (
        <div style={{ marginTop: 16 }}>
          <div className="eyebrow" style={{ marginBottom: 8 }}>Size · {p.flavor}</div>
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
            {availableSizes.map((sz) => {
              const on = p.size === sz;
              const szProduct = sameFlavorInStyle.find((x) => x.size === sz);
              return (
                <button key={sz} onClick={() => pickSize(sz)} style={{
                  display: "inline-flex", alignItems: "center", gap: 4, padding: "7px 12px", borderRadius: 10, cursor: "pointer",
                  border: on ? "1.5px solid var(--ink)" : "1.5px solid var(--border)",
                  background: on ? "var(--ink)" : "var(--surface)", color: on ? "#fff" : "var(--ink-soft)",
                  fontFamily: "var(--mono)", fontWeight: 600, fontSize: 12, transition: "all 160ms ease",
                }}>
                  {sz}
                  {szProduct && szProduct.price !== p.price && !on && (
                    <span style={{ fontSize: 10, color: "var(--ink-faint)", marginLeft: 2 }}>{d.unit}{szProduct.price}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* attributes from image */}
      <div style={{ marginTop: 15 }}>
        <div className="eyebrow" style={{ marginBottom: 8 }}>Read from the pack</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
          {p.attrs.map((a, i) => (
            <DCTag key={i} tone={a.tone}>{a.img && <SparkIcon size={10} color={toneColor(a.tone)} />}{a.t}</DCTag>
          ))}
        </div>
      </div>

      {/* analytics */}
      <div style={{ marginTop: 16, padding: "11px 13px", border: "1px solid var(--purple-edge)", borderRadius: 10, background: "var(--purple-tint)" }}>
        <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
          <SparkIcon size={14} color="var(--purple)" />
          <div style={{ fontSize: 11.5, color: "var(--purple-2)", lineHeight: 1.45 }}>
            <b>{d.dims.style.length} styles · {d.dims.flavor.length} flavors · {d.dims.size.length} sizes</b> in one group — discovered from text &amp; pack images, no schema edits.
          </div>
        </div>
      </div>

      <button style={{ width: "100%", marginTop: 16, padding: "14px", borderRadius: 12, border: "none", background: "var(--dh-red)", color: "#fff", fontFamily: "var(--font)", fontWeight: 700, fontSize: 14.5, cursor: "pointer" }}>Add to cart · {d.unit}{p.price}</button>
    </div>
  );
}

/* ---------- Phone frame ---------- */
function PhoneFrame({ children }) {
  return (
    <div style={{ width: 320, borderRadius: 46, padding: 9, background: "linear-gradient(160deg,#2a2d36,#14161c)", boxShadow: "var(--shadow-4)", flexShrink: 0 }}>
      <div style={{ borderRadius: 38, background: "var(--surface)", overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", top: 11, left: "50%", transform: "translateX(-50%)", width: 92, height: 24, background: "#14161c", borderRadius: 99, zIndex: 40 }} />
        <StatusBar />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 16px 8px" }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <div style={{ width: 34, height: 34, borderRadius: 10, border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 11c0 5.5-7 10-7 10Z" stroke="var(--ink-mute)" strokeWidth="1.8" strokeLinejoin="round"/></svg>
          </div>
        </div>
        <div style={{ maxHeight: 576, overflow: "hidden" }}>{children}</div>
      </div>
    </div>
  );
}

/* ---------- PhoneCompare ---------- */
function PhoneCompare({ controlled, onToggle }) {
  const [stateInner, setStateInner] = useStateP("imagined");
  const state = controlled || stateInner;
  const set = (s) => { onToggle ? onToggle(s) : setStateInner(s); };
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
      <div style={{ display: "inline-flex", padding: 4, background: "var(--surface-2)", borderRadius: 12, border: "1px solid var(--border)", gap: 4 }}>
        {[["current", "Today"], ["imagined", "Imagined"]].map(([k, lab]) => (
          <button key={k} onClick={() => set(k)} style={{
            padding: "8px 18px", borderRadius: 9, border: "none", cursor: "pointer",
            fontFamily: "var(--font)", fontWeight: 600, fontSize: 13,
            background: state === k ? "var(--surface)" : "transparent",
            color: state === k ? (k === "imagined" ? "var(--dh-red)" : "var(--ink)") : "var(--ink-mute)",
            boxShadow: state === k ? "var(--shadow-1)" : "none", transition: "all 180ms ease",
          }}>{lab}</button>
        ))}
      </div>
      <PhoneFrame>
        {state === "current" ? <ScreenCurrent /> : <ScreenImagined />}
      </PhoneFrame>
    </div>
  );
}

Object.assign(window, { PhoneCompare });
