"use client";

import { useEffect, useMemo, useRef, useState } from "react";

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
    text: "It says ‘done’ but nothing changed.",
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
    text: "Cron ran twice. I didn’t ask it to.",
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
    text: "launchd won’t keep it alive.",
    tool: "Agent911",
    anchor: "#agent911",
    unit: "Recovery Unit",
    kind: "SYSTEM NOTE",
  },
  {
    text: "It’s looping on retries.",
    tool: "Watchdog",
    anchor: "#watchdog",
    unit: "Heartbeat Unit",
    kind: "CONTAINMENT LOG",
  },
  {
    text: "It ran fine yesterday. Today it’s silent.",
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
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function createItem(template: FeedTemplate, id: number): FeedItem {
  return {
    ...template,
    id: `LOG-${id}`,
    time: getTime(),
  };
}

function FeedPanel({
  items,
  onClose,
}: {
  items: FeedItem[];
  onClose?: () => void;
}) {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl">
      <div className="w-full bg-zinc-950 border-b border-zinc-800 p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
              <div className="text-[13px] text-amber-400 tracking-[0.36em] uppercase">
                Human Resources
              </div>
            <div className="text-zinc-200 font-semibold">
              Field Support Feed
            </div>
            <div className="text-xs text-zinc-500 mt-1">
              Live symptom routing and gear recommendations.
            </div>
          </div>
          <div className="flex items-center gap-3">
            {onClose ? (
              <button
                onClick={onClose}
                className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 hover:text-zinc-200"
              >
                Close
              </button>
            ) : null}
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-emerald-300 live-pulse live-twitch">
              <span className="relative inline-flex live-pulse">
                <span className="absolute inline-flex h-[10px] w-[10px] animate-ping rounded-full bg-emerald-400 opacity-50" />
                <span className="relative inline-flex h-[10px] w-[10px] rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.75)] ring-2 ring-emerald-300/40" />
              </span>
              LIVE
            </div>
          </div>
        </div>
        <div className="mt-4 overflow-hidden rounded-full opacity-80">
          <span className="block h-2 w-full bg-[repeating-linear-gradient(135deg,rgba(251,191,36,0.9)_0,rgba(251,191,36,0.9)_10px,rgba(0,0,0,0.9)_10px,rgba(0,0,0,0.9)_20px)] bg-[length:24px_24px]" />
        </div>
      </div>

      <div className="w-full h-[520px] overflow-hidden">
        <div className="w-full space-y-3 px-6 py-5">
          {items.map((item, index) => (
            <div
              key={item.id}
              className={`w-full rounded-xl border border-zinc-700/90 bg-zinc-900/60 px-3 py-3 ${
                index === 0 ? "acme-feed-in" : ""
              }`}
            >
              <div className="flex items-center justify-between gap-2 text-[11px] uppercase tracking-[0.3em] text-zinc-300">
                <span>{item.kind}</span>
                <span>{item.id}</span>
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-[0.32em] text-zinc-500">
                {item.unit} • {item.time}
              </div>
              <div className="mt-2 text-sm text-zinc-100 leading-relaxed">
                {item.text}
              </div>
              <div className="mt-2 text-xs text-zinc-400">
                Recommended gear:{" "}
                <span className="text-amber-300">{item.tool}</span>
              </div>
              <a
                href={item.anchor}
                className="mt-2 inline-flex text-xs uppercase tracking-[0.25em] text-amber-300 hover:text-amber-200 transition duration-200 ease-out"
              >
                View Gear →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HRChatWidget() {
  const [items, setItems] = useState<FeedItem[]>(() => {
    return templates.slice(0, 6).map((t, i) => createItem(t, 770 + i));
  });
  const [open, setOpen] = useState(false);
  const counter = useRef(776);
  const cursor = useRef(5);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const tick = () => {
      const nextTemplate = templates[cursor.current % templates.length];
      cursor.current += 1;
      counter.current += 1;
      const nextItem = createItem(nextTemplate, counter.current);
      setItems((prev) => [nextItem, ...prev].slice(0, 10));
      const delay = 3000 + Math.floor(Math.random() * 1000);
      timeout = setTimeout(tick, delay);
    };
    timeout = setTimeout(tick, 3200);
    return () => clearTimeout(timeout);
  }, []);

  const panel = useMemo(() => <FeedPanel items={items} />, [items]);

  return (
    <>
      <div className="hidden lg:block">{panel}</div>

      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-[10000] rounded-full bg-amber-500 px-4 py-2 text-xs uppercase tracking-[0.25em] text-black shadow-xl transition duration-200 ease-out hover:bg-amber-400 active:translate-y-[1px] active:shadow-none lg:hidden"
      >
        Field Support
      </button>

      {open ? (
        <div className="fixed inset-0 z-[10000] lg:hidden">
          <button
            className="absolute inset-0 bg-black/60"
            aria-label="Close Field Support"
            onClick={() => setOpen(false)}
          />
          <div className="absolute bottom-6 right-4 left-4 acme-feed-in">
            <FeedPanel items={items} onClose={() => setOpen(false)} />
          </div>
        </div>
      ) : null}
    </>
  );
}
