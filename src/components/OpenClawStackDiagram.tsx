export default function OpenClawStackDiagram() {
  return (
    <svg
      viewBox="0 0 1200 700"
      role="img"
      aria-labelledby="stack-title stack-desc"
      className="h-auto w-full"
    >
      <title id="stack-title">OpenClaw Reliability Stack</title>
      <desc id="stack-desc">
        Architecture view showing Elixir memory artifacts, triage proof pipeline,
        runtime guardrails, and operator control channels.
      </desc>
      <defs>
        <style>
          {`
          .t { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; fill: #e5e7eb; }
          .title { font-size: 22px; font-weight: 700; }
          .label { font-size: 15px; font-weight: 600; }
          .small { font-size: 12px; font-weight: 500; fill: #9ca3af; }
          .band { fill: #0f172a; opacity: 0.5; stroke: #334155; stroke-width: 1.5; vector-effect: non-scaling-stroke; rx: 12; ry: 12; }
          .band-label { font-size: 12px; font-weight: 600; fill: #cbd5e1; }
          .card { fill: #111827; stroke: #64748b; stroke-width: 2; vector-effect: non-scaling-stroke; rx: 14; ry: 14; }
          .line { stroke: #e5e7eb; stroke-width: 2; fill: none; vector-effect: non-scaling-stroke; marker-end: url(#arr); }
          .ok { fill: #22c55e; }
          .warn { fill: #f59e0b; }
          .deg { fill: #ef4444; }
          `}
        </style>
        <marker
          id="arr"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0,0 L10,5 L0,10 z" fill="#e5e7eb" />
        </marker>
      </defs>

      <rect x="0" y="0" width="1200" height="700" fill="#020617" />
      <text className="t title" x="60" y="56">
        Control Plane - Reliability Surfaces
      </text>
      <text className="t small" x="60" y="78">
        Read-only first response → continuous protection → recovery
      </text>

      <rect className="band" x="40" y="96" width="260" height="510" />
      <text className="t band-label" x="52" y="116">
        Evidence &amp; State
      </text>

      <rect className="band" x="680" y="96" width="500" height="300" />
      <text className="t band-label" x="692" y="116">
        Protection
      </text>

      <rect className="band" x="340" y="482" width="840" height="198" />
      <text className="t band-label" x="352" y="502">
        Operator Control
      </text>

      <rect className="card" x="60" y="110" width="220" height="90" />
      <text className="t label" x="90" y="152">
        BOOT.md
      </text>
      <rect className="card" x="60" y="240" width="220" height="90" />
      <text className="t label" x="90" y="282">
        DIGEST.md
      </text>
      <rect className="card" x="60" y="370" width="220" height="90" />
      <text className="t label" x="90" y="412">
        Digest Builder
      </text>
      <rect className="card" x="60" y="500" width="220" height="90" />
      <text className="t label" x="90" y="542">
        Drift Guard
      </text>
      <text className="t small" x="60" y="620">
        Elixir v0.1.x
      </text>

      <rect className="card" x="360" y="175" width="240" height="90" />
      <text className="t label" x="390" y="217">
        Agent Session
      </text>
      <rect className="card" x="360" y="370" width="240" height="90" />
      <text className="t label" x="390" y="412">
        OCTriageUnit
      </text>
      <text className="t small" x="390" y="434">
        v0.1.5
      </text>
      <rect className="card" x="700" y="370" width="240" height="90" />
      <text className="t label" x="730" y="412">
        Proof Bundle
      </text>
      <rect className="card" x="700" y="110" width="240" height="90" />
      <text className="t label" x="730" y="152">
        Watchdog Hygiene Guard
      </text>
      <rect className="card" x="700" y="240" width="240" height="90" />
      <text className="t label" x="730" y="282">
        Disk/Workspace
      </text>
      <rect className="card" x="1000" y="170" width="170" height="90" />
      <text className="t label" x="1025" y="212">
        Sentinel
      </text>
      <text className="t small" x="1025" y="232">
        (Disk Pressure)
      </text>
      <rect className="card" x="1000" y="300" width="170" height="90" />
      <text className="t label" x="1045" y="352">
        Alerts
      </text>
      <rect className="card" x="700" y="500" width="240" height="90" />
      <text className="t label" x="730" y="542">
        Agent911
      </text>
      <rect className="card" x="1000" y="500" width="170" height="90" />
      <text className="t label" x="1038" y="542">
        Recovery
      </text>
      <rect className="card" x="360" y="500" width="240" height="90" />
      <text className="t label" x="390" y="542">
        Commander
      </text>
      <rect className="card" x="360" y="610" width="240" height="60" />
      <text className="t label" x="390" y="647">
        Operator
      </text>
      <rect className="card" x="700" y="610" width="240" height="60" />
      <text className="t label" x="730" y="647">
        Channels (Discord/Telegram/Web)
      </text>
      <rect className="card" x="1000" y="610" width="170" height="60" />
      <text className="t label" x="1048" y="647">
        Agents
      </text>

      <path className="line" d="M280 155 H360" />
      <path className="line" d="M280 285 H360" />
      <path className="line" d="M280 415 V285 H360" />
      <path className="line" d="M280 545 V415 H360" />
      <path className="line" d="M280 545 V285 H60" />
      <path className="line" d="M600 415 H700" />
      <path className="line" d="M940 155 V285 H700" />
      <path className="line" d="M940 285 H700" />
      <path className="line" d="M1170 215 V300" />
      <path className="line" d="M940 545 H1000" />
      <path className="line" d="M480 590 V610" />
      <path className="line" d="M940 640 H1000" />

      <g transform="translate(990,70)">
        <rect className="card" x="0" y="0" width="180" height="82" />
        <text className="t label" x="14" y="22">
          Legend
        </text>
        <circle className="ok" cx="20" cy="40" r="6" />
        <text className="t small" x="34" y="44">
          OK
        </text>
        <circle className="warn" cx="20" cy="58" r="6" />
        <text className="t small" x="34" y="62">
          WARN
        </text>
        <circle className="deg" cx="90" cy="58" r="6" />
        <text className="t small" x="104" y="62">
          DEGRADED
        </text>
      </g>
    </svg>
  );
}
