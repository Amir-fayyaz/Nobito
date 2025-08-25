import { Hash } from '@common/utils/hash';
import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class HashPasswordPipe implements PipeTransform {
  transform(value: any) {
    if (value.password) value.password = Hash(value.password);

    return value;
  }
}
