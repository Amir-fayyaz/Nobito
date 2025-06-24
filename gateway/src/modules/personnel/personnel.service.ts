import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserRabbitmq } from 'src/common/constants/rabbitmq';
import { CreatePersonnelDto } from './dto/create-personnel.dto';
import { PersonnelMessagePattern } from 'src/common/constants/message-patterns';
import { lastValueFrom } from 'rxjs';
import { S3Service } from 'src/common/services/S3.service';

@Injectable()
export class PersonnelService {
  constructor(
    @Inject(UserRabbitmq.UserService_Name)
    private readonly userClient: ClientProxy,
    private readonly s3service: S3Service,
  ) {}

  async create(dto: CreatePersonnelDto, resume: Express.Multer.File) {
    const { url } = await this.s3service.uploadFile(resume);

    return await lastValueFrom(
      this.userClient.send(PersonnelMessagePattern.CREATE_PERSONNEL, {
        ...dto,
        resume: url,
      }),
    );
  }

  async findOneById(id: number) {
    const personnel = await lastValueFrom(
      this.userClient.send(PersonnelMessagePattern.GET_PERSONNEL_BY_ID, { id }),
    );

    if (!personnel) throw new NotFoundException();

    return personnel;
  }
}
