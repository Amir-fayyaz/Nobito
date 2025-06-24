import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Personnel } from './entities/personnel.entity';
import { DeepPartial, Repository } from 'typeorm';
import { CreatePersonnel } from './dto/create-personnel.type';
import { generatePersonnelNumber } from 'src/common/utility/set-personnel-number';

@Injectable()
export class PersonnelService {
  constructor(
    @InjectRepository(Personnel)
    private readonly personnelRepository: Repository<Personnel>,
  ) {}

  async create(
    dto: CreatePersonnel,
  ): Promise<DeepPartial<Personnel> | { message: string }> {
    try {
      const newPersonnel: DeepPartial<Personnel> =
        this.personnelRepository.create(dto);
      const savedPersonnel = await this.personnelRepository.save(newPersonnel);

      const personnelNumber: string = generatePersonnelNumber(
        savedPersonnel.id,
      );
      savedPersonnel.PersonnelNumber = personnelNumber;

      return await this.personnelRepository.save(savedPersonnel);
    } catch (error) {
      return { message: error.message };
    }
  }
}
