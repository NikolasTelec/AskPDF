
import { CheckIcon } from "@heroicons/react/24/outline"

const page = () => {
    return (
        <div className="min-h-screen md:max-h-screen w-full bg-white flex flex-col items-center justify-center px-4 py-10 md:py-24">

            {/* Header */}
            <div className="max-w-3xl text-center mb-7 md:mb-16 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#4F46E5]">
                    Upgrade
                </span>
                <h1 className="text-3xl md:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
                    Supercharge your Document Companion
                </h1>
                <p className="text-sm md:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
                    Choose an affordable plan that&apos;s packed with the best features for
                    interacting with your PDFs, enhancing productivity, and streamlining your workflow.
                </p>
            </div>

            {/* Plans */}
            <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 md:gap-16 items-top px-2">

                {/* Starter plan */}
                <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 md:p-8 flex flex-col justify-between shadow-lg relative transform md:scale-105">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h3 className="text-lg font-bold text-slate-950">Starter Plan</h3>
                            <p className="text-xs text-slate-500">Explore Core Features at No Cost</p>
                        </div>

                        <div className="mb-2 text-2xl md:text-3xl font-extrabold text-slate-950">
                            Free
                        </div>

                        {/* List */}
                        <ul className="space-y-4 pt-4">
                            <li className="flex items-start gap-3 text-sm text-slate-600 font-medium">
                                <CheckIcon className="h-5 w-5 text-[#4F46E5] stroke-3 shrink-0" />
                                2 Documents
                            </li>
                            <li className="flex items-start gap-3 text-sm text-slate-600 font-medium">
                                <CheckIcon className="h-5 w-5 text-[#4F46E5] stroke-3 shrink-0" />
                                Up to 3 messages per document
                            </li>
                            <li className="flex items-start gap-3 text-sm text-slate-600 font-medium">
                                <CheckIcon className="h-5 w-5 text-[#4F46E5] stroke-3 shrink-0" />
                                Try out the AI Chat Functionality
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Pro plan */}
                <div className="bg-white rounded-2xl border-2 border-[#4F46E5] p-6 md:p-8 flex flex-col justify-between h-full min-h-[460px] shadow-lg relative transform md:scale-105">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h3 className="text-lg font-bold text-[#4F46E5]">Pro Plan</h3>
                            <p className="text-xs text-slate-500">Maximize Productivity with PRO Features</p>
                        </div>

                        <div className="flex items-baseline text-slate-950 gap-1">
                            <span className="text-2xl md:text-3xl font-extrabold">$5.99</span>
                            <span className="text-xs text-slate-500 font-medium">/ month</span>
                        </div>

                        {/* Upgrade button */}
                        <button
                            type="button"
                            className="w-full bg-[#4F46E5] hover:bg-[#6159ED] text-white font-semibold text-xs md:text-sm py-3 px-4 rounded-lg shadow-sm cursor-pointer transition text-center"
                        >
                            Upgrade to Pro
                        </button>

                        {/* List */}
                        <ul className="space-y-4 pt-2">
                            <li className="flex items-start gap-3 text-sm text-slate-600 font-medium">
                                <CheckIcon className="h-5 w-5 text-[#4F46E5] stroke-3 shrink-0" />
                                Store up to 20 Documents
                            </li>
                            <li className="flex items-start gap-3 text-sm text-slate-600 font-medium">
                                <CheckIcon className="h-5 w-5 text-[#4F46E5] stroke-3 shrink-0" />
                                Ability to Delete Documents
                            </li>
                            <li className="flex items-start gap-3 text-sm text-slate-600 font-medium">
                                <CheckIcon className="h-5 w-5 text-[#4F46E5] stroke-3 shrink-0" />
                                Up to 100 messages per document
                            </li>
                            <li className="flex items-start gap-3 text-sm text-slate-600 font-medium">
                                <CheckIcon className="h-5 w-5 text-[#4F46E5] stroke-3 shrink-0" />
                                Full Power AI Chat Functionality with Memory Recall
                            </li>
                            <li className="flex items-start gap-3 text-sm text-slate-600 font-medium">
                                <CheckIcon className="h-5 w-5 text-[#4F46E5] stroke-3 shrink-0" />
                                Advanced analytics
                            </li>
                            <li className="flex items-start gap-3 text-sm text-slate-600 font-medium">
                                <CheckIcon className="h-5 w-5 text-[#4F46E5] stroke-3 shrink-0" />
                                24-hour support response time
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
            
        </div>
    )
}

export default page