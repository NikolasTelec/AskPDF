import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import { createAdminClient } from "@/utils/supabase/admin"
import { getUserPlan } from "@/utils/getUserPlan"
import { PLAN_LIMITS } from "@/utils/planLimits"

export async function DELETE(req: Request) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const { documentId } = await req.json()

        if (!documentId) {
            return NextResponse.json({ error: "Missing documentId" }, { status: 400 })
        }

        const plan = await getUserPlan(user.id)

        if (!PLAN_LIMITS[plan].canDelete) {
            return NextResponse.json(
                { error: "Deleting documents requires a Pro plan." },
                { status: 403 }
            )
        }

        const admin = createAdminClient()

        // Verifies that the document belongs to this user
        const { data: doc, error: fetchError } = await admin
            .from("documents")
            .select("file_url")
            .eq("id", documentId)
            .eq("user_id", user.id)
            .single()

        if (fetchError || !doc) {
            return NextResponse.json({ error: "Document not found" }, { status: 404 })
        }

        // Delete file from storage
        const filePath = doc.file_url.split("/pdfs/")[1]
        if (filePath) {
            await admin.storage.from("pdfs").remove([decodeURIComponent(filePath)])
        }

        // Deletes from DB — messages are deleted automatically via ON DELETE CASCADE
        const { error: deleteError } = await admin
            .from("documents")
            .delete()
            .eq("id", documentId)
            .eq("user_id", user.id)

        if (deleteError) throw deleteError

        return NextResponse.json({ success: true })

    } catch (error: any) {
        console.error("Document delete error:", error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}