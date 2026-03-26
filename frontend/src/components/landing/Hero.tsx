"use client";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative pt-32 pb-24 md:pt-40 md:pb-48 overflow-hidden min-h-[90vh] flex items-center"
            style={{ background: "radial-gradient(circle at 70% 50%, #F0F4FA 0%, #FDFCFB 60%, #FFFFFF 100%)" }}>

            <div className="absolute right-0 top-0 w-full lg:w-[55%] h-full z-0 overflow-hidden">
                <div className="relative w-full h-full" style={{ maskImage: "linear-gradient(to left, black 50%, transparent 100%)", WebkitMaskImage: "linear-gradient(to left, black 50%, transparent 100%)" }}>
                    <img
                        className="w-full h-full object-cover object-[center_top]"
                        alt="Coiffeur professionnel"
                        src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2070&auto=format&fit=crop"
                    />
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-8 w-full z-10 relative">
                <div className="max-w-3xl">
                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-5xl md:text-[84px] font-extrabold tracking-tight leading-[0.95] mb-8 text-[#0F172A]"
                    >
                        Simplifiez votre quotidien.<br />
                        <span className="text-[#1A73E8]">L'excellence locale à portée de clic.</span>
                    </motion.h1>

                    <motion.p 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="text-[#475569] text-xl md:text-2xl font-medium mb-12 max-w-xl leading-relaxed"
                    >
                        La référence premium pour connecter talents locaux et clients exigeants.
                    </motion.p>

                    {/* Search Component */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        className="max-w-2xl bg-white rounded-full p-2 shadow-2xl shadow-blue-900/10 border border-slate-100 flex items-center group focus-within:ring-4 focus-within:ring-[#1A73E8]/5 transition-all"
                    >
                        <div className="flex-1 flex items-center px-6">
                            <Search className="text-slate-400 mr-3 w-5 h-5" />
                            <input className="w-full bg-transparent border-none focus:ring-0 text-[#0F172A] placeholder:text-slate-400 font-medium py-4 text-lg" placeholder="De quel service avez-vous besoin ?" type="text" />
                        </div>
                        <button 
                            onClick={() => {
                                import("sonner").then(({ toast }) => {
                                    toast.success("Recherche lancée avec succès ! (Test)");
                                });
                            }}
                            className="bg-[#1A73E8] text-white px-10 py-4 rounded-full font-bold text-lg active:scale-0.95 shadow-lg shadow-[#1A73E8]/20 hover:bg-blue-700 transition-all"
                        >
                            Rechercher
                        </button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
