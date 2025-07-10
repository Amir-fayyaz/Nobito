import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaginateQuery } from 'nestjs-paginate';
import { UserService } from './user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserType } from './types/create-user.type';
import { UserMessages } from '../../common/message-patterns/user-messages';

export class UserController {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userService: UserService,
  ) {}

  @MessagePattern(UserMessages.GETALLUSERS)
  async getAll(@Payload() queryParams: PaginateQuery) {
    try {
      return await this.userService.getAll(queryParams);
    } catch (error) {
      console.log(error.message);
    }
  }

  @MessagePattern(UserMessages.GETUSER_BY_ID)
  async findOneById(@Payload() { id }) {
    return await this.userService.findOneById(id);
  }

  @MessagePattern(UserMessages.CREATE_USER)
  async create(@Payload() data: CreateUserType) {
    return await this.userService.create(data);
  }
}
