import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreatePersonnelDto } from './dto/create-personnel.dto';
import { lastValueFrom } from 'rxjs';
import { Paginated, PaginateQuery } from 'nestjs-paginate';
import { UpdatePersonnelDto } from './dto/update-personnel.dto';
import { Personnel } from './models/personnel.model';
import { UserRabbitmq } from '../../common/constants/rabbitmq';
import { PersonnelMessagePattern } from '../../common/constants/message-patterns';
import { exeptionFilter } from '../../common/filters/exeption-filter';
import { S3Service } from '../../common/services/S3.service';

@Injectable()
export class PersonnelService {
  constructor(
    @Inject(UserRabbitmq.UserService_Name)
    private readonly userClient: ClientProxy,
    private readonly s3service: S3Service,
  ) {}

  async create(
    dto: CreatePersonnelDto,
    resume: Express.Multer.File,
  ): Promise<Personnel> {
    const { url } = await this.s3service.uploadFile(resume);

    return await lastValueFrom(
      this.userClient.send(PersonnelMessagePattern.CREATE_PERSONNEL, {
        ...dto,
        resume: url,
      }),
    );
  }

  async findOneById(id: number): Promise<Personnel> {
    const personnel = await lastValueFrom(
      this.userClient.send(PersonnelMessagePattern.GET_PERSONNEL_BY_ID, { id }),
    );

    if (!personnel) exeptionFilter(404);

    return personnel;
  }

  async findAll(query: PaginateQuery): Promise<Paginated<Personnel>> {
    return await lastValueFrom(
      this.userClient.send(PersonnelMessagePattern.GET_ALL_PERSONNEL, {
        query,
      }),
    );
  }

  async update(
    id: number,
    dto: UpdatePersonnelDto,
    resume: Express.Multer.File,
  ) {
    if (dto.resume) {
      const { url } = await this.s3service.uploadFile(resume);
      dto.resume = url;
    }

    try {
      const updateResult = await lastValueFrom(
        this.userClient.send(PersonnelMessagePattern.UPDATE_PERSONNEL, {
          id,
          ...dto,
        }),
      );

      if (updateResult.status)
        exeptionFilter(updateResult.status, updateResult.message);

      return updateResult;
    } catch (error) {
      exeptionFilter(500, error.message);
    }
  }

  async remove(id: number) {
    try {
      const deleteResult = await lastValueFrom(
        this.userClient.send(PersonnelMessagePattern.DELETE_PERSONNEL, { id }),
      );

      if (deleteResult.status)
        exeptionFilter(deleteResult.status, deleteResult?.message);

      return {
        message: 'Deleted successfully',
      };
    } catch (e) {
      exeptionFilter(404, e.message);
    }
  }
}
