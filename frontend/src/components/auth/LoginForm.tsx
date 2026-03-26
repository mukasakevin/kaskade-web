"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { loginSchema, LoginInput } from '@/lib/validations/auth';
import api from '@/lib/api';

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    try {
      // Pour l'instant on simule, mais l'api est prête !
      // await api.post('/auth/login', data);
      await new Promise(r => setTimeout(r, 1000));
      toast.success("Authentification réussie. Bienvenue dans le système.");

    } catch (error: any) {
      toast.error(error.response?.data?.message || "Échec de l'initialisation de la session.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col justify-center px-6 md:px-16 py-12 md:py-16 bg-off-white min-h-[60vh]">
      <div className="max-w-sm w-full mx-auto">
        <header className="mb-8 md:mb-12">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-ocre font-sans text-[9px] uppercase tracking-[0.25em] mb-3 block font-bold"
          >
            Authentification Système
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-serif font-bold tracking-tight text-chocolat mb-3"
          >
            Bienvenue.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-chocolat/85 text-xs font-sans leading-relaxed"
          >
            Initialisez votre session sécurisée au sein de l'écosystème Kaskade.
          </motion.p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 md:space-y-8">
          <div className="space-y-5 md:space-y-6">
            {/* Email Field */}
            <div className="group">
              <label 
                className={`block font-sans text-[9px] uppercase tracking-[0.1em] mb-2 transition-colors ${
                  errors.email ? 'text-red-500' : 'text-chocolat/60 group-focus-within:text-ocre'
                }`}
              >
                Identification
              </label>
              <input 
                {...register('email')}
                className={`w-full bg-white border border-ocre/20 rounded-[6px] p-3.5 text-sm text-chocolat placeholder:text-chocolat/20 focus:ring-1 focus:ring-ocre/30 focus:border-ocre transition-all outline-none ${
                    errors.email ? 'border-red-500 bg-red-50/10' : ''
                }`}
                placeholder="email@kaskade.systems" 
                type="email"
                disabled={isLoading}
              />
              {errors.email && (
                <p className="mt-2 text-[9px] text-red-500 uppercase tracking-wider font-bold">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="group">
              <div className="flex justify-between items-center mb-2">
                <label 
                  className={`block font-sans text-[9px] uppercase tracking-[0.1em] transition-colors ${
                    errors.password ? 'text-red-500' : 'text-chocolat/60 group-focus-within:text-ocre'
                  }`}
                >
                  Clé d’Accès
                </label>
                <a 
                   href="#" 
                   className="text-ocre font-sans text-[8px] uppercase tracking-[0.1em] hover:text-chocolat transition-colors font-bold"
                >
                    Clé oubliée ?
                </a>
              </div>
              <input 
                {...register('password')}
                className={`w-full bg-white border border-ocre/20 rounded-[6px] p-3.5 text-sm text-chocolat placeholder:text-chocolat/20 focus:ring-1 focus:ring-ocre/30 focus:border-ocre transition-all outline-none ${
                    errors.password ? 'border-red-500 bg-red-50/10' : ''
                }`}
                placeholder="••••••••" 
                type="password"
                disabled={isLoading}
              />
              {errors.password && (
                <p className="mt-2 text-[9px] text-red-500 uppercase tracking-wider font-bold">{errors.password.message}</p>
              )}
            </div>
          </div>

          <div className="pt-4 space-y-6 md:space-y-8">
            <button 
                type="submit"
                disabled={isLoading}
                className="w-full py-4 px-8 bg-ocre text-chocolat font-bold uppercase tracking-[0.15em] text-[10px] rounded-[6px] shadow-sm hover:bg-chocolat hover:text-ocre transition-all duration-300 disabled:opacity-50 cursor-pointer"
            >
                {isLoading ? 'Initialisation...' : 'Initialiser la session'}
            </button>
            <div className="flex items-center justify-between pt-4 border-t border-ocre/10">
                <span className="text-chocolat/50 text-[9px] uppercase tracking-[0.05em] font-medium">Pas de compte ?</span>
                <a 
                    href="#" 
                    className="text-ocre font-bold uppercase tracking-[0.05em] text-[10px] hover:text-chocolat transition-all"
                >
                    Demander un accès
                </a>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
