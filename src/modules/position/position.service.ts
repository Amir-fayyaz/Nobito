import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePositionDto } from './dto/create-position.dto';
import { Position } from './entities/position.entity';

@Injectable()
export class PositionService {
  constructor(
    @InjectRepository(Position)
    private readonly positionRepository: Repository<Position>,
  ) {}

  async create(dto: CreatePositionDto): Promise<Position> {
    const newPosition = this.positionRepository.create(dto);

    return await this.positionRepository.save(newPosition);
  }

  async findAll(): Promise<Position[]> {
    return await this.positionRepository.find();
  }
}
