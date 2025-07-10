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
import { RoleMessagePattern } from 'apps/gateway/src/common/constants/message-patterns';

@Injectable()
export class RoleService {
  constructor(
    @Inject(UserRabbitmq.UserService_Name)
    private readonly userClient: ClientProxy,
  ) {}

  async create(dto: CreateRoleDto) {
    const newRole = await lastValueFrom(
      this.userClient.send(RoleMessagePattern.CREATE_ROLE, dto),
    );

    if (newRole.status === 409) throw new ConflictException();

    return {
      role: newRole,
    };
  }

  async findAll() {
    return await lastValueFrom(
      this.userClient.send(RoleMessagePattern.GET_ALL_ROLES, {}),
    );
  }

  async findOne(id: number) {
    const role = await lastValueFrom(
      this.userClient.send(RoleMessagePattern.FIND_ROLE_BY_ID, { id }),
    );

    if (role.status === 404) throw new NotFoundException('role not found');

    return role;
  }

  async update(dto: UpdateRoleDto, id: number) {
    const updateResult = await lastValueFrom(
      this.userClient.send(RoleMessagePattern.UPDATE_ROLE, { ...dto, id }),
    );

    if (updateResult.status === 409) throw new ConflictException();

    return {
      message: 'updated-successfully',
    };
  }

  async remove(id: number) {
    const deleteResult = await lastValueFrom(
      this.userClient.send(RoleMessagePattern.DELETE_ROLE, { id }),
    );

    if (deleteResult.status === 404) throw new NotFoundException();

    return {
      message: 'deleted-successfully',
    };
  }
}
