import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
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

  async findOne(id: string): Promise<Position | null> {
    return await this.positionRepository.findOne({ where: { id } });
  }

  async update(id: string, dto: UpdatePositionDto) {
    const { affected } = await this.positionRepository.update(id, dto);

    if (!affected) throw new NotFoundException('position not found');

    return { success: true };
  }
}
