import { MessagePattern, Payload } from '@nestjs/microservices';
import { PersonnelService } from './personnel.service';
import { PersonnelMessage } from 'src/common/message-patterns/personnel-messages';
import { CreatePersonnel } from './dto/create-personnel.type';
import { InjectRepository } from '@nestjs/typeorm';
import { Personnel } from './entities/personnel.entity';
import { Repository } from 'typeorm';
import { FindOneById } from './dto/find-one-by-id.type';

export class PersonnelController {
  constructor(
    private readonly personnelService: PersonnelService,
    @InjectRepository(Personnel)
    private readonly personnelRepo: Repository<Personnel>,
  ) {}

  @MessagePattern(PersonnelMessage.CREATE_PERSONNEL)
  async create(@Payload() dto: CreatePersonnel) {
    return await this.personnelService.create(dto);
  }

  @MessagePattern(PersonnelMessage.GET_PERSONNEL_BY_ID)
  async findOne(@Payload() { id }: FindOneById) {
    return await this.personnelService.findOneById(id);
  }
}
