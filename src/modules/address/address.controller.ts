import { Public } from '@common/decorators/is-public.decorator';
import { Body, Controller, Post } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';

@Controller('address')
@Public()
export class AddressController {
  constructor(private readonly service: AddressService) {}

  @Post()
  async create(@Body() dto: CreateAddressDto) {
    return await this.service.create(dto);
  }
}
