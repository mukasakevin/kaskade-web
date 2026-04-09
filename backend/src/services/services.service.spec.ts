import { Test, TestingModule } from '@nestjs/testing';
import { ServicesService } from './services.service';
import { PrismaService } from '../prisma/prisma.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ConflictException, NotFoundException } from '@nestjs/common';

const mockPrismaService = {
  service: {
    findFirst: jest.fn(),
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

const mockEventEmitter = {
  emit: jest.fn(),
};

describe('ServicesService', () => {
  let service: ServicesService;
  let prisma: any;
  let eventEmitter: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServicesService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: EventEmitter2, useValue: mockEventEmitter },
      ],
    }).compile();

    service = module.get<ServicesService>(ServicesService);
    prisma = module.get(PrismaService);
    eventEmitter = module.get(EventEmitter2);
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('throws ConflictException if service exists', async () => {
      prisma.service.findFirst.mockResolvedValue({ id: '1' });
      await expect(service.create({ name: 'test', category: 'cat' })).rejects.toThrow(ConflictException);
      expect(prisma.service.findFirst).toHaveBeenCalledWith({
        where: {
          name: { equals: 'test', mode: 'insensitive' },
          category: { equals: 'cat', mode: 'insensitive' },
        },
      });
    });

    it('creates service and emits event if not exists', async () => {
      prisma.service.findFirst.mockResolvedValue(null);
      prisma.service.create.mockResolvedValue({ id: '2', name: 'test2' });
      const res = await service.create({ name: 'test2', category: 'cat' });
      expect(res).toEqual({ id: '2', name: 'test2' });
      expect(eventEmitter.emit).toHaveBeenCalledWith('service.created', { serviceId: '2', serviceName: 'test2' });
    });
  });

  describe('findAll', () => {
    it('returns all ordered by category and name', async () => {
      prisma.service.findMany.mockResolvedValue([]);
      const res = await service.findAll();
      expect(res).toEqual([]);
      expect(prisma.service.findMany).toHaveBeenCalledWith({
        orderBy: [{ category: 'asc' }, { name: 'asc' }],
      });
    });
  });

  describe('findAllActive', () => {
    it('returns all active ordered', async () => {
      prisma.service.findMany.mockResolvedValue([]);
      const res = await service.findAllActive();
      expect(res).toEqual([]);
      expect(prisma.service.findMany).toHaveBeenCalledWith({
        where: { isActive: true },
        orderBy: [{ category: 'asc' }, { name: 'asc' }],
      });
    });
  });

  describe('findOne', () => {
    it('throws NotFoundException if not found', async () => {
      prisma.service.findUnique.mockResolvedValue(null);
      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
    });

    it('returns service if found', async () => {
      prisma.service.findUnique.mockResolvedValue({ id: '1' });
      const res = await service.findOne('1');
      expect(res).toEqual({ id: '1' });
    });
  });

  describe('update', () => {
    it('throws NotFoundException via findOne if not found', async () => {
      prisma.service.findUnique.mockResolvedValue(null);
      await expect(service.update('1', { isActive: false })).rejects.toThrow(NotFoundException);
      expect(prisma.service.update).not.toHaveBeenCalled();
    });

    it('updates service and emits event', async () => {
      prisma.service.findUnique.mockResolvedValue({ id: '1' });
      prisma.service.update.mockResolvedValue({ id: '1', name: 'updated' });
      const res = await service.update('1', { isActive: false });
      expect(res).toEqual({ id: '1', name: 'updated' });
      expect(prisma.service.update).toHaveBeenCalledWith({ where: { id: '1' }, data: { isActive: false } });
      expect(eventEmitter.emit).toHaveBeenCalledWith('service.updated', { serviceId: '1', serviceName: 'updated' });
    });
  });

  describe('remove', () => {
    it('throws NotFoundException via findOne if not found', async () => {
      prisma.service.findUnique.mockResolvedValue(null);
      await expect(service.remove('1')).rejects.toThrow(NotFoundException);
      expect(prisma.service.delete).not.toHaveBeenCalled();
    });

    it('removes service if found', async () => {
      prisma.service.findUnique.mockResolvedValue({ id: '1' });
      prisma.service.delete.mockResolvedValue({ id: '1' });
      const res = await service.remove('1');
      expect(res).toEqual({ id: '1' });
      expect(prisma.service.delete).toHaveBeenCalledWith({ where: { id: '1' } });
    });
  });
});
