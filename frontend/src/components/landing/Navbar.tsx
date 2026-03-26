"use client";
import Link from "next/link";
import Logo from "@/components/Logo";

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 bg-white/60 backdrop-blur-xl border-b border-slate-200/50">
      <nav className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
        <Link href="/">
          <Logo className="text-xl" />
        </Link>
        <div className="hidden md:flex items-center gap-10">
          <Link className="text-[#1A73E8] font-semibold text-sm" href="#">Marketplace</Link>
          <Link className="text-[#475569] hover:text-[#1A73E8] transition-colors font-semibold text-sm" href="#">Services</Link>
          <Link className="text-[#475569] hover:text-[#1A73E8] transition-colors font-semibold text-sm" href="#">Process</Link>
          <Link className="text-[#475569] hover:text-[#1A73E8] transition-colors font-semibold text-sm" href="#">About</Link>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/login" className="text-[#475569] hover:text-[#F97415] transition-colors font-bold text-sm">
            Se connecter
          </Link>
          <button className="bg-[#1A73E8] text-white px-7 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-[#1A73E8]/20 hover:shadow-[#1A73E8]/30 transition-all duration-200 active:scale-[0.97]">
            Commencer
          </button>
        </div>
      </nav>
    </header>
  );
}
