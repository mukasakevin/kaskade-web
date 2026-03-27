import prisma from "@/lib/prisma";
import FinancialsClient from "./FinancialsClient";

export default async function AdminFinancialsPage() {
  const [totalRevenue, escrow, requests] = await Promise.all([
    prisma.request.aggregate({ where: { status: 'COMPLETED' }, _sum: { escrowAmount: true } }),
    prisma.request.aggregate({ where: { status: { in: ['CONFIRMED', 'SCHEDULED'] } }, _sum: { escrowAmount: true } }),
    prisma.request.findMany({ 
      take: 10,
      orderBy: { updatedAt: 'desc' },
      where: { isPaid: true },
      include: { client: true } 
    })
  ]);

  const stats = [
    { label: "Solde Total", value: `$${(totalRevenue._sum.escrowAmount || 0).toLocaleString()}`, trend: "+12%", color: "#FF6B00" },
    { label: "En Séquestre", value: `$${(escrow._sum.escrowAmount || 0).toLocaleString()}`, trend: "+4%", color: "#BC9C6C" },
    { label: "Payé Prestataires", value: `$${((totalRevenue._sum.escrowAmount || 0) * 0.8).toLocaleString()}`, trend: "+8%", color: "#321B13" },
    { label: "Commissions", value: `$${((totalRevenue._sum.escrowAmount || 0) * 0.2).toLocaleString()}`, trend: "+15%", color: "#FF6B00" },
  ];

  const transactions = requests.map(req => ({
    id: req.id.slice(-4),
    type: "PAIEMENT",
    amount: `+$${req.escrowAmount?.toLocaleString()}`,
    status: req.status === 'COMPLETED' ? 'RÉUSSI' : 'EN ATTENTE',
    date: new Date(req.updatedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }),
    method: "Digital Pay"
  }));

  return <FinancialsClient stats={stats} initialTransactions={transactions} />;
}
