"use client";
import React from "react";
import { Search, BarChart3, TrendingUp, Target, Map, PieChart, Info, Download } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminAnalytics() {
  return (
    <div className="p-12">
      <header className="flex justify-between items-start mb-16 gap-8">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2">Analyse du Marché</h1>
          <p className="text-slate-400 text-sm font-medium">Suivez les tendances, la croissance et la performance de Kaskade.</p>
        </div>
        
        <div className="flex gap-4">
           <button className="flex items-center gap-2 text-xs font-extrabold text-[#321B13] hover:bg-slate-50 border border-slate-100 px-6 py-4 rounded-3xl transition-all">
              <Download className="w-4 h-4" /> Exporter PDF
           </button>
           <button className="bg-[#FF6B00] text-white px-8 py-4 rounded-3xl font-bold flex items-center gap-3 text-sm shadow-xl shadow-[#FF6B00]/10 hover:shadow-[#FF6B00]/20 transition-all active:scale-95">
              <BarChart3 className="w-5 h-5" /> Nouveau Rapport
           </button>
        </div>
      </header>

      <section className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { label: "Croissance Mensuelle", value: "+12.4%", icon: TrendingUp, detail: "Par rapport au mois dernier" },
             { label: "Taux de Conversion", value: "3.2%", icon: Target, detail: "Visite -> Service Commandé" },
             { label: "Zone Active", value: "Goma (72%)", icon: Map, detail: "Localité majoritaire" },
           ].map((card, i) => (
             <div key={i} className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-2xl shadow-slate-200/40 relative overflow-hidden group hover:scale-[1.02] transition-all duration-300">
                <div className="flex justify-between items-start mb-10">
                   <div className="w-16 h-16 rounded-[24px] bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-[#FF6B00] group-hover:text-white transition-all shadow-sm">
                      <card.icon className="w-6 h-6" />
                   </div>
                   <Info className="w-4 h-4 text-slate-200 cursor-pointer" />
                </div>
                <h3 className="text-5xl font-black tracking-tighter mb-4">{card.value}</h3>
                <div>
                   <span className="text-[10px] uppercase font-bold tracking-widest text-[#FF6B00] mb-1 block">{card.label}</span>
                   <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tight">{card.detail}</p>
                </div>
             </div>
           ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <div className="bg-white rounded-[40px] p-12 border border-slate-100 shadow-2xl flex flex-col items-center">
              <h4 className="text-xl font-black tracking-tight mb-1 w-full text-left">Volume par Ville</h4>
              <p className="text-slate-400 text-sm font-medium w-full text-left mb-12">Répartition géographique de l'activité</p>
              
              <div className="w-full space-y-8">
                 {[
                   { city: "Goma", percent: 72, color: "#FF6B00" },
                   { city: "Bukavu", percent: 18, color: "#BC9C6C" },
                   { city: "Kindu", percent: 10, color: "#321B13" },
                 ].map((bar, i) => (
                   <div key={i}>
                      <div className="flex justify-between items-center mb-3">
                         <span className="text-xs font-bold text-slate-600">{bar.city}</span>
                         <span className="text-xs font-black">{bar.percent}%</span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-50 rounded-full overflow-hidden">
                         <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: `${bar.percent}%` }}
                           transition={{ duration: 1, delay: i * 0.2 }}
                           className="h-full rounded-full"
                           style={{ backgroundColor: bar.color }}
                         />
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-white rounded-[40px] p-12 border border-slate-100 shadow-2xl">
              <h4 className="text-xl font-black tracking-tight mb-1">Démographie Prestataires</h4>
              <p className="text-slate-400 text-sm font-medium mb-12">Expertise et spécialisations locales</p>
              
              <div className="flex items-center justify-center h-64 relative">
                 <div className="bg-[#321B13] w-24 h-24 rounded-full flex items-center justify-center text-white text-xs font-bold z-10 shadow-2xl">
                    842 Élus
                 </div>
                 <div className="absolute inset-0 border border-slate-50 rounded-full scale-100 opacity-50"></div>
                 <div className="absolute inset-0 border border-slate-100 rounded-full scale-150 opacity-20"></div>
                 <div className="absolute inset-0 border border-slate-200 rounded-full scale-[2] opacity-5"></div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
