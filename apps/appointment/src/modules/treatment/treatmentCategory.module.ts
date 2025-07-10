import { Module } from '@nestjs/common';
import { TreatmentCategoryService } from './services/treatmentCategory.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TreatmentCategory } from './entities/treatmentCategory.entity';
import { TreatmentCategoryController } from './controllers/treatmentCategory.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TreatmentCategory])],
  controllers: [TreatmentCategoryController],
  providers: [TreatmentCategoryService],
  exports: [],
})
export class TreatmentCategoryModule {}
