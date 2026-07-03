"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"

export default function UpgradeButton() {
    const [isLoading, setIsLoading] = useState(false)
    const [isPlanLoading, setIsPlanLoading] = useState(true)
    const [isPro, setIsPro] = useState(false)

    useEffect(() => {
        fetch("/api/user/plan")
            .then((res) => res.json())
            .then((data) => setIsPro(data.isPro === true))
            .catch(() => setIsPro(false))
            .finally(() => setIsPlanLoading(false))
    }, [])

    // bfcache fix
    useEffect(() => {
        const handlePageShow = (e: PageTransitionEvent) => {
            if (e.persisted) setIsLoading(false)
        }
        window.addEventListener("pageshow", handlePageShow)
        return () => window.removeEventListener("pageshow", handlePageShow)
    }, [])

    const handleClick = async () => {
        setIsLoading(true)

        try {
            const endpoint = isPro ? "/api/stripe/portal" : "/api/stripe/checkout"
            const response = await fetch(endpoint, { method: "POST" })
            const data = await response.json()

            if (!response.ok) throw new Error(data.error || "Something went wrong")

            window.location.href = data.url
        } catch (error: any) {
            toast.error(error.message)
            setIsLoading(false)
        }
    }

    const label = isPlanLoading
        ? "Loading..."
        : isLoading
            ? "Redirecting..."
            : isPro
                ? "Cancel subscription"
                : "Upgrade to Pro"

    return (
        <button
            type="button"
            onClick={handleClick}
            disabled={isPlanLoading || isLoading}
            className={`w-full font-semibold text-xs md:text-sm py-3 px-4 rounded-lg shadow-sm cursor-pointer transition text-center disabled:opacity-60 ${isPlanLoading
                ? "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
                : isPro
                    ? "bg-white border border-[#6159ED] text-[#4F46E5] hover:bg-violet-50"
                    : "bg-[#4F46E5] text-white"
                }`}
        >
            {label}
        </button>
    )
}