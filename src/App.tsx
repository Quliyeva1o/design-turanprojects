import { useState, useCallback, useMemo, memo } from "react";

// =========================
// ASSETS — update paths to match your Vite/CRA public or src structure.
// In Vite: import a151 from "./assets/hovuzlar/klassikcam/a151.png";
// In CRA:  same pattern, or put images in /public and use string paths.
// =========================
import a151 from "./assets/hovuzlar/klassikcam/a151.png";
import a151gece from "./assets/hovuzlar/klassikcam/a151gece.png";
import a155 from "./assets/hovuzlar/klassikcam/a155.png";
import a155gece from "./assets/hovuzlar/klassikcam/a155gece.png";
import a158 from "./assets/hovuzlar/klassikcam/a158.png";
import a158gece from "./assets/hovuzlar/klassikcam/a158gece.png";
import a159 from "./assets/hovuzlar/klassikcam/a159.png";
import a159gece from "./assets/hovuzlar/klassikcam/a159gece.png";
import a161 from "./assets/hovuzlar/klassikcam/a161.png";
import a161gece from "./assets/hovuzlar/klassikcam/a161gece.png";
import a161l from "./assets/hovuzlar/klassikcam/a161l.png";
import a161lgece from "./assets/hovuzlar/klassikcam/a161lgece.png";
import a218 from "./assets/hovuzlar/klassikcam/a218.png";
import a218gece from "./assets/hovuzlar/klassikcam/a218gece.png";
import a231 from "./assets/hovuzlar/klassikcam/a231.png";
import a231gece from "./assets/hovuzlar/klassikcam/a231gece.png";
import a236 from "./assets/hovuzlar/klassikcam/a236.png";
import a236gece from "./assets/hovuzlar/klassikcam/a236gece.png";
import a276 from "./assets/hovuzlar/klassikcam/a276.png";
import a276gece from "./assets/hovuzlar/klassikcam/a276gece.png";

import bali from "./assets/hovuzlar/kare/bali.png";
import baligece from "./assets/hovuzlar/kare/baligece.png";
import floralblue from "./assets/hovuzlar/kare/floralBlue.png";
import floralblueGece from "./assets/hovuzlar/kare/floralBlueGece.png";
import floralgreen from "./assets/hovuzlar/kare/floralGreen.png";
import floralgreenGece from "./assets/hovuzlar/kare/floralGreenGece.png";
import judiGreyKare from "./assets/hovuzlar/kare/judiGrey.png";
import judiGreyKareGece from "./assets/hovuzlar/kare/judiGreyGece.png";

import light from "./assets/kenarkafeller/light.png";
import lightGece from "./assets/kenarkafeller/lightgece.png";
import superstone from "./assets/kenarkafeller/superstonegpt.png";
import superstoneGece from "./assets/kenarkafeller/superstonegptgece.png";
import judiGrey from "./assets/kenarkafeller/judigrey.png";
import judiGreyGece from "./assets/kenarkafeller/judigreygece.png";
import lucaGrey from "./assets/kenarkafeller/lucaGrey.png";
import lucaGreyGece from "./assets/kenarkafeller/lucaGreyGece.png";

import lightorta from "./assets/ortakafeller/lightorta.png";
import lightortaGece from "./assets/ortakafeller/lightortaGece.png";
import judiGreyorta from "./assets/ortakafeller/judiGreyorta.png";
import judiGreyortaGece from "./assets/ortakafeller/judiGreyortaGece.png";
import lucaGreyOrta from "./assets/ortakafeller/lucaGreyOrta.png";
import lucaGreyOrtaGece from "./assets/ortakafeller/lucaGreyOrtaGece.png";

import terasLight from "./assets/teraslar/villa3.png";
import terasLightGece from "./assets/teraslar/villa3gece.png";
import terasJudi from "./assets/teraslar/villa2.png";
import terasJudiGece from "./assets/teraslar/villa3gecee.png";
import terasLuca from "./assets/teraslar/hovuz.png";
import terasLucaGece from "./assets/teraslar/hovuzgece.png";
import mavivilla from "./assets/teraslar/mavivilla.png";
import mavivillagece from "./assets/teraslar/mavivillagece.png";
import villa4 from "./assets/teraslar/villa4.png";
import gpt from "./assets/teraslar/mavihovuz.png";
import gptgece from "./assets/teraslar/mavihovuzgece.png";

