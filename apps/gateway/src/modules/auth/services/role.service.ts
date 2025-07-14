import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateRoleDto } from '../dto/create-role.dto';
import { lastValueFrom } from 'rxjs';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { UserRabbitmq } from 'apps/gateway/src/common/constants/rabbitmq';
import { RoleMessage } from 'libs/message-patterns';
import { exeptionFilter } from 'apps/gateway/src/common/filters/exeption-filter';

@Injectable()
export class RoleService {
  constructor(
    @Inject(UserRabbitmq.UserService_Name)
    private readonly userClient: ClientProxy,
  ) {}

  async create(dto: CreateRoleDto) {
    const newRole = await lastValueFrom(
      this.userClient.send(RoleMessage.CREATE, dto),
    );

    if (newRole.status) exeptionFilter(newRole.status);

    return {
      role: newRole,
    };
  }

  async findAll() {
    return await lastValueFrom(this.userClient.send(RoleMessage.FIND_ALL, {}));
  }

  async findOne(id: number) {
    const role = await lastValueFrom(
      this.userClient.send(RoleMessage.FIND_ONE, { id }),
    );

    if (role.status === 404) throw new NotFoundException('role not found');

    return role;
  }

  async update(dto: UpdateRoleDto, id: number) {
    const updateResult = await lastValueFrom(
      this.userClient.send(RoleMessage.UPDATE, { ...dto, id }),
    );

    if (updateResult.status) exeptionFilter(updateResult.status);

    return {
      message: 'updated-successfully',
    };
  }

  async remove(id: number) {
    const deleteResult = await lastValueFrom(
      this.userClient.send(RoleMessage.DELETE, { id }),
    );

    if (deleteResult.status) exeptionFilter(deleteResult.status);

    return {
      message: 'deleted-successfully',
    };
  }
}
