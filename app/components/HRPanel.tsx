"use client";

import { useEffect, useRef, useState } from "react";

const HR_SEEN_KEY = "acme_hr_seen";

type Tool = "Sentinel" | "Watchdog" | "SphinxGate" | "Agent911";
type Kind = "HUMAN REPORT" | "CONTAINMENT LOG" | "SYSTEM NOTE";

type FeedTemplate = {
  text: string;
  tool: Tool;
  anchor: string;
  unit: string;
  kind: Kind;
};

type FeedItem = FeedTemplate & {
  id: string;
  time: string;
};

const templates: FeedTemplate[] = [
  {
    text: "It says 'done' but nothing changed.",
    tool: "Sentinel",
    anchor: "#sentinel",
    unit: "Containment Unit",
    kind: "HUMAN REPORT",
  },
  {
    text: "Token spend spiked overnight.",
    tool: "SphinxGate",
    anchor: "#sphinxgate",
    unit: "Gate Control",
    kind: "SYSTEM NOTE",
  },
  {
    text: "Cron ran twice. I didn't ask it to.",
    tool: "Watchdog",
    anchor: "#watchdog",
    unit: "Heartbeat Unit",
    kind: "HUMAN REPORT",
  },
  {
    text: "Gateway died after an update.",
    tool: "Agent911",
    anchor: "#agent911",
    unit: "Recovery Unit",
    kind: "CONTAINMENT LOG",
  },
  {
    text: "launchd won't keep it alive.",
    tool: "Agent911",
    anchor: "#agent911",
    unit: "Recovery Unit",
    kind: "SYSTEM NOTE",
  },
  {
    text: "It's looping on retries.",
    tool: "Watchdog",
    anchor: "#watchdog",
    unit: "Heartbeat Unit",
    kind: "CONTAINMENT LOG",
  },
  {
    text: "It ran fine yesterday. Today it's silent.",
    tool: "Watchdog",
    anchor: "#watchdog",
    unit: "Heartbeat Unit",
    kind: "HUMAN REPORT",
  },
  {
    text: "Background lane ate the whole budget.",
    tool: "SphinxGate",
    anchor: "#sphinxgate",
    unit: "Gate Control",
    kind: "SYSTEM NOTE",
  },
];

function getTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function createItem(template: FeedTemplate, id: number): FeedItem {
  return { ...template, id: `LOG-${id}`, time: getTime() };
}

export default function HRPanel() {
  const [expanded, setExpanded] = useState(false);
  const [hasSeen, setHasSeen] = useState(false);
  const [items, setItems] = useState<FeedItem[]>(() =>
    templates.slice(0, 4).map((t, i) => createItem(t, 770 + i))
  );
  const counter = useRef(774);
  const cursor = useRef(4);

  // Check localStorage on mount
  useEffect(() => {
    try {
      if (localStorage.getItem(HR_SEEN_KEY)) {
        setHasSeen(true);
      }
    } catch {}
  }, []);

  // Mark as seen when first expanded
  const handleExpand = () => {
    setExpanded(true);
    if (!hasSeen) {
      setHasSeen(true);
      try { localStorage.setItem(HR_SEEN_KEY, "1"); } catch {}
    }
  };

  // Live feed ticker
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const tick = () => {
      const nextTemplate = templates[cursor.current % templates.length];
      cursor.current += 1;
      counter.current += 1;
      const nextItem = createItem(nextTemplate, counter.current);
      setItems((prev) => [nextItem, ...prev].slice(0, 8));
      timeout = setTimeout(tick, 3200 + Math.floor(Math.random() * 1200));
    };
    timeout = setTimeout(tick, 3600);
    return () => clearTimeout(timeout);
  }, []);

  // Latest item for teaser
  const latest = items[0];

  return (
    <div className="fixed bottom-6 right-6 z-[9000]" style={{ width: "360px" }}>
      {/* Expanded panel — absolutely anchored above the trigger bar, never shifts layout */}
      {expanded && (
        <div
          className="absolute bottom-[calc(100%+8px)] right-0 overflow-hidden rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl border border-[#2A3848] shadow-2xl shadow-black/70"
          style={{ width: "360px", maxHeight: "480px", backgroundColor: "rgba(22,26,30,0.99)" }}
        >
          {/* Panel header */}
          <div className="border-b border-[#2A3848] bg-[#111518] px-4 py-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="text-[11px] uppercase tracking-[0.36em]" style={{ color: "#B8782A" }}>
                  Human Resources
                </div>
                <div className="mt-0.5 text-sm font-semibold text-zinc-200">
                  Field Support Feed
                </div>
                <div className="mt-1 text-[12px] text-zinc-500">
                  Live symptom routing and gear recommendations.
                </div>
              </div>
              <div className="flex items-center gap-2 pt-0.5">
                <div className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-300">
                  <span className="relative inline-flex h-2.5 w-2.5 items-center justify-center live-pulse">
                    <span className="relative block h-[9px] w-[9px] rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.32)] ring-1 ring-emerald-300/30" />
                  </span>
                  LIVE
                </div>
                <button
                  onClick={() => setExpanded(false)}
                  className="text-[10px] uppercase tracking-[0.28em] text-zinc-500 transition hover:text-zinc-300"
                >
                  Close
                </button>
              </div>
            </div>
            <div className="mt-3 overflow-hidden rounded-full opacity-80">
              <span className="hr-solid-line block h-[3px] w-full" />
            </div>
          </div>

          {/* Feed items */}
          <div className="overflow-y-auto" style={{ maxHeight: "340px" }}>
            <div className="space-y-2 px-4 py-3">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className={`rounded-xl border border-[#2A3848] px-3 py-3 ${
                    index === 0 ? "acme-feed-in" : ""
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 text-[10px] uppercase tracking-[0.28em] text-zinc-400">
                    <span>{item.kind}</span>
                    <span>{item.id}</span>
                  </div>
                  <div className="mt-0.5 text-[10px] uppercase tracking-[0.28em] text-zinc-600">
                    {item.unit} · {item.time}
                  </div>
                  <div className="mt-1.5 text-[13px] leading-snug text-zinc-100">
                    {item.text}
                  </div>
                  <div className="mt-1.5 text-[12px] text-zinc-400">
                    Gear:{" "}
                    <a
                      href={item.anchor}
                      className="transition" style={{ color: "#B8782A" }}
                    >
                      {item.tool} →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Collapsed callout bar — fixed width matching Operator Touch Surface panel */}
      {!expanded && (
        <button
          onClick={handleExpand}
          className="group flex items-center gap-3 rounded-2xl border border-[#2A3848] px-4 py-3 shadow-xl shadow-black/50 transition duration-150"
          style={{ width: "360px", backgroundColor: "rgba(22,26,30,0.96)" }}
        >
          {/* Pulse dot */}
          <span className="relative inline-flex h-2.5 w-2.5 shrink-0 items-center justify-center live-pulse">
            <span className="relative block h-[9px] w-[9px] rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.32)] ring-1 ring-emerald-300/30" />
          </span>

          <div className="flex flex-col items-start gap-0.5">
            <div className="text-[10px] uppercase tracking-[0.36em]" style={{ color: "#B8782A" }}>
              Human Resources
            </div>
            {latest && (
              <div className="max-w-[200px] truncate text-[12px] text-zinc-400 group-hover:text-zinc-300">
                {latest.text}
              </div>
            )}
          </div>

          <div className="ml-1 text-[10px] uppercase tracking-[0.24em] text-zinc-600 transition group-hover:text-zinc-400">
            {hasSeen ? "↑" : "New"}
          </div>
        </button>
      )}
    </div>
  );
}
