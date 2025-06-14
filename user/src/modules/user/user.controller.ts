import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaginateQuery } from 'nestjs-paginate';
import { UserService } from './user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

export class UserController {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userService: UserService,
  ) {}

  @MessagePattern('get_all_users')
  async getAll(@Payload() queryParams: PaginateQuery) {
    try {
      return await this.userService.getAll(queryParams);
    } catch (error) {
      console.log(error.message);
    }
  }
}
