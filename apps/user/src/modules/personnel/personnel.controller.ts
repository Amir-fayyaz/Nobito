import { MessagePattern, Payload } from '@nestjs/microservices';
import { PersonnelService } from './personnel.service';
import { CreatePersonnel } from './dto/create-personnel.type';
import { InjectRepository } from '@nestjs/typeorm';
import { Personnel } from './entities/personnel.entity';
import { Repository } from 'typeorm';
import { FindOneById } from './dto/find-one-by-id.type';
import { FindAllPersonnel } from './dto/find-all-personnel.type';
import { UpdatePersonnel } from './dto/update-personnel.type';
import { RemovePersonnel } from './dto/remove-personnel.type';
import { PersonnelMessage } from 'libs/message-patterns';

export class PersonnelController {
  constructor(
    private readonly personnelService: PersonnelService,
    @InjectRepository(Personnel)
    private readonly personnelRepo: Repository<Personnel>,
  ) {}

  @MessagePattern(PersonnelMessage.CREATE)
  async create(@Payload() dto: CreatePersonnel) {
    return await this.personnelService.create(dto);
  }

  @MessagePattern(PersonnelMessage.FIND_ONE)
  async findOne(@Payload() { id }: FindOneById) {
    return await this.personnelService.findOneById(id);
  }

  @MessagePattern(PersonnelMessage.FIND_ALL)
  async findAll(@Payload() { query }: FindAllPersonnel) {
    return await this.personnelService.findAll(query);
  }

  @MessagePattern(PersonnelMessage.UPDATE)
  async update(@Payload() dto: UpdatePersonnel) {
    return await this.personnelService.update(dto);
  }

  @MessagePattern(PersonnelMessage.DELETE)
  async remove(@Payload() { id }: RemovePersonnel) {
    return await this.personnelService.remove(id);
  }

  @MessagePattern(PersonnelMessage.IS_EXIST)
  async isExist(@Payload() { id }: FindOneById) {
    return await this.personnelService.isExist(id);
  }
}
