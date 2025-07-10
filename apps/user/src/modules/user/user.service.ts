import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FilterOperator,
  paginate,
  Paginated,
  PaginateQuery,
} from 'nestjs-paginate';
import { CreateUserType } from './types/create-user.type';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAll(params: PaginateQuery): Promise<Paginated<User>> {
    return paginate(params, this.userRepository, {
      sortableColumns: ['createdAt'],
      defaultSortBy: [['createdAt', 'DESC']],
      searchableColumns: ['phone', 'email'],
      select: [
        'id',
        'createdAt',
        'updatedAt',
        'firstname',
        'lastname',
        'email',
        'nationalCode',
        'avatar',
        'fathername',
      ],
      filterableColumns: {
        phone: [FilterOperator.EQ],
        email: [FilterOperator.EQ],
      },
    });
  }

  async findOneById(id: number): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async create(dto: CreateUserType): Promise<User> {
    const newUser = this.userRepository.create(dto);
    const savedUser = await this.userRepository.save(newUser);

    return savedUser;
  }

  async exist(id: number): Promise<boolean> {
    return await this.userRepository.exists({ where: { id } });
  }
}
