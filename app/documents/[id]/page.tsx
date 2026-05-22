"use client"

import { ArrowLeftIcon, ArrowRightIcon, ChatBubbleLeftIcon, DocumentIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useState, use } from "react";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default function DocumentPage({ params }: PageProps) {
    const { id } = use(params);
    const [activeTab, setActiveTab] = useState<'chat' | 'pdf'>('chat');

    return (
        <>
            {/* Main container */}
            <div className="w-full h-[calc(100vh-72px)] bg-[#F8F7FF] flex flex-col md:flex-row overflow-hidden">

                {/* Mobile buttons chat / pdf */}
                <div className="md:hidden w-full flex justify-center py-4 bg-[#F8F7FF] border-b border-slate-100 shrink-0">
                    <div className="flex bg-white border border-[#4F46E5]/30 rounded-full p-1 shadow-sm">

                        {/* Chat button */}
                        <button
                            type="button"
                            onClick={() => setActiveTab('chat')}
                            className={`flex items-center justify-center px-6 py-2 rounded-full transition cursor-pointer ${activeTab === 'chat'
                                    ? 'bg-[#4F46E5] text-white shadow-sm'
                                    : 'text-[#4F46E5] hover:bg-slate-50'
                                }`}
                        >
                            <ChatBubbleLeftIcon className="h-5 w-5" />
                        </button>

                        {/* PDF button */}
                        <button
                            type="button"
                            onClick={() => setActiveTab('pdf')}
                            className={`flex items-center justify-center px-6 py-2 rounded-full transition cursor-pointer ${activeTab === 'pdf'
                                    ? 'bg-[#4F46E5] text-white shadow-sm'
                                    : 'text-[#4F46E5] hover:bg-slate-50'
                                }`}
                        >
                            <DocumentIcon className="h-5 w-5" />
                        </button>

                    </div>
                </div>

                {/* --- Left side (pdf) --- */}
                <div className={`${activeTab === "pdf" ? "flex" : "hidden md:flex"} w-full md:w-1/2 h-full p-6 flex-col items-center min-h-0`}>

                    {/* PDF Container */}
                    <div className="w-full max-w-4xl grow bg-white rounded-lg border border-slate-100 shadow-sm overflow-auto">
                        <div className="p-4">
                            {/* PDF content placeholder */}
                            <div className="h-[1000px] bg-slate-50 border-2 border-dashed border-slate-200 rounded flex items-center justify-center text-slate-400">
                                PDF content area
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="w-full max-w-4xl flex items-center justify-between mt-6 shrink-0">
                        <button
                            type="button"
                            className="h-14 flex items-center gap-2 text-sm text-slate-700 bg-white border border-slate-200 px-4 py-2 rounded-lg shadow-sm hover:bg-violet-50 transition cursor-pointer"
                        >
                            <ArrowLeftIcon className="h-4 w-4" />
                            Previous
                        </button>

                        <div className="h-14 flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-lg shadow-sm text-sm text-slate-900 font-medium">
                            <span className="text-slate-400">15</span>
                            <span className="text-slate-400">of</span>
                            <span className="text-slate-400">23</span>
                        </div>

                        <button
                            type="button"
                            className="h-14 flex items-center gap-2 text-sm text-slate-700 bg-white border border-slate-200 px-4 py-2 rounded-lg shadow-sm hover:bg-violet-50 transition cursor-pointer"
                        >
                            Next
                            <ArrowRightIcon className="h-4 w-4" />
                        </button>
                    </div>
                </div>


                {/* --- Right side (chat) --- */}
                <div className={`${activeTab === "chat" ? "flex" : "hidden md:flex"} w-full md:w-1/2 h-full bg-[#F8F7FF] md:bg-[#EBE9FF]/50 flex-col min-h-0`}>

                    {/* Chat area */}
                    <div className="grow px-7 pt-10 space-y-8 overflow-y-auto">

                        {/* User message */}
                        <div className="flex justify-end">
                            <div className="max-w-[80%] bg-[#4F46E5] text-white text-sm px-5 py-3.5 rounded-lg shadow-sm">
                                <p>How old was the character in this document?</p>
                            </div>
                        </div>

                        {/* AI answer */}
                        <div className="flex justify-start">
                            <div className="max-w-[80%] bg-white text-slate-900 text-sm px-6 py-5 rounded-lg shadow-sm border border-slate-100 space-y-4">
                                <p>
                                    So by colonel hearted ferrars. Draw from upon here gone add one.
                                    He in sportsman household otherwise it perceived instantly.
                                    Is inquiry no he several excited am.So by colonel hearted ferrars. Draw from upon here gone add one.
                                    He in sportsman household otherwise it perceived instantly.
                                </p>
                                <p>
                                    Called though excuse length ye needed it he having. Whatever throwing
                                    we on resolved entrance together graceful. Mrs assured add private
                                    married removed believe did she.
                                </p>
                            </div>
                        </div>

                        {/* User message */}
                        <div className="flex justify-end">
                            <div className="max-w-[80%] bg-[#4F46E5] text-white text-sm px-5 py-3.5 rounded-lg shadow-sm">
                                <p>How old was the character in this document?</p>
                            </div>
                        </div>

                        {/* Generating answer */}
                        <div className="flex justify-start">
                            <div className="bg-white/70 text-slate-500 text-sm italic px-5 py-3 rounded-lg border border-slate-100 animate-pulse">
                                Generating answer...
                            </div>
                        </div>
                    </div>

                    {/* Input chat */}
                    <div className="w-full p-6 shrink-0">
                        <form className="max-w-7xl mx-auto w-full relative">
                            <input
                                type="text"
                                placeholder="Ask a Question..."
                                className="w-full h-14 bg-white rounded-xl border border-slate-100 shadow-sm px-6 pr-16 text-sm text-slate-900 placeholder:text-slate-400 focus:ring-1 focus:ring-[#4F46E5] focus:border-[#4F46E5] transition outline-none"
                            />
                            <button
                                type="submit"
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 -mr-1 rounded-lg text-slate-700 hover:bg-violet-50 transition cursor-pointer"
                            >
                                <PaperAirplaneIcon className="h-6 w-6" />
                            </button>
                        </form>
                    </div>

                </div>

            </div>
        </>
    );
}