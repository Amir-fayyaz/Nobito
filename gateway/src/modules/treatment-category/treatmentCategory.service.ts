import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppointmentRabbitmq } from 'src/common/constants/rabbitmq';
import { CreateTreatmentCategoryDto } from './dto/create-treatmentCategory.dto';
import { lastValueFrom } from 'rxjs';
import { TreatmentCategoryMessagePattern } from 'src/common/constants/message-patterns';
import { TreatmentCategory } from './models/treatmentCategory.model';
import { exeptionFilter } from 'src/common/filters/exeption-filter';
import { Exeption } from 'src/common/@types/exeption-type.type';
import { Paginated, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class TreatmentCategoryService {
  constructor(
    @Inject(AppointmentRabbitmq.AppointmentService_Name)
    private readonly appointmentClient: ClientProxy,
  ) {}

  async create(
    dto: CreateTreatmentCategoryDto,
  ): Promise<TreatmentCategory | Exeption | void> {
    try {
      const result = await lastValueFrom(
        this.appointmentClient.send(
          TreatmentCategoryMessagePattern.CREATE_TREATMENT_CATEGORY,
          dto,
        ),
      );
      if (result.status) exeptionFilter(result.status, result.message);
      return result;
    } catch (e) {
      exeptionFilter(400, e.message);
    }
  }

  async findAll(query: PaginateQuery): Promise<Paginated<TreatmentCategory>> {
    return await lastValueFrom(
      this.appointmentClient.send(
        TreatmentCategoryMessagePattern.FINDALL_TREATMENT_CATEGORY,
        query,
      ),
    );
  }

  async findOne(id: number): Promise<TreatmentCategory> {
    const treatmentCategory: TreatmentCategory = await lastValueFrom(
      this.appointmentClient.send(
        TreatmentCategoryMessagePattern.FIND_ONE_TREATMENT_CATEGORY,
        { id },
      ),
    );

    if (!treatmentCategory) exeptionFilter(404, 'treatment-category not found');

    return treatmentCategory;
  }
}
