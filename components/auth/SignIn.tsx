"use client"

import { useState, type SubmitEvent } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

interface SignInProps {
    onAuthError: (message: string) => void;
}

export const SignIn = ({ onAuthError }: SignInProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const supabase = createClient();
    const router = useRouter();

    const handleSignIn = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        onAuthError("");

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                onAuthError("Wrong email or password.");
                return;
            }

            if (data?.user) {
                router.push('/documents');
            }

        } catch (error) {
            console.error(error);
            onAuthError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className="space-y-5" onSubmit={handleSignIn}>
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

            {/* Sign in button */}
            <button
                type="submit"
                disabled={isLoading}
                className="flex items-center justify-center w-full min-h-10 bg-[#4F46E5] hover:bg-[#6159ED] text-white font-semibold text-base py-2 px-4 rounded-lg shadow-sm cursor-pointer transition mt-2 text-center disabled:bg-[#818CF8] disabled:cursor-not-allowed"
            >
                {isLoading ? (
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                ) : (
                    "Sign in"
                )}
            </button>
        </form>
    );
};