"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import api from '@/lib/api';
import {
  Users,
  CreditCard,
  ArrowUpRight,
  Bell,
  Search,
  Plus,
  Loader2,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  User,
  Shield,
  BarChart3,
  MapPin,
  Target,
  Phone
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

// --- Types ---
interface DashboardStats {
  revenue: number;
  users: {
    total: number;
    clients: number;
    providers: number;
    conversionRate: number;
    topQuartier: string;
  };
  requests: {
    total: number;
  };
}

interface GrowthData {
  date: string;
  count: number;
}

/**
 * Page de gestion des clients (Enhanced Analytics + Repertoire)
 */
export default function ClientDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [clients, setClients] = useState<any[]>([]);
  const [growth, setGrowth] = useState<GrowthData[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchData = useCallback(async (isSync = false) => {
    try {
      if (isSync) setSyncing(true);
      else setLoading(true);

      const [statsRes, usersRes, growthRes] = await Promise.all([
        api.get('/admin/dashboard/stats'),
        api.get('/users'),
        api.get('/admin/dashboard/growth')
      ]);

      setStats(statsRes.data);
      setClients(usersRes.data.filter((u: any) => u.role === 'CLIENT'));
      setGrowth(growthRes.data);
    } catch (error) {
      console.error("Erreur sync data:", error);
    } finally {
      setLoading(false);
      setSyncing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredClients = clients.filter(c => 
    c.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FCFBF7] gap-8 font-sans">
        <div className="relative">
          <Loader2 className="w-12 h-12 animate-spin text-[#BC9C6C] stroke-[1.5px]" />
          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-[#321B13]">K</span>
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#321B13]/60">
          Chargement des Données Critiques
        </p>
      </div>
    );
  }

  const EnrollmentChart = () => (
    <div className="bg-white border border-[#321B13]/5 rounded-3xl p-10 shadow-sm flex flex-col h-full group hover:border-[#BC9C6C]/30 transition-all">
      <div className="flex justify-between items-start mb-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-[#BC9C6C]" />
            <h3 className="font-black text-xl uppercase tracking-tighter text-[#321B13]">Courbe de Croissance</h3>
          </div>
          <p className="text-[10px] text-[#321B13]/40 font-bold uppercase tracking-widest leading-relaxed">Analytique des flux d'inscriptions</p>
        </div>
        <div className="bg-[#FCFBF7] p-2 rounded-lg border border-[#321B13]/5">
          <BarChart3 className="w-4 h-4 text-[#321B13]/20" />
        </div>
      </div>

      <div className="flex-1 w-full min-h-[300px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={growth}>
            <defs>
              <linearGradient id="colorEnroll" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#BC9C6C" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#BC9C6C" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#321B13', 
                border: 'none', 
                borderRadius: '12px',
                fontSize: '10px',
                fontWeight: '900',
                color: '#fff',
                textTransform: 'uppercase',
                padding: '12px'
              }} 
              itemStyle={{ color: '#BC9C6C' }}
              labelStyle={{ color: 'rgba(255,255,255,0.4)', marginBottom: '8px' }}
            />
            <Area 
              type="monotone" 
              dataKey="count" 
              stroke="#321B13" 
              strokeWidth={4} 
              fill="url(#colorEnroll)" 
              animationDuration={2500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-10 pt-10 border-t border-[#321B13]/5 flex justify-between items-end">
        <div>
          <p className="text-4xl font-black tracking-tighter text-[#321B13]">
            {growth.reduce((sum, d) => sum + d.count, 0)}
          </p>
          <p className="text-[9px] font-bold uppercase text-[#321B13]/40 tracking-widest mt-1">Nouveaux membres / mois</p>
        </div>
        <div className="flex flex-col items-end gap-2 text-right">
           <span className="flex items-center gap-2 text-[9px] font-black text-green-600 bg-green-50 px-2 py-1 rounded-md uppercase">
             Stable +2%
           </span>
           <p className="text-[10px] font-black uppercase text-[#BC9C6C]">{syncing ? "SYNC..." : "LIVE"}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FCFBF7] text-[#321B13] p-8 lg:p-12 font-sans relative">
      
      {syncing && (
        <div className="fixed bottom-12 right-12 z-50 flex items-center gap-3 bg-[#321B13] text-white px-6 py-3 rounded-full shadow-2xl border border-[#BC9C6C]/30 animate-in fade-in slide-in-from-bottom-5">
          <Loader2 className="w-4 h-4 animate-spin text-[#BC9C6C]" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Synchronisation Base de Données</span>
        </div>
      )}

      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <div className="w-3 h-3 bg-[#BC9C6C] rounded-full"></div>
             <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#321B13]/40">Kaskade Admin Intel</p>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-gradient-to-r from-[#321B13] via-[#321B13] to-[#BC9C6C] bg-clip-text text-transparent uppercase leading-none">
            Gestion Clients
          </h1>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#321B13]/20 w-4 h-4 transition-colors group-focus-within:text-[#BC9C6C]" />
            <input
              type="text"
              placeholder="Rechercher une identité..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#321B13]/10 rounded-2xl py-4 pl-12 pr-6 text-sm focus:outline-none focus:ring-4 focus:ring-[#BC9C6C]/10 transition-all font-bold placeholder:text-[#321B13]/10"
            />
          </div>
          <button className="flex items-center gap-3 px-8 py-4 bg-[#321B13] text-white rounded-2xl hover:bg-[#BC9C6C] hover:text-[#321B13] transition-all shadow-xl shadow-[#321B13]/5 group">
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em]">Nouveau</span>
          </button>
        </div>
      </header>

      {/* Primary KPI Grid (Bento) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div className="md:col-span-1 bg-white border border-[#321B13]/5 p-8 rounded-3xl space-y-6 group hover:border-[#BC9C6C]/30 transition-all">
          <div className="p-4 bg-[#FCFBF7] rounded-2xl text-[#BC9C6C] w-fit shadow-sm"><CreditCard className="w-6 h-6" /></div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#321B13]/40 mb-1">C.A Plateforme</p>
            <p className="text-3xl font-black tracking-tighter font-mono">{stats?.revenue.toLocaleString('fr-FR') || 0} €</p>
          </div>
        </div>

        <div className="md:col-span-1 bg-white border border-[#321B13]/5 p-8 rounded-3xl space-y-6 group hover:border-[#BC9C6C]/30 transition-all">
          <div className="p-4 bg-[#321B13]/5 rounded-2xl text-[#321B13] w-fit shadow-sm"><Users className="w-6 h-6" /></div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#321B13]/40 mb-1">Membres Actifs</p>
            <p className="text-3xl font-black tracking-tighter">{stats?.users.clients || 0}</p>
          </div>
        </div>

        <div className="md:col-span-1 bg-[#321B13] text-white p-8 rounded-3xl space-y-6 relative overflow-hidden group">
          <div className="p-4 bg-white/10 rounded-2xl text-[#BC9C6C] w-fit relative z-10"><Target className="w-6 h-6" /></div>
          <div className="relative z-10">
            <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Conversion Mission</p>
            <p className="text-3xl font-black tracking-tighter">{Math.round(stats?.users.conversionRate || 0)}%</p>
          </div>
          <div className="absolute right-[-20px] top-[-20px] text-white/5 font-black text-9xl leading-none select-none">%</div>
        </div>

        <div className="md:col-span-1 bg-[#BC9C6C] text-[#321B13] p-8 rounded-3xl space-y-6 relative overflow-hidden group">
          <div className="p-4 bg-white/30 rounded-2xl text-[#321B13] w-fit relative z-10"><MapPin className="w-6 h-6" /></div>
          <div className="relative z-10">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#321B13]/30 mb-1">Secteur Dominant</p>
            <p className="text-3xl font-black tracking-tighter uppercase truncate">{stats?.users.topQuartier || "---"}</p>
          </div>
          <div className="absolute right-[-20px] bottom-[-20px] text-black/5 font-black text-9xl leading-none select-none overflow-hidden">
            <MapPin className="w-32 h-32" />
          </div>
        </div>
      </div>

      {/* Content Layout: Table & Chart */}
      <div className="max-w-[1700px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          
          {/* Main Repertoire (2/3) */}
          <div className="lg:col-span-2 bg-white border border-[#321B13]/5 rounded-[2.5rem] p-10 shadow-sm overflow-hidden">
            <div className="flex justify-between items-center mb-10 border-b border-[#321B13]/5 pb-8">
              <div>
                <h3 className="font-black text-2xl uppercase tracking-tighter text-[#321B13]">Répertoire PostgreSQL</h3>
                <p className="text-[10px] text-[#321B13]/40 font-bold uppercase tracking-widest mt-1 italic">Intégrité des données auditée en temps réel</p>
              </div>
              <button 
                onClick={() => fetchData(true)}
                className="group flex items-center gap-3 px-5 py-2 border border-[#321B13]/10 text-[9px] font-black uppercase tracking-widest hover:bg-[#321B13] hover:text-white transition-all rounded-full"
              >
                <Loader2 className={`w-3 h-3 ${syncing ? 'animate-spin' : ''}`} />
                {syncing ? "Mise à jour..." : "Refresh Direct"}
              </button>
            </div>

            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#321B13]/5">
                    <th className="pb-8 text-[11px] font-black uppercase tracking-widest text-[#321B13]/30">Identité & Contact</th>
                    <th className="pb-8 text-[11px] font-black uppercase tracking-widest text-[#321B13]/30">Localisation</th>
                    <th className="pb-8 text-[11px] font-black uppercase tracking-widest text-[#321B13]/30 text-center">Statut</th>
                    <th className="pb-8 text-right text-[11px] font-black uppercase tracking-widest text-[#321B13]/30">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#321B13]/5">
                  {filteredClients.map((client: any) => (
                    <tr key={client.id} className="group hover:bg-[#FCFBF7] transition-all">
                      <td className="py-8">
                        <div className="flex items-center gap-6">
                          <div className="w-14 h-14 bg-[#321B13] text-[#BC9C6C] flex items-center justify-center font-black text-lg rounded-2xl shadow-lg shadow-[#321B13]/5">
                            {client.fullName.charAt(0)}
                          </div>
                          <div>
                            <p className="text-[13px] font-black uppercase text-[#321B13] group-hover:text-[#BC9C6C] transition-colors">{client.fullName}</p>
                            <div className="flex items-center gap-4 mt-2">
                               <span className="flex items-center gap-1.5 text-[9px] font-bold text-[#321B13]/30 uppercase"><Phone className="w-2.5 h-2.5" /> {client.phone || "---"}</span>
                               <span className="flex items-center gap-1.5 text-[9px] font-bold text-[#321B13]/30 uppercase"><Users className="w-2.5 h-2.5" /> {client.email}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-8">
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] font-black uppercase text-[#321B13]/60">{client.quartier || "Secteur Indéfini"}</span>
                          <span className="text-[9px] font-bold text-[#321B13]/20 uppercase">Portefeuille: 0 USD</span>
                        </div>
                      </td>
                      <td className="py-8 text-center">
                        <div className="flex flex-col items-center gap-2">
                           <ShieldCheck className={`w-5 h-5 ${client.isVerified ? 'text-blue-500' : 'text-[#321B13]/10'}`} />
                           <span className={`text-[8px] font-black uppercase tracking-widest ${client.isVerified ? 'text-blue-500' : 'text-[#321B13]/20'}`}>
                             {client.isVerified ? 'Vérifié' : 'À Faire'}
                           </span>
                        </div>
                      </td>
                      <td className="py-8 text-right">
                        <button 
                           onClick={() => router.push(`/admin/client?id=${client.id}`)}
                           className="p-4 bg-white border border-[#321B13]/5 rounded-2xl hover:bg-[#321B13] hover:text-white transition-all transform group-hover:translate-x-1 shadow-sm hover:shadow-xl"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredClients.length === 0 && (
                <div className="py-32 text-center space-y-6">
                  <div className="w-20 h-20 bg-[#FCFBF7] rounded-full flex items-center justify-center mx-auto border border-dashed border-[#321B13]/10">
                    <User className="w-8 h-8 text-[#321B13]/5" strokeWidth={1} />
                  </div>
                  <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[#321B13]/20 italic">Aucune donnée critique détectée</p>
                </div>
              )}
            </div>
          </div>

          {/* Analytics Column (1/3) */}
          <div className="lg:col-span-1 space-y-8">
            <EnrollmentChart />
            <div className="bg-[#321B13] p-10 rounded-[2.5rem] text-white space-y-8 shadow-2xl relative overflow-hidden">
               <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-[#BC9C6C] border-b border-white/10 pb-4 relative z-10">Rapport de Performance</h4>
               <div className="space-y-6 relative z-10">
                  <div className="flex justify-between items-end">
                     <span className="text-[10px] uppercase font-bold text-white/40">Engagement Client</span>
                     <span className="text-xl font-black">94%</span>
                  </div>
                  <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                     <div className="bg-[#BC9C6C] h-full w-[94%]"></div>
                  </div>
                  <p className="text-[9px] text-white/30 uppercase leading-relaxed font-bold">
                    Les indicateurs montrent une corrélation forte entre la vérification du profil et le volume des missions.
                  </p>
               </div>
               <div className="absolute right-[-10%] bottom-[-5%] text-white/[0.02] text-[15rem] leading-none font-black select-none pointer-events-none">A</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}