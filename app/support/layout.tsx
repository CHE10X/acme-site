import TawkToWidget from "@/app/components/TawkToWidget";

export default function SupportLayout({
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
