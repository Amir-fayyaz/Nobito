import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreatePatientDto } from '../dto/create-patient.dto';
import { lastValueFrom } from 'rxjs';
import { exeptionFilter } from 'apps/gateway/src/common/filters/exeption-filter';
import { PatientMessage } from 'libs/message-patterns';
import { RabbitMQEnviroments } from 'libs/constants';

@Injectable()
export class PatientService {
  constructor(
    @Inject(RabbitMQEnviroments.AppointmentService_Name)
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
