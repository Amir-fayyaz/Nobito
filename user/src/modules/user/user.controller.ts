import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaginateQuery } from 'nestjs-paginate';
import { UserService } from './user.service';
import { UserMessages } from 'src/common/message-patterns/user-messages';

export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(UserMessages.GETALLUSERS)
  async getAll(@Payload() queryParams: PaginateQuery) {
    return await this.userService.getAll(queryParams);
  }
}
