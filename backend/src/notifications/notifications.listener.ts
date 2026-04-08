import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NotificationsService } from './notifications.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotificationsListener {
  private readonly logger = new Logger(NotificationsListener.name);

  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly prisma: PrismaService,
  ) {}

  // Helpers pour récupérer rapidement les Admins
  private async getAdmins() {
    return this.prisma.user.findMany({ where: { role: 'ADMIN' } });
  }

  // ─── AUTHENTIFICATION ───────────────────────────────────────────────────
  @OnEvent('auth.registered')
  async handleAuthRegistered(payload: { userId: string }) {
    await this.notificationsService.createNotification({
      userId: payload.userId,
      title: 'Bienvenue chez Kaskade !',
      message: 'Nous sommes ravis de vous compter parmi nous. Découvrez nos services dès maintenant.',
      type: 'AUTH_WELCOME',
    });
    this.logger.log(`Notification envoyée (Bienvenue) au user ${payload.userId}`);
  }

  // ─── DEVENIR PRESTATAIRE ────────────────────────────────────────────────
  @OnEvent('provider.applied')
  async handleProviderApplied(payload: { userId: string }) {
    // 1. Notifier le client
    await this.notificationsService.createNotification({
      userId: payload.userId,
      title: 'Candidature reçue',
      message: 'Nous avons bien reçu votre demande. L\'équipe Kaskade vous contactera prochainement.',
      type: 'PROVIDER_APPLY_RECEIVED',
    });

    // 2. Notifier tous les Admins
    const admins = await this.getAdmins();
    const notifications = admins.map((admin) => ({
      userId: admin.id,
      title: 'Nouvelle demande prestataire',
      message: `Un utilisateur (ID: ${payload.userId}) vient de soumettre une demande pour devenir prestataire.`,
      type: 'PROVIDER_APPLY_SUBMITTED',
    }));
    await this.notificationsService.createManyNotifications(notifications);
  }

  @OnEvent('provider.application.resolved')
  async handleProviderApplicationResolved(payload: { userId: string; status: 'APPROVED' | 'REJECTED' }) {
    const isApproved = payload.status === 'APPROVED';
    await this.notificationsService.createNotification({
      userId: payload.userId,
      title: isApproved ? 'Candidature Acceptée !' : 'Candidature Refusée',
      message: isApproved 
        ? 'Félicitations, vous êtes maintenant Prestataire chez Kaskade.' 
        : 'Malheureusement, votre demande pour devenir prestataire n\'a pas été retenue pour le moment.',
      type: 'PROVIDER_APPLY_RESOLVED',
    });
  }

  // ─── GESTION DES SERVICES ───────────────────────────────────────────────
  @OnEvent('service.created')
  async handleServiceCreated(payload: { serviceId: string; serviceName: string }) {
    const clients = await this.prisma.user.findMany({ where: { role: 'CLIENT' } });
    const notifications = clients.map((client) => ({
      userId: client.id,
      title: 'Nouveau service disponible !',
      message: `Découvrez notre nouveau service dans le catalogue : ${payload.serviceName}.`,
      type: 'SERVICE_CREATED',
    }));
    
    // Note: Dans un vrai système en prod avec 100K clients, on utiliserait un worker (RabbitMQ, Redis Queue) pour cela.
    if (notifications.length > 0) {
      await this.notificationsService.createManyNotifications(notifications);
    }
  }

  @OnEvent('service.updated')
  async handleServiceUpdated(payload: { serviceId: string; serviceName: string }) {
    const users = await this.prisma.user.findMany({ 
      where: { role: { in: ['CLIENT', 'PROVIDER'] } } 
    });
    
    const notifications = users.map((user) => ({
      userId: user.id,
      title: 'Mise à jour d\'un service',
      message: `Le service "${payload.serviceName}" a été mis à jour dans le catalogue.`,
      type: 'SERVICE_UPDATED',
    }));

    if (notifications.length > 0) {
      await this.notificationsService.createManyNotifications(notifications);
    }
  }

  // ─── WORKFLOW DEMANDE DE SERVICE ────────────────────────────────────────
  
  // 1. Client crée -> L'admin est notifié
  @OnEvent('request.created')
  async handleRequestCreated(payload: { requestId: string; clientId: string }) {
    const admins = await this.getAdmins();
    const notifications = admins.map((admin) => ({
      userId: admin.id,
      title: 'Nouvelle demande reçue',
      message: `Une nouvelle demande (ID: ${payload.requestId}) nécessite votre approbation.`,
      type: 'REQUEST_CREATED',
    }));
    await this.notificationsService.createManyNotifications(notifications);
  }

  // 2. Admin approuve -> Les prestataires compatibles sont notifiés
  @OnEvent('request.approved')
  async handleRequestApproved(payload: { requestId: string; serviceId: string }) {
    // Retrouver les prestataires qui ont ce service
    const providers = await this.prisma.user.findMany({
      where: {
        role: 'PROVIDER',
        services: { some: { id: payload.serviceId } }
      }
    });

    const notifications = providers.map((provider) => ({
      userId: provider.id,
      title: 'Nouvelle mission disponible !',
      message: 'Une demande a été approuvée dans votre domaine d\'expertise. Acceptez-la vite !',
      type: 'REQUEST_APPROVED',
    }));

    if (notifications.length > 0) {
      await this.notificationsService.createManyNotifications(notifications);
    }
  }

  // 3. Prestataire accepte -> L'Admin et le Client sont notifiés
  @OnEvent('request.accepted')
  async handleRequestAccepted(payload: { requestId: string; clientId: string; providerId: string }) {
    // Notifier le client
    await this.notificationsService.createNotification({
      userId: payload.clientId,
      title: 'Mission acceptée !',
      message: 'Un prestataire a accepté votre demande et est en route !',
      type: 'REQUEST_ACCEPTED',
    });

    // Notifier les Admins
    const admins = await this.getAdmins();
    const notifications = admins.map((admin) => ({
      userId: admin.id,
      title: 'Mission en cours',
      message: `Le prestataire (ID: ${payload.providerId}) a pris en charge la demande (ID: ${payload.requestId}).`,
      type: 'REQUEST_ACCEPTED',
    }));
    await this.notificationsService.createManyNotifications(notifications);
  }

  // Prestataire refuse -> l'Admin est notifié pour un suivi éventuel
  @OnEvent('request.rejected')
  async handleRequestRejected(payload: { requestId: string; providerId: string }) {
    const admins = await this.getAdmins();
    const notifications = admins.map((admin) => ({
      userId: admin.id,
      title: 'Mission ignorée',
      message: `Le prestataire (ID: ${payload.providerId}) a refusé/ignoré la demande (ID: ${payload.requestId}).`,
      type: 'REQUEST_REJECTED',
    }));
    await this.notificationsService.createManyNotifications(notifications);
  }

  // ─── FIN DE MISSION ET PAIEMENT ─────────────────────────────────────────
  @OnEvent('payment.deposit_confirmed')
  async handlePaymentConfirmed(payload: { requestId: string }) {
    const admins = await this.getAdmins();
    const notifications = admins.map((admin) => ({
      userId: admin.id,
      title: 'Acompte reçu',
      message: `Paiement de l'acompte (50%) confirmé pour la demande (ID: ${payload.requestId}).`,
      type: 'PAYMENT_DEPOSIT_CONFIRMED',
    }));
    await this.notificationsService.createManyNotifications(notifications);
  }

  @OnEvent('request.completed')
  async handleRequestCompleted(payload: { requestId: string; providerId: string }) {
    const admins = await this.getAdmins();
    const notifications = admins.map((admin) => ({
      userId: admin.id,
      title: 'Mission terminée',
      message: `Le prestataire (ID: ${payload.providerId}) a déclaré la demande terminée (ID: ${payload.requestId}).`,
      type: 'REQUEST_COMPLETED',
    }));
    await this.notificationsService.createManyNotifications(notifications);
  }
}
