type ObserveSignalsSectionProps = {
  signals: string[];
};

export default function ObserveSignalsSection({
  signals,
}: ObserveSignalsSectionProps) {
  return (
    <section className="rounded-[6px] border border-[#3A4048] bg-[#242A30] p-6 md:p-8">
      <h2 className="text-[22px] font-semibold tracking-tight text-[#E6E6E6] md:text-[26px] lg:text-[30px]">
        Observe Signals
      </h2>
      <p className="mt-3 max-w-4xl text-[16px] leading-7 text-[#E6E6E6]">
        OpenClaw telemetry exposes the operator signals that feed both the CLI
        console and the future fleet control plane.
      </p>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {signals.map((signal) => (
          <li
            key={signal}
            className="rounded-[6px] border border-[#3A4048] bg-[#2C3238] px-4 py-3 text-[16px] text-[#E6E6E6]"
          >
            {signal}
          </li>
        ))}
      </ul>
    </section>
  );
}
