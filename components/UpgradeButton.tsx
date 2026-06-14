"use client"

import { useState } from "react"
import { toast } from "sonner"

export default function UpgradeButton() {
    const [isLoading, setIsLoading] = useState(false)

    const handleUpgrade = async () => {
        setIsLoading(true)

        try {
            const response = await fetch("/api/stripe/checkout", {
                method: "POST",
            })

            const data = await response.json()
            if (!response.ok) throw new Error(data.error || "Something went wrong")

            window.location.href = data.url

        } catch (error: any) {
            toast.error(error.message)
            setIsLoading(false)
        }
    }

    return (
        <button
            type="button"
            onClick={handleUpgrade}
            disabled={isLoading}
            className="w-full bg-[#4F46E5] hover:bg-[#6159ED] text-white font-semibold text-xs md:text-sm py-3 px-4 rounded-lg shadow-sm cursor-pointer transition text-center disabled:opacity-60"
        >
            {isLoading ? "Redirecting..." : "Upgrade to Pro"}
        </button>
    )
}