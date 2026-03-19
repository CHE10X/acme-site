const SIGNAL_DETAILS: Record<string, string> = {
  "Agent topology": "Which agents are running, where, and how they relate to each other.",
  "Agent activity rate": "How active each agent is — and when activity patterns look wrong.",
  "Runtime alerts": "Signals that something changed in the runtime before it becomes a failure.",
  "Reliability score": "A 0–100 score that tells you how healthy your stack is right now.",
  "Protection events": "When Sentinel or Watchdog acted — what it caught and when.",
};

type ObserveSignalsSectionProps = {
  signals: string[];
};

export default function ObserveSignalsSection({
  signals,
}: ObserveSignalsSectionProps) {
  return (
    <section className="rounded-[6px] border border-[#3A4048] bg-[#242A30] p-6 md:p-8">
      <h2 className="text-[22px] font-semibold tracking-tight text-[#E6E6E6] md:text-[26px] lg:text-[30px]">
        What You Can See
      </h2>
      <p className="mt-3 max-w-2xl text-[16px] leading-7 text-[#9AA3AD]">
        Most operators don&apos;t know something is wrong until it&apos;s already wrong.
        ACME surfaces the signals that tell you earlier.
      </p>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {signals.map((signal) => (
          <li
            key={signal}
            className="rounded-[6px] border border-[#3A4048] bg-[#2C3238] px-4 py-4"
          >
            <div className="text-[15px] font-medium text-[#E6E6E6]">{signal}</div>
            {SIGNAL_DETAILS[signal] && (
              <div className="mt-1 text-[14px] leading-6 text-[#9AA3AD]">
                {SIGNAL_DETAILS[signal]}
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
