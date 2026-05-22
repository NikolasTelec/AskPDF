"use client"

import { triggerFileUpload } from "@/components/PdfUpload";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const page = () => {

    // Simulation of added documents
    const documents = [
        { id: 1, title: "" },
        { id: 2, title: "" },
        { id: 3, title: "" },
        { id: 4, title: "" },
        { id: 5, title: "" },
        { id: 6, title: "" },
    ];

    // Delete document function
    const handleDelete = (e: React.MouseEvent, docId: number) => {
        e.preventDefault();
        e.stopPropagation(); // Prevents user to miss click
        
        console.log("Mažu dokument s ID:", docId);
        // Will add database logic soon
    };

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

                        {/* Documents */}
                        {documents.map((doc) => (

                            <div key={doc.id} className="relative group aspect-3/4 w-full">
                                
                                <Link
                                    href={`/documents/${doc.id}`}
                                    className="block w-full h-full bg-[#F1F0FF] rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition cursor-pointer"
                                >
                                    {/* Will add PDF thumbnail soon */}
                                </Link>

                                {/* Delete button (permanently shows only in mobile view) */}
                                <button
                                    type="button"
                                    onClick={(e) => handleDelete(e, doc.id)}
                                    className="absolute bottom-3 right-3 p-2 bg-white text-slate-500 hover:text-red-500 rounded-lg shadow-sm hover:shadow border border-slate-100 transition cursor-pointer md:opacity-0 group-hover:opacity-100"
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