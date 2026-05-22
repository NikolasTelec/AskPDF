"use client"

import { useState } from "react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";

interface GoogleSignInProps {
    onAuthError: (message: string) => void;
}

export const GoogleSignIn = ({ onAuthError }: GoogleSignInProps) => {
    const [isLoading, setIsGoogleLoading] = useState(false);
    const supabase = createClient();

    const handleGoogleSignIn = async () => {
        setIsGoogleLoading(true);
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/documents`,
                },
            });

            if (error) {
                onAuthError(error.message);
            }
        } catch (error) {
            console.error(error);
            onAuthError("Google login failed. Please try again.");
        } finally {
            setIsGoogleLoading(false);
        }
    };

    return (
        <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-300 rounded-lg bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 cursor-pointer shadow-sm transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
            {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
            ) : (
                <>
                    <Image src="/google_icon.png" alt="Google" className="w-4 h-4 ml-1" width={16} height={16} />
                    Google
                </>
            )}
        </button>
    );
};