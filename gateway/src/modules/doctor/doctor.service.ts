import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppointmentRabbitmq } from 'src/common/constants/rabbitmq';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { DoctorMessagePattern } from 'src/common/constants/message-patterns';
import { lastValueFrom } from 'rxjs';
import { Paginated, PaginateQuery } from 'nestjs-paginate';
import { Doctor } from './models/doctor.model';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { exeptionFilter } from 'src/common/filters/exeption-filter';

@Injectable()
export class DoctorService {
  constructor(
    @Inject(AppointmentRabbitmq.AppointmentService_Name)
    private readonly appointmentClient: ClientProxy,
  ) {}

  //! Fix 404 error !
  async create(dto: CreateDoctorDto) {
    try {
      const createResult = await lastValueFrom(
        this.appointmentClient.send(DoctorMessagePattern.CREATE_DOCTOR, {
          ...dto,
        }),
      );

      if (createResult.status === 404) {
        throw new NotFoundException('There is no personnel with this id');
      }

      return {
        doctor: createResult,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
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

    if (!doctor) throw new NotFoundException();

    return doctor;
  }

  async update(id: number, dto: UpdateDoctorDto) {
    const updateResult = await lastValueFrom(
      this.appointmentClient.send(DoctorMessagePattern.UPDATE_DOCTOR, {
        id,
        personnelId: dto.personnelId,
      }),
    );

    if (updateResult.status) {
      exeptionFilter(updateResult.status);
    }

    if (updateResult.affected === 0) exeptionFilter(404);

    return updateResult;
  }
}