// =========================
// STYLES (injected once)
// =========================
const GLOBAL_STYLE = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { overflow: hidden; background: #000; }

  .img-layer {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: bottom;
    will-change: opacity;
    transition: opacity 400ms ease;
    backface-visibility: hidden;
  }
  .img-layer[data-active="false"] { opacity: 0; pointer-events: none; }
  .img-layer[data-active="true"]  { opacity: 1; }

  .thumb-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .tile-btn {
    width: 100%;
    outline: none;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
  }
  .tile-btn:hover .thumb-overlay { opacity: 1 !important; }

  .cat-icon-btn { cursor: pointer; }

  .catalog-scroll::-webkit-scrollbar { display: none; }
  .catalog-scroll { scrollbar-width: none; }
`;

// =========================
// IMAGE LAYER — memo prevents re-render unless src/active changes
// =========================
const ImageLayer = memo(function ImageLayer({ src, isActive, zIndex, alt, style }) {
  return (
    <img
      src={src}
      alt={alt}
      className="img-layer"
      data-active={isActive ? "true" : "false"}
      style={{ zIndex, ...style }}
      // Active images: decode synchronously for instant paint
      // Inactive: async so they never block
      decoding={isActive ? "sync" : "async"}
      fetchpriority={isActive ? "high" : "low"}
    />
  );
});

// =========================
// TILE CARD — memo so only the changed card re-renders
// =========================
const TileCard = memo(function TileCard({ option, isSelected, isNight, onClick }) {
  return (
    <button className="tile-btn" onClick={onClick}>
      {/* Thumbnail */}
      <div
        style={{
          borderRadius: 10,
          overflow: "hidden",
          border: isSelected ? "2px solid rgba(255,255,255,0.9)" : "2px solid rgba(255,255,255,0.08)",
          boxShadow: isSelected
            ? "0 0 0 3px rgba(99,179,237,0.5), 0 4px 20px rgba(0,0,0,0.5)"
            : "0 2px 8px rgba(0,0,0,0.3)",
          transition: "border 0.25s, box-shadow 0.25s, transform 0.25s",
          transform: isSelected ? "scale(1.03)" : "scale(1)",
          aspectRatio: "1 / 1",
          position: "relative",
        }}
      >
        <img
          src={isNight ? option.gece : option.gunduz}
          alt={option.label}
          className="thumb-img"
          decoding="async"
          loading="lazy"
        />
        {/* Hover overlay */}
        <div
          className="thumb-overlay"
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(255,255,255,0.08)",
            opacity: 0,
            transition: "opacity 0.2s",
            pointerEvents: "none",
          }}
        />
        {/* Selected checkmark */}
        {isSelected && (
          <div
            style={{
              position: "absolute",
              top: 5,
              right: 5,
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: "rgba(99,179,237,0.9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 10,
              color: "#fff",
              fontWeight: 700,
            }}
          >
            ✓
          </div>
        )}
      </div>
      {/* Label */}
      <p
        style={{
          marginTop: 5,
          fontSize: 10,
          fontWeight: isSelected ? 700 : 400,
          color: isSelected ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.5)",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          transition: "color 0.2s",
          textAlign: "center",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {option.label}
      </p>
    </button>
  );
});

// =========================
// CATALOG PANEL — memo so it only re-renders when selections/mode change
// =========================
const CatalogPanel = memo(function CatalogPanel({ categories, selections, onSelect, isNight }) {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const activeCat = useMemo(() => categories.find((c) => c.id === activeCategory), [categories, activeCategory]);

  return (
    <div
      style={{
        position: "absolute",
        left: 16,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 100,
        display: "flex",
        gap: 8,
        height: "min(600px, 85vh)",
      }}
    >
      {/* Category icon strip */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6, justifyContent: "center" }}>
        {categories.map((cat) => {
          const isActive = cat.id === activeCategory;
          const selectedOpt = cat.options.find((o) => o.key === selections[cat.id]);
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              title={cat.label}
              className="cat-icon-btn"
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                border: isActive ? "1.5px solid rgba(255,255,255,0.7)" : "1.5px solid rgba(255,255,255,0.12)",
                background: isActive ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.45)",
                backdropFilter: "blur(12px)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                transition: "all 0.2s ease",
                boxShadow: isActive ? "0 4px 16px rgba(0,0,0,0.4)" : "none",
                padding: 0,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {selectedOpt && (
                <div style={{ position: "absolute", inset: 0, opacity: 0.35 }}>
                  <img
                    src={isNight ? selectedOpt.gece : selectedOpt.gunduz}
                    alt=""
                    className="thumb-img"
                    decoding="async"
                    loading="lazy"
                  />
                </div>
              )}
              <span style={{ fontSize: 18, position: "relative" }}>{cat.icon}</span>
              <span
                style={{
                  fontSize: 8,
                  color: isActive ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.45)",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  position: "relative",
                }}
              >
                {cat.label.slice(0, 5)}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tile grid panel */}
      <div
        style={{
          width: 176,
          height: "100%",
          background: "rgba(8,8,12,0.72)",
          backdropFilter: "blur(20px)",
          borderRadius: 16,
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div style={{ padding: "14px 14px 10px", borderBottom: "1px solid rgba(255,255,255,0.07)", flexShrink: 0 }}>
          <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
            {activeCat.icon} {activeCat.label}
          </p>
          <p style={{ margin: "2px 0 0", fontSize: 9, color: "rgba(255,255,255,0.25)", letterSpacing: "0.06em" }}>
            {activeCat.options.length} seçim
          </p>
        </div>

        {/* Scrollable grid */}
        <div
          className="catalog-scroll"
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "10px 10px 14px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
            alignContent: "start",
          }}
        >
          {activeCat.options.map((option) => (
            <TileCard
              key={option.key}
              option={option}
              isSelected={selections[activeCategory] === option.key}
              isNight={isNight}
              onClick={() => onSelect(activeCategory, option.key)}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

// =========================
// MAIN COMPONENT
// =========================
export default function Create() {
  const [isNight, setIsNight] = useState(false);
  const [selections, setSelections] = useState({
    hovuz: "gpt",
    kenar: "superstone",
    orta: "superstone",
    teras: "gpt",
  });

  const toggleNight = useCallback(() => setIsNight((p) => !p), []);
  const handleSelect = useCallback((categoryId, key) => {
    setSelections((prev) => ({ ...prev, [categoryId]: key }));
  }, []);

  // ---- Data (stable — defined outside render or memoized) ----
  const hovuzlar = useMemo(() => [
    { key: "a151",       label: "A151",        gunduz: a151,        gece: a151gece       },
    { key: "a155",       label: "A155",        gunduz: a155,        gece: a155gece       },
    { key: "a158",       label: "A158",        gunduz: a158,        gece: a158gece       },
    { key: "a159",       label: "A159",        gunduz: a159,        gece: a159gece       },
    { key: "a161",       label: "A161",        gunduz: a161,        gece: a161gece       },
    { key: "a161l",      label: "A161L",       gunduz: a161l,       gece: a161lgece      },
    { key: "a218",       label: "A218",        gunduz: a218,        gece: a218gece       },
    { key: "a231",       label: "A231",        gunduz: a231,        gece: a231gece       },
    { key: "a236",       label: "A236",        gunduz: a236,        gece: a236gece       },
    { key: "a276",       label: "A276",        gunduz: a276,        gece: a276gece       },
    { key: "bali",       label: "Bali",        gunduz: bali,        gece: baligece       },
    { key: "floralblue", label: "Floral Blue", gunduz: floralblue,  gece: floralblueGece },
    { key: "floralgreen",label: "Floral Green",gunduz: floralgreen, gece: floralgreenGece},
    { key: "judiGrey",   label: "Judi Grey",   gunduz: judiGreyKare,gece: judiGreyKareGece},
    { key: "gpt",        label: "GPT",         gunduz: gpt,         gece: gptgece        },
  ], []);

  const kenarKafeller = useMemo(() => [
    { key: "light",      label: "Light",      gunduz: light,      gece: lightGece      },
    { key: "judi",       label: "Judi Grey",  gunduz: judiGrey,   gece: judiGreyGece   },
    { key: "luca",       label: "Luca Grey",  gunduz: lucaGrey,   gece: lucaGreyGece   },
    { key: "superstone", label: "Superstone", gunduz: superstone, gece: superstoneGece },
  ], []);

  const ortaKafeller = useMemo(() => [
    { key: "light",      label: "Light",      gunduz: lightorta,    gece: lightortaGece    },
    { key: "judi",       label: "Judi Grey",  gunduz: judiGreyorta, gece: judiGreyortaGece },
    { key: "luca",       label: "Luca Grey",  gunduz: lucaGreyOrta, gece: lucaGreyOrtaGece },
    { key: "superstone", label: "Superstone", gunduz: superstone,   gece: superstoneGece   },
  ], []);

  const teraslar = useMemo(() => [
    { key: "judi",      label: "Judi",      gunduz: terasJudi,  gece: terasJudiGece  },
    { key: "boz",       label: "Boz",       gunduz: villa4,     gece: terasJudiGece  },
    { key: "light",     label: "Light",     gunduz: terasLight, gece: terasLightGece },
    { key: "luca",      label: "Luca",      gunduz: terasLuca,  gece: terasLucaGece  },
    { key: "mavivilla", label: "Mavi Villa",gunduz: mavivilla,  gece: mavivillagece  },
    { key: "gpt",       label: "GPT Villa", gunduz: gpt,        gece: gptgece        },
  ], []);

  const categories = useMemo(() => [
    { id: "hovuz", label: "Hovuz", icon: "🏊", options: hovuzlar      },
    { id: "kenar", label: "Kenar", icon: "🪨", options: kenarKafeller },
    { id: "orta",  label: "Orta",  icon: "⬛", options: ortaKafeller  },
    { id: "teras", label: "Teras", icon: "🏡", options: teraslar      },
  ], [hovuzlar, kenarKafeller, ortaKafeller, teraslar]);

  // Inject global style once
  useMemo(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById("create-style")) return;
    const tag = document.createElement("style");
    tag.id = "create-style";
    tag.textContent = GLOBAL_STYLE;
    document.head.appendChild(tag);
  }, []);

  const { hovuz: hovuzKey, kenar: kenarKey, orta: ortaKey, teras: terasKey } = selections;

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden", contain: "strict" }}>

      {/* ---- HOVUZLAR ---- */}
      {hovuzlar.map((opt) => (
        <ImageLayer
          key={opt.key}
          src={isNight ? opt.gece : opt.gunduz}
          isActive={opt.key === hovuzKey}
          zIndex={10}
          alt={`hovuz-${opt.key}`}
        />
      ))}

      {/* ---- KENAR KAFELLƏR ---- */}
      {kenarKafeller.map((opt) => (
        <ImageLayer
          key={opt.key}
          src={isNight ? opt.gece : opt.gunduz}
          isActive={opt.key === kenarKey}
          zIndex={20}
          alt={`kenar-${opt.key}`}
        />
      ))}

      {/* ---- ORTA KAFELLƏR ---- */}
      {ortaKafeller.map((opt) => (
        <ImageLayer
          key={opt.key}
          src={isNight ? opt.gece : opt.gunduz}
          isActive={opt.key === ortaKey}
          zIndex={22}
          style={{ transform: "scale(1.01) translateX(3px)" }}
          alt={`orta-${opt.key}`}
        />
      ))}

      {/* ---- TERASLAR ---- */}
      {teraslar.map((opt) => (
        <ImageLayer
          key={opt.key}
          src={isNight ? opt.gece : opt.gunduz}
          isActive={opt.key === terasKey}
          zIndex={15}
          alt={`teras-${opt.key}`}
        />
      ))}

      {/* ---- CATALOG PANEL ---- */}
      <CatalogPanel
        categories={categories}
        selections={selections}
        onSelect={handleSelect}
        isNight={isNight}
      />

      {/* ---- DAY / NIGHT TOGGLE ---- */}
      <button
        onClick={toggleNight}
        title={isNight ? "Gündüzə keç" : "Gecəyə keç"}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          zIndex: 100,
          width: 52,
          height: 52,
          borderRadius: "50%",
          border: "1.5px solid rgba(255,255,255,0.2)",
          background: isNight ? "rgba(20,20,40,0.85)" : "rgba(255,220,80,0.85)",
          backdropFilter: "blur(12px)",
          boxShadow: isNight
            ? "0 0 20px rgba(100,100,255,0.3)"
            : "0 0 20px rgba(255,200,0,0.4)",
          cursor: "pointer",
          fontSize: 22,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.3s, box-shadow 0.3s",
        }}
      >
        {isNight ? "🌙" : "☀️"}
      </button>

      {/* ---- STATUS BAR ---- */}
      <div
        style={{
          position: "absolute",
          bottom: 16,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 100,
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(14px)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 12,
          padding: "8px 20px",
          display: "flex",
          gap: 20,
          alignItems: "center",
          whiteSpace: "nowrap",
        }}
      >
        {categories.map((cat) => {
          const sel = cat.options.find((o) => o.key === selections[cat.id]);
          return (
            <div key={cat.id} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 13 }}>{cat.icon}</span>
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                {cat.label}:
              </span>
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.85)", fontWeight: 600, letterSpacing: "0.05em" }}>
                {sel?.label ?? "—"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}