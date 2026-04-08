import { Controller, Get, Patch, Param, UseGuards } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('admin/requests')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class AdminRequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  // Voir toutes les demandes de service
  @Get()
  findAll() {
    return this.requestsService.findAll();
  }

  // Voir le détail d'une demande
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestsService.findOne(id);
  }

  // Approuver une demande
  @Patch(':id/approve')
  approve(@Param('id') id: string) {
    return this.requestsService.approve(id);
  }

  // Rejeter une demande
  @Patch(':id/reject')
  reject(@Param('id') id: string) {
    return this.requestsService.reject(id);
  }
}
