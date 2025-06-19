import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserRabbitmq } from 'src/common/constants/rabbitmq';
import { CreateRoleDto } from '../dto/create-role.dto';
import { lastValueFrom } from 'rxjs';
import { RoleMessagePattern } from 'src/common/constants/message-patterns';

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
}
