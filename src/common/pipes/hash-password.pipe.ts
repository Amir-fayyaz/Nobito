import { Hash } from '@common/utils/hash';
import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class HashPasswordPipe implements PipeTransform {
  async transform(value: any) {
    if (value.password) value.password = await Hash(value.password);

    return value;
  }
}
