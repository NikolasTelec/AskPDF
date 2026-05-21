import Link from "next/link"

const LandingPageButtons = () => {
    return (
        <div className="mt-10 flex justify-center gap-4">
            <Link
                href="/signup"
                className="flex items-center justify-center rounded-md bg-[#4F46E5] shadow-lg text-sm md:text-lg font-semibold border border-[#4F46E5] text-white px-5 py-2 cursor-pointer hover:bg-[#6159ED]">
                Get Started
            </Link>
            <Link
                href="/signin"
                className="flex items-center justify-center rounded-md text-[#4F46E5] shadow-lg text-sm md:text-lg font-semibold border border-[#4F46E5] px-5 py-2 cursor-pointer hover:bg-violet-50">
                Sign in
            </Link>
        </div>
    )
}

export default LandingPageButtons