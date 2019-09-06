import {registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments} from 'class-validator';
import * as moment from 'moment';

@ValidatorConstraint({ async: true })
export class MyMaxDateConstraint implements ValidatorConstraintInterface {

    validate(dateInput: any, args: ValidationArguments) {
        // tslint:disable-next-line:no-console
        // console.log('dateInput', dateInput);
        return moment(dateInput).isBefore(moment(new Date()).format('YYYY-MM-DD'));
    }

}

export function MyMaxDate(validationOptions?: ValidationOptions) {
   return (object: any, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: MyMaxDateConstraint,
        });
   };
}
