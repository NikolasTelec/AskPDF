import Navbar from "@/components/layout/Navbar";
import PdfUpload from "@/components/PdfUpload";
import { Toaster } from "sonner";

export default function DocumentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Toaster position="bottom-right" richColors />
      <Navbar />
      <PdfUpload />
      {children}
    </>
  );
}