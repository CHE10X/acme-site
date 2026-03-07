import Link from "next/link";
import { OPERATOR_UTILITY_CARDS } from "./homeData";

export default function OperatorUtilityCards() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      {OPERATOR_UTILITY_CARDS.map((card) => (
        <article
          key={card.id}
          className="group relative rounded-md border border-[#3A4048] bg-[#2C3238] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.3)] transition duration-200 hover:border-[#9AA3AD]"
        >
          <div className="text-[13px] uppercase tracking-[0.24em] text-[#9AA3AD]">
            {card.unitLabel}
          </div>
          <h3 className="mt-2 text-[22px] font-semibold text-[#E6E6E6]">
            {card.title}
          </h3>
          <p className="mt-1 text-[13px] text-[#9AA3AD]">{card.subtitle}</p>
          <p className="mt-3 text-[18px] leading-8 text-[#E6E6E6]">
            {card.description}
          </p>
          <p className="mt-2 text-[18px] italic leading-8 text-[#9AA3AD]">
            {card.flavor}
          </p>
          <ul className="mt-3 space-y-1 text-[18px] leading-8 text-[#E6E6E6]">
            {card.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-2">
                <span className="mt-[2px] text-[#D98A2B]">•</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
          <Link
            href={card.docsHref}
            className="mt-4 inline-flex items-center text-[15px] text-[#D98A2B] transition hover:text-[#C47A22]"
          >
            Learn more →
          </Link>
        </article>
      ))}
    </div>
  );
}
