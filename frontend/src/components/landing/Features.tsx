"use client";
import { ShieldCheck, Wallet, Clock, Star, Heart } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Features() {
  return (
    <section className="py-24 px-6 md:px-8 max-w-7xl mx-auto bg-[#FAFAF9]"> {/* Fond Crème léger */}

      {/* En-tête de section plus émotionnel */}
      <div className="mb-16 md:mb-24 text-center max-w-2xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="inline-block py-1 px-3 rounded-full bg-orange-100 text-[#FF6B00] text-sm font-medium mb-4"
        >
          Confiance & Proximité
        </motion.span>
        <h2 className="text-4xl md:text-5xl font-bold text-[#1C1917] tracking-tight mb-4">
          L'humain au cœur de <span className="text-[#FF6B00]">l'expérience.</span>
        </h2>
        <p className="text-[#57534E] text-lg">
          Plus qu'une plateforme, nous tissons des liens de confiance entre voisins et experts passionnés.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* CARTE 1 : LA CONFIANCE (Ajout de visages pour humaniser) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="group relative bg-white p-8 rounded-[2rem] border border-[#E7E5E4] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <ShieldCheck className="w-24 h-24 text-[#FF6B00]" />
          </div>

          <div className="relative z-10">
            {/* Visualisation "Humaine" : Groupe d'avatars */}
            <div className="flex items-center -space-x-3 mb-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-12 h-12 rounded-full border-2 border-white overflow-hidden bg-gray-200">
                  <img
                    src={`https://i.pravatar.cc/100?img=${i + 10}`}
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              <div className="w-12 h-12 rounded-full border-2 border-white bg-[#FF6B00] flex items-center justify-center text-white text-xs font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>

            <h3 className="text-xl font-bold text-[#1C1917] mb-3 group-hover:text-[#FF6B00] transition-colors">
              Héros Vérifiés
            </h3>
            <p className="text-[#57534E] leading-relaxed">
              Pas d'anonymat ici. Nous rencontrons et vérifions l'identité de chaque expert pour que vous ouvriez votre porte en toute sérénité.
            </p>
          </div>
        </motion.div>

        {/* CARTE 2 : PAIEMENT (Approche "Soft" et sécurisante) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="group relative bg-white p-8 rounded-[2rem] border border-[#E7E5E4] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          <div className="w-14 h-14 rounded-2xl bg-orange-50 text-[#FF6B00] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <Wallet className="w-7 h-7" />
          </div>

          <h3 className="text-xl font-bold text-[#1C1917] mb-3 group-hover:text-[#FF6B00] transition-colors">
            Paiements Zen
          </h3>
          <p className="text-[#57534E] leading-relaxed mb-6">
            Votre argent est mis sous séquestre et n'est versé qu'une fois le travail terminé et votre sourire validé.
          </p>

          {/* Micro-interaction UI : Carte de crédit stylisée */}
          <div className="mt-auto bg-[#F5F5F4] rounded-xl p-3 flex items-center gap-3 opacity-60 group-hover:opacity-100 transition-opacity">
            <div className="w-8 h-5 bg-[#1C1917] rounded-sm"></div>
            <div className="h-2 w-20 bg-[#D6D3D1] rounded-full"></div>
            <div className="ml-auto text-green-600"><ShieldCheck className="w-4 h-4" /></div>
          </div>
        </motion.div>

        {/* CARTE 3 : DISPONIBILITÉ (Focus sur le voisinage) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="group relative bg-[#1C1917] p-8 rounded-[2rem] shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-white"
        >
          {/* Cette carte est sombre pour créer du contraste (Accent Card) */}
          <div className="absolute top-4 right-4 animate-pulse">
            <div className="w-3 h-3 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
          </div>

          <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 backdrop-blur-sm">
            <Clock className="w-7 h-7 text-[#FF6B00]" />
          </div>

          <h3 className="text-xl font-bold mb-3">
            Voisins Disponibles
          </h3>
          <p className="text-white/70 leading-relaxed mb-4">
            Pourquoi chercher loin ? Trouvez l'expert idéal qui vit juste au coin de votre rue, disponible maintenant.
          </p>

          <div className="flex items-center gap-2 text-sm font-medium text-[#FF6B00]">
            <Heart className="w-4 h-4 fill-current" />
            <span>Supportez l'économie locale</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}