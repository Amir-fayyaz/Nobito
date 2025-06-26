import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserRabbitmq } from 'src/common/constants/rabbitmq';
import { CreatePersonnelDto } from './dto/create-personnel.dto';
import { PersonnelMessagePattern } from 'src/common/constants/message-patterns';
import { lastValueFrom } from 'rxjs';
import { S3Service } from 'src/common/services/S3.service';
import { PaginateQuery } from 'nestjs-paginate';
import { UpdatePersonnelDto } from './dto/update-personnel.dto';

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

  async findAll(query: PaginateQuery) {
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

      if (updateResult.status === 400) return updateResult;
      if (updateResult.status === 404) throw new NotFoundException();

      return updateResult;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: number) {
    try {
      const deleteResult = await lastValueFrom(
        this.userClient.send(PersonnelMessagePattern.DELETE_PERSONNEL, { id }),
      );

      if (deleteResult.status === 400) throw new BadRequestException();
      if (deleteResult.status === 404) throw new NotFoundException();

      return {
        message: 'Deleted successfully',
      };
    } catch (e) {
      throw new NotFoundException();
    }
  }
}
