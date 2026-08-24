"use client"

import { ArrowRightEndOnRectangleIcon, DocumentTextIcon, Bars3Icon, XMarkIcon, BoltIcon, DocumentIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { handleLogout } from "../auth/Logout";

const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState<boolean>(false)

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
    <div className="flex justify-between items-center bg-white h-18 border-b">

      {/* Logo */}
      <Image src="/askpdf.png" alt="logo" className="ml-5 md:ml-7 h-9 w-auto object-contain" width={240} height={80} priority />

      <div className="hidden md:flex items-center gap-5 mr-7">
        {/* My Documents Button */}
        <Link
          href="/documents"
          className="flex items-center rounded-xl px-4 py-2 text-sm font-semibold text-slate-600 cursor-pointer hover:bg-slate-100 hover:text-slate-900 transition">
          My Documents
        </Link>


        {/* Upgrade Button */}
        <Link
          href="/upgrade"
          className="flex items-center px-4 py-2 text-sm font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition">
          Upgrade <BoltIcon className="w-4 ml-1"/>
        </Link>

        <div className="flex items-center h-6 w-px bg-slate-200 mx-1"></div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="hidden md:flex items-center justify-center p-2.5 -mx-2 rounded-xl cursor-pointer text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
        >
          <ArrowRightEndOnRectangleIcon className="w-5"/>
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
        <div className="md:hidden fixed top-18 left-0 z-50 w-full h-[calc(100dvh-4.5rem)] bg-white flex flex-col gap-8 p-6">
          <Link
            href="/documents"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 text-[#4F46E5] font-semibold text-left">
            My Documents <DocumentTextIcon className="w-6 h-6 ml-1 text-[#4F46E5]" />
          </Link>
          <Link
            href="/upgrade"
            className="flex items-center gap-2 text-[#4F46E5] font-semibold text-left">
            Upgrade <BoltIcon className="w-6 ml-1"/>
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