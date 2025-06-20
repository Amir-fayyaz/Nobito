import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Position } from '../entities/position.entity';
import { Repository } from 'typeorm';
import { CreatePositon } from '../dto/create-position.type';

@Injectable()
export class PositionService {
  constructor(
    @InjectRepository(Position)
    private readonly positionRepository: Repository<Position>,
  ) {}

  async create(dto: CreatePositon): Promise<Position | { status: number }> {
    const hasConflict = await this.hasConflict(dto.name);

    if (hasConflict) return { status: 409 };

    const newPosition = this.positionRepository.create(dto);

    return await this.positionRepository.save(newPosition);
  }

  async findAll(): Promise<Position[]> {
    return await this.positionRepository.find();
  }

  async findOne(id: number): Promise<Position | { status: number }> {
    const position = await this.positionRepository.findOne({ where: { id } });

    if (!position) return { status: 404 };

    return position;
  }

  private async hasConflict(name: string): Promise<boolean> {
    return !!(await this.positionRepository.existsBy({ name }));
  }
}
