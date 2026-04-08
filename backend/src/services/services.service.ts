import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(createServiceDto: CreateServiceDto) {
    // Empêcher les doublons (même nom + même catégorie)
    const existing = await this.prisma.service.findFirst({
      where: {
        name: { equals: createServiceDto.name, mode: 'insensitive' },
        category: { equals: createServiceDto.category, mode: 'insensitive' },
      },
    });

    if (existing) {
      throw new ConflictException(
        `Un service "${createServiceDto.name}" existe déjà dans la catégorie "${createServiceDto.category}".`,
      );
    }

    const newService = await this.prisma.service.create({
      data: createServiceDto,
    });

    this.eventEmitter.emit('service.created', { serviceId: newService.id, serviceName: newService.name });

    return newService;
  }

  async findAll() {
    return this.prisma.service.findMany({
      orderBy: [{ category: 'asc' }, { name: 'asc' }],
    });
  }

  async findAllActive() {
    return this.prisma.service.findMany({
      where: { isActive: true },
      orderBy: [{ category: 'asc' }, { name: 'asc' }],
    });
  }

  async findOne(id: string) {
    const service = await this.prisma.service.findUnique({ where: { id } });
    if (!service) {
      throw new NotFoundException(`Service introuvable.`);
    }
    return service;
  }

  async update(id: string, updateServiceDto: UpdateServiceDto) {
    await this.findOne(id); // Vérifie que le service existe
    const updatedService = await this.prisma.service.update({
      where: { id },
      data: updateServiceDto,
    });

    this.eventEmitter.emit('service.updated', { serviceId: updatedService.id, serviceName: updatedService.name });

    return updatedService;
  }

  async remove(id: string) {
    await this.findOne(id); // Vérifie que le service existe
    return this.prisma.service.delete({ where: { id } });
  }
}
