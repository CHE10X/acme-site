export default function OpenClawStackDiagram() {
  return (
    <svg
      viewBox="0 0 1200 700"
      role="img"
      aria-labelledby="stack-title stack-desc"
      className="h-auto w-full"
    >
      <title id="stack-title">OpenClaw Reliability Control Plane</title>
      <desc id="stack-desc">
        OpenClaw system components, Acme guards, and Acme operator tools with
        OCTriageUnit as the operator entrypoint to evidence-first triage.
      </desc>
      <defs>
        <style>
          {`
          .t { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; fill: #e5e7eb; }
          .title { font-size: 22px; font-weight: 700; }
          .label { font-size: 14px; font-weight: 600; }
          .small { font-size: 12px; font-weight: 500; fill: #9ca3af; }
          .tiny { font-size: 10.5px; font-weight: 700; fill: #a1a1aa; letter-spacing: 0.08em; }
          .band { fill: #0f172a; opacity: 0.46; stroke: #334155; stroke-width: 1.5; vector-effect: non-scaling-stroke; rx: 14; ry: 14; }
          .band-label { font-size: 12px; font-weight: 600; fill: #cbd5e1; }
          .system { fill: #111827; stroke: #64748b; stroke-width: 2; vector-effect: non-scaling-stroke; rx: 12; ry: 12; }
          .guard { fill: #0d1a2b; stroke: #3b82f6; stroke-width: 2.1; vector-effect: non-scaling-stroke; filter: drop-shadow(0 0 4px rgba(59,130,246,0.18)); rx: 12; ry: 12; }
          .tool { fill: #1f2937; stroke: #f59e0b; stroke-width: 2.5; vector-effect: non-scaling-stroke; filter: drop-shadow(0 0 8px rgba(245,158,11,0.26)); rx: 12; ry: 12; }
          .badge { fill: #27272a; stroke: #52525b; stroke-width: 1; vector-effect: non-scaling-stroke; rx: 8; ry: 8; }
          .badge-guard { fill: #14263f; stroke: #3b82f6; stroke-width: 1; vector-effect: non-scaling-stroke; rx: 8; ry: 8; }
          .badge-tool { fill: #3f2a0c; stroke: #f59e0b; stroke-width: 1; vector-effect: non-scaling-stroke; rx: 8; ry: 8; }
          .line { stroke: #e5e7eb; stroke-width: 2; fill: none; vector-effect: non-scaling-stroke; marker-end: url(#arr); }
          .inspect { stroke: #cbd5e1; stroke-width: 1.5; stroke-dasharray: 6 5; fill: none; vector-effect: non-scaling-stroke; marker-end: url(#arr-soft); }
          .operator-run { stroke: #f5f5f5; stroke-width: 1.4; fill: none; vector-effect: non-scaling-stroke; marker-end: url(#arr-soft); }
          .legend-label { font-size: 10px; font-weight: 600; fill: #a1a1aa; }
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
        <marker
          id="arr-soft"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M0,0 L10,5 L0,10 z" fill="#cbd5e1" />
        </marker>
      </defs>

      <rect x="0" y="0" width="1200" height="700" fill="#020617" />
      <text className="t title" x="60" y="56">
        OpenClaw Reliability Control Plane
      </text>
      <text className="t small" x="60" y="78">
        Signals → Evidence → Triage → Recovery
      </text>
      <rect className="band" x="40" y="120" width="250" height="500" />
      <text className="t band-label" x="52" y="116">
        System State
      </text>
      <rect className="band" x="320" y="120" width="250" height="500" />
      <text className="t band-label" x="332" y="116">
        Protection Surfaces
      </text>
      <rect className="band" x="600" y="120" width="300" height="500" />
      <text className="t band-label" x="612" y="116">
        Operator Response
      </text>
      <rect className="band" x="930" y="120" width="230" height="500" />
      <text className="t band-label" x="942" y="116">
        Human Control
      </text>

      <rect className="system" x="70" y="180" width="190" height="64" />
      <text className="t label" x="98" y="218">
        BOOT.md
      </text>
      <rect className="system" x="70" y="280" width="190" height="64" />
      <text className="t label" x="98" y="318">
        DIGEST.md
      </text>
      <rect className="system" x="70" y="380" width="190" height="64" />
      <text className="t label" x="98" y="418">
        Digest Builder
      </text>
      <rect className="badge" x="210" y="386" width="44" height="18" />
      <text className="t tiny" x="218" y="399">
        v0.1.x
      </text>

      <rect className="guard" x="350" y="180" width="190" height="64" />
      <text className="t label" x="378" y="218">
        Drift Guard
      </text>
      <rect className="badge-guard" x="486" y="186" width="48" height="18" />
      <text className="t tiny" x="493" y="199">
        GUARD
      </text>

      <rect className="guard" x="350" y="280" width="190" height="64" />
      <text className="t label" x="378" y="312">
        Sentinel
      </text>
      <text className="t small" x="378" y="330">
        (Disk Pressure)
      </text>
      <rect className="badge-guard" x="486" y="286" width="48" height="18" />
      <text className="t tiny" x="493" y="299">
        GUARD
      </text>

      <rect className="guard" x="350" y="380" width="190" height="64" />
      <text className="t label" x="384" y="418">
        Watchdog
      </text>
      <rect className="badge-guard" x="486" y="386" width="48" height="18" />
      <text className="t tiny" x="493" y="399">
        GUARD
      </text>

      <rect className="system" x="350" y="480" width="190" height="64" />
      <text className="t label" x="378" y="518">
        Disk/Workspace
      </text>
      <rect className="system" x="350" y="556" width="190" height="52" />
      <text className="t label" x="403" y="587">
        Alerts
      </text>

      <rect className="system" x="655" y="170" width="190" height="64" />
      <text className="t label" x="683" y="208">
        Agent Session
      </text>

      <rect className="tool" x="655" y="274" width="190" height="64" />
      <text className="t label" x="683" y="312">
        OCTriageUnit
      </text>
      <rect className="badge-tool" x="785" y="280" width="52" height="18" />
      <text className="t tiny" x="795" y="293">
        TOOL
      </text>
      <rect className="badge" x="789" y="304" width="48" height="18" />
      <text className="t tiny" x="797" y="317">
        v0.1.5
      </text>

      <rect className="system" x="655" y="378" width="190" height="64" />
      <text className="t label" x="683" y="416">
        Proof Bundle
      </text>

      <rect className="tool" x="655" y="482" width="190" height="64" />
      <text className="t label" x="699" y="520">
        Agent911
      </text>
      <rect className="badge-tool" x="791" y="488" width="48" height="18" />
      <text className="t tiny" x="801" y="501">
        TOOL
      </text>

      <rect className="system" x="960" y="180" width="170" height="64" />
      <text className="t label" x="1005" y="218">
        Recovery
      </text>
      <rect className="system" x="960" y="280" width="170" height="64" />
      <text className="t label" x="995" y="318">
        Commander
      </text>
      <rect className="system" x="960" y="380" width="170" height="64" />
      <text className="t label" x="1006" y="418">
        Operator
      </text>
      <rect className="system" x="960" y="480" width="170" height="64" />
      <text className="t small" x="992" y="507">
        Channels
      </text>
      <text className="t tiny" x="970" y="525">
        Discord / Telegram / Web
      </text>
      <rect className="system" x="960" y="556" width="170" height="52" />
      <text className="t label" x="1012" y="587">
        Agents
      </text>

      <path className="line" d="M260 212 V156 H655 V202" />
      <path className="line" d="M260 312 H300 V166 H655 V202" />
      <path className="line" d="M165 380 V344" />
      <path className="line" d="M350 212 H300 V412 H260" />
      <path className="line" d="M350 202 H300 V312 H260" />
      <path className="inspect" d="M750 234 V274" />
      <path className="line" d="M750 338 V378" />
      <path className="line" d="M445 444 V480" />
      <path className="line" d="M445 344 V556" />
      <path className="line" d="M845 514 H920 V212 H960" />
      <path className="line" d="M1045 344 V380" />
      <path className="line" d="M1045 544 V556" />
      <path className="operator-run" d="M960 312 H910 V306 H845" />
      <text className="t small" x="858" y="294">
        Operator runs
      </text>

      <g transform="translate(700,636)">
        <rect className="badge" x="0" y="0" width="280" height="48" />
        <text className="t legend-label" x="10" y="13">
          Legend
        </text>
        <rect className="system" x="10" y="20" width="24" height="14" />
        <text className="t legend-label" x="40" y="31">
          System Component
        </text>
        <rect className="guard" x="142" y="20" width="24" height="14" />
        <text className="t legend-label" x="172" y="31">
          Acme Guard
        </text>
        <rect className="tool" x="250" y="20" width="24" height="14" />
        <text className="t legend-label" x="280" y="31">
          Acme Operator Tool
        </text>
      </g>

      <g transform="translate(990,636)">
        <rect className="badge" x="0" y="0" width="170" height="42" />
        <circle className="ok" cx="18" cy="21" r="5" />
        <text className="t tiny" x="30" y="25">
          OK
        </text>
        <circle className="warn" cx="88" cy="21" r="5" />
        <text className="t tiny" x="100" y="25">
          WARN
        </text>
        <circle className="deg" cx="168" cy="21" r="5" />
        <text className="t tiny" x="180" y="25">
          DEGRADED
        </text>
      </g>
    </svg>
  );
}
