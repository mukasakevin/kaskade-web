import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

interface CreateNotificationPayload {
  userId: string;
  title: string;
  message: string;
  type: string;
  requestId?: string;
  serviceId?: string;
  providerAppId?: string;
}

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(private readonly prisma: PrismaService) {}

  // Création avec support des relations vers ressources
  async createNotification(data: CreateNotificationPayload) {
    const notification = await this.prisma.notification.create({
      data: {
        userId: data.userId,
        title: data.title,
        message: data.message,
        type: data.type,
        requestId: data.requestId,
        serviceId: data.serviceId,
        providerAppId: data.providerAppId,
      },
    });
    this.logger.log(`Notification créée pour l'utilisateur ${data.userId}: ${data.title} (${data.type})`);
    return notification;
  }

  // Création massive avec support des relations
  async createManyNotifications(data: CreateNotificationPayload[]) {
    const count = data.length;
    const result = await this.prisma.notification.createMany({
      data: data.map(d => ({
        userId: d.userId,
        title: d.title,
        message: d.message,
        type: d.type,
        requestId: d.requestId,
        serviceId: d.serviceId,
        providerAppId: d.providerAppId,
      })),
    });
    this.logger.log(`${count} notifications créées en masse.`);
    return result;
  }

  // Lister les notifications d'un utilisateur avec relations
  async findAllForUser(userId: string) {
    return this.prisma.notification.findMany({
      where: { userId },
      include: {
        request: true,
        service: true,
        providerApp: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Marquer une notification comme lue
  async markAsRead(notificationId: string, userId: string) {
    const notification = await this.prisma.notification.findUnique({
      where: { id: notificationId },
    });

    if (!notification) {
      throw new NotFoundException('Notification introuvable');
    }

    if (notification.userId !== userId) {
      throw new NotFoundException('Notification non autorisée');
    }

    return this.prisma.notification.update({
      where: { id: notificationId },
      data: { isRead: true },
    });
  }

  // Tout marquer comme lu
  async markAllAsRead(userId: string) {
    return this.prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true },
    });
  }
}
