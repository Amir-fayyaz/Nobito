import { Public } from '@common/decorators/is-public.decorator';
import { PdfValidator } from '@common/validators/files/pdf.validator';
import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';
import { CreatePersonnelDto } from './dto/create-personnel.dto';
import { PersonnelService } from './personnel.service';

@Controller('personnels')
@Public()
export class PersonnelController {
  constructor(private readonly service: PersonnelService) {}

  @ApiConsumes('multipart/form-data')
  @Post()
  @UseInterceptors(FileInterceptor('resume', PdfValidator))
  async create(
    @Body() dto: CreatePersonnelDto,
    @UploadedFile() resume: Express.Multer.File,
  ) {
    return await this.service.create(dto, resume);
  }
}
