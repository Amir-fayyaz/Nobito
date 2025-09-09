import { dataSource } from '@config/data-source.config';
import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { validate as isUUID } from 'uuid';

@ValidatorConstraint({ async: true })
@Injectable()
export class NotExistenceConstraint implements ValidatorConstraintInterface {
  async validate(value: string, args: ValidationArguments): Promise<boolean> {
    const entityClass = args.constraints[0];
    const field = args.constraints[1];

    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    try {
      const fieldName = field ?? (isUUID(value) ? 'id' : args.property);

      const exists: boolean = await queryRunner.manager
        .createQueryBuilder(entityClass, entityClass.name)
        .where(`${entityClass.name}.${fieldName} = :value`, { value })
        .withDeleted()
        .getExists();

      return !exists;
    } finally {
      queryRunner.release();
    }
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.constraints[0].name} with this ${args.property} already exists`;
  }
}

export function NotExists(
  entityClass: any,
  field?: string, // اضافه شده: نام فیلد دلخواه برای چک کردن
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [entityClass, field],
      validator: NotExistenceConstraint,
    });
  };
}
