"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FIELD_MAP_GOATS,
  FIELD_MAP_HOTSPOTS,
  FIELD_MAP_ZONES,
} from "./fieldmap/fieldMapConstants";

type ZoneId = keyof typeof FIELD_MAP_ZONES;

const MOBILE_ORDER: ZoneId[] = [
  "RAD_CHECK",
  "SENTINEL",
  "LAZARUS",
  "SPHINX_GATE",
  "AGENT_911",
];

function getGlowClass(level: number, active: boolean) {
  if (!active) return "zone-glow-0";
  if (level >= 3) return "zone-glow-3";
  if (level === 2) return "zone-glow-2";
  if (level === 1) return "zone-glow-1";
  return "zone-glow-0";
}

export default function FieldMap() {
  const router = useRouter();
  const [hoveredId, setHoveredId] = useState<ZoneId | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ x: 12, y: 12 });
  const mapRef = useRef<HTMLDivElement | null>(null);

  const zones = useMemo(
    () =>
      Object.entries(FIELD_MAP_ZONES).map(([id, zone]) => ({
        id: id as ZoneId,
        ...zone,
      })),
    []
  );

  const handleNavigate = (href: string) => {
    router.push(href);
  };

  const activeZone = hoveredId ? FIELD_MAP_ZONES[hoveredId] : null;
  const isMobileCollapsed = !mobileOpen;
  const showHotspots = mobileOpen;

  return (
    <section className="mt-6 rounded-2xl border border-zinc-800/70 bg-zinc-950 px-5 py-5 pb-4">
      <div className="text-[11px] uppercase tracking-[0.4em] text-zinc-400">
        Field Map
      </div>
      <p className="mt-2 text-sm text-zinc-500">
        Not sure where to start? Follow the symptom.
      </p>
      <button
        type="button"
        onClick={() => setMobileOpen((prev) => !prev)}
        className="mt-3 inline-flex md:hidden items-center justify-center rounded-lg border border-zinc-800/80 bg-zinc-900/60 px-3 py-2 text-xs uppercase tracking-[0.32em] text-amber-300 transition hover:border-amber-400/50 hover:text-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60"
      >
        {mobileOpen ? "Collapse Map" : "Open Field Map"}
      </button>

      <div
        ref={mapRef}
        onMouseMove={(event) => {
          if (!mapRef.current) return;
          const rect = mapRef.current.getBoundingClientRect();
          const x = ((event.clientX - rect.left) / rect.width) * 100;
          const y = ((event.clientY - rect.top) / rect.height) * 100;
          setTooltipPos({
            x: Math.max(6, Math.min(94, x)),
            y: Math.max(8, Math.min(92, y)),
          });
        }}
        className={`mt-4 relative overflow-hidden rounded-2xl border border-zinc-800/70 bg-zinc-900 group w-full ${
          isMobileCollapsed
            ? "h-[220px] sm:h-[280px]"
            : "h-[360px] sm:h-[460px]"
        } md:h-[520px] lg:h-[580px]`}
      >
        <img
          src="/brand/field-map-v1.png"
          alt="Field map poster"
          className="absolute inset-0 h-full w-full object-contain opacity-90"
        />

        <svg
          className={`absolute inset-0 h-full w-full ${showHotspots ? "block" : "hidden"} md:block`}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {FIELD_MAP_HOTSPOTS.map((spot) => {
            const zone = FIELD_MAP_ZONES[spot.id as ZoneId];
            const isActive = hoveredId === spot.id;
            return (
              <rect
                key={spot.id}
                x={spot.x}
                y={spot.y}
                width={spot.w}
                height={spot.h}
                rx={3}
                ry={3}
                role="link"
                tabIndex={0}
                aria-label={`${zone.label} → ${zone.product}`}
                className={getGlowClass(zone.glowLevel, isActive)}
                style={{
                  filter: isActive
                    ? `drop-shadow(var(--zone-glow-${
                        zone.glowLevel === 3
                          ? "hot"
                          : zone.glowLevel === 2
                          ? "med"
                          : "soft"
                      }))`
                    : "none",
                }}
                fill="rgba(0,0,0,0)"
                stroke="rgba(232,163,23,0.25)"
                strokeWidth="0.6"
                onMouseEnter={() => setHoveredId(spot.id as ZoneId)}
                onMouseLeave={() => setHoveredId(null)}
                onFocus={() => setHoveredId(spot.id as ZoneId)}
                onBlur={() => setHoveredId(null)}
                onClick={() => handleNavigate(zone.docsHref)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    handleNavigate(zone.docsHref);
                  }
                }}
              />
            );
          })}
        </svg>

        {FIELD_MAP_GOATS.map((goat, index) => (
          <img
            key={index}
            src="/brand/acme-field-goat.png"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute opacity-35 transition-opacity duration-200 group-hover:opacity-50"
            style={{
              width: `${goat.size}px`,
              height: "auto",
              left: `${goat.x}%`,
              top: `${goat.y}%`,
              transform: `translate(-50%, -50%) rotate(${goat.r}deg)`,
            }}
          />
        ))}

        <div
          className={`hidden md:block absolute max-w-[320px] rounded-2xl border border-amber-400/40 bg-zinc-950/95 px-5 py-4 text-sm text-zinc-200 shadow-[0_0_32px_rgba(0,0,0,0.65)] backdrop-blur-[2px] transition-opacity ${
            activeZone ? "opacity-100" : "opacity-80"
          }`}
          style={{
            left: `${tooltipPos.x}%`,
            top: `${tooltipPos.y}%`,
            transform: "translate(12px, 12px)",
          }}
        >
          {activeZone ? (
            <>
              <div className="text-[11px] uppercase tracking-[0.34em] text-amber-300">
                {activeZone.label}
              </div>
              <div className="mt-2 text-base font-semibold text-zinc-100">
                {activeZone.short}
              </div>
              <div className="mt-2 text-sm text-zinc-400">
                {activeZone.hoverShort}
              </div>
            </>
          ) : (
            <div className="text-sm text-zinc-400">
              Hover a zone to see what it means.
            </div>
          )}
        </div>
      </div>

      <div className={`mt-4 space-y-2 md:hidden ${mobileOpen ? "" : "hidden"}`}>
        {MOBILE_ORDER.map((id) => {
          const zone = FIELD_MAP_ZONES[id];
          return (
            <button
              key={id}
              onClick={() => handleNavigate(zone.docsHref)}
              className="w-full rounded-xl border border-zinc-800/80 bg-zinc-900/60 px-4 py-3 text-left text-sm text-zinc-200 transition hover:border-amber-400/40 hover:text-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60"
            >
              <div className="text-[11px] uppercase tracking-[0.3em] text-zinc-500">
                {zone.label}
              </div>
              <div className="mt-1 text-sm text-zinc-300">{zone.short}</div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
