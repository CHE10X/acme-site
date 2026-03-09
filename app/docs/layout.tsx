import TawkToWidget from "@/app/components/TawkToWidget";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <TawkToWidget />
    </>
  );
}
