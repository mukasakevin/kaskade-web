"use client";
import React from "react";
import { User, Bell, Shield, Lock, Globe, MessageCircle, Save, LogOut } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminSettings() {
  return (
    <div className="p-12">
      <header className="flex justify-between items-center mb-16 gap-8">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2">Paramètres de la Console</h1>
          <p className="text-slate-400 text-sm font-medium">Configurez votre environnement d'administration et vos préférences.</p>
        </div>
        
        <button className="bg-[#FF6B00] text-white px-8 py-4 rounded-3xl font-bold flex items-center gap-3 text-sm shadow-xl shadow-[#FF6B00]/10 hover:shadow-[#FF6B00]/20 transition-all active:scale-95">
           <Save className="w-5 h-5" /> Enregistrer les modifications
        </button>
      </header>

      <section className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
           {/* Sidebar des Paramètres */}
           <div className="space-y-2">
              {[
                { label: "Mon Profil", icon: User, active: true },
                { label: "Notifications", icon: Bell },
                { label: "Sécurité", icon: Shield },
                { label: "Langue & Région", icon: Globe },
                { label: "Équipe", icon: Lock },
                { label: "Support", icon: MessageCircle },
              ].map((item, i) => (
                <button 
                  key={i} 
                  className={`flex items-center gap-4 px-6 py-4 rounded-2xl w-full text-left transition-all ${
                    item.active ? "bg-[#321B13] text-white shadow-xl shadow-[#321B13]/10" : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
                  }`}
                >
                   <item.icon className="w-5 h-5" />
                   <span className="font-bold text-sm">{item.label}</span>
                </button>
              ))}
              <div className="pt-8 border-t border-slate-50 mt-8">
                 <button className="flex items-center gap-4 px-6 py-4 rounded-2xl w-full text-left text-rose-500 hover:bg-rose-50 transition-all">
                    <LogOut className="w-5 h-5" />
                    <span className="font-bold text-sm uppercase tracking-widest">Déconnexion</span>
                 </button>
              </div>
           </div>

           {/* Zone de contenu des paramètres */}
           <div className="md:col-span-2 bg-white rounded-[40px] p-12 border border-slate-100 shadow-2xl shadow-slate-200/40 space-y-12">
              <div className="flex flex-col items-center border-b border-slate-50 pb-12">
                 <div className="w-32 h-32 rounded-[40px] overflow-hidden border-8 border-slate-50 shadow-sm mb-6 relative group">
                    <img src="https://i.pravatar.cc/150?u=julian" alt="Admin" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                       <span className="text-white text-[10px] uppercase font-bold tracking-widest">Changer Photo</span>
                    </div>
                 </div>
                 <h4 className="text-xl font-black">Julian Thorne</h4>
                 <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mt-2 px-4 py-1.5 bg-slate-50 rounded-lg">Super Admin</p>
              </div>

              <div className="grid grid-cols-2 gap-8">
                 <div className="space-y-3">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-[#BC9C6C]">Nom complet</label>
                    <input type="text" defaultValue="Julian Thorne" className="w-full border border-slate-100 px-6 py-4 rounded-2xl text-sm focus:ring-[#FF6B00]/10 focus:ring-4 outline-none transition-all" />
                 </div>
                 <div className="space-y-3">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-[#BC9C6C]">Email professionnel</label>
                    <input type="email" defaultValue="julian@kaskade.com" className="w-full border border-slate-100 px-6 py-4 rounded-2xl text-sm focus:ring-[#FF6B00]/10 focus:ring-4 outline-none transition-all" />
                 </div>
                 <div className="space-y-3">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-[#BC9C6C]">Rôle Console</label>
                    <input type="text" defaultValue="Administrateur Gérant" disabled className="w-full bg-slate-50 border border-slate-50 px-6 py-4 rounded-2xl text-sm text-slate-400" />
                 </div>
                 <div className="space-y-3">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-[#BC9C6C]">Téléphone</label>
                    <input type="text" defaultValue="+243 812 345 678" className="w-full border border-slate-100 px-6 py-4 rounded-2xl text-sm focus:ring-[#FF6B00]/10 focus:ring-4 outline-none transition-all" />
                 </div>
              </div>

              <div className="space-y-6 pt-8">
                 <h5 className="font-black text-sm tracking-tight border-b border-light-100 pb-4">Préférences d'Affichage</h5>
                 <div className="flex items-center justify-between">
                    <div>
                       <p className="text-sm font-bold text-slate-700">Mode Sombre</p>
                       <p className="text-[10px] text-slate-400">Activer l'interface en thème sombre automatique.</p>
                    </div>
                    <div className="w-12 h-6 bg-slate-100 rounded-full relative p-1 cursor-pointer">
                       <div className="w-4 h-4 bg-slate-300 rounded-full"></div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
