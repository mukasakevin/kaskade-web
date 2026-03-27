import prisma from "@/lib/prisma";
import RequestsClient from "./RequestsClient";

export default async function AdminRequestsPage() {
  const requests = await prisma.request.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      client: true,
      service: true,
      provider: true
    }
  });

  const formattedRequests = requests.map(req => ({
    id: req.id,
    client: req.client.fullName,
    service: req.service.title,
    amount: req.escrowAmount ? `$${req.escrowAmount.toLocaleString()}` : "$0.00",
    status: req.status === 'COMPLETED' ? 'TERMINÉ' : 
            req.status === 'PENDING' ? 'EN ATTENTE' : 
            req.status === 'REJECTED' ? 'REJETÉ' : 'VÉRIFIÉ',
    date: new Date(req.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
  }));

  return <RequestsClient initialRequests={formattedRequests} />;
}
