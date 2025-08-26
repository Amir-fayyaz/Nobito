import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class AtLeastOnePipe implements PipeTransform {
  constructor(private readonly fields: string[]) {}

  transform(value: any) {
    const hasAtLeastOne = this.fields.some((field) => {
      const val = value[field];
      return val !== null && val !== undefined && val !== '';
    });

    if (!hasAtLeastOne) {
      throw new BadRequestException(
        `At least one of the following fields must be provided: ${this.fields.join(', ')}`,
      );
    }

    return value;
  }
}
