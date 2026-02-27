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

type ConsoleEntry = {
  id: string;
  timestamp: string;
  severity: "LOW" | "MED" | "HIGH";
  symptomLine: string;
  observedLine: string;
  recommendedGear: string[];
  confidence: number;
  tags: string[];
};

const CONSOLE_ENTRIES: ConsoleEntry[] = [
  {
    id: "HR-1901",
    timestamp: "09:18",
    severity: "HIGH",
    symptomLine: "Agent responses stall after 40–60s.",
    observedLine: "Latency spikes align with compaction pressure signals.",
    recommendedGear: ["radcheck", "sentinel"],
    confidence: 0.82,
    tags: ["Slow", "Stuck", "Drift"],
  },
  {
    id: "HR-1902",
    timestamp: "09:21",
    severity: "MED",
    symptomLine: "Background jobs consume the whole budget.",
    observedLine: "Routing logs show policy gaps on fallback selection.",
    recommendedGear: ["sphinxgate"],
    confidence: 0.74,
    tags: ["Routing"],
  },
  {
    id: "HR-1903",
    timestamp: "09:26",
    severity: "MED",
    symptomLine: "Cron runs duplicate without warning.",
    observedLine: "Lockfile evidence missing on restart windows.",
    recommendedGear: ["watchdog"],
    confidence: 0.7,
    tags: ["Stuck"],
  },
  {
    id: "HR-1904",
    timestamp: "09:32",
    severity: "LOW",
    symptomLine: "Scans show elevated drift risk.",
    observedLine: "Runtime config hygiene flagged on recent change.",
    recommendedGear: ["radcheck", "sentinel"],
    confidence: 0.61,
    tags: ["Drift"],
  },
  {
    id: "HR-1905",
    timestamp: "09:38",
    severity: "HIGH",
    symptomLine: "Gateway is up, outputs are silent.",
    observedLine: "No heartbeat evidence in last 12 minutes.",
    recommendedGear: ["watchdog", "agent911"],
    confidence: 0.88,
    tags: ["Stuck", "Recovery"],
  },
  {
    id: "HR-1906",
    timestamp: "09:44",
    severity: "MED",
    symptomLine: "Model routing deviates from policy.",
    observedLine: "Unapproved provider used during load spike.",
    recommendedGear: ["sphinxgate"],
    confidence: 0.77,
    tags: ["Routing"],
  },
  {
    id: "HR-1907",
    timestamp: "09:49",
    severity: "LOW",
    symptomLine: "Run-to-run behavior slowly diverges.",
    observedLine: "Evidence suggests early drift under live traffic.",
    recommendedGear: ["sentinel"],
    confidence: 0.63,
    tags: ["Drift"],
  },
  {
    id: "HR-1908",
    timestamp: "09:55",
    severity: "HIGH",
    symptomLine: "Recovery assumptions unknown.",
    observedLine: "Backup posture is incomplete across critical surfaces.",
    recommendedGear: ["lazarus"],
    confidence: 0.9,
    tags: ["Recovery"],
  },
  {
    id: "HR-1909",
    timestamp: "10:02",
    severity: "MED",
    symptomLine: "Agent slows when compaction windows begin.",
    observedLine: "Stability score trending down in latest scan.",
    recommendedGear: ["radcheck"],
    confidence: 0.72,
    tags: ["Slow", "Flaky"],
  },
  {
    id: "HR-1910",
    timestamp: "10:08",
    severity: "LOW",
    symptomLine: "Operators reporting intermittent output drift.",
    observedLine: "Silent failure patterns align with runtime alerts.",
    recommendedGear: ["sentinel"],
    confidence: 0.66,
    tags: ["Drift", "Flaky"],
  },
  {
    id: "HR-1911",
    timestamp: "10:14",
    severity: "MED",
    symptomLine: "Recovery runbooks are missing steps.",
    observedLine: "Playbook evidence not updated after last deploy.",
    recommendedGear: ["agent911"],
    confidence: 0.71,
    tags: ["Recovery"],
  },
  {
    id: "HR-1912",
    timestamp: "10:20",
    severity: "LOW",
    symptomLine: "Tokens trending above policy thresholds.",
    observedLine: "Budget lanes not enforced for background work.",
    recommendedGear: ["sphinxgate"],
    confidence: 0.6,
    tags: ["Routing"],
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
  onOpenConsole,
  onOpenIntel,
  intelSeen,
}: {
  items: FeedItem[];
  onClose?: () => void;
  onOpenConsole: () => void;
  onOpenIntel: () => void;
  intelSeen: boolean;
}) {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl">
      <div className="w-full bg-zinc-950 border-b border-zinc-800 p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-3">
              <div className="text-[13px] text-amber-400 tracking-[0.36em] uppercase">
                Human Resources
              </div>
              <button
                onClick={onOpenIntel}
                className={`text-[9px] uppercase tracking-[0.32em] px-2 py-0.5 rounded-full border border-amber-400/30 text-amber-300/90 ${
                  intelSeen ? "" : "intel-pulse"
                }`}
              >
                New Intel
              </button>
            </div>
            <div className="text-zinc-200 font-semibold">
              Field Support Feed
            </div>
            <div className="text-[13px] text-zinc-500 mt-1">
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
            <button
              onClick={onOpenConsole}
              className="rounded-full border border-amber-400/40 px-3 py-1 text-[10px] uppercase tracking-[0.26em] text-amber-300 hover:text-amber-200 hover:border-amber-300/60 transition"
            >
              Open HR Console
            </button>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-emerald-300 live-pulse live-twitch">
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
              <div className="flex items-center justify-between gap-2 text-[12px] uppercase tracking-[0.3em] text-zinc-300">
                <span>{item.kind}</span>
                <span>{item.id}</span>
              </div>
              <div className="mt-1 text-xs uppercase tracking-[0.32em] text-zinc-500">
                {item.unit} • {item.time}
              </div>
              <div className="mt-2 text-[15px] text-zinc-100 leading-relaxed">
                {item.text}
              </div>
              <div className="mt-2 text-sm text-zinc-400">
                Recommended gear:{" "}
                <span className="text-amber-300">{item.tool}</span>
              </div>
              <a
                href={item.anchor}
                className="mt-2 inline-flex text-sm uppercase tracking-[0.25em] text-amber-300 hover:text-amber-200 transition duration-200 ease-out"
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

export default function HRChatWidget({
  onOpenGear,
}: {
  onOpenGear?: (id: string) => void;
}) {
  const [items, setItems] = useState<FeedItem[]>(() => {
    return templates.slice(0, 6).map((t, i) => createItem(t, 770 + i));
  });
  const [open, setOpen] = useState(false);
  const [consoleOpen, setConsoleOpen] = useState(false);
  const [intelSeen, setIntelSeen] = useState(false);
  const [briefingOpen, setBriefingOpen] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const counter = useRef(776);
  const cursor = useRef(5);
  const drawerRef = useRef<HTMLDivElement | null>(null);

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

  const openConsole = () => {
    setConsoleOpen(true);
    setIntelSeen(true);
    window.setTimeout(() => drawerRef.current?.focus(), 0);
  };

  const closeConsole = () => setConsoleOpen(false);

  const onIntelClick = () => {
    setBriefingOpen(true);
    openConsole();
  };

  useEffect(() => {
    if (!consoleOpen) return;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeConsole();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [consoleOpen]);

  const panel = useMemo(
    () => (
      <FeedPanel
        items={items}
        onOpenConsole={openConsole}
        onOpenIntel={onIntelClick}
        intelSeen={intelSeen}
      />
    ),
    [items, intelSeen]
  );

  const filters = ["All", "Flaky", "Stuck", "Slow", "Drift", "Recovery", "Routing"];
  const filteredEntries =
    activeFilter === "All"
      ? CONSOLE_ENTRIES
      : CONSOLE_ENTRIES.filter((entry) => entry.tags.includes(activeFilter));

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
            <FeedPanel
              items={items}
              onClose={() => setOpen(false)}
              onOpenConsole={openConsole}
              onOpenIntel={onIntelClick}
              intelSeen={intelSeen}
            />
          </div>
        </div>
      ) : null}

      {consoleOpen ? (
        <div className="fixed inset-0 z-[10080]">
          <button
            className="absolute inset-0 bg-black/60"
            aria-label="Close HR Console"
            onClick={closeConsole}
          />
          <div className="absolute inset-y-0 right-0 w-full md:w-[60vw] bg-zinc-950 border-l border-zinc-800 shadow-2xl transition-transform duration-300 ease-out">
            <div
              ref={drawerRef}
              tabIndex={-1}
              className="h-full overflow-y-auto px-6 py-6 focus:outline-none"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.36em] text-amber-400">
                    HR Console
                  </div>
                  <div className="text-zinc-200 font-semibold text-lg mt-1">
                    Operator Briefing
                  </div>
                </div>
                <button
                  onClick={closeConsole}
                  className="text-[11px] uppercase tracking-[0.26em] text-zinc-400 hover:text-zinc-200"
                >
                  Close
                </button>
              </div>

              <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-4">
                <button
                  onClick={() => setBriefingOpen((prev) => !prev)}
                  className="flex w-full items-center justify-between text-sm uppercase tracking-[0.28em] text-zinc-300"
                >
                  Operator Briefing
                  <span className="text-zinc-500">
                    {briefingOpen ? "–" : "+"}
                  </span>
                </button>
                {briefingOpen ? (
                  <div className="mt-3 text-[15px] leading-relaxed text-zinc-300 space-y-2">
                    <div>Detect → RadCheck surfaces hidden instability</div>
                    <div>Verify → Lazarus confirms recovery readiness</div>
                    <div>Protect → Sentinel watches live runs</div>
                    <div>Enforce → SphinxGate maintains policy discipline</div>
                    <div>Recover → Agent911 guides incident response</div>
                    <div className="text-sm text-zinc-500 mt-2">
                      Start with what feels wrong. Then follow the ladder.
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="mt-6">
                <div className="flex flex-wrap gap-2">
                  {filters.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.28em] transition ${
                        activeFilter === filter
                          ? "border-amber-400/60 text-amber-300"
                          : "border-zinc-800 text-zinc-500 hover:text-zinc-300"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>

                <div className="mt-4 space-y-3">
                  {filteredEntries.map((entry) => (
                    <div
                      key={entry.id}
                      className="rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-4"
                    >
                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-zinc-500">
                          <span>{entry.timestamp}</span>
                          <span
                            className={`rounded-full border px-2 py-0.5 text-[10px] ${
                              entry.severity === "HIGH"
                                ? "border-rose-400/60 text-rose-300"
                                : entry.severity === "MED"
                                ? "border-amber-400/60 text-amber-300"
                                : "border-emerald-400/50 text-emerald-300"
                            }`}
                          >
                            {entry.severity}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="text-[15px] text-zinc-100">
                            {entry.symptomLine}
                          </div>
                          <div className="text-sm text-zinc-500 mt-1">
                            {entry.observedLine}
                          </div>
                        </div>
                        <div className="flex flex-col items-start gap-2">
                          <div className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                            Recommended gear
                          </div>
                          <div className="text-sm text-zinc-300">
                            {entry.recommendedGear.join(" / ").toUpperCase()}
                          </div>
                          <button
                            onClick={() => {
                              onOpenGear?.(entry.recommendedGear[0]);
                              closeConsole();
                            }}
                            className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-3 py-1.5 text-xs text-zinc-200 transition hover:border-zinc-500 hover:text-white"
                          >
                            View Gear
                          </button>
                        </div>
                      </div>
                      <div className="mt-3 text-[11px] uppercase tracking-[0.28em] text-zinc-500">
                        Confidence {Math.round(entry.confidence * 100)}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
