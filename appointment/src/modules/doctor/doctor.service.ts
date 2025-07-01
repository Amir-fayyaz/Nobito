import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateDoctor } from './dto/create-doctor.type';
import { RabbitmqEnviroments } from 'src/common/constants/rabbitmq';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { PersonnelMessage } from 'src/common/constants/message-patterns/personnel.messages';
import { generateDoctorNumber } from 'src/common/utility/set-doctorNumber';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { UpdateDoctor } from './dto/update-doctor.type';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
    @Inject(RabbitmqEnviroments.UserService_Name)
    private readonly userClient: ClientProxy,
  ) {}

  async create(dto: CreateDoctor) {
    try {
      await this.isPersonnelExist(dto.personnelId);
      const newDoctor = this.doctorRepository.create(dto);
      const savedDoctor = await this.doctorRepository.save(newDoctor);

      savedDoctor.doctorNumber = generateDoctorNumber(savedDoctor.id);
      return await this.doctorRepository.save(savedDoctor);
    } catch (error) {
      return { message: error.message, status: 404 };
    }
  }

  async findAll(query: PaginateQuery): Promise<Paginated<Doctor>> {
    return await paginate(query, this.doctorRepository, {
      sortableColumns: ['createdAt', 'updatedAt'],
      defaultSortBy: [['createdAt', 'DESC']],
      searchableColumns: ['doctorNumber'],
      select: ['id', 'createdAt', 'updatedAt', 'personnelId', 'doctorNumber'],
    });
  }

  async findOneById(id: number): Promise<Doctor | null> {
    return await this.doctorRepository.findOne({ where: { id } });
  }

  async update(dto: UpdateDoctor) {
    const doctor = await this.doctorRepository.findOne({
      where: { personnelId: dto.personnelId },
    });

    if (doctor && doctor.id !== dto.id) return { status: 409 };

    return (
      await this.doctorRepository.update(
        { id: dto.id },
        { personnelId: dto.personnelId },
      )
    ).affected;
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.doctorRepository.delete({ id });
  }

  private async isPersonnelExist(personnelId: number) {
    const personnel: boolean = await lastValueFrom(
      this.userClient.send(PersonnelMessage.IS_EXIST, { id: personnelId }),
    );

    if (!personnel)
      throw new NotFoundException('There is no personnel with this id');
  }
}
