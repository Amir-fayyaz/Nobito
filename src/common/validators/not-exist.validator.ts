import { dataSource } from '@config/data-source.config';
import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
@ValidatorConstraint({ async: true })
@Injectable()
export class NotExistenceConstraint implements ValidatorConstraintInterface {
  async validate(value: string, args: ValidationArguments): Promise<boolean> {
    const entityClass = args.constraints[0];
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    try {
      const exists: boolean = await queryRunner.manager
        .createQueryBuilder(entityClass, entityClass.name)
        .where(`${entityClass.name}.${args.property} = :value`, { value })
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
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [entityClass],
      validator: NotExistenceConstraint,
    });
  };
}
