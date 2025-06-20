import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserRabbitmq } from 'src/common/constants/rabbitmq';
import { CreatePositionDto } from '../dto/create-position.dto';
import { lastValueFrom } from 'rxjs';
import { PositionMessagePattern } from 'src/common/constants/message-patterns';

@Injectable()
export class PositionService {
  constructor(
    @Inject(UserRabbitmq.UserService_Name)
    private readonly userClient: ClientProxy,
  ) {}

  async create(dto: CreatePositionDto) {
    const createResult = await lastValueFrom(
      this.userClient.send(PositionMessagePattern.CREATE_POSITION, dto),
    );

    if (createResult.status === 409) throw new ConflictException();

    return {
      position: createResult,
    };
  }

  async findAll() {
    return await lastValueFrom(
      this.userClient.send(PositionMessagePattern.GET_ALL_POSITIONS, {}),
    );
  }
}
