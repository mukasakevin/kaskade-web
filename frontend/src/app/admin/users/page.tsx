import prisma from "@/lib/prisma";
import UsersClient from "./UsersClient";

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { clientRequests: true, providerRequests: true }
      }
    }
  });

  const formattedUsers = users.map(user => ({
    id: user.id,
    name: user.fullName,
    email: user.email,
    role: user.role, // CLIENT, PROVIDER, ADMIN
    status: user.isActive ? "ACTIF" : "INACTIF",
    joined: new Date(user.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }),
    tasks: user.role === 'PROVIDER' ? user._count.providerRequests : user._count.clientRequests,
    rating: 5.0 // Placeholder for now as we don't have a computed average rating easily in this view
  }));

  return <UsersClient initialUsers={formattedUsers} />;
}
