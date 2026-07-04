import Image from "next/image";

type ProofPlateProps = {
  caption: string;
  title: string;
  treatment: string;
  ratio?: string;
  notes?: string[];
  showCaption?: boolean;
  imageSrc?: string;
  imageAlt?: string;
};

export default function ProofPlate({
  caption,
  title,
  treatment,
  ratio = "16 / 9",
  notes = [],
  showCaption = true,
  imageSrc,
  imageAlt,
}: ProofPlateProps) {
  return (
    <figure className="rounded-[6px] border border-[rgba(24,28,34,0.14)] bg-[#fdfdfb] p-4 shadow-[0_30px_90px_rgba(21,25,31,0.08)]">
      <div
        className="overflow-hidden rounded-[4px] border border-[rgba(24,28,34,0.12)] bg-[#f6f8fb]"
        style={{ aspectRatio: ratio }}
      >
        {imageSrc ? (
          <div className="relative h-full w-full bg-[#eef2f7]">
            <Image
              src={imageSrc}
              alt={imageAlt ?? `${title} product surface`}
              fill
              className="object-cover object-top"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        ) : (
          <div className="w-full px-6 py-7 text-left">
            <div className="mb-4 flex items-center justify-between gap-4 border-b border-[rgba(24,28,34,0.12)] pb-3 text-[10px] uppercase tracking-[0.18em] text-[#7a8190]">
              <span>{caption}</span>
              <span>{treatment}</span>
            </div>
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div>
                <div className="font-serif text-[1.65rem] leading-[1.05] tracking-[-0.03em] text-[#181c22]">
                  {title}
                </div>
                <div className="mt-4 space-y-2 border-t border-[rgba(24,28,34,0.12)] pt-4 text-[0.92rem] leading-6 text-[#46515d]">
                  <div>Real surface placeholder</div>
                  <div>Representative state selected</div>
                  <div>Motion demo can replace this later</div>
                </div>
              </div>
              {notes.length ? (
                <ul className="space-y-2 border-t border-[rgba(24,28,34,0.12)] pt-4 text-[0.9rem] leading-6 text-[#46515d] lg:border-t-0 lg:border-l lg:pl-6 lg:pt-0">
                  {notes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        )}
      </div>
      {showCaption ? (
        <figcaption className="mt-3 flex items-center justify-between gap-4 text-[11px] uppercase tracking-[0.12em] text-[#7a8190]">
          <span>{title}</span>
          <span>[REPLACE-LATER]</span>
        </figcaption>
      ) : null}
    </figure>
  );
}
