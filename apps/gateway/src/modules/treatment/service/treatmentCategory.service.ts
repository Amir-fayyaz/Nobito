import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateTreatmentCategoryDto } from '../dto/create-treatmentCategory.dto';
import { lastValueFrom } from 'rxjs';
import { TreatmentCategory } from '../models/treatmentCategory.model';
import { Paginated, PaginateQuery } from 'nestjs-paginate';
import { UpdateTreatmentCategoryDto } from '../dto/update-treatmentCategory.dto';
import { AppointmentRabbitmq } from 'apps/gateway/src/common/constants/rabbitmq';
import { TreatmentCategoryMessagePattern } from 'apps/gateway/src/common/constants/message-patterns';
import { exeptionFilter } from 'apps/gateway/src/common/filters/exeption-filter';
import { ExeptionError } from 'libs/@types/public';

@Injectable()
export class TreatmentCategoryService {
  constructor(
    @Inject(AppointmentRabbitmq.AppointmentService_Name)
    private readonly appointmentClient: ClientProxy,
  ) {}

  async create(
    dto: CreateTreatmentCategoryDto,
  ): Promise<TreatmentCategory | ExeptionError | void> {
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

  async update(id: number, dto: UpdateTreatmentCategoryDto) {
    try {
      const updateResult = await lastValueFrom(
        this.appointmentClient.send(
          TreatmentCategoryMessagePattern.UPDATE_TREATMENT_CATEGORY,
          { id, ...dto },
        ),
      );

      if (!updateResult) exeptionFilter(404, 'treatment-cateogry not found');

      return updateResult;
    } catch (error) {
      exeptionFilter(error.status, error.message);
    }
  }

  async remove(id: number): Promise<ExeptionError | number> {
    const deleteResult: number = await lastValueFrom(
      this.appointmentClient.send(
        TreatmentCategoryMessagePattern.DELETE_TREATMENT_CATEGORY,
        { id },
      ),
    );

    if (!deleteResult) exeptionFilter(404);

    return id;
  }
}
