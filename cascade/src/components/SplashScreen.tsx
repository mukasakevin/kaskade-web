"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function SplashScreen({ finishLoading }: { finishLoading: () => void }) {
  const [percent, setPercent] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Progression avec courbe d'accélération (ease-out dynamique)
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsExiting(true), 800); // Pause à 100% avant de sortir
          return 100;
        }
        // Plus on s'approche de 100, plus ça ralentit (effet naturel)
        const increment = prev < 50 ? Math.random() * 5 + 2 : prev < 85 ? Math.random() * 3 + 1 : Math.random() * 1.5 + 0.5;
        const next = prev + increment;
        return next > 100 ? 100 : next;
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const displayPercent = Math.floor(percent);

  return (
    <AnimatePresence onExitComplete={finishLoading}>
      {!isExiting && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            y: -40, 
            filter: "blur(12px)", 
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FFFFFF] overflow-hidden"
        >
          {/* Styles spécifiques pour l'effet "Eau/Vague" dans le texte */}
          <style jsx>{`
            .water-text {
              position: relative;
              color: transparent;
              -webkit-text-stroke: 1px rgba(26, 29, 33, 0.1);
              font-weight: 900;
            }
            .water-text::before {
              content: attr(data-text);
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              color: #f97415;
              -webkit-text-stroke: 0px transparent;
              clip-path: polygon(0% 45%, 16% 44%, 33% 50%, 54% 60%, 70% 61%, 84% 59%, 100% 52%, 100% 100%, 0% 100%);
              animation: water-move 4s ease-in-out infinite;
            }
            .water-text::after {
              content: attr(data-text);
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              color: #1A1D21;
              -webkit-text-stroke: 0px transparent;
              opacity: 0.9;
              clip-path: polygon(0% 60%, 15% 65%, 34% 66%, 51% 62%, 67% 50%, 84% 45%, 100% 46%, 100% 100%, 0% 100%);
              animation: water-move 6s ease-in-out infinite reverse;
            }
            @keyframes water-move {
              0%, 100% {
                clip-path: polygon(0% 45%, 16% 44%, 33% 50%, 54% 60%, 70% 61%, 84% 59%, 100% 52%, 100% 100%, 0% 100%);
              }
              50% {
                clip-path: polygon(0% 60%, 15% 65%, 34% 66%, 51% 62%, 67% 50%, 84% 45%, 100% 46%, 100% 100%, 0% 100%);
              }
            }
          `}</style>
          <div className="absolute inset-0 pointer-events-none opacity-[0.2] bg-[linear-gradient(to_right,#E2E8F0_1px,transparent_1px),linear-gradient(to_bottom,#E2E8F0_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
          <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#f97415] rounded-full blur-[150px] opacity-[0.05] pointer-events-none" />
          <div className="relative z-10 flex flex-col items-center w-full max-w-[280px] md:max-w-xl px-8">
            <div className="overflow-hidden mb-12 py-4">
              <motion.h1 
                initial={{ y: "40%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-6xl md:text-8xl tracking-[-0.04em] water-text"
                data-text="Kaskade.com"
              >
                Kaskade.com
              </motion.h1>
            </div>
            <div className="w-full relative mt-12">
              <motion.div className="flex justify-between items-end mb-4 font-mono text-[9px] uppercase tracking-[0.4em] text-[#64748B]">
                <span className="font-bold">System Loading</span>
                <span className="text-[#1A1D21] font-black">{displayPercent.toString().padStart(3, '0')}%</span>
              </motion.div>
              <motion.div className="w-full h-px bg-[#E2E8F0] relative overflow-hidden">
                <motion.div className="absolute top-0 left-0 h-full bg-[#f97415]" animate={{ width: `${percent}%` }} />
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}