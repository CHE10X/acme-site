"use client";

export default function OperatorTerrainSection() {
  return (
    <section className="rounded-[6px] border border-[#3A4048] overflow-hidden">
      <iframe
        src="/fieldmap/operator-terrain-v2.html"
        title="Operator Terrain — signal topology map"
        width="100%"
        height="620"
        scrolling="no"
        style={{
          display: "block",
          border: "none",
          overflow: "hidden",
        }}
        aria-label="Operator terrain topology with five incident zones"
      />
    </section>
  );
}
