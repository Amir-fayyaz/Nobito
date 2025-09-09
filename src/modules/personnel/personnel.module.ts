import { S3Service } from '@common/services/s3.service';
import { User } from '@module/auth/entities/user.entity';
import { Position } from '@module/position/entities/position.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Personnel } from './entities/personnel.entity';
import { PersonnelController } from './personnel.controller';
import { PersonnelService } from './personnel.service';

@Module({
  imports: [TypeOrmModule.forFeature([Personnel, Position, User])],
  controllers: [PersonnelController],
  providers: [PersonnelService, S3Service],
})
export class PersonnelModule {}
