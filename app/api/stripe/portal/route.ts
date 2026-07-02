import { NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient } from "@/utils/supabase/server"
import { createAdminClient } from "@/utils/supabase/admin"
import { getUserPlan } from "@/utils/getUserPlan"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const plan = await getUserPlan(user.id)
    if (plan !== "pro") {
        return NextResponse.json({ error: "No active subscription" }, { status: 403 })
    }

    const admin = createAdminClient()
    const { data: subscription, error } = await admin
        .from("subscriptions")
        .select("stripe_customer_id")
        .eq("user_id", user.id)
        .single()

    if (error || !subscription?.stripe_customer_id) {
        return NextResponse.json({ error: "Subscription not found" }, { status: 404 })
    }

    const session = await stripe.billingPortal.sessions.create({
        customer: subscription.stripe_customer_id,
        return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/documents`,
    })

    return NextResponse.json({ url: session.url })
}