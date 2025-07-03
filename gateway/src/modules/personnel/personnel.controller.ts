import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOkResponse } from '@nestjs/swagger';
import { CreatePersonnelDto } from './dto/create-personnel.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { PersonnelService } from './personnel.service';
import { Personnel } from './models/personnel.model';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { PaginatePersonnelResponse } from './dto/paginate-personnel-response.dto';
import { PaginationOptions } from 'src/common/decorators/pagination-options.decorator';
import { UpdatePersonnelDto } from './dto/update-personnel.dto';
import { Auth } from 'src/common/decorators/auth.decorator';
import { Role } from 'src/common/decorators/role.decorator';
import { Roles } from 'src/common/enums/role.enum';

@Controller('api/v1/personnel')
@Auth()
//! need role auth
export class PersonnelController {
  constructor(private readonly personnelService: PersonnelService) {}

  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreatePersonnelDto })
  @ApiOkResponse({ type: Personnel })
  @Post()
  @UseInterceptors(FileInterceptor('resume'))
  async create(@Body() dto: any, @UploadedFile() resume: Express.Multer.File) {
    return await this.personnelService.create(dto, resume);
  }

  @Get()
  @PaginationOptions({
    filterOptions: [
      { field: 'positionId', example: '$eq:23' },
      { field: 'salary_amount', example: '$eq:2300000 , $lt:1000000' },
    ],
    sortOptions: [{ example: 'createdAt:DESC' }, { example: 'createdAt:ASC' }],
  })
  @ApiOkResponse({ type: PaginatePersonnelResponse })
  async findAll(@Paginate() query: PaginateQuery) {
    return await this.personnelService.findAll(query);
  }

  @Get(':id')
  @ApiOkResponse({ type: Personnel })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.personnelService.findOneById(id);
  }

  @Put(':id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('resume'))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePersonnelDto,
    @UploadedFile() resume: Express.Multer.File,
  ) {
    return await this.personnelService.update(id, dto, resume);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.personnelService.remove(id);
  }
}
