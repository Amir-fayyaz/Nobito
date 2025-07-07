import { Module } from '@nestjs/common';
import { TreatmentCategoryController } from './treatmentCategory.controller';
import { TreatmentCategoryService } from './treatmentCategory.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TreatmentCategory } from './entities/treatmentCategory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TreatmentCategory])],
  controllers: [TreatmentCategoryController],
  providers: [TreatmentCategoryService],
  exports: [],
})
export class TreatmentCategoryModule {}
