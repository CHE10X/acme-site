import { getLegalDocument } from "./legalDocuments";

type LegalDocumentPageProps = {
  slug: "privacy-policy" | "terms-of-service";
};

export function LegalDocumentPage({ slug }: LegalDocumentPageProps) {
  const document = getLegalDocument(slug);

  return (
    <div className="min-h-screen bg-white text-neutral-800">
      <main className="w-full px-5 pt-12 pb-16 md:px-6 md:pt-16 md:pb-20">
        <div className="mx-auto w-full max-w-[720px]">
          <header>
            <h1 className="text-2xl font-semibold tracking-tight leading-tight text-neutral-900 md:text-3xl">
              {document.title}
            </h1>
            <p className="mt-3 text-sm text-neutral-500">
              Effective Date: {document.effectiveDate ?? "See source document"}{" "}
              <span className="px-2 text-neutral-300">·</span>
              Last Updated:{" "}
              {document.lastUpdated ?? document.effectiveDate ?? "See source document"}
            </p>
          </header>

          <article
            className="
              mt-6 border-t border-neutral-200 pt-6 text-base leading-[1.75] text-neutral-800 antialiased
              [&_a]:text-neutral-900 [&_a]:underline [&_a]:decoration-neutral-300 [&_a]:underline-offset-4 hover:[&_a]:opacity-90
              [&_strong]:font-semibold
              [&_h1]:text-2xl [&_h1]:font-semibold [&_h1]:tracking-tight [&_h1]:leading-tight [&_h1]:text-neutral-900 md:[&_h1]:text-3xl
              [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-neutral-900
              [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-neutral-900
              [&_p]:my-4
              [&_ul]:my-4 [&_ul]:space-y-2 [&_ul]:pl-6 [&_ul]:list-disc
              [&_ol]:my-4 [&_ol]:space-y-2 [&_ol]:pl-6 [&_ol]:list-decimal
              [&_li::marker]:text-neutral-400
              [&_code]:rounded-md [&_code]:border [&_code]:border-neutral-200 [&_code]:bg-neutral-50 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-sm
              [&_pre]:my-4 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:border [&_pre]:border-neutral-200 [&_pre]:bg-neutral-50 [&_pre]:p-4
              [&_pre_code]:border-0 [&_pre_code]:bg-transparent [&_pre_code]:p-0
            "
            dangerouslySetInnerHTML={{ __html: document.html }}
          />
        </div>
      </main>
    </div>
  );
}
