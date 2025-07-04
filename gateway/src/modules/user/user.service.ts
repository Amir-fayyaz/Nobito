import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserRabbitmq } from 'src/common/constants/rabbitmq';
import { Paginated, PaginateQuery } from 'nestjs-paginate';
import { UserMessagePattern } from 'src/common/constants/message-patterns';
import { lastValueFrom } from 'rxjs';
import { User } from './models/user.model';
import { exeptionFilter } from 'src/common/filters/exeption-filter';
import { Exeption } from 'src/common/@types/exeption-type.type';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRabbitmq.UserService_Name)
    private readonly userClient: ClientProxy,
  ) {}

  async findAll(
    params: PaginateQuery,
  ): Promise<Paginated<User> | Exeption | undefined> {
    try {
      return await lastValueFrom(
        this.userClient.send(UserMessagePattern.GETALLUSERS, {
          params,
        }),
      );
    } catch (error) {
      exeptionFilter(400, error.message);
    }
  }

  async findOneById(id: number): Promise<User> {
    const res = await lastValueFrom(
      this.userClient.send(UserMessagePattern.GET_USER_BY_ID, { id }),
    );

    if (!res) exeptionFilter(404);

    return res;
  }
}
