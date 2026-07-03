"use client"

import { ArrowRightEndOnRectangleIcon, DocumentPlusIcon, DocumentTextIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { triggerFileUpload } from "../PdfUpload";
import { handleLogout } from "../auth/Logout";

const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const [isPro, setIsPro] = useState<boolean>(false)

  useEffect(() => {
    fetch("/api/user/plan")
      .then((res) => res.json())
      .then((data) => setIsPro(data.isPro === true))
      .catch(() => setIsPro(false))
  }, [])

  // Unable scroll when menu open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  return (
    <div className="flex justify-between items-center bg-white h-18 border-b border-[#4F46E5]">

      {/* Logo */}
      <Image src="/askpdf.png" alt="logo" className="ml-5 md:ml-7 h-9 w-auto object-contain" width={240} height={80} priority />

      <div className="flex gap-7 mr-7">
        {/* My Documents Button */}
        <div className="hidden md:inline-flex overflow-hidden shadow-md rounded-md border border-[#4F46E5]">
          <Link
            href="/documents"
            className="flex items-center gap-2 bg-[#4F46E5] px-4 py-2 text-sm font-semibold text-white transition-colors cursor-pointer hover:bg-[#6159ED]">
            My Documents
          </Link>

          {/* Add Document Button */}
          <button
            type="button"
            onClick={triggerFileUpload}
            className="flex w-12 items-center justify-center border-l-2 border-[#4F46E5] bg-white transition-colors cursor-pointer hover:bg-violet-50">
            <DocumentPlusIcon className="w-6 h-6 text-[#4F46E5]" />
          </button>
        </div>

        {/* Upgrade Button */}
        <Link
          href="/upgrade"
          className="hidden md:flex items-center justify-center text-[#4F46E5] text-sm font-semibold shadow-md border rounded-md border-[#4F46E5] px-4 py-2 cursor-pointer hover:bg-violet-50 transition">
          Upgrade <Image src="/crown.png" alt="crown" className="w-5 h-5 ml-2" width={16} height={16} />
        </Link>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="hidden md:flex items-center justify-center px-2 -mx-2 rounded-md cursor-pointer hover:bg-violet-50"
        >
          <ArrowRightEndOnRectangleIcon className="w-7 h-7 text-[#4F46E5]" />
        </button>
      </div>

      {/* ------------------------------------------------------ */}
      {/*                     Mobile view                        */}
      {/* ------------------------------------------------------ */}

      {/* Hamburger / X Button */}
      <button
        type="button"
        className="md:hidden mr-5 text-[#4F46E5]"
        onClick={() => setMenuOpen((o) => !o)}
      >
        {menuOpen ? (
          <XMarkIcon className="h-8 w-8" />
        ) : (
          <Bars3Icon className="w-8 h-8" />
        )}
      </button>

      {/* Menu */}
      {menuOpen && (
        <div className="md:hidden fixed top-18 left-0 z-50 w-full h-[calc(100vh-4.5rem)] bg-white flex flex-col gap-8 p-6">
          <Link
            href="/documents"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 text-[#4F46E5] font-semibold text-left">
            My Documents <DocumentTextIcon className="w-6 h-6 ml-1 text-[#4F46E5]" />
          </Link>
          <button
            type="button"
            onClick={() => {
              triggerFileUpload();
              setMenuOpen(false);
            }}
            className="flex items-center gap-2 text-[#4F46E5] font-semibold text-left">
            Add Document <DocumentPlusIcon className="w-6 h-6 ml-1 text-[#4F46E5]" />
          </button>
          <Link
            href="/upgrade"
            className="flex items-center gap-2 text-[#4F46E5] font-semibold text-left">
            Upgrade <Image src="/crown.png" alt="crown" className="w-6 h-6 ml-1" width={16} height={16} />
          </Link>
          <button onClick={handleLogout} className="flex items-center gap-2 text-[#4F46E5] font-semibold text-left">
            Logout <ArrowRightEndOnRectangleIcon className="w-6 h-6 ml-1 text-[#4F46E5]" />
          </button>
        </div>
      )}

    </div>
  )
}

export default Navbar