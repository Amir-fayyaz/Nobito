import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreatePositionDto } from '../dto/create-position.dto';
import { lastValueFrom } from 'rxjs';
import { Position } from '../models/position.model';
import { Paginated } from 'nestjs-paginate';
import { UpdatePositionDto } from '../dto/update-position.dto';
import { UserRabbitmq } from 'apps/gateway/src/common/constants/rabbitmq';
import { PositionMessagePattern } from 'apps/gateway/src/common/constants/message-patterns';
import { exeptionFilter } from 'apps/gateway/src/common/filters/exeption-filter';

@Injectable()
export class PositionService {
  constructor(
    @Inject(UserRabbitmq.UserService_Name)
    private readonly userClient: ClientProxy,
  ) {}

  async create(dto: CreatePositionDto): Promise<Position> {
    const createResult = await lastValueFrom(
      this.userClient.send(PositionMessagePattern.CREATE_POSITION, dto),
    );

    if (createResult.status) exeptionFilter(createResult.status);

    return createResult;
  }

  async findAll(): Promise<Position[]> {
    return await lastValueFrom(
      this.userClient.send(PositionMessagePattern.GET_ALL_POSITIONS, {}),
    );
  }

  async findOne(id: number): Promise<Position> {
    const position = await lastValueFrom(
      this.userClient.send(PositionMessagePattern.FIND_ONE_BY_ID, { id }),
    );

    if (position.status === 404) throw new NotFoundException();

    return position;
  }

  async update(dto: UpdatePositionDto, id: number) {
    const updatedResult = await lastValueFrom(
      this.userClient.send(PositionMessagePattern.UPDATE_POSITION, {
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
      this.userClient.send(PositionMessagePattern.DELETE_POSITION, { id }),
    );

    if (deleteResult.status === 404) exeptionFilter(deleteResult.status);

    return deleteResult;
  }
}
