"use client"

import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

// Nastavení workeru pro react-pdf z CDN
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PdfViewer({ documentData }: { documentData: any }) {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState<number>(1);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
        setPageNumber(1);
    };

    return (
        <div className="flex w-full h-full flex-col items-center min-h-0">
            {/* PDF Container */}
            <div className="w-full max-w-4xl grow bg-white rounded-lg border border-slate-100 shadow-sm overflow-auto flex justify-start md:justify-center items-start p-4">
                {documentData?.file_url ? (
                    <Document
                        file={documentData.file_url}
                        onLoadSuccess={onDocumentLoadSuccess}
                        loading={null}
                        error={
                            <div className="text-red-500 text-sm">
                                Failed to load PDF.
                            </div>
                        }
                    >
                        <Page
                            pageNumber={pageNumber}
                            renderTextLayer={true}
                            renderAnnotationLayer={false}
                            className="shadow-md"
                        />
                    </Document>
                ) : null }
            </div>

            {/* Navigation */}
            <div className="w-full max-w-4xl flex items-center justify-between mt-6 shrink-0">
                <button
                    type="button"
                    disabled={pageNumber <= 1}
                    onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}
                    className="h-14 flex items-center gap-2 text-sm text-slate-700 bg-white border border-slate-200 px-4 py-2 rounded-lg shadow-sm hover:bg-violet-50 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ArrowLeftIcon className="h-4 w-4" />
                    Previous
                </button>

                <div className="h-14 flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-lg shadow-sm text-sm text-slate-900 font-medium">
                    <span className="text-slate-900">{pageNumber}</span>
                    <span className="text-slate-400">of</span>
                    <span className="text-slate-400">{numPages || "..."}</span>
                </div>

                <button
                    type="button"
                    disabled={numPages !== null && pageNumber >= numPages}
                    onClick={() => setPageNumber(prev => Math.min(prev + 1, numPages || prev))}
                    className="h-14 flex items-center gap-2 text-sm text-slate-700 bg-white border border-slate-200 px-4 py-2 rounded-lg shadow-sm hover:bg-violet-50 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next
                    <ArrowRightIcon className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}