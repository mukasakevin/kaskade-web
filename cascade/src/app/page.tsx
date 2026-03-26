"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SplashScreen from "../components/SplashScreen";
import { 
  Search, 
  ShieldCheck, 
  CreditCard, 
  Clock, 
  ArrowRight, 
  UserSearch, 
  MessageCircle, 
  Lock, 
  CheckCircle2, 
  Phone 
} from "lucide-react";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="bg-[#FDFCFB] min-h-screen text-[#0F172A] font-sans selection:bg-[#1A73E8]/10 overflow-x-hidden">
      <AnimatePresence mode="wait">
        {loading ? (
          <SplashScreen key="splash" finishLoading={() => setLoading(false)} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-col"
          >
            {/* TopNavBar */}
            <header className="fixed top-0 w-full z-50 bg-white/60 backdrop-blur-xl border-b border-slate-200/50">
              <nav className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
                <a className="text-2xl font-extrabold tracking-tighter text-[#0F172A]" href="#">
                  Kaskade.com
                </a>
                <div className="hidden md:flex items-center gap-10">
                  <a className="text-[#1A73E8] font-semibold text-sm" href="#">Marketplace</a>
                  <a className="text-[#475569] hover:text-[#1A73E8] transition-colors font-semibold text-sm" href="#">Services</a>
                  <a className="text-[#475569] hover:text-[#1A73E8] transition-colors font-semibold text-sm" href="#">Process</a>
                  <a className="text-[#475569] hover:text-[#1A73E8] transition-colors font-semibold text-sm" href="#">About</a>
                </div>
                <button className="bg-[#1A73E8] text-white px-7 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-[#1A73E8]/20 hover:shadow-[#1A73E8]/30 transition-all duration-200 active:scale-[0.97]">
                  Get Started
                </button>
              </nav>
            </header>

            {/* Hero Section */}
            <section className="relative pt-32 pb-24 md:pt-40 md:pb-48 overflow-hidden min-h-[90vh] flex items-center" 
              style={{ background: "radial-gradient(circle at 70% 50%, #F0F4FA 0%, #FDFCFB 60%, #FFFFFF 100%)" }}>
              
              <div className="absolute right-0 top-0 w-full lg:w-[55%] h-full z-0 overflow-hidden">
                <div className="relative w-full h-full" style={{ maskImage: "linear-gradient(to left, black 50%, transparent 100%)", WebkitMaskImage: "linear-gradient(to left, black 50%, transparent 100%)" }}>
                  <img 
                    className="w-full h-full object-cover object-[center_top]" 
                    alt="Artisan ébéniste"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIcdgq7jqoMz0FMpK840MmixMGvfdXDgauOd7kxJOgvXkm_dxg3hWNOZCsa5YjJQg49N4IAknL7cjzeIDTjRrkpW3XWeBC3Z-jabqwyGJg4znfRDvj_fs8QC2Fu0siNbae3v6Bb-XBCi8V_pNysrim5-IGm6p-qrb915uQ5EV_F4KYqO2S6vGq80myAdAZM3TvQwnLqiI1pkwfHPBIW1g9AymytKCyv91o9AlqFVjcF6f5CXotli_LQXaZTWGcpsIoZIzoIkOWnbk"
                  />
                </div>

                <motion.div 
                  animate={{ translateY: [0, -15, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute left-[5%] top-[20%] z-20 bg-white/70 backdrop-blur-md border border-white/40 p-3 pr-6 rounded-full flex items-center gap-3 shadow-xl"
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0">
                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBH1MZojCecgZK_nIztVEpd4X3sNM2SZoGNWvbpO0MwbyjTcb1lltLloKQlTa4-tHqpvTEtP9uq1Vh8kzkmx6A3Fk8iwtAsL7v_RImrZXD03BIjUWY4fT8tkRu8v37IhEfZtKnYADayCdrOPNo3JJKc2gujGlRy6xmNaNR77ikieOtB5lEWcDvS7JuZPkCrgIWqxytz8W8tXx2Qd4pGuVIfHw4octLUt5CHfcZPCfVhqpWdwhwMTRSnVRq9HQfsvOI01odp8-moOJg" alt="Lucas Profile" />
                  </div>
                  <div>
                    <p className="font-bold text-xs uppercase tracking-tight">Lucas, Ébéniste</p>
                    <p className="text-[9px] text-[#1A73E8] font-bold uppercase tracking-wider">À 1.5km • Certifié</p>
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ translateY: [0, -15, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                  className="absolute right-[10%] bottom-[20%] z-20 bg-white/70 backdrop-blur-md border border-white/40 p-3 pr-6 rounded-full flex items-center gap-3 shadow-xl"
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0">
                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCX2PBe6NuhtqHsFa-ditD_KcQ2TpfQnRREB7fgC4D2kJBD9NFrHJgBFqISAsvdln0oN6gQrncGb5lvoDZ1fpunPp_apnaJnGQ9DH8Y-QAJdSKl718V-vy0noBNHOMZrdf4Wi7ELo5QmJTQW2k_zjtTb1LCepFA-LsSxzxbQifvx6vmRCkmJR6_PtD2jaRU9hweeDXnnOSxFWTmlnkOSPx2siNNcRq67DnORjLQAnii-_XYYH_u2V25Ewq07gUtZiHwjcX7_09Vh6A" alt="Elena Profile" />
                  </div>
                  <div>
                    <p className="font-bold text-xs uppercase tracking-tight">Elena, Designer</p>
                    <p className="text-[9px] text-[#1A73E8] font-bold uppercase tracking-wider">Vérifiée ★ 5.0</p>
                  </div>
                </motion.div>
              </div>

              <div className="max-w-7xl mx-auto px-8 w-full z-10 relative">
                <div className="max-w-3xl">
                  <h1 className="text-5xl md:text-[84px] font-extrabold tracking-tight leading-[0.95] mb-8 text-[#0F172A]">
                    Simplifiez votre quotidien.<br/>
                    <span className="text-[#1A73E8]">L'excellence locale à portée de clic.</span>
                  </h1>
                  <p className="text-[#475569] text-xl md:text-2xl font-medium mb-12 max-w-xl leading-relaxed">
                    La référence premium pour connecter talents locaux et clients exigeants.
                  </p>

                  {/* Search Component */}
                  <div className="max-w-2xl bg-white rounded-full p-2 shadow-2xl shadow-blue-900/10 border border-slate-100 flex items-center group focus-within:ring-4 focus-within:ring-[#1A73E8]/5 transition-all">
                    <div className="flex-1 flex items-center px-6">
                      <Search className="text-slate-400 mr-3 w-5 h-5" />
                      <input className="w-full bg-transparent border-none focus:ring-0 text-[#0F172A] placeholder:text-slate-400 font-medium py-4 text-lg" placeholder="De quel service avez-vous besoin ?" type="text"/>
                    </div>
                    <button className="bg-[#1A73E8] text-white px-10 py-4 rounded-full font-bold text-lg active:scale-0.95 shadow-lg shadow-[#1A73E8]/20 hover:bg-blue-700 transition-all">
                      Rechercher
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Trust Elements */}
            <section className="py-24 px-8 max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
                <div className="flex flex-col items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-[#1A73E8]">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">Héros Locaux Vérifiés</h3>
                    <p className="text-[#475569] leading-relaxed text-lg">Chaque professionnel sur Kaskade fait l'objet d'une vérification rigoureuse.</p>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-[#1A73E8]">
                    <CreditCard className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">Paiements Sécurisés</h3>
                    <p className="text-[#475569] leading-relaxed text-lg">Transactions protégées. Les fonds ne sont débloqués qu'après validation.</p>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-[#1A73E8]">
                    <Clock className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">Disponibilité Immédiate</h3>
                    <p className="text-[#475569] leading-relaxed text-lg">Trouvez l'expert idéal disponible dès maintenant dans votre quartier.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Bento Grid Services */}
            <section className="py-32 px-8 bg-[#F8FAFC]">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
                  <div>
                    <span className="text-[#1A73E8] font-bold tracking-[0.2em] text-xs uppercase mb-4 block">Découvrir</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Nos catégories premium</h2>
                  </div>
                  <button className="flex items-center gap-2 text-[#0F172A] font-bold group border-b-2 border-transparent hover:border-[#1A73E8] transition-all pb-1">
                    Voir tous les services <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-auto md:grid-rows-2 gap-6 h-auto md:h-[750px]">
                  {/* Large Card: Repair & Tech */}
                  <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-[32px] shadow-xl hover:shadow-2xl transition-all duration-500 min-h-[400px]">
                    <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRZet1gaIZIB_sb72MIh6t0Ul_nZY36OQu7JxYlinwurMqsAZ9LoRNC1R-YMdP6vagjOXpRglY9AqU230iQlSSN2CJgr1x08qU7vpt0lwkNekOTm4lKrO2m112vA_Ye0zN20nr2rz_5bf_kSyUfDHzwmw7pENRtF3bIqkj3W2vbXyp3V9iFl3u8NtDX6KLjrTBaxYjKXaIuT9Uv7Ok25pRXebt1kbGKCn81r2GqXcA76cJ3-iy1z6_aj9YrzvBWqjrtAXIUj_2BrI" alt="Repair" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0) 60%)" }}></div>
                    <div className="absolute top-8 left-8">
                      <span className="bg-white/70 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-[10px] font-bold text-[#0F172A] uppercase tracking-widest">Expertise Tech</span>
                    </div>
                    <div className="absolute bottom-0 left-0 p-10 w-full">
                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">Réparation & Tech</h3>
                      <p className="text-slate-200 text-lg">45 experts hautement qualifiés à proximité</p>
                    </div>
                  </div>

                  {/* Medium Card: House Maintenance */}
                  <div className="md:col-span-2 md:row-span-1 relative group overflow-hidden rounded-[32px] shadow-lg hover:shadow-xl transition-all duration-500 min-h-[300px]">
                    <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBk85WeV6qg_jMrN_TgxOJyvXS0IrYZT7c5nS_5oKZ8bDsUmr8CB9UXKkchJT1ivEu2NxDXpeorojrg89AOLBIzwbemgtjbZOM3ozrzttKK4LXaW38b5BaxecWU2ye3qIqyEwqlJgb743O6dn0N2vjF10_vFmVkF7LfhL9cllSrafo5lkrCOon0E88S2tMCKhlcAJU530Tx8ltb2U4Oa6WoIRLyZxN4gZ-dfX-CD3vlonY6m9lpixnjGhqoe2AAYEqVbSkdBDX6oTE" alt="House" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0) 60%)" }}></div>
                    <div className="absolute top-6 left-6">
                      <span className="bg-white/70 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-[10px] font-bold text-[#0F172A] uppercase tracking-widest">Maison & Confort</span>
                    </div>
                    <div className="absolute bottom-0 left-0 p-8 w-full">
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Entretien Maison</h3>
                      <p className="text-slate-200 text-lg">Services premium pour votre intérieur</p>
                    </div>
                  </div>

                  <div className="md:col-span-1 md:row-span-1 relative group overflow-hidden rounded-[32px] min-h-[300px]">
                    <img className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXBzV3AQ4bXBq5IHRw0PF59dbhcXP2dc-k0G5iBe6s-8IOvgyBJdasDQKCiFV_YBWEoDDtM92tb7Tqp66e68mP3gDSuNKsKaKq_Kxw2W4D_CjiRZOkOfy1YWRYUH0wnqawfUt6lmFtAr4oaq4nnQMvzRB8yJMV6s5_Cin_Uc6AHgLTfposNNxjQxqxLUGUJyY_faWo2RBxxuDoDtddFWRQLLszmxbqUDsULUdDjRSKvBHwhoZU2Q6PK9dY6xWCGOKZzU3CEC0RL4s" alt="Wellness" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0) 60%)" }}></div>
                    <div className="absolute bottom-0 left-0 p-6 w-full">
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-1">Bien-être</h3>
                      <p className="text-slate-200 text-sm">Coaching & Soins</p>
                    </div>
                  </div>

                  <div className="md:col-span-1 md:row-span-1 relative group overflow-hidden rounded-[32px] min-h-[300px]">
                    <img className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVYpZQxtOpX5R2D1TJwi-wvy6FzeLHnL2b0fllWBYuoSlXow1CWM8oPaBSSS6PF7v6d-JhT1FH7Y_e9dDqoWuldr79pVNszn-Xt6o6X8fP0keXRtmo49vTXkMcDO4hJ5N7tpvoxwSVeViuOnoEvN8HPFomvKYs1VuURzhMylaj2jFx2eomE_hnA7noImZA4vY3thALQfauurahSfKcyTLHb-TtCeLVrYj8C2pVDqaBMLTQWUe4nbL0-a6ErqjN13luIoGydOo9FAo" alt="Pets" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0) 60%)" }}></div>
                    <div className="absolute bottom-0 left-0 p-6 w-full">
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-1">Animaux</h3>
                      <p className="text-slate-200 text-sm">Toilettage de luxe</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Expérience Kaskade */}
            <section className="py-32 px-8 max-w-7xl mx-auto">
              <div className="text-center mb-24">
                <h2 className="text-5xl font-extrabold mb-6 tracking-tight">L'expérience Kaskade</h2>
                <p className="text-[#475569] text-xl max-w-2xl mx-auto">Un processus simple, transparent et sécurisé pour votre sérénité.</p>
              </div>
              <div className="relative grid grid-cols-1 md:grid-cols-4 gap-12">
                {[
                  { title: "Cherchez", desc: "Parcourez les profils vérifiés et choisissez l'expertise.", icon: UserSearch },
                  { title: "Collaborez", desc: "Discutez des détails et fixez vos modalités ensemble.", icon: MessageCircle },
                  { title: "Réservez", desc: "Paiement sécurisé via Mobile Money avec protection.", icon: Lock },
                  { title: "Validez", desc: "Appréciez le résultat et libérez le paiement final.", icon: CheckCircle2 },
                ].map((step, i) => (
                  <div key={i} className="relative flex flex-col items-center text-center group">
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-8 z-10 transition-all duration-300 ${i === 3 ? 'bg-[#1A73E8] text-white shadow-xl shadow-[#1A73E8]/20' : 'bg-slate-50 border border-slate-100 group-hover:bg-[#1A73E8] group-hover:text-white'}`}>
                      <step.icon className="w-8 h-8" />
                    </div>
                    <h4 className="font-bold text-xl mb-3">{step.title}</h4>
                    <p className="text-[#475569]">{step.desc}</p>
                    {i < 3 && <div className="hidden md:block absolute top-10 left-1/2 w-full h-[1px] bg-slate-200 -z-0"></div>}
                  </div>
                ))}
              </div>
            </section>

            {/* Final CTA */}
            <section className="py-32 px-8">
              <div className="max-w-7xl mx-auto bg-[#0A192F] rounded-[3rem] p-12 md:p-32 text-center text-white overflow-hidden relative shadow-2xl">
                <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[600px] h-[600px] bg-[#1A73E8]/20 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]"></div>
                <div className="relative z-10">
                  <h2 className="text-5xl md:text-7xl font-extrabold mb-10 max-w-4xl mx-auto leading-tight">Prêt à transformer votre quotidien ?</h2>
                  <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                    <button className="bg-white text-slate-900 px-12 py-5 rounded-full font-bold text-xl active:scale-0.95 shadow-xl transition-all">
                      Créer mon compte
                    </button>
                    <button className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-full font-bold hover:bg-white/20 transition-all active:scale-0.95">
                      <Phone className="w-5 h-5" />
                      Nous contacter
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="w-full bg-slate-950 text-white rounded-t-[4rem] mt-20 pt-24 pb-12 overflow-hidden relative">
              <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl -z-0"></div>
              <div className="max-w-7xl mx-auto px-8 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-16">
                  <div className="max-w-sm">
                    <a className="text-3xl font-extrabold text-white mb-8 block tracking-tighter" href="#">Kaskade.com</a>
                    <p className="text-slate-400 text-lg leading-relaxed mb-10 text-pretty">
                      La référence premium pour connecter talents locaux et clients exigeants en toute sécurité.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-16 md:gap-24">
                    <div>
                      <h5 className="font-bold mb-8 text-[10px] uppercase tracking-[0.3em] text-[#1A73E8]">Plateforme</h5>
                      <ul className="space-y-4 text-slate-400 font-medium text-sm">
                        <li><a className="hover:text-white transition-colors" href="#">Devenir Expert</a></li>
                        <li><a className="hover:text-white transition-colors" href="#">Nos Services</a></li>
                        <li><a className="hover:text-white transition-colors" href="#">Marketplace</a></li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-bold mb-8 text-[10px] uppercase tracking-[0.3em] text-[#1A73E8]">Légal</h5>
                      <ul className="space-y-4 text-slate-400 font-medium text-sm">
                        <li><a className="hover:text-white transition-colors" href="#">Confidentialité</a></li>
                        <li><a className="hover:text-white transition-colors" href="#">Conditions</a></li>
                      </ul>
                    </div>
                    <div className="col-span-2 lg:col-span-1">
                      <h5 className="font-bold mb-8 text-[10px] uppercase tracking-[0.3em] text-[#1A73E8]">Paiement Sécurisé</h5>
                      <div className="flex flex-wrap gap-3">
                        <div className="px-4 py-2 bg-white/5 rounded-xl flex items-center gap-3 border border-white/10">
                          <div className="w-2 h-2 rounded-full bg-red-500"></div>
                          <span className="text-[10px] font-bold tracking-widest uppercase">M-PESA</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-12 border-t border-white/5 flex justify-between items-center text-slate-500 text-xs">
                  <p>© 2024 Kaskade.com. Excellence & Trust.</p>
                </div>
              </div>
            </footer>

            {/* WhatsApp Float */}
            <a className="fixed bottom-8 right-8 z-[100] w-16 h-16 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-2xl" 
               style={{ background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)" }} href="#">
              <MessageCircle className="w-8 h-8 fill-transparent" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}