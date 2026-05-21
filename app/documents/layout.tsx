import Navbar from "@/components/layout/Navbar";
import PdfUpload from "@/components/PdfUpload";

export default function DocumentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <PdfUpload />
      {children}
    </>
  );
}