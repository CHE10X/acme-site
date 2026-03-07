"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./OperatorTerrainSection.module.css";

type Marker = {
  id: string;
  label: string;
  description: string;
  href: string;
  x: number;
  y: number;
};

const MARKERS: Marker[] = [
  {
    id: "gateway-unstable",
    label: "Gateway Unstable",
    description: "Runtime edges show latency and degraded handoff behavior.",
    href: "/docs/sentinel/overview",
    x: 20,
    y: 36,
  },
  {
    id: "failures-not-surfacing",
    label: "Failures Not Surfacing",
    description: "Work stalls without explicit faults in primary operator logs.",
    href: "/docs/watchdog/overview",
    x: 36,
    y: 54,
  },
  {
    id: "system-drift-detected",
    label: "System Drift Detected",
    description: "Baseline memory and behavior deltas exceed expected thresholds.",
    href: "/docs/driftguard/overview",
    x: 53,
    y: 31,
  },
  {
    id: "context-nearing-limits",
    label: "Context Nearing Limits",
    description: "Token and context pressure is approaching unsafe operating bounds.",
    href: "/docs/sphinxgate/overview",
    x: 72,
    y: 48,
  },
  {
    id: "recovery-posture-unknown",
    label: "Recovery Posture Unknown",
    description: "Recovery readiness cannot be verified from current incident evidence.",
    href: "/docs/lazarus/overview",
    x: 86,
    y: 66,
  },
];

export default function OperatorTerrainSection() {
  const [active, setActive] = useState<Marker | null>(MARKERS[0]);

  return (
    <section className="rounded-2xl border border-[#3A4048] bg-[#242A30] p-6 md:p-8">
      <h2 className="text-[30px] font-semibold tracking-tight text-[#E6E6E6]">
        Where in your system is the problem?
      </h2>
      <p className="mt-2 text-[18px] text-[#9AA3AD]">
        Signal topology. Hover to inspect. Click to act.
      </p>

      <div className="mt-5">
        <div className={styles.terrainWrap}>
          <svg
            viewBox="0 0 1200 700"
            className={styles.terrainSvg}
            role="img"
            aria-label="Operator terrain topology with five incident markers"
          >
            <rect x="0" y="0" width="1200" height="700" fill="#161A1E" />
            <path
              d="M70 250 L250 250 L360 370 L640 370 L780 280 L1030 280"
              className={styles.routeMain}
            />
            <path
              d="M120 460 L300 460 L420 310 L670 310 L840 430 L1080 430"
              className={styles.routeAux}
            />
            <path
              d="M240 130 L240 560 M520 100 L520 610 M820 90 L820 620"
              className={styles.routeAux}
            />

            {MARKERS.map((marker) => {
              const x = (marker.x / 100) * 1200;
              const y = (marker.y / 100) * 700;
              const isActive = active?.id === marker.id;

              return (
                <g key={marker.id} opacity={isActive ? 1 : 0.72}>
                  <circle cx={x} cy={y} r="20" className={styles.nodeGlow} />
                  <circle cx={x} cy={y} r="7" className={styles.nodeCore} />
                </g>
              );
            })}
          </svg>

          {MARKERS.map((marker) => {
            const isActive = active?.id === marker.id;
            return (
              <Link
                key={marker.id}
                href={marker.href}
                className={`${styles.marker} ${isActive ? styles.active : ""}`}
                style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
                aria-label={marker.label}
                onMouseEnter={() => setActive(marker)}
                onFocus={() => setActive(marker)}
              />
            );
          })}

          {active ? (
            <div
              className={styles.tooltip}
              style={{ left: `${active.x}%`, top: `${active.y}%` }}
            >
              <div className={styles.tooltipTitle}>{active.label}</div>
              <div className={styles.tooltipBody}>{active.description}</div>
            </div>
          ) : null}
        </div>
      </div>

      <Link
        href="/docs/octriage/overview"
        className="mt-5 inline-flex text-[18px] text-[#D98A2B] transition hover:text-[#C47A22]"
      >
        Something feels off? Run OCTriage →
      </Link>
    </section>
  );
}
