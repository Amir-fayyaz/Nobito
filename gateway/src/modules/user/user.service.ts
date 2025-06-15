import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserRabbitmq } from 'src/common/constants/rabbitmq';
import { PaginateQuery } from 'nestjs-paginate';
import { UserMessagePattern } from 'src/common/constants/message-patterns';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRabbitmq.UserService_Name)
    private readonly userClient: ClientProxy,
  ) {}

  async findAll(params: PaginateQuery) {
    try {
      const res = lastValueFrom(
        this.userClient.send(UserMessagePattern.GETALLUSERS, {
          params,
        }),
      );

      return res;
    } catch (error) {
      console.log(error.message);
    }
  }

  async findOneById(id: number) {
    const res = await lastValueFrom(
      this.userClient.send(UserMessagePattern.GET_USER_BY_ID, { id }),
    );

    if (!res) throw new NotFoundException();

    return res;
  }
}
