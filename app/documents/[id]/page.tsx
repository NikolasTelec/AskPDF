"use client"

import { ChatBubbleLeftIcon, DocumentIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useState, useEffect, useRef, type SubmitEvent } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import dynamic from "next/dynamic";

// Dynamic import, SSR turned off (fix ReferenceError: DOMMatrix is not defined)
const PdfViewerPanel = dynamic(() => import("@/components/PdfViewer"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex items-center justify-center text-slate-400 animate-pulse">
            Inicializuji prohlížeč PDF...
        </div>
    )
});

export default function DocumentPage() {
    const params = useParams();
    const docId = params.id as string;
    const supabase = createClient();

    const [activeTab, setActiveTab] = useState<'chat' | 'pdf'>('chat');
    const [documentData, setDocumentData] = useState<any>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [inputMessage, setInputMessage] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);

    const chatEndRef = useRef<HTMLDivElement>(null);

    // Autoscroll to bottom in chat
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isGenerating]);

    // Načtení informací o dokumentu a historie chatu z DB
    useEffect(() => {
        if (!docId) return;

        const fetchData = async () => {
            try {
                // Load document
                const { data: doc, error: docErr } = await supabase
                    .from("documents")
                    .select("*")
                    .eq("id", docId)
                    .single();

                if (docErr) throw docErr;
                setDocumentData(doc);

                // Load chat history
                const { data: msgs, error: msgErr } = await supabase
                    .from("messages")
                    .select("*")
                    .eq("document_id", docId)
                    .order("created_at", { ascending: true });

                if (msgErr) throw msgErr;
                setMessages(msgs || []);
            } catch (error: any) {
                console.error(error.message);
                toast.error("Failed to load document data.");
            }
        };

        fetchData();
    }, [docId, supabase]);

    // Send message 
    const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!inputMessage.trim() || !documentData || isGenerating) return

        const userText = inputMessage
        setInputMessage("")
        setIsGenerating(true)

        const tempUserMsg = {
            id: `temp-${Date.now()}`,
            role: "user",
            content: userText,
            created_at: new Date().toISOString()
        }
        setMessages((prev) => [...prev, tempUserMsg])

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fileUrl: documentData.file_url,
                    message: userText,
                    history: messages,
                    documentId: docId
                })
            })

            const chatData = await response.json()

            if (response.status === 403) {
                toast.warning(chatData.error || "You have reached your message limit.", {
                    duration: 6000,
                    action: {
                        label: "Upgrade to Pro",
                        onClick: () => {
                            window.location.href = "/upgrade";
                        },
                    },
                });

                setInputMessage(userText);
                setMessages((prev) => prev.filter((msg) => msg.id !== tempUserMsg.id));
                return;
            }

            if (!response.ok) throw new Error(chatData.error || "AI Generation failed")

            setMessages((prev) => [
                ...prev.filter((msg) => msg.id !== tempUserMsg.id),
                chatData.userMsg,
                chatData.aiMsg
            ])

        } catch (error: any) {
            console.error(error)
            toast.error(error.message || "Something went wrong.")
            setInputMessage(userText);
            setMessages((prev) => prev.filter((msg) => msg.id !== tempUserMsg.id))
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <div className="w-full h-[calc(100vh-72px)] bg-[#F8F7FF] flex flex-col md:flex-row overflow-hidden">

            {/* Mobile buttons chat / pdf */}
            <div className="md:hidden w-full flex justify-center py-4 bg-[#F8F7FF] border-b border-slate-100 shrink-0">
                <div className="flex bg-white border border-[#4F46E5]/30 rounded-full p-1 shadow-sm">
                    <button
                        type="button"
                        onClick={() => setActiveTab('chat')}
                        className={`flex items-center justify-center px-6 py-2 rounded-full transition cursor-pointer ${activeTab === 'chat' ? 'bg-[#4F46E5] text-white shadow-sm' : 'text-[#4F46E5] hover:bg-slate-50'}`}
                    >
                        <ChatBubbleLeftIcon className="h-5 w-5" />
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('pdf')}
                        className={`flex items-center justify-center px-6 py-2 rounded-full transition cursor-pointer ${activeTab === 'pdf' ? 'bg-[#4F46E5] text-white shadow-sm' : 'text-[#4F46E5] hover:bg-slate-50'}`}
                    >
                        <DocumentIcon className="h-5 w-5" />
                    </button>
                </div>
            </div>

            {/* Left side (PDF Viewer) */}
            <div className={`${activeTab === "pdf" ? "flex" : "hidden md:flex"} w-full md:w-1/2 h-full p-6 flex-col items-center min-h-0`}>
                <PdfViewerPanel documentData={documentData} />
            </div>

            {/* Right side (Chat Area) */}
            <div className={`${activeTab === "chat" ? "flex" : "hidden md:flex"} w-full md:w-1/2 h-full bg-[#F8F7FF] md:bg-[#EBE9FF]/50 flex-col min-h-0`}>

                {/* Chat area */}
                <div className="grow px-7 pt-10 space-y-8 overflow-y-auto">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                            <div className={`max-w-[80%] text-sm px-5 py-3.5 rounded-lg shadow-sm ${msg.role === "user"
                                    ? "bg-[#4F46E5] text-white"
                                    : "bg-white text-slate-900 border border-slate-100 leading-relaxed"
                                }`}>
                                <p className="whitespace-pre-wrap">{msg.content}</p>
                            </div>
                        </div>
                    ))}

                    {/* Generating answer */}
                    {isGenerating && (
                        <div className="flex justify-start">
                            <div className="bg-white/70 text-slate-500 text-sm italic px-5 py-3 rounded-lg border border-slate-100 animate-pulse">
                                Generating answer...
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>

                {/* Input chat */}
                <div className="w-full p-6 shrink-0">
                    <form onSubmit={handleSendMessage} className="max-w-7xl mx-auto w-full relative">
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            placeholder="Ask a Question..."
                            disabled={isGenerating}
                            className="w-full h-14 bg-white rounded-xl border border-slate-100 shadow-sm px-6 pr-16 text-sm text-slate-900 placeholder:text-slate-400 focus:ring-1 focus:ring-[#4F46E5] focus:border-[#4F46E5] transition outline-none disabled:bg-slate-50"
                        />
                        <button
                            type="submit"
                            disabled={isGenerating || !inputMessage.trim()}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 -mr-1 rounded-lg text-slate-700 hover:bg-violet-50 transition cursor-pointer disabled:opacity-30 disabled:hover:bg-transparent"
                        >
                            <PaperAirplaneIcon className="h-6 w-6" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}