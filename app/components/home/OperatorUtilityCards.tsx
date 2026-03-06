import Link from "next/link";
import { OPERATOR_UTILITY_CARDS } from "./homeData";

export default function OperatorUtilityCards() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      {OPERATOR_UTILITY_CARDS.map((card) => (
        <article
          key={card.id}
          className="group relative rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-5 transition duration-200 hover:-translate-y-0.5 hover:border-zinc-700"
        >
          <div className="text-[11px] uppercase tracking-[0.28em] text-zinc-500">
            {card.unitLabel}
          </div>
          <h3 className="mt-2 text-2xl font-semibold text-zinc-100">
            {card.title}
          </h3>
          <p className="mt-1 text-sm text-zinc-400">{card.subtitle}</p>
          <p className="mt-3 text-[15px] leading-relaxed text-zinc-300">
            {card.description}
          </p>
          <p className="mt-2 text-[15px] italic leading-relaxed text-zinc-500">
            {card.flavor}
          </p>
          <ul className="mt-3 space-y-1 text-[15px] leading-relaxed text-zinc-300">
            {card.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-2">
                <span className="mt-[2px] text-amber-400">•</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
          <Link
            href={card.docsHref}
            className="mt-4 inline-flex items-center text-sm text-amber-300 transition hover:text-amber-200"
          >
            Learn more →
          </Link>
        </article>
      ))}
    </div>
  );
}
