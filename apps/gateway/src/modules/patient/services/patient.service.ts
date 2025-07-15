import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppointmentRabbitmq } from 'apps/gateway/src/common/constants/rabbitmq';
import { CreatePatientDto } from '../dto/create-patient.dto';
import { lastValueFrom } from 'rxjs';
import { exeptionFilter } from 'apps/gateway/src/common/filters/exeption-filter';
import { PatientMessage } from 'libs/message-patterns';

@Injectable()
export class PatientService {
  constructor(
    @Inject(AppointmentRabbitmq.AppointmentService_Name)
    private readonly appointmentClient: ClientProxy,
  ) {}

  async create(dto: CreatePatientDto) {
    try {
      return await lastValueFrom(
        this.appointmentClient.send(PatientMessage.CREATE, dto),
      );
    } catch (error) {
      exeptionFilter(error.status, error.message);
    }
  }
}
