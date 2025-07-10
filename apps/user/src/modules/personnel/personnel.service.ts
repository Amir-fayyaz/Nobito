import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Personnel } from './entities/personnel.entity';
import { DeepPartial, Repository } from 'typeorm';
import { CreatePersonnel } from './dto/create-personnel.type';
import { FilterOperator, paginate, PaginateQuery } from 'nestjs-paginate';
import { UpdatePersonnel } from './dto/update-personnel.type';
import { generatePersonnelNumber } from '../../common/utility/set-personnel-number';

@Injectable()
export class PersonnelService {
  constructor(
    @InjectRepository(Personnel)
    private readonly personnelRepository: Repository<Personnel>,
  ) {}

  async create(
    dto: CreatePersonnel,
  ): Promise<DeepPartial<Personnel> | { message: string }> {
    try {
      const newPersonnel: DeepPartial<Personnel> =
        this.personnelRepository.create(dto);
      const savedPersonnel = await this.personnelRepository.save(newPersonnel);

      const personnelNumber: string = generatePersonnelNumber(
        savedPersonnel.id,
      );
      savedPersonnel.PersonnelNumber = personnelNumber;

      return await this.personnelRepository.save(savedPersonnel);
    } catch (error) {
      return { message: error.message };
    }
  }

  async findOneById(id: number) {
    return await this.personnelRepository.findOne({ where: { id } });
  }

  async findAll(query: PaginateQuery) {
    return await paginate(query, this.personnelRepository, {
      sortableColumns: ['createdAt', 'updatedAt'],
      defaultSortBy: [['createdAt', 'DESC']],
      searchableColumns: ['PersonnelNumber', 'positionId', 'salary_amount'],
      select: [
        'id',
        'createdAt',
        'updatedAt',
        'name',
        'salary_amount',
        'PersonnelNumber',
        'resume',
        'positionId',
        'userId',
      ],

      filterableColumns: {
        positionId: [FilterOperator.EQ],
        salary_amount: [
          FilterOperator.EQ,
          FilterOperator.GT,
          FilterOperator.LT,
        ],
      },
    });
  }

  async update(dto: UpdatePersonnel) {
    try {
      return (await this.personnelRepository.update({ id: dto.id }, { ...dto }))
        .affected === 0
        ? { status: 404 }
        : { updatedFields: { ...dto } };
    } catch (error) {
      return { message: error.message, status: 400 };
    }
  }

  async remove(id: number) {
    try {
      const removeResult = await this.personnelRepository.delete({ id });
      if (removeResult.affected === 0) return { status: 404 };

      return id;
    } catch (error) {
      return { status: 400, message: error.message };
    }
  }

  //for export
  async isExist(id: number): Promise<boolean> {
    return await this.personnelRepository.exists({ where: { id } });
  }
}
