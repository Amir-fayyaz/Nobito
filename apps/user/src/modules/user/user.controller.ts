import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaginateQuery } from 'nestjs-paginate';
import { UserService } from './user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserType } from './types/create-user.type';
import { UserMessages } from 'libs/message-patterns';

export class UserController {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userService: UserService,
  ) {}

  @MessagePattern(UserMessages.FIND_ALL)
  async getAll(@Payload() queryParams: PaginateQuery) {
    try {
      return await this.userService.getAll(queryParams);
    } catch (error) {
      console.log(error.message);
    }
  }

  @MessagePattern(UserMessages.FIND_ONE)
  async findOneById(@Payload() { id }) {
    return await this.userService.findOneById(id);
  }

  @MessagePattern(UserMessages.CREATE)
  async create(@Payload() data: CreateUserType) {
    return await this.userService.create(data);
  }
}
