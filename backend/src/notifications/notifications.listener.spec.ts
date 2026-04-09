import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsListener } from './notifications.listener';
import { NotificationsService } from './notifications.service';
import { PrismaService } from '../prisma/prisma.service';
import { Logger } from '@nestjs/common';

const mockNotificationsService = {
  createNotification: jest.fn(),
  createManyNotifications: jest.fn(),
};

const mockPrismaService = {
  user: {
    findMany: jest.fn(),
  },
};

describe('NotificationsListener', () => {
  let listener: NotificationsListener;
  let notificationsService: any;
  let prisma: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationsListener,
        { provide: NotificationsService, useValue: mockNotificationsService },
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    listener = module.get<NotificationsListener>(NotificationsListener);
    notificationsService = module.get(NotificationsService);
    prisma = module.get(PrismaService);
    
    // Silence logger during tests
    jest.spyOn(Logger.prototype, 'log').mockImplementation(() => {});
    jest.clearAllMocks();
  });

  it('handleAuthRegistered', async () => {
    await listener.handleAuthRegistered({ userId: 'u1' });
    expect(notificationsService.createNotification).toHaveBeenCalled();
  });

  describe('Provider Application', () => {
    it('handleProviderApplied targets admins and client', async () => {
      prisma.user.findMany.mockResolvedValue([{ id: 'admin1' }]);
      await listener.handleProviderApplied({ userId: 'u1' });
      expect(notificationsService.createNotification).toHaveBeenCalled();
      expect(notificationsService.createManyNotifications).toHaveBeenCalled();
    });

    it('handleProviderApplicationResolved - APPROVED', async () => {
      await listener.handleProviderApplicationResolved({ userId: 'u1', status: 'APPROVED' });
      expect(notificationsService.createNotification).toHaveBeenCalled();
      expect(notificationsService.createNotification.mock.calls[0][0].title).toContain('Acceptée');
    });

    it('handleProviderApplicationResolved - REJECTED', async () => {
      await listener.handleProviderApplicationResolved({ userId: 'u1', status: 'REJECTED' });
      expect(notificationsService.createNotification).toHaveBeenCalled();
      expect(notificationsService.createNotification.mock.calls[0][0].title).toContain('Refusée');
    });
  });

  describe('Service Management', () => {
    it('handleServiceCreated with clients', async () => {
      prisma.user.findMany.mockResolvedValue([{ id: 'c1' }]);
      await listener.handleServiceCreated({ serviceId: 's1', serviceName: 'Serv' });
      expect(notificationsService.createManyNotifications).toHaveBeenCalled();
    });

    it('handleServiceCreated without clients', async () => {
      prisma.user.findMany.mockResolvedValue([]);
      await listener.handleServiceCreated({ serviceId: 's1', serviceName: 'Serv' });
      expect(notificationsService.createManyNotifications).not.toHaveBeenCalled();
    });

    it('handleServiceUpdated', async () => {
      prisma.user.findMany.mockResolvedValue([{ id: 'user1' }]);
      await listener.handleServiceUpdated({ serviceId: 's1', serviceName: 'Serv' });
      expect(notificationsService.createManyNotifications).toHaveBeenCalled();
    });

    it('handleServiceUpdated without users', async () => {
      prisma.user.findMany.mockResolvedValue([]);
      await listener.handleServiceUpdated({ serviceId: 's1', serviceName: 'Serv' });
      expect(notificationsService.createManyNotifications).not.toHaveBeenCalled();
    });
  });

  describe('Request Workflow', () => {
    it('handleRequestCreated', async () => {
      prisma.user.findMany.mockResolvedValue([{ id: 'admin1' }]);
      await listener.handleRequestCreated({ requestId: 'r1', clientId: 'c1' });
      expect(notificationsService.createManyNotifications).toHaveBeenCalled();
    });

    it('handleRequestApproved with providers', async () => {
      prisma.user.findMany.mockResolvedValue([{ id: 'p1' }]);
      await listener.handleRequestApproved({ requestId: 'r1', serviceId: 's1' });
      expect(notificationsService.createManyNotifications).toHaveBeenCalled();
    });

    it('handleRequestApproved without providers', async () => {
      prisma.user.findMany.mockResolvedValue([]);
      await listener.handleRequestApproved({ requestId: 'r1', serviceId: 's1' });
      expect(notificationsService.createManyNotifications).not.toHaveBeenCalled();
    });

    it('handleRequestAccepted', async () => {
      prisma.user.findMany.mockResolvedValue([{ id: 'admin1' }]);
      await listener.handleRequestAccepted({ requestId: 'r1', clientId: 'c1', providerId: 'p1' });
      expect(notificationsService.createNotification).toHaveBeenCalled();
      expect(notificationsService.createManyNotifications).toHaveBeenCalled();
    });

    it('handleRequestRejected', async () => {
      prisma.user.findMany.mockResolvedValue([{ id: 'admin1' }]);
      await listener.handleRequestRejected({ requestId: 'r1', providerId: 'p1' });
      expect(notificationsService.createManyNotifications).toHaveBeenCalled();
    });
  });

  describe('Payment and Completion', () => {
    it('handlePaymentConfirmed', async () => {
      prisma.user.findMany.mockResolvedValue([{ id: 'admin1' }]);
      await listener.handlePaymentConfirmed({ requestId: 'r1' });
      expect(notificationsService.createManyNotifications).toHaveBeenCalled();
    });

    it('handleRequestCompleted', async () => {
      prisma.user.findMany.mockResolvedValue([{ id: 'admin1' }]);
      await listener.handleRequestCompleted({ requestId: 'r1', providerId: 'p1' });
      expect(notificationsService.createManyNotifications).toHaveBeenCalled();
    });
  });
});
