import { Inject, Injectable } from '@nestjs/common';
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
}
