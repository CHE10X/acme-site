import FieldMap from "@/app/components/fieldmap/FieldMap";

type ObserveSignalsSectionProps = {
  signals: string[];
};

export default function ObserveSignalsSection({
  signals,
}: ObserveSignalsSectionProps) {
  return (
    <section className="rounded-2xl border border-zinc-800/80 bg-zinc-900/35 p-6">
      <h2 className="text-2xl font-semibold tracking-tight text-zinc-100">
        Observe Signals
      </h2>
      <p className="mt-3 text-zinc-300">
        OpenClaw telemetry exposes the operator signals that feed both the CLI
        console and the future fleet control plane.
      </p>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {signals.map((signal) => (
          <li
            key={signal}
            className="rounded-lg border border-zinc-800/80 bg-zinc-900/55 px-3 py-2 text-sm text-zinc-300"
          >
            {signal}
          </li>
        ))}
      </ul>
      <div className="mt-6 rounded-xl border border-zinc-800/80 bg-zinc-950/65 px-2 py-3">
        <FieldMap />
      </div>
    </section>
  );
}
