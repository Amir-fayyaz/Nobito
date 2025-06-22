import { MessagePattern, Payload } from '@nestjs/microservices';
import { PersonnelService } from './personnel.service';
import { PersonnelMessage } from 'src/common/message-patterns/personnel-messages';
import { CreatePersonnel } from './dto/create-personnel.type';

export class PersonnelController {
  constructor(private readonly personnelService: PersonnelService) {}

  @MessagePattern(PersonnelMessage.CREATE_PERSONNEL)
  async create(@Payload() dto: CreatePersonnel) {
    return await this.personnelService.create(dto);
  }
}
