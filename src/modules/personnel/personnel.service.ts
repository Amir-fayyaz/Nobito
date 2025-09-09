import { S3Service } from '@common/services/s3.service';
import { generatePersonnelCodeFromUUID } from '@common/utils/generate-personnel-code.util';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePersonnelDto } from './dto/create-personnel.dto';
import { Personnel } from './entities/personnel.entity';

@Injectable()
export class PersonnelService {
  constructor(
    @InjectRepository(Personnel)
    private readonly repository: Repository<Personnel>,
    private readonly s3Service: S3Service,
  ) {}

  async create(
    dto: CreatePersonnelDto,
    resume: Express.Multer.File,
  ): Promise<Personnel> {
    if (!resume) {
      const newPersonnel = this.repository.create(dto);

      const savedPersonnel = await this.repository.save(newPersonnel);

      const personnelCode = generatePersonnelCodeFromUUID(savedPersonnel.id);
      savedPersonnel.personnelCode = personnelCode;

      return await this.repository.save(savedPersonnel);
    }

    try {
      const { key: resumeKey } = await this.s3Service.uploadFile(resume);

      dto.resume = resumeKey;

      const newPersonnel = this.repository.create(dto);

      const savedPersonnel = await this.repository.save(newPersonnel);

      const personnelCode = generatePersonnelCodeFromUUID(savedPersonnel.id);
      savedPersonnel.personnelCode = personnelCode;

      return await this.repository.save(savedPersonnel);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
