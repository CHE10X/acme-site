"use client";

import { useEffect, useRef, useState } from "react";

const HR_SEEN_KEY = "acme_hr_seen";

type Tool = "Sentinel" | "Watchdog" | "SphinxGate" | "Agent911" | "Triage";
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
  { text: "It says 'done' but nothing changed.", tool: "Sentinel", anchor: "/docs/sentinel/overview", unit: "Containment Unit", kind: "HUMAN REPORT" },
  { text: "Token spend spiked overnight.", tool: "SphinxGate", anchor: "/docs/sphinxgate/overview", unit: "Gate Control", kind: "SYSTEM NOTE" },
  { text: "Cron ran twice. I didn't ask it to.", tool: "Watchdog", anchor: "/docs/watchdog/overview", unit: "Heartbeat Unit", kind: "HUMAN REPORT" },
  { text: "Gateway died after an update.", tool: "Agent911", anchor: "/docs/agent911/snapshot-explained", unit: "Recovery Unit", kind: "CONTAINMENT LOG" },
  { text: "launchd won't keep it alive.", tool: "Agent911", anchor: "/docs/agent911/snapshot-explained", unit: "Recovery Unit", kind: "SYSTEM NOTE" },
  { text: "It's looping on retries.", tool: "Watchdog", anchor: "/docs/watchdog/overview", unit: "Heartbeat Unit", kind: "CONTAINMENT LOG" },
  { text: "It ran fine yesterday. Today it's silent.", tool: "Sentinel", anchor: "/docs/sentinel/overview", unit: "Containment Unit", kind: "HUMAN REPORT" },
  { text: "Background lane ate the whole budget.", tool: "SphinxGate", anchor: "/docs/sphinxgate/overview", unit: "Gate Control", kind: "SYSTEM NOTE" },
  { text: "Reliability score dropped 12 points overnight.", tool: "Triage", anchor: "/docs/triage/overview", unit: "Diagnostics Unit", kind: "SYSTEM NOTE" },
  { text: "Agent looks alive. It isn't doing anything.", tool: "Sentinel", anchor: "/docs/sentinel/overview", unit: "Containment Unit", kind: "HUMAN REPORT" },
];

function getTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function createItem(template: FeedTemplate, id: number): FeedItem {
  return { ...template, id: `LOG-${id}`, time: getTime() };
}

export default function HRInline() {
  const [expanded, setExpanded] = useState(false);
  const [hasSeen, setHasSeen] = useState(false);
  const [items, setItems] = useState<FeedItem[]>(() =>
    templates.slice(0, 5).map((t, i) => createItem(t, 770 + i))
  );
  const counter = useRef(775);
  const cursor = useRef(5);

  useEffect(() => {
    try {
      if (localStorage.getItem(HR_SEEN_KEY)) setHasSeen(true);
    } catch {}
  }, []);

  const handleExpand = () => {
    setExpanded(true);
    if (!hasSeen) {
      setHasSeen(true);
      try { localStorage.setItem(HR_SEEN_KEY, "1"); } catch {}
    }
  };

  // Faster ticker — 1.8s base instead of 3.4s
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const tick = () => {
      const next = templates[cursor.current % templates.length];
      cursor.current += 1;
      counter.current += 1;
      setItems((prev) => [createItem(next, counter.current), ...prev].slice(0, 10));
      timeout = setTimeout(tick, 1800 + Math.floor(Math.random() * 600));
    };
    timeout = setTimeout(tick, 2000);
    return () => clearTimeout(timeout);
  }, []);

  const latest = items[0];

  return (
    <div className="relative flex flex-col items-end">
      {/* Expanded panel — drops DOWN, wide, fills available space */}
      {expanded && (
        <div className="absolute top-full right-0 mt-2 z-50 w-[420px] overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900 shadow-2xl shadow-black/80">
          {/* Header */}
          <div className="border-b border-zinc-800 bg-zinc-950 px-5 py-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-[0.36em] text-amber-400">Human Resources</div>
                <div className="text-[13px] font-semibold text-zinc-200 mt-0.5">Field Support Feed</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-300">
                  <span className="relative inline-flex h-2.5 w-2.5 items-center justify-center live-pulse">
                    <span className="relative block h-[9px] w-[9px] rounded-full bg-emerald-400 shadow-[0_0_14px_6px_rgba(52,211,153,0.75)]" />
                  </span>
                  LIVE
                </div>
                <button
                  onClick={() => setExpanded(false)}
                  className="text-[10px] uppercase tracking-[0.28em] text-zinc-500 transition hover:text-zinc-200"
                >
                  Close
                </button>
              </div>
            </div>
            <div className="mt-3 overflow-hidden rounded-full opacity-90">
              <span className="hr-solid-line block h-[3px] w-full" />
            </div>
          </div>

          {/* Feed — tall, ~500px, shows ~5 items at once */}
          <div className="overflow-y-auto" style={{ maxHeight: "480px" }}>
            <div className="space-y-2 px-4 py-4">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className={`rounded-xl border border-zinc-800/80 bg-zinc-900/60 px-4 py-3 ${index === 0 ? "acme-feed-in" : ""}`}
                >
                  <div className="flex items-center justify-between gap-2 text-[10px] uppercase tracking-[0.28em] text-zinc-500">
                    <span>{item.kind}</span>
                    <span>{item.id} · {item.time}</span>
                  </div>
                  <div className="mt-1.5 text-[13px] leading-snug text-zinc-100">{item.text}</div>
                  <div className="mt-1.5 text-[12px] text-zinc-500">
                    Gear:{" "}
                    <a href={item.anchor} className="text-amber-300 transition hover:text-amber-200">
                      {item.tool} →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Callout bar — fixed width 200px, never resizes */}
      {!expanded && (
        <button
          onClick={handleExpand}
          className="group flex h-9 w-[200px] items-center gap-2 rounded-lg border border-zinc-700/60 bg-zinc-900/80 px-3 transition hover:border-amber-400/40 hover:bg-zinc-900"
        >
          <span className="relative inline-flex h-2 w-2 shrink-0 live-pulse">
            <span className="relative block h-[7px] w-[7px] rounded-full bg-emerald-400 shadow-[0_0_12px_5px_rgba(52,211,153,0.7)]" />
          </span>
          <div className="flex min-w-0 flex-1 flex-col items-start">
            <div className="text-[9px] uppercase tracking-[0.3em] text-amber-400 leading-none">Human Resources</div>
            <div className="mt-0.5 w-full truncate text-[10px] text-zinc-500 leading-none group-hover:text-zinc-400">
              {latest ? latest.text : "Field Support Feed"}
            </div>
          </div>
          <div className="shrink-0 text-[9px] uppercase tracking-[0.2em] text-zinc-600 group-hover:text-zinc-400">
            {hasSeen ? "↑" : "New"}
          </div>
        </button>
      )}
    </div>
  );
}
