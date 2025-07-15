import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateTreatmentCategoryDto } from '../dto/create-treatmentCategory.dto';
import { lastValueFrom } from 'rxjs';
import { TreatmentCategory } from '../models/treatmentCategory.model';
import { Paginated, PaginateQuery } from 'nestjs-paginate';
import { UpdateTreatmentCategoryDto } from '../dto/update-treatmentCategory.dto';
import { exeptionFilter } from 'apps/gateway/src/common/filters/exeption-filter';
import { ExeptionError } from 'libs/@types/public';
import { TreatmentCategoryMessage } from 'libs/message-patterns';
import { RabbitMQEnviroments } from 'libs/constants';

@Injectable()
export class TreatmentCategoryService {
  constructor(
    @Inject(RabbitMQEnviroments.AppointmentService_Name)
    private readonly appointmentClient: ClientProxy,
  ) {}

  async create(
    dto: CreateTreatmentCategoryDto,
  ): Promise<TreatmentCategory | ExeptionError | void> {
    try {
      const result = await lastValueFrom(
        this.appointmentClient.send(TreatmentCategoryMessage.CREATE, dto),
      );
      if (result.status) exeptionFilter(result.status, result.message);
      return result;
    } catch (e) {
      exeptionFilter(400, e.message);
    }
  }

  async findAll(query: PaginateQuery): Promise<Paginated<TreatmentCategory>> {
    return await lastValueFrom(
      this.appointmentClient.send(TreatmentCategoryMessage.FINDALL, query),
    );
  }

  async findOne(id: number): Promise<TreatmentCategory> {
    const treatmentCategory: TreatmentCategory = await lastValueFrom(
      this.appointmentClient.send(TreatmentCategoryMessage.FIND_ONE, { id }),
    );

    if (!treatmentCategory) exeptionFilter(404, 'treatment-category not found');

    return treatmentCategory;
  }

  async update(id: number, dto: UpdateTreatmentCategoryDto) {
    try {
      const updateResult = await lastValueFrom(
        this.appointmentClient.send(TreatmentCategoryMessage.UPDATE, {
          id,
          ...dto,
        }),
      );

      if (!updateResult) exeptionFilter(404, 'treatment-cateogry not found');

      return updateResult;
    } catch (error) {
      exeptionFilter(error.status, error.message);
    }
  }

  async remove(id: number): Promise<ExeptionError | number> {
    const deleteResult: number = await lastValueFrom(
      this.appointmentClient.send(TreatmentCategoryMessage.DELETE, { id }),
    );

    if (!deleteResult) exeptionFilter(404);

    return id;
  }
}
