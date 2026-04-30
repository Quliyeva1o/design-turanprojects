import { useState, useCallback, memo } from "react";
import "./create.css";

// =========================
// ASSETS — update paths to match your Vite/CRA public or src structure.
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
// TYPES
// =========================
interface Option {
  key: string;
  label: string;
  gunduz: string;
  gece: string;
}

interface Category {
  id: string;
  label: string;
  icon: string;
  options: Option[];
}

type Selections = Record<string, string>;

// =========================
// STATIC DATA
// =========================
const HOVUZLAR: Option[] = [
  { key: "a151", label: "A151", gunduz: a151, gece: a151gece },
  { key: "a155", label: "A155", gunduz: a155, gece: a155gece },
  { key: "a158", label: "A158", gunduz: a158, gece: a158gece },
  { key: "a159", label: "A159", gunduz: a159, gece: a159gece },
  { key: "a161", label: "A161", gunduz: a161, gece: a161gece },
  { key: "a161l", label: "A161L", gunduz: a161l, gece: a161lgece },
  { key: "a218", label: "A218", gunduz: a218, gece: a218gece },
  { key: "a231", label: "A231", gunduz: a231, gece: a231gece },
  { key: "a236", label: "A236", gunduz: a236, gece: a236gece },
  { key: "a276", label: "A276", gunduz: a276, gece: a276gece },
  { key: "bali", label: "Bali", gunduz: bali, gece: baligece },
  { key: "floralblue", label: "Floral Blue", gunduz: floralblue, gece: floralblueGece },
  { key: "floralgreen", label: "Floral Green", gunduz: floralgreen, gece: floralgreenGece },
  { key: "judiGrey", label: "Judi Grey", gunduz: judiGreyKare, gece: judiGreyKareGece },
  { key: "gpt", label: "GPT", gunduz: gpt, gece: gptgece },
];

const KENAR_KAFELLER: Option[] = [
  { key: "light", label: "Light", gunduz: light, gece: lightGece },
  { key: "judi", label: "Judi Grey", gunduz: judiGrey, gece: judiGreyGece },
  { key: "luca", label: "Luca Grey", gunduz: lucaGrey, gece: lucaGreyGece },
  { key: "superstone", label: "Superstone", gunduz: superstone, gece: superstoneGece },
];

const ORTA_KAFELLER: Option[] = [
  { key: "light", label: "Light", gunduz: lightorta, gece: lightortaGece },
  { key: "judi", label: "Judi Grey", gunduz: judiGreyorta, gece: judiGreyortaGece },
  { key: "luca", label: "Luca Grey", gunduz: lucaGreyOrta, gece: lucaGreyOrtaGece },
  { key: "superstone", label: "Superstone", gunduz: superstone, gece: superstoneGece },
];

const TERASLAR: Option[] = [
  { key: "judi", label: "Judi", gunduz: terasJudi, gece: terasJudiGece },
  { key: "boz", label: "Boz", gunduz: villa4, gece: terasJudiGece },
  { key: "light", label: "Light", gunduz: terasLight, gece: terasLightGece },
  { key: "luca", label: "Luca", gunduz: terasLuca, gece: terasLucaGece },
  { key: "mavivilla", label: "Mavi Villa", gunduz: mavivilla, gece: mavivillagece },
  { key: "gpt", label: "GPT Villa", gunduz: gpt, gece: gptgece },
];

const CATEGORIES: Category[] = [
  { id: "hovuz", label: "Hovuz", icon: "🏊", options: HOVUZLAR },
  { id: "kenar", label: "Kenar", icon: "🪨", options: KENAR_KAFELLER },
  { id: "orta", label: "Orta", icon: "⬛", options: ORTA_KAFELLER },
  { id: "teras", label: "Teras", icon: "🏡", options: TERASLAR },
];

const DEFAULT_SELECTIONS: Selections = {
  hovuz: "gpt",
  kenar: "superstone",
  orta: "superstone",
  teras: "gpt",
};

