import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { Role } from '../entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(dto: CreateRoleDto): Promise<Role> {
    const newRole = this.roleRepository.create(dto);

    return await this.roleRepository.save(newRole);
  }

  async findAll(): Promise<Role[]> {
    return await this.roleRepository.find();
  }

  async findOne(id: string): Promise<Role | null> {
    return await this.roleRepository.findOneBy({ id });
  }

  async update(id: string, dto: UpdateRoleDto) {
    const role = await this.roleRepository.findOne({
      where: { name: dto.name },
    });

    if (role && role.id !== id)
      throw new ConflictException('role-name is already exist');

    const { affected } = await this.roleRepository.update(id, dto);

    if (!affected) throw new NotFoundException('role not found');

    return { success: true };
  }

  async remove(id: string) {
    return await this.roleRepository.delete({ id });
  }
}
