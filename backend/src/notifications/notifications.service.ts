import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(private readonly prisma: PrismaService) {}

  // Création interne depuis d'autres modules ou listeners
  async createNotification(data: { userId: string; title: string; message: string; type: string }) {
    const notification = await this.prisma.notification.create({
      data,
    });
    this.logger.log(`Notification créée pour l'utilisateur ${data.userId}: ${data.title}`);
    return notification;
  }

  // Création massive (utile pour envoyer à un groupe de prestataires)
  async createManyNotifications(data: { userId: string; title: string; message: string; type: string }[]) {
    const count = data.length;
    const result = await this.prisma.notification.createMany({
      data,
    });
    this.logger.log(`${count} notifications créées en masse.`);
    return result;
  }

  // Lister les notifications d'un utilisateur
  async findAllForUser(userId: string) {
    return this.prisma.notification.findMany({
      where: { userId },
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
