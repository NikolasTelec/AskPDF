import { createAdminClient } from "@/utils/supabase/admin"
import type { Plan } from "./planLimits"

export async function getUserPlan(userId: string): Promise<Plan> {
    const supabase = createAdminClient()

    const { data } = await supabase
        .from("subscriptions")
        .select("plan, status")
        .eq("user_id", userId)
        .single()

    if (data?.plan === "pro" && data?.status === "active") {
        return "pro"
    }

    return "free"
}