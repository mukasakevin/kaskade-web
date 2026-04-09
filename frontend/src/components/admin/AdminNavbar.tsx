"use client";

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { Bell, Search } from 'lucide-react';

export default function AdminNavbar() {
  const { user } = useAuth();

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-10 sticky top-0 z-40">
      <div className="flex items-center gap-8">
        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#321B13]/30">
          Management <span className="text-[#BC9C6C]">/</span> Overview
        </h2>
        
        <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-gray-50 border border-gray-100 rounded-none w-64 group focus-within:bg-white focus-within:border-[#BC9C6C] transition-all">
          <Search className="w-3.5 h-3.5 text-gray-400 group-focus-within:text-[#BC9C6C]" />
          <input 
            type="text" 
            placeholder="Rechercher..." 
            className="bg-transparent border-none outline-none text-[10px] uppercase font-bold tracking-widest text-[#321B13] placeholder:text-gray-300 w-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <Link href="/admin/notifications" className="relative p-2 text-gray-400 hover:text-[#BC9C6C] transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full border-2 border-white" />
        </Link>

        <div className="h-8 w-[1px] bg-gray-100 mx-2" />

        <div className="flex items-center gap-3 pl-2">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#321B13]">
              {user?.fullName}
            </p>
            <p className="text-[8px] font-bold text-[#BC9C6C] uppercase tracking-widest mt-0.5">
              Super Admin
            </p>
          </div>
          
          <div className="w-10 h-10 bg-[#321B13] flex items-center justify-center text-[#BC9C6C] font-black text-xs border-2 border-[#BC9C6C]/10 hover:border-[#BC9C6C] transition-all cursor-pointer">
            {user?.fullName?.[0].toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
}
