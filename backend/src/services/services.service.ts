import {
  Injectable,
  ConflictException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  private readonly logger = new Logger(ServicesService.name);

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
      this.logger.warn(`Tentative de création d'un service existant: ${createServiceDto.name} (${createServiceDto.category})`);
      throw new ConflictException(
        `Un service "${createServiceDto.name}" existe déjà dans la catégorie "${createServiceDto.category}".`,
      );
    }

    const newService = await this.prisma.service.create({
      data: createServiceDto,
    });

    this.logger.log(`Nouveau service catalogue créé: ${newService.name} (Catégorie: ${newService.category}, ID: ${newService.id})`);
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

    this.logger.log(`Service catalogue mis à jour: ${updatedService.name} (ID: ${id})`);
    this.eventEmitter.emit('service.updated', { serviceId: updatedService.id, serviceName: updatedService.name });

    return updatedService;
  }

  async remove(id: string) {
    const service = await this.findOne(id); // Vérifie que le service existe
    const result = await this.prisma.service.delete({ where: { id } });
    this.logger.log(`Service catalogue supprimÉ: ${service.name} (ID: ${id})`);
    return result;
  }
}
