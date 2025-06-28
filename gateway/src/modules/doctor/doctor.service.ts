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

@Injectable()
export class DoctorService {
  constructor(
    @Inject(AppointmentRabbitmq.AppointmentService_Name)
    private readonly appointmentClient: ClientProxy,
  ) {}

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
}
