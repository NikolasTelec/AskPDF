"use client"

import Link from 'next/link'
import Image from "next/image";
import { useState, type SubmitEvent } from 'react';

const page = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSignUp = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            // Loading logic will be added soon
            await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulation of loading for 5s
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-white md:bg-slate-50 flex flex-col items-center justify-center px-0 md:px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-none md:shadow-xl border-none md:border border-slate-100 p-4 md:p-10">

                {/* Header */}
                <h1 className="text-2xl font-bold text-left md:text-center text-slate-900 mb-8">
                    Sign up to <span className="text-[#4F46E5]">AskPDF</span>
                </h1>

                {/* Form */}
                <form className="space-y-5" onSubmit={handleSignUp}>

                    {/* Email input */}
                    <div className="space-y-1.5">
                        <label htmlFor="email" className="text-xs font-medium text-slate-700 block">
                            Email address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            autoComplete="email"
                            required
                            className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition"
                        />
                    </div>

                    {/* Password input */}
                    <div className="space-y-1.5">
                        <label htmlFor="password" className="text-xs font-medium text-slate-700 block">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            autoComplete="current-password"
                            required
                            className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition"
                        />
                    </div>

                    {/* Sign up button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex align-center justify-center w-full min-h-10 bg-[#4F46E5] hover:bg-[#6159ED] text-white font-semibold text-base py-2 px-4 rounded-lg shadow-sm cursor-pointer transition mt-2 text-center disabled:bg-[#818CF8] disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <>
                                {/* Spinning SVG (Tailwind animate-spin) */}
                                <svg className="mt-0.5 animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                            </>
                        ) : (
                            "Sign up"
                        )}
                    </button>
                </form>

                {/* "Or continue with" */}
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-slate-200"></div>
                    </div>
                    <div className="relative flex justify-center text-xs font-medium uppercase">
                        <span className="bg-white px-3 text-slate-400 lowercase first-letter:uppercase">
                            Or continue with
                        </span>
                    </div>
                </div>

                {/* Google button */}
                <button
                    type="button"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-300 rounded-lg bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 cursor-pointer shadow-sm transition"
                >
                    <Image src="/google_icon.png" alt="crown" className="w-4 h-4 ml-1" width={16} height={16} />
                    Google
                </button>

            </div>

            {/* Already have an account? */}
            <p className="mt-6 text-sm text-slate-600 text-center">
                Already have an account?{" "}
                <Link href="/signin" className="font-semibold text-[#4F46E5] hover:underline">
                    Sign in
                </Link>
            </p>

        </div>
    )
}

export default page