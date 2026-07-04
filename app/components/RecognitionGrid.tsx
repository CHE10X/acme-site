import type { CSSProperties } from "react";

type RecognitionCard = {
  name: string;
  state: "waiting" | "active" | "idle";
  meta: string;
  footer: string;
  progressTurn: string;
  accent: string;
  track: string;
};

const CARDS: RecognitionCard[] = [
  {
    name: "cassius",
    state: "waiting",
    meta: "BP1 validation",
    footer: "1 queued",
    progressTurn: ".68turn",
    accent: "#6d6af8",
    track: "rgba(109,106,248,.14)",
  },
  {
    name: "dag",
    state: "active",
    meta: "Env bring-up",
    footer: "51%",
    progressTurn: ".51turn",
    accent: "#18a56f",
    track: "rgba(24,165,111,.14)",
  },
  {
    name: "hendrik",
    state: "waiting",
    meta: "Command review",
    footer: "1 queued",
    progressTurn: ".42turn",
    accent: "#6d6af8",
    track: "rgba(109,106,248,.14)",
  },
  {
    name: "iris",
    state: "active",
    meta: "Docs refinement",
    footer: "61%",
    progressTurn: ".61turn",
    accent: "#18a56f",
    track: "rgba(24,165,111,.14)",
  },
  {
    name: "soren",
    state: "idle",
    meta: "available",
    footer: "ready",
    progressTurn: ".77turn",
    accent: "rgba(73,92,127,.55)",
    track: "rgba(73,92,127,.10)",
  },
  {
    name: "codex",
    state: "waiting",
    meta: "UI integration",
    footer: "5 queued",
    progressTurn: ".59turn",
    accent: "#6d6af8",
    track: "rgba(109,106,248,.14)",
  },
];

const stateText = {
  waiting: "#6d6af8",
  active: "#18a56f",
  idle: "#607087",
} as const;

const stateDot = {
  waiting: "#6d6af8",
  active: "#18a56f",
  idle: "rgba(73,92,127,.34)",
} as const;

function LiveBars({ accent }: { accent: string }) {
  return (
    <div className="absolute bottom-[9px] left-[15px] z-[2] flex h-7 items-end gap-[3px] overflow-visible opacity-100">
      <span
        className="w-1 origin-bottom rounded-[2px] animate-[recognition-bounce_1.1s_ease-in-out_infinite]"
        style={{ height: "7px", backgroundColor: accent, opacity: 0.48, animationDelay: "0s" }}
      />
      <span
        className="w-1 origin-bottom rounded-[2px] animate-[recognition-bounce_1.1s_ease-in-out_infinite]"
        style={{ height: "17px", backgroundColor: accent, opacity: 0.72, animationDelay: ".12s" }}
      />
      <span
        className="w-1 origin-bottom rounded-[2px] animate-[recognition-bounce_1.1s_ease-in-out_infinite]"
        style={{ height: "11px", backgroundColor: accent, opacity: 0.58, animationDelay: ".24s" }}
      />
      <span
        className="w-1 origin-bottom rounded-[2px] animate-[recognition-bounce_1.1s_ease-in-out_infinite]"
        style={{ height: "21px", backgroundColor: accent, opacity: 0.96, animationDelay: ".36s" }}
      />
    </div>
  );
}

export default function RecognitionGrid() {
  return (
    <div className="mx-auto w-full max-w-[252px] rounded-[12px] bg-[#d8d6ce] p-3 shadow-[0_16px_28px_rgba(27,33,45,0.08)]">
      <style>{`
        @keyframes recognition-bounce {
          0%, 100% { transform: scaleY(.7); }
          50% { transform: scaleY(1.08); }
        }
      `}</style>
      <div className="grid grid-cols-2 gap-[10px]">
        {CARDS.map((card) => (
          <article
            key={card.name}
            className="relative aspect-square w-[102px] overflow-hidden rounded-[12px] border border-[rgba(198,205,218,0.72)] bg-[linear-gradient(180deg,rgba(255,255,255,.98),rgba(247,250,252,.96))] px-[10px] pb-[9px] pt-[10px] shadow-[0_1px_2px_rgba(0,0,0,.03)]"
            style={
              {
                "--agent-progress": card.progressTurn,
                "--agent-accent": card.accent,
                "--agent-track": card.track,
              } as CSSProperties
            }
          >
            <div
              className="pointer-events-none absolute inset-[2px] rounded-[10px] p-1 opacity-95"
              style={{
                background:
                  "conic-gradient(from -135deg, var(--agent-accent) 0turn, var(--agent-accent) var(--agent-progress), var(--agent-track) var(--agent-progress), var(--agent-track) 1turn)",
                WebkitMask:
                  "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                WebkitMaskComposite: "xor",
                mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                maskComposite: "exclude",
              }}
            />
            <div className="pointer-events-none absolute inset-[7px] rounded-[8px] border border-[rgba(98,112,148,.12)]" />

            <div className="relative flex min-h-0 items-start justify-start gap-1.5">
              <div className="text-[18px] font-black lowercase leading-[0.94] tracking-[-0.05em] text-[#1a2238]">
                {card.name}
              </div>
            </div>

            <div
              className="relative mt-2.5 flex items-center gap-1.5 text-[9px] font-bold capitalize tracking-[0.01em]"
              style={{ color: stateText[card.state] }}
            >
              <span
                className="h-[5px] w-[5px] shrink-0 rounded-full"
                style={{ backgroundColor: stateDot[card.state] }}
              />
              <span>{card.state}</span>
            </div>

            <div
              className={`relative mt-auto text-[11px] leading-[1.12] text-[#5d6b81] ${
                card.state === "idle" ? "text-[#8290a5]" : ""
              }`}
            >
              {card.meta}
            </div>

            <div className="relative mt-1 text-right text-[10px] font-semibold uppercase tracking-[0.02em] text-[#8090a7]">
              {card.footer}
            </div>

            {card.state === "active" ? <LiveBars accent={card.accent} /> : null}
          </article>
        ))}
      </div>
    </div>
  );
}
