"use client";

import React, { useState } from "react";
import Navbar from "@/components/landing/Navbar";
import { Clock, Play, CheckCircle2, Search, Filter } from "lucide-react";
import Footer from "@/components/landing/Footer";
import { motion } from "framer-motion";

const MOCK_REQUESTS = [
  {
    id: "REQ-001",
    service: "Réparation Plomberie",
    date: "Aujourd'hui, 09:30",
    status: "PENDING",
    price: "En attente d'estimation",
    provider: "Non assigné"
  },
  {
    id: "REQ-002",
    service: "Installation Électrique",
    date: "Hier, 14:15",
    status: "IN_PROGRESS",
    price: "$350",
    provider: "Alex M."
  },
  {
    id: "REQ-003",
    service: "Peinture Intérieure",
    date: "12 Oct 2026",
    status: "COMPLETED",
    price: "$850",
    provider: "Sarah J."
  }
];

import { useRequireAuth } from "@/lib/use-require-auth";

export default function MesDemandesPage() {
  const [activeFilter, setActiveFilter] = useState("TOUTES");
  const { user } = useRequireAuth();

  if (!user) return null;

  return (
    <main className="bg-[#FCFBF7] min-h-screen font-sans selection:bg-[#BC9C6C] selection:text-white">
      <Navbar />

      <div className="pt-24 md:pt-32 pb-24 max-w-[1200px] mx-auto px-6 md:px-12">

        {/* HEADER EDITORIAL */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-[#321B13]/40 text-xs font-bold uppercase tracking-[0.3em] mb-4">HISTORIQUE CLIENT</h2>
          <h1 className="text-4xl md:text-6xl font-sans font-black text-[#321B13] tracking-tighter leading-none mb-6">
            MES <br />
            <span className="text-[#BC9C6C]">DEMANDES.</span>
          </h1>
          <p className="text-[#321B13]/70 max-w-lg text-sm md:text-base leading-relaxed border-l-2 border-[#BC9C6C] pl-6">
            Consultez et suivez l'avancement de toutes vos requêtes de services. Transparence totale, du devis à la finalisation.
          </p>
        </motion.section>

        {/* CONTROLS */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12 border-b border-[#321B13]/10 pb-6"
        >
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2 md:gap-4">
            {["TOUTES", "EN ATTENTE", "EN COURS", "TERMINÉES"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`text-[10px] font-bold uppercase tracking-widest px-4 py-2 transition-all duration-300 ${activeFilter === filter
                    ? "bg-[#321B13] text-[#FCFBF7]"
                    : "bg-[#FCFBF7] border border-[#321B13]/20 text-[#321B13] hover:border-[#BC9C6C] hover:text-[#BC9C6C]"
                  }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Search Placeholder */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-[#321B13]/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="RECHERCHER..."
              className="w-full bg-transparent border border-[#321B13]/10 py-2.5 pl-10 pr-4 text-xs font-bold uppercase tracking-widest text-[#321B13] placeholder-[#321B13]/30 focus:outline-none focus:border-[#BC9C6C] transition-colors"
            />
          </div>
        </motion.div>

        {/* LISTE DES DEMANDES (EDITORIAL STYLE) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-6"
        >
          {MOCK_REQUESTS.map((req, index) => (
            <div
              key={req.id}
              className="group relative bg-[#FCFBF7] border border-[#321B13]/10 p-6 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-8 hover:border-[#BC9C6C] hover:shadow-[0_20px_40px_rgba(50,27,19,0.03)] transition-all duration-500 overflow-hidden"
            >
              {/* Ligne d'accent interactif */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#BC9C6C] scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500"></div>

              {/* Infos principales */}
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-[#321B13] text-[9px] uppercase font-black tracking-[0.2em] opacity-50">
                    {req.id}
                  </span>
                  <span className="text-[#321B13]/60 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-[#BC9C6C]" /> {req.date}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-[#321B13] tracking-tighter mb-2">
                  {req.service}
                </h3>
                <p className="text-[#321B13]/60 text-[11px] font-bold uppercase tracking-widest">
                  Prestatire: <span className={req.provider === "Non assigné" ? "italic text-[#321B13]/40" : "text-[#321B13]"}>{req.provider}</span>
                </p>
              </div>

              {/* Statut & Action */}
              <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:min-w-[200px] gap-6 md:gap-0">
                <div className="text-left md:text-right mb-0 md:mb-6">
                  <p className="text-[9px] uppercase tracking-[0.2em] text-[#321B13]/40 font-bold mb-1">Montant Estimé</p>
                  <p className={`text-xl md:text-2xl font-black tracking-tighter ${req.price === "En attente d'estimation" ? "text-[#321B13]/30 text-sm md:text-base leading-tight w-32 md:w-auto" : "text-[#321B13]"}`}>
                    {req.price}
                  </p>
                </div>

                {/* STATUT BADGE ARCHITECTURAL */}
                {req.status === "PENDING" && (
                  <div className="flex items-center gap-2 border border-[#BC9C6C]/30 text-[#BC9C6C] px-4 py-2 text-[9px] uppercase font-black tracking-[0.2em]">
                    <Clock className="w-3 h-3" /> En Attente
                  </div>
                )}
                {req.status === "IN_PROGRESS" && (
                  <div className="flex items-center gap-2 bg-[#321B13] text-white px-4 py-2 text-[9px] uppercase font-black tracking-[0.2em]">
                    <Play className="w-3 h-3" /> En Cours
                  </div>
                )}
                {req.status === "COMPLETED" && (
                  <div className="flex items-center gap-2 bg-[#FCFBF7] border border-[#321B13]/10 text-[#321B13] px-4 py-2 text-[9px] uppercase font-black tracking-[0.2em]">
                    <CheckCircle2 className="w-3 h-3 text-[#321B13]" /> Terminée
                  </div>
                )}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
