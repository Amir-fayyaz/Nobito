import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Position } from '../entities/position.entity';
import { Repository } from 'typeorm';
import { CreatePositon } from '../dto/create-position.type';
import { UpdatePosition } from '../dto/update-position.type';

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

  async update(dto: UpdatePosition) {
    const position = await this.positionRepository.findOne({
      where: { name: dto.name },
    });
    if (position && position.id != Number(dto.id)) return { status: 409 };

    const updateResult = await this.positionRepository.update(
      { id: dto.id },
      {
        description: dto.description,
        name: dto.name,
      },
    );

    if (updateResult.affected === 0) return { status: 404 };

    return {
      updatedFields: {
        name: dto.name,
        description: dto.description,
      },
    };
  }

  async remove(id: number) {
    const deleteResult = await this.positionRepository.delete({ id });

    if (deleteResult.affected === 0) return { status: 404 };

    return {
      message: `Position with id ${id} removed successfully`,
    };
  }

  async exist(id: number): Promise<boolean> {
    return await this.positionRepository.exists({ where: { id } });
  }

  private async hasConflict(name: string): Promise<boolean> {
    return !!(await this.positionRepository.existsBy({ name }));
  }
}
