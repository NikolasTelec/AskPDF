import { NextResponse } from "next/server"
import Stripe from "stripe"
import { createAdminClient } from "@/utils/supabase/admin"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: Request) {
    // Stripe verifies the signature against the exact raw body — req.json()
    const body = await req.text()
    const signature = req.headers.get("stripe-signature")

    if (!signature) {
        return NextResponse.json({ error: "Missing signature" }, { status: 400 })
    }

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (error: any) {
        console.error("Webhook signature verification failed:", error.message)
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    const supabase = createAdminClient()

    try {
        switch (event.type) {
            case "checkout.session.completed": {
                const session = event.data.object as Stripe.Checkout.Session
                const userId = session.client_reference_id

                if (!userId) break

                await supabase
                    .from("subscriptions")
                    .upsert({
                        user_id: userId,
                        stripe_customer_id: session.customer as string,
                        stripe_subscription_id: session.subscription as string,
                        plan: "pro",
                        status: "active",
                    }, { onConflict: "user_id" })

                break
            }

            case "customer.subscription.updated": {
                const subscription = event.data.object as Stripe.Subscription

                await supabase
                    .from("subscriptions")
                    .update({ status: subscription.status })
                    .eq("stripe_subscription_id", subscription.id)

                break
            }

            case "customer.subscription.deleted": {
                const subscription = event.data.object as Stripe.Subscription

                await supabase
                    .from("subscriptions")
                    .update({ plan: "free", status: "canceled" })
                    .eq("stripe_subscription_id", subscription.id)

                break
            }
        }
    } catch (error: any) {
        console.error("Webhook handler error:", error)
        return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
    }

    return NextResponse.json({ received: true })
}