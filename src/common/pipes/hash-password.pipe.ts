import { HashPasswordInObject } from '@common/utility/hash.utility';
import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class HashPasswordPipe implements PipeTransform {
  async transform(value: any): Promise<any> {
    if (!value) return value;

    return await HashPasswordInObject(value);
  }
}
