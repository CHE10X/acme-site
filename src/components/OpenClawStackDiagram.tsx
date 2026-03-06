import Image from "next/image";

export default function OpenClawStackDiagram() {
  return (
    <figure className="overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-950/80">
      <Image
        src="/diagrams/openclaw-reliability-stack.svg"
        alt="Layered diagram of the OpenClaw reliability stack showing runtime, memory integrity, monitoring, diagnostics, and recovery."
        width={1400}
        height={1000}
        className="h-auto w-full"
        priority={false}
      />
    </figure>
  );
}
