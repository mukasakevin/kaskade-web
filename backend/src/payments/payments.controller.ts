import { Controller, Post, Body, UseGuards, Logger } from '@nestjs/common';
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
  private readonly logger = new Logger(PaymentsController.name);

  constructor(private readonly paymentsService: PaymentsService) { }

  // ─── ACOMPTE 50% ─────────────────────────────────────────────────────────
  // Requis : status === ACCEPTED (provider a accepté)
  // Effet  : status → IN_PROGRESS (mission démarre)
  @Post('mock/deposit')
  async mockDeposit(
    @Body() dto: MockPaymentDto,
    @CurrentUser('id') clientId: string,
  ) {
    this.logger.log(`CLIENT : Paiement de l'acompte (50%) initié pour la demande ID: ${dto.requestId}`);
    return this.paymentsService.mockDeposit(dto.requestId, clientId);
  }

  // donnees mock pour le paiement final
  @Post('mock/final')
  async mockFinalPayment(
    @Body() dto: MockPaymentDto,
    @CurrentUser('id') clientId: string,
  ) {
    this.logger.log(`CLIENT : Paiement final (50%) initié pour la demande ID: ${dto.requestId}`);
    return this.paymentsService.mockFinalPayment(dto.requestId, clientId);
  }
}