// =========================
// IMAGE LAYER
// =========================
interface ImageLayerProps {
  src: string;
  isActive: boolean;
  zIndex: number;
  alt: string;
  style?: React.CSSProperties;
}

const ImageLayer = memo(function ImageLayer({
  src,
  isActive,
  zIndex,
  alt,
  style,
}: ImageLayerProps) {
  return (
    <img
      src={src}
      alt={alt}
      className="img-layer"
      data-active={isActive ? "true" : "false"}
      style={{ zIndex, ...style }}
      decoding={isActive ? "sync" : "async"}
      fetchPriority={isActive ? "high" : "low"}
    />
  );
});

// =========================
// TILE CARD
// =========================
interface TileCardProps {
  option: Option;
  isSelected: boolean;
  isNight: boolean;
  onClick: () => void;
}

const TileCard = memo(function TileCard({
  option,
  isSelected,
  isNight,
  onClick,
}: TileCardProps) {
  return (
    <button className="tile-btn" onClick={onClick}>
      <div className={`tile-card${isSelected ? " selected" : ""}`}>
        <img
          src={isNight ? option.gece : option.gunduz}
          alt={option.label}
          className="thumb-img"
          decoding="async"
          loading="lazy"
        />
        {isSelected && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%)",
              pointerEvents: "none",
            }}
          />
        )}
        {isSelected && (
          <div
            style={{
              position: "absolute",
              top: 5,
              right: 5,
              width: 15,
              height: 15,
              borderRadius: "50%",
              background: isNight ? "rgba(255,255,255,0.92)" : "rgba(30,30,30,0.88)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <path
                d="M1.5 4L3.2 5.8L6.5 2.2"
                stroke={isNight ? "#111" : "#fff"}
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>
      <p
        style={{
          fontSize: 9,
          fontWeight: isSelected ? 600 : 400,
          color: isSelected
            ? isNight ? "rgba(255,255,255,0.88)" : "rgba(0,0,0,0.85)"
            : isNight ? "rgba(255,255,255,0.32)" : "rgba(0,0,0,0.38)",
          letterSpacing: "0.07em",
          textTransform: "uppercase",
          textAlign: "center",
          maxWidth: 72,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          transition: "color 0.18s",
        }}
      >
        {option.label}
      </p>
    </button>
  );
});

// =========================
// CATALOG PANEL
// =========================
interface CatalogPanelProps {
  categories: Category[];
  selections: Selections;
  onSelect: (categoryId: string, key: string) => void;
  isNight: boolean;
}

const CatalogPanel = memo(function CatalogPanel({
  categories,
  selections,
  onSelect,
  isNight,
}: CatalogPanelProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const activeCat = categories.find((c) => c.id === activeCategory) ?? null;
  const isOpen = !!activeCat;

  const toggleCat = useCallback((id: string) => {
    setActiveCategory((prev) => (prev === id ? null : id));
  }, []);

  const railBg = isNight ? "rgba(8,8,14,0.82)" : "rgba(255,255,255,0.72)";
  const panelBg = isNight ? "rgba(10,10,18,0.8)" : "rgba(255,255,255,0.72)";
  const borderColor = isNight ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";
  const dividerColor = isNight ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";
  const headerBorderColor = isNight ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)";
  const catLabelColor = isNight ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.65)";
  const countPillBg = isNight ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)";
  const countPillColor = isNight ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.3)";
  const footerBorderColor = isNight ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.05)";
  const footerLabelColor = isNight ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.4)";
  const selCountColor =
    Object.keys(selections).length > 0
      ? "rgba(130,200,160,0.85)"
      : isNight
      ? "rgba(255,255,255,0.14)"
      : "rgba(0,0,0,0.25)";

  return (
    <div
      data-night={isNight ? "1" : "0"}
      style={{
        position: "absolute",
        left: 14,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 100,
        display: "flex",
        alignItems: "stretch",
        filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.35))",
      }}
    >
      {/* ── ICON RAIL ── */}
      <div
        style={{
          width: 48,
          background: railBg,
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderRadius: isOpen ? "12px 0 0 12px" : "12px",
          border: `1px solid ${borderColor}`,
          borderRight: isOpen
            ? `1px solid ${isNight ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.05)"}`
            : undefined,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "10px 7px",
          gap: 3,
          transition: "border-radius 0.22s ease",
        }}
      >
        <div
          style={{
            width: 16,
            height: 1,
            background: dividerColor,
            borderRadius: 1,
            marginBottom: 6,
            flexShrink: 0,
          }}
        />

        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`cat-tab${cat.id === activeCategory ? " active" : ""}`}
            onClick={() => toggleCat(cat.id)}
            title={cat.label}
          >
            <span style={{ fontSize: 16, lineHeight: 1 }}>{cat.icon}</span>
            {!!selections[cat.id] && <span className="sel-dot" />}
          </button>
        ))}

        <div
          style={{
            width: 16,
            height: 1,
            background: dividerColor,
            borderRadius: 1,
            marginTop: 6,
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontSize: 9,
            fontWeight: 600,
            letterSpacing: "0.04em",
            color: selCountColor,
            marginTop: 2,
          }}
        >
          {Object.keys(selections).length}/{categories.length}
        </span>
      </div>

      {/* ── OPTIONS PANEL ── */}
      <div
        style={{
          width: isOpen ? 170 : 0,
          overflow: "hidden",
          transition: "width 0.24s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div
          style={{
            width: 170,
            height: "100%",
            minHeight: "min(480px, 78vh)",
            maxHeight: "min(580px, 86vh)",
            background: panelBg,
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderRadius: "0 12px 12px 0",
            border: `1px solid ${borderColor}`,
            borderLeft: "none",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {activeCat && (
            <>
              {/* Header */}
              <div
                style={{
                  padding: "9px 11px 7px",
                  borderBottom: `1px solid ${headerBorderColor}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexShrink: 0,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <span style={{ fontSize: 13 }}>{activeCat.icon}</span>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      color: catLabelColor,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    {activeCat.label}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: 8,
                    color: countPillColor,
                    background: countPillBg,
                    padding: "2px 6px",
                    borderRadius: 6,
                    letterSpacing: "0.03em",
                  }}
                >
                  {activeCat.options.length}
                </span>
              </div>

              {/* Tile grid */}
              <div
                className="catalog-scroll"
                style={{
                  flex: 1,
                  overflowY: "auto",
                  padding: "8px 9px 10px",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 7,
                  alignContent: "start",
                }}
              >
                {activeCat.options.map((option) => (
                  <TileCard
                    key={option.key}
                    option={option}
                    isSelected={selections[activeCat.id] === option.key}
                    isNight={isNight}
                    onClick={() => onSelect(activeCat.id, option.key)}
                  />
                ))}
              </div>

              {/* Footer */}
              {selections[activeCat.id] && (
                <div
                  style={{
                    padding: "6px 11px",
                    borderTop: `1px solid ${footerBorderColor}`,
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      width: 4,
                      height: 4,
                      borderRadius: "50%",
                      background: "rgba(130,200,160,0.75)",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontSize: 8,
                      color: footerLabelColor,
                      letterSpacing: "0.07em",
                      textTransform: "uppercase",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {
                      activeCat.options.find(
                        (o) => o.key === selections[activeCat.id]
                      )?.label
                    }
                  </span>
                </div>
              )}
            </>
          )}
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
  const [selections, setSelections] = useState<Selections>(DEFAULT_SELECTIONS);

  const toggleNight = useCallback(() => setIsNight((p) => !p), []);

  const handleSelect = useCallback((categoryId: string, key: string) => {
    setSelections((prev) => ({ ...prev, [categoryId]: key }));
  }, []);

  const {
    hovuz: hovuzKey,
    kenar: kenarKey,
    orta: ortaKey,
    teras: terasKey,
  } = selections;

  const statusBg = isNight ? "rgba(4,4,8,0.75)" : "rgba(255,255,255,0.72)";
  const statusBorder = isNight ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";
  const statusCatColor = isNight ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.45)";
  const statusValColor = isNight ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)";

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        contain: "strict",
      }}
    >
      {/* HOVUZLAR */}
      {HOVUZLAR.map((opt) => (
        <ImageLayer
          key={opt.key}
          src={isNight ? opt.gece : opt.gunduz}
          isActive={opt.key === hovuzKey}
          zIndex={10}
          alt={`hovuz-${opt.key}`}
        />
      ))}

      {/* KENAR KAFELLƏR */}
      {KENAR_KAFELLER.map((opt) => (
        <ImageLayer
          key={opt.key}
          src={isNight ? opt.gece : opt.gunduz}
          isActive={opt.key === kenarKey}
          zIndex={20}
          alt={`kenar-${opt.key}`}
        />
      ))}

      {/* ORTA KAFELLƏR */}
      {ORTA_KAFELLER.map((opt) => (
        <ImageLayer
          key={opt.key}
          src={isNight ? opt.gece : opt.gunduz}
          isActive={opt.key === ortaKey}
          zIndex={22}
          alt={`orta-${opt.key}`}
          style={{ transform: "scale(1.01) translateX(3px)" }}
        />
      ))}

      {/* TERASLAR */}
      {TERASLAR.map((opt) => (
        <ImageLayer
          key={opt.key}
          src={isNight ? opt.gece : opt.gunduz}
          isActive={opt.key === terasKey}
          zIndex={15}
          alt={`teras-${opt.key}`}
        />
      ))}

      {/* CATALOG PANEL */}
      <CatalogPanel
        categories={CATEGORIES}
        selections={selections}
        onSelect={handleSelect}
        isNight={isNight}
      />

      {/* DAY / NIGHT TOGGLE */}
      <button
        onClick={toggleNight}
        title={isNight ? "Gündüzə keç" : "Gecəyə keç"}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          zIndex: 100,
          width: 48,
          height: 48,
          borderRadius: "50%",
          border: isNight
            ? "1.5px solid rgba(96,165,250,0.25)"
            : "1.5px solid rgba(255,220,80,0.3)",
          background: isNight
            ? "rgba(15,15,30,0.88)"
            : "rgba(255,215,60,0.88)",
          backdropFilter: "blur(12px)",
          boxShadow: isNight
            ? "0 0 20px rgba(96,165,250,0.25)"
            : "0 0 20px rgba(255,200,0,0.35)",
          cursor: "pointer",
          fontSize: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.3s, box-shadow 0.3s, border 0.3s",
        }}
      >
        {isNight ? "🌙" : "☀️"}
      </button>

      {/* STATUS BAR */}
      <div
        style={{
          position: "absolute",
          bottom: 16,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 100,
          background: statusBg,
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          border: `1px solid ${statusBorder}`,
          borderRadius: 10,
          padding: "7px 18px",
          display: "flex",
          gap: 18,
          alignItems: "center",
          whiteSpace: "nowrap",
        }}
      >
        {CATEGORIES.map((cat) => {
          const sel = cat.options.find((o) => o.key === selections[cat.id]);
          return (
            <div
              key={cat.id}
              style={{ display: "flex", alignItems: "center", gap: 5 }}
            >
              <span style={{ fontSize: 12 }}>{cat.icon}</span>
              <span
                style={{
                  fontSize: 9,
                  color: statusCatColor,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                {cat.label}:
              </span>
              <span
                style={{
                  fontSize: 9,
                  color: statusValColor,
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                }}
              >
                {sel?.label ?? "—"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}