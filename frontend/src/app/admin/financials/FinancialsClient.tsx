"use client";
import React from "react";
import { Search, CreditCard, DollarSign, ArrowUpRight, ArrowDownLeft, ChevronDown, Download, Shield } from "lucide-react";
import { motion } from "framer-motion";

type TransactionItem = {
  id: string;
  type: string;
  amount: string;
  status: string;
  date: string;
  method: string;
};

type StatItem = {
  label: string;
  value: string;
  trend: string;
  color: string;
};

export default function FinancialsClient({ stats, initialTransactions }: { stats: StatItem[], initialTransactions: TransactionItem[] }) {
  return (
    <div className="p-12">
      <header className="flex justify-between items-start mb-16 gap-8">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2">Gestion des Finances</h1>
          <p className="text-slate-400 text-sm font-medium">Données de trésorerie réelles issues des transactions Kaskade.</p>
        </div>
        
        <div className="flex gap-4">
           <button className="flex items-center gap-2 text-xs font-extrabold text-[#321B13] hover:bg-slate-50 border border-slate-100 px-6 py-4 rounded-3xl transition-all">
              <Download className="w-4 h-4" /> Exporter Rapport
           </button>
           <button className="bg-[#BC9C6C] text-white px-8 py-4 rounded-3xl font-bold flex items-center gap-3 text-sm shadow-xl shadow-[#BC9C6C]/10 hover:shadow-[#BC9C6C]/20 transition-all active:scale-95">
              <DollarSign className="w-5 h-5" /> Nouveau Paiement
           </button>
        </div>
      </header>

      <section className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
           {stats.map((stat, i) => (
             <div key={i} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden group hover:scale-[1.02] transition-all">
                <div className="flex justify-between items-start mb-8">
                   <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-slate-100 group-hover:text-[#FF6B00] transition-colors">
                      <CreditCard className="w-5 h-5" />
                   </div>
                   <span className="text-[10px] font-black text-emerald-500 uppercase">{stat.trend} ↗</span>
                </div>
                <h4 className="text-3xl lg:text-4xl font-black tracking-tighter mb-2 truncate">{stat.value}</h4>
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-400">{stat.label}</span>
             </div>
           ))}
        </div>

        <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-xl">
           <div className="flex justify-between items-center mb-12">
              <h3 className="text-2xl font-black">Historique des Transactions</h3>
              <div className="flex gap-4">
                 <button className="flex items-center gap-2 text-xs font-bold text-slate-400 border border-slate-100 px-5 py-2.5 rounded-2xl">
                    Type <ChevronDown className="w-4 h-4" />
                 </button>
                 <button className="flex items-center gap-2 text-xs font-bold text-slate-400 border border-slate-100 px-5 py-2.5 rounded-2xl">
                    Statut <ChevronDown className="w-4 h-4" />
                 </button>
              </div>
           </div>

           {initialTransactions.length > 0 ? (
           <div className="space-y-4">
              {initialTransactions.map((trx, i) => (
                <div key={i} className="flex items-center justify-between p-6 rounded-3xl border border-slate-50 hover:bg-slate-50/50 transition-all cursor-pointer group">
                   <div className="flex items-center gap-6">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xs ${
                        trx.type === 'PAIEMENT' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-500'
                      }`}>
                         {trx.type === 'PAIEMENT' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                      </div>
                      <div>
                         <h5 className="font-bold text-sm tracking-tight">{trx.method} <span className="text-slate-200 mx-2">•</span> #{trx.id}</h5>
                         <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{trx.type} — {trx.date}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-8">
                      <p className={`font-black text-sm ${trx.amount.startsWith('+') ? 'text-emerald-600' : 'text-[#321B13]'}`}>{trx.amount}</p>
                      <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black border ${
                        trx.status === 'RÉUSSI' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                        trx.status === 'EN ATTENTE' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                        'bg-rose-50 text-rose-500 border-rose-100'
                      }`}>
                         {trx.status}
                      </span>
                   </div>
                </div>
              ))}
           </div>
           ) : (
             <div className="py-20 text-center text-slate-300 font-bold uppercase tracking-widest">
                Aucune transaction enregistrée
             </div>
           )}
        </div>
      </section>
    </div>
  );
}
