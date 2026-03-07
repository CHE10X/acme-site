type ObserveSignalsSectionProps = {
  signals: string[];
};

export default function ObserveSignalsSection({
  signals,
}: ObserveSignalsSectionProps) {
  return (
    <section className="rounded-2xl border border-[#3A4048] bg-[#242A30] p-6 md:p-8">
      <h2 className="text-[30px] font-semibold tracking-tight text-[#E6E6E6]">
        Observe Signals
      </h2>
      <p className="mt-3 max-w-4xl text-[18px] leading-8 text-[#E6E6E6]">
        OpenClaw telemetry exposes the operator signals that feed both the CLI
        console and the future fleet control plane.
      </p>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {signals.map((signal) => (
          <li
            key={signal}
            className="rounded-md border border-[#3A4048] bg-[#2C3238] px-4 py-3 text-[18px] text-[#E6E6E6]"
          >
            {signal}
          </li>
        ))}
      </ul>
    </section>
  );
}
