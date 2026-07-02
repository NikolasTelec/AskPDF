import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import { getUserPlan } from "@/utils/getUserPlan"

export async function GET() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const plan = await getUserPlan(user.id)

    return NextResponse.json({
        plan,
        isPro: plan === "pro",
    })
}