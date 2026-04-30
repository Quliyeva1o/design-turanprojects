import type { CatalogPanelProps, TileCardProps } from "../types";
import { useState, useCallback, memo, useEffect } from "react";


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
              background: isNight
                ? "rgba(255,255,255,0.92)"
                : "rgba(30,30,30,0.88)",
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
            ? isNight
              ? "rgba(255,255,255,0.88)"
              : "rgba(0,0,0,0.85)"
            : isNight
              ? "rgba(255,255,255,0.32)"
              : "rgba(0,0,0,0.38)",
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

export const CatalogPanel = memo(function CatalogPanel({
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
  const headerBorderColor = isNight
    ? "rgba(255,255,255,0.05)"
    : "rgba(0,0,0,0.06)";
  const catLabelColor = isNight ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.65)";
  const countPillBg = isNight ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)";
  const countPillColor = isNight ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.3)";
  const footerBorderColor = isNight
    ? "rgba(255,255,255,0.04)"
    : "rgba(0,0,0,0.05)";
  const footerLabelColor = isNight
    ? "rgba(255,255,255,0.3)"
    : "rgba(0,0,0,0.4)";
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
                        (o) => o.key === selections[activeCat.id],
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