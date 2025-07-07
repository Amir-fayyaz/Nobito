import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppointmentRabbitmq } from 'src/common/constants/rabbitmq';
import { CreateTreatmentCategoryDto } from './dto/create-treatmentCategory.dto';
import { lastValueFrom } from 'rxjs';
import { TreatmentCategoryMessagePattern } from 'src/common/constants/message-patterns';
import { TreatmentCategory } from './models/treatmentCategory.model';

@Injectable()
export class TreatmentCategoryService {
  constructor(
    @Inject(AppointmentRabbitmq.AppointmentService_Name)
    private readonly appointmentClient: ClientProxy,
  ) {}

  async create(dto: CreateTreatmentCategoryDto): Promise<TreatmentCategory> {
    return await lastValueFrom(
      this.appointmentClient.send(
        TreatmentCategoryMessagePattern.CREATE_TREATMENT_CATEGORY,
        dto,
      ),
    );
  }
}
