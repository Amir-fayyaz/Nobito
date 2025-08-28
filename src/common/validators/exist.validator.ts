// import { dataSource } from '@config/data-source.config';
// import { Injectable } from '@nestjs/common';
// import {
//   registerDecorator,
//   ValidationArguments,
//   ValidationOptions,
//   ValidatorConstraint,
//   ValidatorConstraintInterface,
// } from 'class-validator';
// @ValidatorConstraint({ async: true })
// @Injectable()
// export class ExistenceConstraint implements ValidatorConstraintInterface {
//   async validate(value: string, args: ValidationArguments): Promise<boolean> {
//     const entityClass = args.constraints[0];
//     const queryRunner = dataSource.createQueryRunner();
//     await queryRunner.connect();
//     try {
//       return await queryRunner.manager
//         .createQueryBuilder(entityClass, entityClass.name)
//         .where(`${entityClass.name}.${args.property} = :value`, { value })
//         .withDeleted()
//         .getExists();
//     } finally {
//       queryRunner.release();
//     }
//   }

//   defaultMessage(args: ValidationArguments): string {
//     return ` ${args.property} not found`;
//   }
// }

// export function Exists(
//   entityClass: any,
//   validationOptions?: ValidationOptions,
// ) {
//   return function (object: object, propertyName: string) {
//     registerDecorator({
//       target: object.constructor,
//       propertyName: propertyName,
//       options: validationOptions,
//       constraints: [entityClass],
//       validator: ExistenceConstraint,
//     });
//   };
// }

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
export class ExistenceConstraint implements ValidatorConstraintInterface {
  async validate(value: string, args: ValidationArguments): Promise<boolean> {
    const entityClass = args.constraints[0];

    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      const field = isUUID(value) ? 'id' : args.property;

      return await queryRunner.manager
        .createQueryBuilder(entityClass, entityClass.name)
        .where(`${entityClass.name}.${field} = :value`, { value })
        .withDeleted()
        .getExists();
    } finally {
      await queryRunner.release();
    }
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} not found`;
  }
}

export function Exists(
  entityClass: any,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [entityClass],
      validator: ExistenceConstraint,
    });
  };
}
