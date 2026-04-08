import {
  Controller,
  Get,
  Patch,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { UpdateProviderProfileDto } from './dto/update-provider-profile.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('provider')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.PROVIDER)
export class ProviderController {
  constructor(private readonly providersService: ProvidersService) {}

  // ─── DEMANDES / MISSIONS ──────────────────────────────────────────────────

  @Get('requests')
  findAvailableRequests(@CurrentUser('id') providerId: string) {
    return this.providersService.findAvailableRequests(providerId);
  }

  @Patch('requests/:id/accept')
  acceptRequest(
    @Param('id') requestId: string,
    @CurrentUser('id') providerId: string,
  ) {
    return this.providersService.acceptRequest(requestId, providerId);
  }

  @Patch('requests/:id/reject')
  rejectRequest(
    @Param('id') requestId: string,
    @CurrentUser('id') providerId: string,
  ) {
    return this.providersService.rejectRequest(requestId, providerId);
  }

  @Patch('requests/:id/complete')
  completeRequest(
    @Param('id') requestId: string,
    @CurrentUser('id') providerId: string,
  ) {
    return this.providersService.completeRequest(requestId, providerId);
  }

  // ─── PROFIL ───────────────────────────────────────────────────────────────

  @Get('profile')
  getProfile(@CurrentUser('id') providerId: string) {
    return this.providersService.getProfile(providerId);
  }

  @Patch('profile')
  updateProfile(
    @CurrentUser('id') providerId: string,
    @Body() updateProfileDto: UpdateProviderProfileDto,
  ) {
    return this.providersService.updateProfile(providerId, updateProfileDto);
  }
}
