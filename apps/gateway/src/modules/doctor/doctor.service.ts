import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { lastValueFrom } from 'rxjs';
import { Paginated, PaginateQuery } from 'nestjs-paginate';
import { Doctor } from './models/doctor.model';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { DeleteResult } from 'typeorm';
import { AppointmentRabbitmq } from '../../common/constants/rabbitmq';
import { Exeption } from '../../common/@types/exeption-type.type';
import { DoctorMessagePattern } from '../../common/constants/message-patterns';
import { exeptionFilter } from '../../common/filters/exeption-filter';

@Injectable()
export class DoctorService {
  constructor(
    @Inject(AppointmentRabbitmq.AppointmentService_Name)
    private readonly appointmentClient: ClientProxy,
  ) {}

  async create(dto: CreateDoctorDto): Promise<Doctor | Exeption | undefined> {
    try {
      const createResult = await lastValueFrom(
        this.appointmentClient.send(DoctorMessagePattern.CREATE_DOCTOR, {
          ...dto,
        }),
      );

      if (createResult.status) exeptionFilter(createResult.status);

      return createResult;
    } catch (error) {
      exeptionFilter(404);
    }
  }

  async findAll(query: PaginateQuery): Promise<Paginated<Doctor>> {
    return await lastValueFrom(
      this.appointmentClient.send(DoctorMessagePattern.FIND_ALL_DOCTOR, {
        query,
      }),
    );
  }

  async findOneById(id: number): Promise<Doctor> {
    const doctor = await lastValueFrom(
      this.appointmentClient.send(DoctorMessagePattern.FIND_ONE_DOCTOR, { id }),
    );

    if (!doctor) exeptionFilter(404);

    return doctor;
  }

  async update(id: number, dto: UpdateDoctorDto): Promise<number> {
    const updateResult = await lastValueFrom(
      this.appointmentClient.send(DoctorMessagePattern.UPDATE_DOCTOR, {
        id,
        personnelId: dto.personnelId,
      }),
    );

    if (updateResult.status) {
      exeptionFilter(updateResult.status, 'Invalid personnelId');
    }

    if (updateResult === 0) exeptionFilter(404);

    return updateResult;
  }

  async remove(id: number): Promise<number> {
    const deleteResult: DeleteResult = await lastValueFrom(
      this.appointmentClient.send(DoctorMessagePattern.DELETE_DOCTOR, { id }),
    );

    if (!deleteResult.affected) exeptionFilter(404);

    return id;
  }
}
