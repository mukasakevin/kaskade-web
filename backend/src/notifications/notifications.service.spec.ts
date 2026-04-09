import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsService } from './notifications.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

const mockPrismaService = {
  notification: {
    create: jest.fn(),
    createMany: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    updateMany: jest.fn(),
  },
};

describe('NotificationsService', () => {
  let service: NotificationsService;
  let prisma: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationsService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<NotificationsService>(NotificationsService);
    prisma = module.get(PrismaService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createNotification', () => {
    it('should create a notification', async () => {
      const data = { userId: 'u1', title: 't', message: 'm', type: 'type' };
      prisma.notification.create.mockResolvedValue({ id: '1', ...data });
      const res = await service.createNotification(data);
      expect(res).toEqual({ id: '1', ...data });
      expect(prisma.notification.create).toHaveBeenCalledWith({ data });
    });
  });

  describe('createManyNotifications', () => {
    it('should create many notifications', async () => {
      const data = [{ userId: 'u1', title: 't', message: 'm', type: 'type' }];
      prisma.notification.createMany.mockResolvedValue({ count: 1 });
      const res = await service.createManyNotifications(data);
      expect(res).toEqual({ count: 1 });
      expect(prisma.notification.createMany).toHaveBeenCalledWith({ data });
    });
  });

  describe('findAllForUser', () => {
    it('should return all notifications for a user', async () => {
      prisma.notification.findMany.mockResolvedValue([]);
      const res = await service.findAllForUser('u1');
      expect(res).toEqual([]);
      expect(prisma.notification.findMany).toHaveBeenCalledWith({
        where: { userId: 'u1' },
        orderBy: { createdAt: 'desc' },
      });
    });
  });

  describe('markAsRead', () => {
    it('throws NotFoundException if not found', async () => {
      prisma.notification.findUnique.mockResolvedValue(null);
      await expect(service.markAsRead('n1', 'u1')).rejects.toThrow(NotFoundException);
    });

    it('throws NotFoundException if user mismatch', async () => {
      prisma.notification.findUnique.mockResolvedValue({ userId: 'other' });
      await expect(service.markAsRead('n1', 'u1')).rejects.toThrow(NotFoundException);
    });

    it('updates and returns notification', async () => {
      prisma.notification.findUnique.mockResolvedValue({ id: 'n1', userId: 'u1' });
      prisma.notification.update.mockResolvedValue({ id: 'n1', isRead: true });
      const res = await service.markAsRead('n1', 'u1');
      expect(res).toEqual({ id: 'n1', isRead: true });
      expect(prisma.notification.update).toHaveBeenCalledWith({
        where: { id: 'n1' },
        data: { isRead: true },
      });
    });
  });

  describe('markAllAsRead', () => {
    it('should update all unread for user', async () => {
      prisma.notification.updateMany.mockResolvedValue({ count: 2 });
      const res = await service.markAllAsRead('u1');
      expect(res).toEqual({ count: 2 });
      expect(prisma.notification.updateMany).toHaveBeenCalledWith({
        where: { userId: 'u1', isRead: false },
        data: { isRead: true },
      });
    });
  });
});
