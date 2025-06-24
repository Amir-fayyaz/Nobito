import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOkResponse } from '@nestjs/swagger';
import { CreatePersonnelDto } from './dto/create-personnel.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { PersonnelService } from './personnel.service';
import { CreatePersonnelResponse } from './models/create-personnel-response';

@Controller('api/v1/personnel')
export class PersonnelController {
  constructor(private readonly personnelService: PersonnelService) {}

  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreatePersonnelDto })
  @ApiOkResponse({ type: CreatePersonnelResponse })
  @Post()
  @UseInterceptors(FileInterceptor('resume'))
  async create(@Body() dto: any, @UploadedFile() resume: Express.Multer.File) {
    return await this.personnelService.create(dto, resume);
  }
}
