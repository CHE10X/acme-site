type Tier = "FREE" | "CORE" | "ADVANCED" | "RECOVERY";

const tierStyles: Record<Tier, string> = {
  FREE: "text-emerald-200/80",
  CORE: "text-amber-200/80",
  ADVANCED: "text-sky-200/80",
  RECOVERY: "text-rose-200/80",
};

export default function TierBadge({ tier }: { tier: Tier }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] ${tierStyles[tier]}`}
    >
      {tier}
    </span>
  );
}
