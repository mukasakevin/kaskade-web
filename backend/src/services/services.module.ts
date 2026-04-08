import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController, AdminServicesController } from './services.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ServicesController, AdminServicesController],
  providers: [ServicesService],
  exports: [ServicesService],
})
export class ServicesModule {}
