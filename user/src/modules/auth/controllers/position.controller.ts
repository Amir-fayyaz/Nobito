import { MessagePattern, Payload } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Position } from '../entities/position.entity';
import { Repository } from 'typeorm';
import { PositionService } from '../services/position.service';
import { PositionMessage } from 'src/common/message-patterns/position-messages';
import { CreatePositon } from '../dto/create-position.type';
import { FindById } from '../dto/fine-one-by-id.type';

export class PositionController {
  constructor(
    @InjectRepository(Position)
    private positionRepository: Repository<Position>,
    private readonly positionService: PositionService,
  ) {}

  @MessagePattern(PositionMessage.CREATE_POSITION)
  async create(@Payload() dto: CreatePositon) {
    return await this.positionService.create(dto);
  }

  @MessagePattern(PositionMessage.GET_ALL_POSITIONS)
  async findAll() {
    return await this.positionService.findAll();
  }

  @MessagePattern(PositionMessage.FIND_ONE_BY_ID)
  async findOne(@Payload() { id }: FindById) {
    return await this.positionService.findOne(id);
  }
}
