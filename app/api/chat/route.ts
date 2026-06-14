import { NextResponse } from "next/server";

interface ChatMessage {
    id: string
    role: "user" | "model"
    content: string
    created_at: string
}

export async function POST(req: Request) {
    try {
        const { fileUrl, message, history } = await req.json();

        if (!fileUrl || !message) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Get file from supabase storage
        const response = await fetch(fileUrl);
        const arrayBuffer = await response.arrayBuffer(); // converts pdf file to raw binary data
        const base64Pdf = Buffer.from(arrayBuffer).toString("base64"); // converts binary data to Base64 (this text can AI read)

        // Format chat history for Gemini API
        // Gemini wants: "user" and "model" specifically
        const contents = history.map((msg: ChatMessage) => ({
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: msg.content }]          
        }));
        
        contents.push({
            role: "user",
            parts: [
                {
                    inlineData: {
                        mimeType: "application/pdf",
                        data: base64Pdf
                    }
                },
                { text: message }
            ]
        });

        // Gemini API
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
        }
        const geminiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

        const geminiResponse = await fetch(geminiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents })
        });

        const data = await geminiResponse.json();

        // Error handling
        if (!geminiResponse.ok) {
            console.error(JSON.stringify(data, null, 2));
            return NextResponse.json({ answer: `Google API Error: ${data.error?.message || "Unknown error"}` });
        }

        // Gemini answer
        const aiAnswer = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't process the document.";

        // Returning answer to frontend
        return NextResponse.json({ answer: aiAnswer });

    } catch (error: any) {
        console.error("Gemini API Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}