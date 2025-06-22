import { Module } from '@nestjs/common';
import { S3Controller } from './S3.controller';
import { S3Service } from './S3.service';

@Module({
  imports: [],
  controllers: [S3Controller],
  providers: [S3Service],
  exports: [],
})
export class S3Module {}
