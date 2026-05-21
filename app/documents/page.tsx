"use client"

import { triggerFileUpload } from "@/components/PdfUpload";
import { PlusIcon } from "@heroicons/react/24/outline";

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
                            <div
                                key={doc.id}
                                className="aspect-3/4 w-full bg-[#F1F0FF] rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition cursor-pointer"
                            >
                                {/* Will add PDF thumbnail soon */}
                            </div>
                        ))}

                    </div>

                </div>
            </div>
        </>
    )
}

export default page