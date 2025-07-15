import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreatePositionDto } from '../dto/create-position.dto';
import { lastValueFrom } from 'rxjs';
import { Position } from '../models/position.model';
import { UpdatePositionDto } from '../dto/update-position.dto';
import { exeptionFilter } from 'apps/gateway/src/common/filters/exeption-filter';
import { PositionMessage } from 'libs/message-patterns';
import { RabbitMQEnviroments } from 'libs/constants';

@Injectable()
export class PositionService {
  constructor(
    @Inject(RabbitMQEnviroments.UserService_Name)
    private readonly userClient: ClientProxy,
  ) {}

  async create(dto: CreatePositionDto): Promise<Position> {
    const createResult = await lastValueFrom(
      this.userClient.send(PositionMessage.CREATE, dto),
    );

    if (createResult.status) exeptionFilter(createResult.status);

    return createResult;
  }

  async findAll(): Promise<Position[]> {
    return await lastValueFrom(
      this.userClient.send(PositionMessage.FIND_ALL, {}),
    );
  }

  async findOne(id: number): Promise<Position> {
    const position = await lastValueFrom(
      this.userClient.send(PositionMessage.FIND_ONE, { id }),
    );

    if (position.status) exeptionFilter(position.status);

    return position;
  }

  async update(dto: UpdatePositionDto, id: number) {
    const updatedResult = await lastValueFrom(
      this.userClient.send(PositionMessage.UPDATE, {
        ...dto,
        id,
      }),
    );

    if (updatedResult.status)
      exeptionFilter(updatedResult.status, updatedResult.message);

    return updatedResult;
  }

  async remove(id: number) {
    const deleteResult = await lastValueFrom(
      this.userClient.send(PositionMessage.DELETE, { id }),
    );

    if (deleteResult.status) exeptionFilter(deleteResult.status);

    return deleteResult;
  }
}
