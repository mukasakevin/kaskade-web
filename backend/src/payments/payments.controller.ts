import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { MockPaymentDto } from './dto/mock-payment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('payments')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.CLIENT)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  // ─── ACOMPTE 50% ─────────────────────────────────────────────────────────
  // Requis : status === ACCEPTED (provider a accepté)
  // Effet  : status → IN_PROGRESS (mission démarre)
  @Post('mock/deposit')
  async mockDeposit(
    @Body() dto: MockPaymentDto,
    @CurrentUser('id') clientId: string,
  ) {
    return this.paymentsService.mockDeposit(dto.requestId, clientId);
  }

  // ─── PAIEMENT FINAL 50% ───────────────────────────────────────────────────
  // Requis : status === AWAITING_FINAL (provider a terminé)
  // Effet  : status → COMPLETED (mission clôturée)
  @Post('mock/final')
  async mockFinalPayment(
    @Body() dto: MockPaymentDto,
    @CurrentUser('id') clientId: string,
  ) {
    return this.paymentsService.mockFinalPayment(dto.requestId, clientId);
  }
}
