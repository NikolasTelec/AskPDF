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
        const { file_url } = await req.json()

        if (!file_url) {
            return NextResponse.json({ error: "Missing file_url" }, { status: 400 })
        }

        const plan = await getUserPlan(user.id)
        const limit = PLAN_LIMITS[plan].documents

        const admin = createAdminClient()

        const { count, error: countError } = await admin
            .from("documents")
            .select("*", { count: "exact", head: true })
            .eq("user_id", user.id)

        if (countError) throw countError

        if ((count ?? 0) >= limit) {
            return NextResponse.json(
                { error: `Document limit reached. ${plan === "free" ? "Upgrade to Pro to store up to 20 documents." : "You have reached the 20 document limit."}` },
                { status: 403 }
            )
        }

        const { data, error } = await admin
            .from("documents")
            .insert({ user_id: user.id, file_url })
            .select()
            .single()

        if (error) throw error

        return NextResponse.json({ document: data })

    } catch (error: any) {
        console.error("Document create error:", error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}