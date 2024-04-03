import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'match', async: false })
export class MatchesConstraint implements ValidatorConstraintInterface {
  validate(value: any, validationArguments?: ValidationArguments): boolean {
    const [relatedPropertyName] = validationArguments?.constraints;
    const relatedValue = (validationArguments?.object as any)[relatedPropertyName];
    return value === relatedValue;
  }

  defaultMessage(): string {
    return 'Os campos não coincidem';
  }
}

export function Match(property: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: MatchesConstraint,
    });
  };
}
