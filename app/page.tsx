import Image from "next/image";
import LandingPageButtons from "@/components/layout/LandingPageButtons";
import { ChatBubbleOvalLeftIcon, BoltIcon, GlobeAltIcon, EyeIcon, CloudArrowUpIcon, DevicePhoneMobileIcon } from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black">

      {/* Introduction */}
      <div className="mx-auto max-w-4xl px-6 pt-12 md:pt-20 pb-12 md:pb-16 text-center">
        <p className="mb-4 text-sm font-semibold text-[#4F46E5] md:text-base">
          Your Interactive Document Companion
        </p>

        <h1 className="text-4xl font-bold md:text-6xl">
          Transform Your PDFs into Interactive Conversations
        </h1>

        <p className="mt-6 text-xl text-[#575757]">
          Introducing{" "}
          <span className="font-semibold text-[#4F46E5]">AskPDF.</span>
        </p>

        <p className="mx-auto mt-6 text-[#575757] text-sm md:text-base">
          Upload your document, and our chatbot will answer questions, summarize content, and answer all your Qs. Ideal for everyone,{" "}
          <strong className="font-semibold text-[#4F46E5]">AskPDF</strong>{" "}
          turns static documents into{" "}
          <strong className="font-semibold text-[#575757]">
            dynamic conversations
          </strong>
          , enhancing productivity 10x fold effortlessly.
        </p>

        {/* Sing in / Sign up buttons */}
        <LandingPageButtons/>

      </div>

      {/* App images */}
      <div className="max-w-6xl mx-auto px-6 mb-6">
        <Image src="/chat_image.png" alt="chat_image" className="hidden md:flex rounded-md shadow-[0_0_15px_#00000040]" width={1920} height={1080} />
        <Image src="/chat_image_m.png" alt="chat_image" className="w-full h-auto max-w-xs mx-auto md:hidden rounded-md shadow-[0_0_15px_#00000040]" width={1920} height={1080} />
      </div>

      {/* Bullet points */}
      <div className="w-full bg-white py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">

            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center pt-0.5">
                <GlobeAltIcon className="w-5 h-5 text-[#4F46E5] shrink-0 mt-0.5" />
              </div>
              <div className="text-sm md:text-base leading-relaxed text-gray-600">
                <span className="font-semibold text-black mr-1">Store Your PDF Documents</span>
                Keep all your important PDF files securely stored and easily accessible anytime, anywhere.
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center pt-0.5">
                <BoltIcon className="w-5 h-5 text-[#4F46E5] shrink-0 mt-0.5" />
              </div>
              <div className="text-sm md:text-base leading-relaxed text-gray-600">
                <span className="font-semibold text-black mr-1">Blazing Fast Responses</span>
                Experience lightning-fast answers to your queries, ensuring you get the information you need instantly.
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center pt-0.5">
                <ChatBubbleOvalLeftIcon className="w-5 h-5 text-[#4F46E5] shrink-0 mt-0.5" />
              </div>
              <div className="text-sm md:text-base leading-relaxed text-gray-600">
                <span className="font-semibold text-black mr-1">Chat Memorisation</span>
                Our intelligent chatbot remembers previous interactions, providing a seamless and personalized experience.
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center pt-0.5">
                <EyeIcon className="w-5 h-5 text-[#4F46E5] shrink-0 mt-0.5" />
              </div>
              <div className="text-sm md:text-base leading-relaxed text-gray-600">
                <span className="font-semibold text-black mr-1">Interactive PDF Viewer</span>
                Engage with your PDFs like never before using our intuitive and interactive viewer.
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center pt-0.5">
                <CloudArrowUpIcon className="w-5 h-5 text-[#4F46E5] shrink-0 mt-0.5" />
              </div>
              <div className="text-sm md:text-base leading-relaxed text-gray-600">
                <span className="font-semibold text-black mr-1">Cloud Backup</span>
                Rest assured knowing your documents are safely backed up on the cloud, protected from loss or damage.
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center pt-0.5">
                <DevicePhoneMobileIcon className="w-5 h-5 text-[#4F46E5] shrink-0 mt-0.5" />
              </div>
              <div className="text-sm md:text-base leading-relaxed text-gray-600">
                <span className="font-semibold text-black mr-1">Responsive Across Devices</span>
                Access and chat with your PDFs seamlessly on any device, whether it's your desktop, tablet, or smartphone.
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
