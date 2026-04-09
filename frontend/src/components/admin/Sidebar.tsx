"use client";

import {
  LayoutDashboard,
  MessageSquare,
  Users,
  Briefcase,
  UserCircle,
  Bell,
  Settings,
  LogOut
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
  { name: "Demandes", icon: MessageSquare, href: "/admin/requests" },
  { name: "Prestataires", icon: Users, href: "/admin/users" },
  { name: "Services", icon: Briefcase, href: "/admin/services" },
  { name: "Clients", icon: UserCircle, href: "/admin/people" },
  { name: "Notifications", icon: Bell, href: "/admin/notifications" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside className="w-72 bg-[#321B13] h-screen fixed left-0 top-0 text-white flex flex-col z-50">

      {/* Brand Header */}
      <div className="px-8 pt-10 pb-8 border-b border-white/5">
        {/* Logo mark */}
        <div className="flex flex-col gap-1 mb-5">
          <div className="w-7 h-[3px] bg-[#BC9C6C] rounded-none" />
          <div className="w-10 h-[3px] bg-white rounded-none" />
          <div className="w-5 h-[3px] bg-[#BC9C6C]/40 rounded-none" />
        </div>

        {/* Wordmark */}
        <h1 className="text-2xl font-black tracking-tighter text-white uppercase leading-none">
          Kaskade<span className="text-[#BC9C6C]">.</span>
        </h1>

        {/* Badge */}
        <div className="mt-3 inline-flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#BC9C6C] animate-pulse" />
          <span className="text-[9px] font-black uppercase tracking-[0.35em] text-[#BC9C6C]">
            Admin Console
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-8 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-6 py-4 rounded-none transition-all duration-300 group ${isActive
                  ? "bg-[#BC9C6C] text-[#321B13]"
                  : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
            >
              <item.icon className={`w-4 h-4 ${isActive ? "text-[#321B13]" : "group-hover:text-[#BC9C6C] transition-colors"}`} />
              <span className={`text-[11px] font-bold uppercase tracking-[0.2em] ${isActive ? "text-[#321B13]" : ""}`}>
                {item.name}
              </span>
            </Link>
          );
        })}

        {/* Support Section Placeholder */}
        <div className="mt-12 px-6 py-8 mx-2 bg-white/5 border border-white/5 rounded-none flex flex-col gap-4">
          <div className="w-8 h-8 rounded-full bg-[#BC9C6C]/20 flex items-center justify-center">
            <Settings className="w-4 h-4 text-[#BC9C6C]" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-white mb-1">Support Admin</p>
            <p className="text-[9px] text-white/40 leading-relaxed">Besoin d'aide ? Contactez l'équipe technique Kaskade.</p>
          </div>
          <button className="w-full py-3 bg-[#BC9C6C] text-[#321B13] text-[9px] font-black uppercase tracking-widest hover:bg-white transition-colors">
            Ouvrir un ticket
          </button>
        </div>
      </nav>

      {/* Profile & Footer */}
      <div className="px-6 py-8 border-t border-white/5 space-y-6 bg-black/10">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-[#BC9C6C] flex items-center justify-center text-[#321B13] font-black text-xs">
            {user?.fullName.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-black uppercase tracking-widest text-white truncate">{user?.fullName}</p>
            <p className="text-[9px] text-white/40 uppercase tracking-widest font-bold">Administrateur</p>
          </div>
          <button
            onClick={logout}
            className="p-2 text-white/20 hover:text-red-400 transition-colors"
            title="Déconnexion"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

        <div className="flex justify-between items-center px-1">
          <p className="text-[8px] text-white/10 uppercase tracking-[0.3em] font-bold">
            v1.0.4 r-alpha
          </p>
          <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
        </div>
      </div>

    </aside>
  );
}
