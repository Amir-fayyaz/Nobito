import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsNationalCode', async: false })
export class IsNationalCodeConstraint implements ValidatorConstraintInterface {
  validate(nationalCode: string, args: ValidationArguments) {
    if (!nationalCode) return false;

    const cleanedCode = nationalCode.toString().replace(/\D/g, '');

    if (cleanedCode.length !== 10) {
      return false;
    }

    if (/^(\d)\1{9}$/.test(cleanedCode)) {
      return false;
    }

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanedCode[i]) * (10 - i);
    }

    const remainder = sum % 11;
    const controlDigit = parseInt(cleanedCode[9]);

    if (remainder < 2) {
      return controlDigit === remainder;
    } else {
      return controlDigit === 11 - remainder;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return 'invalid national-code';
  }
}

export function IsNationalCode(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsNationalCodeConstraint,
    });
  };
}
