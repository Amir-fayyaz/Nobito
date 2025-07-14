import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Paginated, PaginateQuery } from 'nestjs-paginate';
import { lastValueFrom } from 'rxjs';
import { User } from './models/user.model';
import { UserRabbitmq } from '../../common/constants/rabbitmq';
import { Exeption } from '../../common/@types/exeption-type.type';
import { exeptionFilter } from '../../common/filters/exeption-filter';
import { UserMessages } from 'libs/message-patterns';

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
        this.userClient.send(UserMessages.FIND_ALL, {
          params,
        }),
      );
    } catch (error) {
      exeptionFilter(400, error.message);
    }
  }

  async findOneById(id: number): Promise<User> {
    const res = await lastValueFrom(
      this.userClient.send(UserMessages.FIND_ONE, { id }),
    );

    if (!res) exeptionFilter(404);

    return res;
  }
}
