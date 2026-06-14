import { NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient } from "@/utils/supabase/server"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const session = await stripe.checkout.sessions.create({
            mode: "subscription",
            line_items: [
                {
                    price: process.env.STRIPE_PRO_PRICE_ID!,
                    quantity: 1,
                },
            ],
            customer_email: user.email,
            client_reference_id: user.id,
            success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/documents`,
            cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/upgrade`,
        })

        if (!session.url) {
            return NextResponse.json({ error: "Could not create checkout session" }, { status: 500 })
        }

        return NextResponse.json({ url: session.url })

    } catch (error: any) {
        console.error("Stripe checkout error:", error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}