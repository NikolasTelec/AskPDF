"use client"

import { triggerFileUpload } from "@/components/PdfUpload";
import { PlusIcon, TrashIcon, DocumentIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";

// Function for pdf name formating
const getFileNameFromUrl = (url: string) => {
    if (!url) return "Document";
    const parts = url.split("/");
    const lastPart = parts[parts.length - 1];
    const nameWithoutTimestamp = lastPart.replace(/^\d+_+/, "");
    return decodeURIComponent(nameWithoutExtension(nameWithoutTimestamp)).replace(/_/g, " ");
};
const nameWithoutExtension = (filename: string) => {
    return filename.substring(0, filename.lastIndexOf(".")) || filename;
};

const page = () => {
    const [documents, setDocuments] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const supabase = createClient();

    // Getting documents from db
    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                setIsLoading(true);

                // Sort from newest
                const { data, error } = await supabase
                    .from("documents")
                    .select("*")
                    .order("created_at", { ascending: false });

                if (error) throw error;

                setDocuments(data || []);
            } catch (error: any) {
                console.error("Error while loading documents:", error.message);
                toast.error("Failed to load documents!");
            } finally {
                setIsLoading(false)
            }
        };

        fetchDocuments();
    }, []);

    // Catch delete from toast
    const handleDelete = (e: React.MouseEvent, docId: string) => {
        e.preventDefault();
        e.stopPropagation();

        toast.warning("Are you sure you want to delete this document?", {
            duration: 5000,
            action: {
                label: "Delete",
                onClick: () => executeDelete(docId),
            },
            actionButtonStyle: {
                backgroundColor: "#ef4444",
                color: "#ffffff",
                borderRadius: "0.5rem",
                fontSize: "12px",
                fontWeight: "600",
                padding: "6px 12px",
                transition: "background-color 0.2s",
            },
        });
    };

    // Real delete from db
    const executeDelete = async (docId: string) => {
        const toastId = toast.loading("Deleting document...");
        try {
            const { error } = await supabase
                .from("documents")
                .delete()
                .eq("id", docId);

            if (error) throw error;

            setDocuments((prev) => prev.filter((doc) => doc.id !== docId));
            toast.success("Document deleted!", { id: toastId });
        } catch (error: any) {
            console.error(error.message);
            toast.error("Failed to delete document!", { id: toastId });
        }
    };

    // Google sign up toast
    useEffect(() => {
        // Checks if user is comming back from google sign in
        const isGoogleLogin = localStorage.getItem("google_login_pending");

        if (isGoogleLogin === "true") {
            toast.success("Successfully signed in with Google!");
            console.log("test");
            localStorage.removeItem("google_login_pending");
        }
    }, []);

    return (
        <>
            <div className="w-full min-h-[calc(100vh-72px)] bg-white px-6 py-10 md:px-12">
                <div className="max-w-7xl mx-auto">

                    {/* Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">

                        {/* Add document button*/}
                        <button
                            type="button"
                            onClick={triggerFileUpload}
                            className="aspect-3/4 w-full bg-[#F1F0FF] rounded-xl border-2 border-dashed border-slate-300 hover:border-[#4F46E5] transition cursor-pointer flex flex-col items-center justify-center p-4 gap-3 group"
                        >
                            <PlusIcon className="h-8 w-8 text-slate-500 group-hover:text-[#4F46E5] transition stroke-[2.5]" />
                            <span className="text-xs font-semibold text-slate-500 group-hover:text-[#4F46E5] transition text-center">
                                Add a document
                            </span>
                        </button>

                        {/* Loading */}
                        {isLoading && (
                            [...Array(4)].map((_, i) => (
                                <div key={i} className="aspect-3/4 w-full bg-slate-50 animate-pulse rounded-xl" />
                            ))
                        )}

                        {/* Documents */}
                        {!isLoading && documents.map((doc) => (
                            <div key={doc.id} className="relative group aspect-3/4 w-full">
                                <Link
                                    href={`/documents/${doc.id}`}
                                    className="flex flex-col justify-between p-4 w-full h-full bg-[#F1F0FF] rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition cursor-pointer"
                                >
                                    {/* Icon */}
                                    <div className="flex-1 flex items-center justify-center">
                                        <DocumentIcon className="h-12 w-12 text-slate-500 group-hover:text-[#4F46E5] opacity-80" />
                                    </div>

                                    {/* File name */}
                                    <p className="text-xs font-medium text-slate-500 text-center truncate mx-3">
                                        {getFileNameFromUrl(doc.file_url)}
                                    </p>
                                </Link>

                                {/* Delete button */}
                                <button
                                    type="button"
                                    onClick={(e) => handleDelete(e, doc.id)}
                                    className="absolute top-3 right-3 p-2 bg-white text-slate-500 hover:text-red-500 rounded-lg shadow-sm hover:shadow border border-slate-100 transition cursor-pointer md:opacity-0 group-hover:opacity-100"
                                    title="Delete document"
                                >
                                    <TrashIcon className="h-5 w-5" />
                                </button>
                            </div>
                        ))}

                    </div>

                </div>
            </div>
        </>
    )
}

export default page