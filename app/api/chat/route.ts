import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import { createAdminClient } from "@/utils/supabase/admin"
import { getUserPlan } from "@/utils/getUserPlan"
import { PLAN_LIMITS } from "@/utils/planLimits"

export async function POST(req: Request) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const { fileUrl, message, history, documentId } = await req.json()

        if (!fileUrl || !message || !documentId) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
        }

        const plan = await getUserPlan(user.id)
        const messageLimit = PLAN_LIMITS[plan].messagesPerDocument
        const admin = createAdminClient()

        // Limit check before saving the message
        const { count, error: countError } = await admin
            .from("messages")
            .select("*", { count: "exact", head: true })
            .eq("document_id", documentId)
            .eq("role", "user")

        if (countError) throw countError

        if ((count ?? 0) >= messageLimit) {
            return NextResponse.json(
                { error: `Message limit reached. ${plan === "free" ? "Upgrade to Pro for up to 100 messages per document." : "You have reached the 100 message limit for this document."}` },
                { status: 403 }
            )
        }

        // Saves the user message only after a successful limit check
        const { data: userMsg, error: userMsgErr } = await admin
            .from("messages")
            .insert({ document_id: documentId, role: "user", content: message })
            .select()
            .single()

        if (userMsgErr) throw userMsgErr

        // Gemini
        const response = await fetch(fileUrl)
        const arrayBuffer = await response.arrayBuffer()
        const base64Pdf = Buffer.from(arrayBuffer).toString("base64")

        const contents = history.map((msg: any) => ({
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: msg.content }]
        }))

        contents.push({
            role: "user",
            parts: [
                { inlineData: { mimeType: "application/pdf", data: base64Pdf } },
                { text: message }
            ]
        })

        const apiKey = process.env.GEMINI_API_KEY
        if (!apiKey) {
            return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 })
        }

        const geminiResponse = await fetch(
            `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ contents })
            }
        )

        const data = await geminiResponse.json()

        if (!geminiResponse.ok) {
            console.error(JSON.stringify(data, null, 2))
            return NextResponse.json(
                { error: `Google API Error: ${data.error?.message || "Unknown error"}` },
                { status: 500 }
            )
        }

        const aiAnswer = data.candidates?.[0]?.content?.parts?.[0]?.text
            ?? "I'm sorry, I couldn't process the document."

        // Saves AI answer
        const { data: aiMsg, error: aiMsgErr } = await admin
            .from("messages")
            .insert({ document_id: documentId, role: "model", content: aiAnswer })
            .select()
            .single()

        if (aiMsgErr) throw aiMsgErr

        // Returns both messages to the client
        return NextResponse.json({ userMsg, aiMsg })

    } catch (error: any) {
        console.error("Chat API error:", error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}