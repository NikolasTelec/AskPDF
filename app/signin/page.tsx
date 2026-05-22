"use client"

import Link from 'next/link'
import { useState } from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { GoogleSignIn } from '@/components/auth/GoogleSignIn';
import { SignIn } from '@/components/auth/SignIn';

const page = () => {

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    return (
        <div className="min-h-screen w-full bg-white md:bg-slate-50 flex flex-col items-center justify-center px-0 md:px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-none md:shadow-xl border-none md:border border-slate-100 p-4 md:p-10">

                {/* Header */}
                <h1 className="text-2xl font-bold text-left md:text-center text-slate-900 mb-8">
                    Sign in to <span className="text-[#4F46E5]">AskPDF</span>
                </h1>

                {/* Error message */}
                {errorMessage && (
                    <div className="mb-5 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg font-medium flex items-center gap-2">
                        <InformationCircleIcon className='h-5 w-5' />
                        {errorMessage}
                    </div>
                )}

                {/* Form */}
                <SignIn onAuthError={(msg) => setErrorMessage(msg)} />

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
                <GoogleSignIn onAuthError={(msg) => setErrorMessage(msg)} />

            </div>

            {/* Don't have an account? */}
            <p className="mt-6 text-sm text-slate-600 text-center">
                Don't have an account?{" "}
                <Link href="/signup" className="font-semibold text-[#4F46E5] hover:underline">
                    Sign up
                </Link>
            </p>

        </div>
    )
}

export default page