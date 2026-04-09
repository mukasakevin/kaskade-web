"use client";

import React from "react";
import { ArrowRight, CheckCircle2, Clock, Play, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-24 pb-20">
      
      {/* HEADER EDITORIAL */}
      <section className="relative">
        <h2 className="text-[#321B13]/40 text-xs font-bold uppercase tracking-[0.3em] mb-4">Aperçu</h2>
        <h1 className="text-5xl md:text-7xl font-sans font-black text-[#321B13] tracking-tighter leading-none mb-6">
          BONJOUR, <br />
          <span className="text-[#BC9C6C]">ARTISAN.</span>
        </h1>
        <p className="text-[#321B13]/70 max-w-lg text-sm md:text-base leading-relaxed border-l-2 border-[#BC9C6C] pl-6">
          Voici votre espace de travail. Suivez vos performances, explorez de nouvelles opportunités et gérez vos chantiers en cours avec précision.
        </p>
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-16">
        
        {/* COLONNE GAUCHE : Stats & Focus */}
        <div className="xl:col-span-4 space-y-16">
          
          {/* STATS DU MOIS */}
          <section>
            <div className="flex items-end justify-between border-b border-[#321B13]/10 pb-4 mb-8">
               <h3 className="text-sm font-black text-[#321B13] uppercase tracking-widest">Performances</h3>
               <span className="text-[10px] text-[#321B13]/50 uppercase tracking-widest font-bold">Ce mois</span>
            </div>
            
            <div className="space-y-8">
              <div className="bg-[#321B13] text-[#FCFBF7] p-8 md:p-10 relative overflow-hidden group">
                <div className="relative z-10">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-bold mb-2">Revenus générés</p>
                  <p className="text-4xl md:text-5xl font-black tracking-tighter">$1,240</p>
                  <div className="mt-6 flex items-center gap-2 text-[#BC9C6C]">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">+12.5%</span>
                  </div>
                </div>
                {/* Decoration */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#BC9C6C] rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#FCFBF7] border border-[#321B13]/5 p-6 hover:bg-[#321B13]/5 transition-colors">
                  <Clock className="w-5 h-5 text-[#BC9C6C] mb-4" />
                  <p className="text-3xl font-black text-[#321B13] tracking-tighter mb-1">4</p>
                  <p className="text-[9px] uppercase tracking-widest text-[#321B13]/60 font-bold">En attente</p>
                </div>
                <div className="bg-[#FCFBF7] border border-[#321B13]/5 p-6 hover:bg-[#321B13]/5 transition-colors">
                  <CheckCircle2 className="w-5 h-5 text-[#321B13] mb-4" />
                  <p className="text-3xl font-black text-[#321B13] tracking-tighter mb-1">12</p>
                  <p className="text-[9px] uppercase tracking-widest text-[#321B13]/60 font-bold">Complétées</p>
                </div>
              </div>
            </div>
          </section>

          {/* CHANTIER EN COURS (IN_PROGRESS) */}
          <section>
            <h3 className="text-sm font-black text-[#321B13] uppercase tracking-widest border-b border-[#321B13]/10 pb-4 mb-8">Focus Principal</h3>
            
            <div className="bg-white p-8 shadow-[0_20px_40px_rgba(50,27,19,0.03)] border border-[#321B13]/5">
              <div className="flex justify-between items-start mb-6">
                <div className="bg-[#BC9C6C]/10 text-[#321B13] px-3 py-1 text-[9px] uppercase tracking-widest font-bold inline-flex items-center gap-1.5">
                  <Play className="w-3 h-3 text-[#BC9C6C] fill-current" />
                  En cours
                </div>
                <span className="text-[#321B13] font-black text-xs">$350</span>
              </div>
              
              <h4 className="text-xl font-bold text-[#321B13] leading-snug mb-3">
                Installation Système Électrique Complet
              </h4>
              <p className="text-[#321B13]/60 text-xs leading-relaxed mb-8">
                Résidence Himbi. Phase 2 : Raccordement du tableau principal et tests.
              </p>

              <div className="space-y-3">
                <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold">
                  <span className="text-[#321B13]/60">Progression</span>
                  <span className="text-[#321B13]">65%</span>
                </div>
                <div className="h-1 bg-[#321B13]/5 w-full">
                  <div className="h-full bg-[#BC9C6C] w-[65%]"></div>
                </div>
              </div>
              
              <button className="w-full mt-8 py-4 border border-[#321B13]/20 text-[#321B13] font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-[#321B13] hover:text-white transition-all duration-300">
                Gérer la mission
              </button>
            </div>
          </section>
        </div>

        {/* COLONNE DROITE : Missions Disponibles */}
        <div className="xl:col-span-8">
          <div className="flex items-end justify-between border-b border-[#321B13]/10 pb-4 mb-8">
             <h3 className="text-sm font-black text-[#321B13] uppercase tracking-widest flex items-center gap-3">
               Missions Disponibles
               <span className="bg-[#321B13] text-white text-[10px] px-2 py-0.5 rounded-none">Nouveau</span>
             </h3>
             <button className="text-[10px] text-[#BC9C6C] uppercase tracking-widest font-bold hover:text-[#321B13] transition-colors flex items-center gap-1">
               Voir tout <ArrowRight className="w-3 h-3" />
             </button>
          </div>

          <div className="space-y-6">
            {/* CARTE MISSION 1 */}
            <div className="group bg-[#FCFBF7] border border-[#321B13]/10 hover:border-[#BC9C6C] hover:shadow-[0_20px_40px_rgba(188,156,108,0.1)] transition-all duration-500 p-8 md:p-10 flex flex-col md:flex-row gap-8 justify-between relative overflow-hidden">
               {/* Ligne d'accent Ocre à gauche au lieu d'un border complet */}
               <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#BC9C6C] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top"></div>
               
               <div className="flex-1">
                 <div className="flex flex-wrap items-center gap-4 mb-4">
                   <span className="text-[#321B13] text-[10px] uppercase font-bold tracking-widest border border-[#321B13]/20 px-2 py-0.5">
                     Plomberie
                   </span>
                   <span className="text-[#BC9C6C] text-[10px] uppercase font-bold tracking-widest flex items-center gap-1.5">
                     <Clock className="w-3 h-3" /> Urgent (24h)
                   </span>
                 </div>
                 <h4 className="text-2xl md:text-3xl font-black text-[#321B13] tracking-tight mb-3">
                   Réparation Fuite d'Eau Majeure
                 </h4>
                 <p className="text-[#321B13]/60 text-sm max-w-xl leading-relaxed">
                   Intervention requise dans la commune de Goma, quartier Katindo. Le client rapporte une fuite importante dans la salle de bain principale.
                 </p>
               </div>

               <div className="flex flex-col items-start md:items-end justify-between md:min-w-[150px]">
                 <div className="text-left md:text-right mb-6 md:mb-0">
                   <p className="text-[10px] uppercase tracking-widest text-[#321B13]/50 font-bold mb-1">Budget Client</p>
                   <p className="text-3xl font-black text-[#321B13]">$85</p>
                 </div>
                 <button className="bg-[#BC9C6C] hover:bg-[#321B13] text-white px-8 py-4 w-full md:w-auto text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-300">
                   Accepter
                 </button>
               </div>
            </div>

            {/* CARTE MISSION 2 */}
            <div className="group bg-[#FCFBF7] border border-[#321B13]/10 hover:border-[#BC9C6C] hover:shadow-[0_20px_40px_rgba(188,156,108,0.1)] transition-all duration-500 p-8 md:p-10 flex flex-col md:flex-row gap-8 justify-between relative overflow-hidden">
               <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#BC9C6C] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top"></div>
               
               <div className="flex-1">
                 <div className="flex flex-wrap items-center gap-4 mb-4">
                   <span className="text-[#321B13] text-[10px] uppercase font-bold tracking-widest border border-[#321B13]/20 px-2 py-0.5">
                     Menuiserie
                   </span>
                   <span className="text-[#321B13]/40 text-[10px] uppercase font-bold tracking-widest flex items-center gap-1.5">
                     <Clock className="w-3 h-3" /> Standard
                   </span>
                 </div>
                 <h4 className="text-2xl md:text-3xl font-black text-[#321B13] tracking-tight mb-3">
                   Fabrication Meuble TV Sur-Mesure
                 </h4>
                 <p className="text-[#321B13]/60 text-sm max-w-xl leading-relaxed">
                   Demande de création d'un meuble TV en bois massif. Le design a déjà été fourni par le client. Prévoir une visite pour les dimensions.
                 </p>
               </div>

               <div className="flex flex-col items-start md:items-end justify-between md:min-w-[150px]">
                 <div className="text-left md:text-right mb-6 md:mb-0">
                   <p className="text-[10px] uppercase tracking-widest text-[#321B13]/50 font-bold mb-1">Budget Client</p>
                   <p className="text-3xl font-black text-[#321B13]">$420</p>
                 </div>
                 <button className="bg-[#BC9C6C] hover:bg-[#321B13] text-white px-8 py-4 w-full md:w-auto text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-300">
                   Accepter
                 </button>
               </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
