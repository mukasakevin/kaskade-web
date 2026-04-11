import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { RequestStatus } from '@prisma/client';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  // ─── ACOMPTE 50% ─────────────────────────────────────────────────────────

  async mockDeposit(requestId: string, clientId: string) {
    const request = await this.prisma.request.findUnique({
      where: { id: requestId },
    });

    if (!request) {
      throw new NotFoundException('Demande introuvable.');
    }

    // Sécurité : seul le CLIENT propriétaire peut payer
    if (request.clientId !== clientId) {
      throw new ForbiddenException('Vous n\'êtes pas le client de cette demande.');
    }

    // Le provider doit avoir accepté la mission (status ACCEPTED)
    if (request.status !== RequestStatus.ACCEPTED) {
      throw new BadRequestException(
        'L\'acompte ne peut être versé que lorsque le prestataire a accepté la mission (statut ACCEPTED).',
      );
    }

    // Passer en IN_PROGRESS (mission démarre)
    await this.prisma.request.update({
      where: { id: requestId },
      data: { status: RequestStatus.IN_PROGRESS },
    });

    const deposit = request.price ? request.price * 0.5 : 0;
    this.logger.log(`Acompte de 50% confirmé pour la demande ${requestId} (Montant: ${deposit})`);
    this.eventEmitter.emit('payment.deposit_confirmed', { requestId });

    return {
      message: 'Acompte de 50% confirmé. La mission est maintenant en cours.',
      requestId,
      totalPrice: request.price,
      depositPaid: deposit,
      remaining: deposit,
    };
  }

  // ─── PAIEMENT FINAL 50% ───────────────────────────────────────────────────

  async mockFinalPayment(requestId: string, clientId: string) {
    const request = await this.prisma.request.findUnique({
      where: { id: requestId },
    });

    if (!request) {
      throw new NotFoundException('Demande introuvable.');
    }

    // Sécurité : seul le CLIENT propriétaire peut payer
    if (request.clientId !== clientId) {
      throw new ForbiddenException('Vous n\'êtes pas le client de cette demande.');
    }

    // Le provider doit avoir marqué la mission comme terminée (status AWAITING_FINAL)
    if (request.status !== RequestStatus.AWAITING_FINAL) {
      throw new BadRequestException(
        'Le paiement final ne peut être effectué que lorsque le prestataire a terminé la mission (statut AWAITING_FINAL).',
      );
    }

    // Passer en COMPLETED (mission clôturée)
    await this.prisma.request.update({
      where: { id: requestId },
      data: { status: RequestStatus.COMPLETED },
    });

    const finalAmount = request.price ? request.price * 0.5 : 0;
    this.logger.log(`Paiement final confirmé pour la demande ${requestId} (Montant: ${finalAmount}, Total: ${request.price})`);
    this.eventEmitter.emit('payment.final_confirmed', { requestId });

    return {
      message: 'Paiement final de 50% confirmé. La mission est officiellement clôturée.',
      requestId,
      totalPrice: request.price,
      finalPaid: finalAmount,
      totalPaid: request.price,
    };
  }
}
