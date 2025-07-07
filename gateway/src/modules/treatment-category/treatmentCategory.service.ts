import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppointmentRabbitmq } from 'src/common/constants/rabbitmq';
import { CreateTreatmentCategoryDto } from './dto/create-treatmentCategory.dto';
import { lastValueFrom } from 'rxjs';
import { TreatmentCategoryMessagePattern } from 'src/common/constants/message-patterns';
import { TreatmentCategory } from './models/treatmentCategory.model';
import { exeptionFilter } from 'src/common/filters/exeption-filter';
import { Exeption } from 'src/common/@types/exeption-type.type';

@Injectable()
export class TreatmentCategoryService {
  constructor(
    @Inject(AppointmentRabbitmq.AppointmentService_Name)
    private readonly appointmentClient: ClientProxy,
  ) {}

  async create(
    dto: CreateTreatmentCategoryDto,
  ): Promise<TreatmentCategory | Exeption | undefined> {
    try {
      return await lastValueFrom(
        this.appointmentClient.send(
          TreatmentCategoryMessagePattern.CREATE_TREATMENT_CATEGORY,
          dto,
        ),
      );
    } catch (e) {
      exeptionFilter(400, e.message);
    }
  }
}
