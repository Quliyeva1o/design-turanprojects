import { useState, useCallback, memo, useEffect } from "react";
import "./create.css";
import type { ImageLayerProps, Selections } from "./types";
import { CatalogPanel } from "./components/CatalogPanel";
import {
  CATEGORIES,
  HOVUZLAR,
  KENAR_KAFELLER,
  ORTA_KAFELLER,
  TERASLAR,
} from "./contants/imges";

const DEFAULT_SELECTIONS: Selections = {
  hovuz: "gpt",
  kenar: "superstone",
  orta: "superstone",
  teras: "gpt",
};

// =========================
// IMAGE LAYER
// =========================

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

  useEffect(() => {
    const preload = (src: string) => {
      const img = new Image();
      img.src = src;
    };

    const hovuz = HOVUZLAR.find((o) => o.key === hovuzKey);
    const kenar = KENAR_KAFELLER.find((o) => o.key === kenarKey);
    const orta = ORTA_KAFELLER.find((o) => o.key === ortaKey);
    const teras = TERASLAR.find((o) => o.key === terasKey);

    if (hovuz) preload(hovuz.gece);
    if (hovuz) preload(hovuz.gunduz);
    if (kenar) preload(kenar.gece);
    if (kenar) preload(kenar.gunduz);
    if (orta) preload(orta.gece);
    if (orta) preload(orta.gunduz);
    if (teras) preload(teras.gece);
    if (teras) preload(teras.gunduz);
  }, [hovuzKey, kenarKey, ortaKey, terasKey]);

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
          src={opt.gece}
          isActive={opt.key === hovuzKey && isNight}
          zIndex={10}
          alt={`hovuz-${opt.key}`}
        />
      ))}{" "}
      {HOVUZLAR.map((opt) => (
        <ImageLayer
          key={opt.key}
          src={opt.gunduz}
          isActive={opt.key === hovuzKey && !isNight}
          zIndex={10}
          alt={`hovuz-${opt.key}`}
        />
      ))}
      {/* KENAR KAFELLƏR */}
      {KENAR_KAFELLER.map((opt) => (
        <ImageLayer
          key={opt.key}
          src={opt.gece}
          isActive={opt.key === kenarKey && isNight}
          zIndex={20}
          alt={`kenar-${opt.key}`}
        />
      ))}{" "}
      {KENAR_KAFELLER.map((opt) => (
        <ImageLayer
          key={opt.key}
          src={opt.gunduz}
          isActive={opt.key === kenarKey && !isNight}
          zIndex={20}
          alt={`kenar-${opt.key}`}
        />
      ))}
      {/* ORTA KAFELLƏR */}
      {ORTA_KAFELLER.map((opt) => (
        <ImageLayer
          key={opt.key}
          src={opt.gece}
          isActive={opt.key === ortaKey && isNight}
          zIndex={22}
          alt={`orta-${opt.key}`}
          // style={{ transform: "scale(1.01) translateX(3px)" }}
        />
      ))}
      {ORTA_KAFELLER.map((opt) => (
        <ImageLayer
          key={opt.key}
          src={opt.gunduz}
          isActive={opt.key === ortaKey && !isNight}
          zIndex={22}
          alt={`orta-${opt.key}`}
          // style={{ transform: "scale(1.01) translateX(3px)" }}
        />
      ))}
      {TERASLAR.map((opt) => (
        <ImageLayer
          key={opt.key}
          src={opt.gece}
          isActive={opt.key === terasKey && isNight}
          zIndex={15}
          alt={`teras-${opt.key}`}
        />
      ))}
      {/* TERASLAR */}
      {TERASLAR.map((opt) => (
        <ImageLayer
          key={opt.key}
          src={opt.gunduz}
          isActive={opt.key === terasKey && !isNight}
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
          background: isNight ? "rgba(15,15,30,0.88)" : "rgba(255,215,60,0.88)",
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
