"use client";

import { UserSearch, MessageCircle, ShieldCheck, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function Process() {
  const steps = [
    {
      id: "01",
      title: "Explorez",
      desc: "Découvrez des talents locaux vérifiés. Laissez-vous inspirer par leurs réalisations.",
      icon: UserSearch
    },
    {
      id: "02",
      title: "Discutez",
      desc: "L'humain d'abord. Echangez via notre messagerie pour aligner vos visions.",
      icon: MessageCircle
    },
    {
      id: "03",
      title: "Réservez",
      desc: "Un acompte sécurisé via Mobile Money lance la mission. Votre argent est protégé.",
      icon: ShieldCheck
    },
    {
      id: "04",
      title: "Savourez",
      desc: "Validez le travail fini. Le paiement est libéré, et une nouvelle relation est née.",
      icon: Star
    },
  ];

  return (
    <section className="py-24 px-6 md:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* En-tête centré */}
      <div className="text-center mb-20 relative z-10">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-[#FF6B00] font-medium tracking-widest uppercase text-sm"
        >
          Comment ça marche ?
        </motion.span>
        <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-6 text-[#1C1917]">
          Du projet à la réalité,<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FF9E40]">
            en toute simplicité.
          </span>
        </h2>
        <p className="text-[#57534E] text-lg max-w-2xl mx-auto">
          Nous avons supprimé les frictions pour que vous puissiez vous concentrer sur l&apos;essentiel : la collaboration humaine.
        </p>
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">

        {/* LIGNE DE CONNEXION (Desktop) */}
        <div className="hidden md:block absolute top-12 left-[10%] w-[80%] h-[2px] border-t-2 border-dashed border-orange-200 -z-0" />

        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, duration: 0.5 }}
            className="relative flex flex-col items-center text-center group"
          >
            {/* Conteneur de l'icône */}
            <div className="relative mb-6">
              {/* Le "Blob" d'arrière plan */}
              <div className={`absolute inset-0 rounded-[2rem] rotate-6 group-hover:rotate-12 transition-transform duration-300 ${i === 3 ? 'bg-orange-100' : 'bg-gray-100'}`} />

              <div className={`
                relative w-24 h-24 rounded-[1.5rem] flex items-center justify-center 
                shadow-sm border border-white/50 backdrop-blur-sm z-10
                transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-lg
                ${i === 3 ? 'bg-[#FF6B00] text-white' : 'bg-white text-[#57534E] group-hover:text-[#FF6B00]'}
              `}>
                <step.icon className="w-10 h-10" strokeWidth={1.5} />

                {/* Petit badge numéro */}
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center text-xs font-bold text-[#1C1917] shadow-sm">
                  {step.id}
                </div>
              </div>
            </div>

            {/* Textes */}
            <h4 className="font-bold text-xl mb-3 text-[#1C1917] group-hover:text-[#FF6B00] transition-colors duration-300">
              {step.title}
            </h4>
            <p className="text-[#57534E] text-sm leading-relaxed px-4">
              {step.desc}
            </p>

            {/* Indicateur mobile (ligne verticale) */}
            {i !== steps.length - 1 && (
              <div className="md:hidden w-[2px] h-12 bg-gray-100 my-4" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Bouton d'action final */}
      <div className="mt-16 text-center">
        <button className="px-8 py-4 bg-[#1C1917] text-white rounded-full font-medium shadow-lg hover:shadow-xl hover:bg-[#FF6B00] transition-all duration-300 flex items-center gap-2 mx-auto">
          Commencer mon projet
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>

    </section>
  );
}