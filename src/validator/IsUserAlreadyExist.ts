import {registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments} from 'class-validator';
import {getRepository} from 'typeorm';
import {User} from '../user/user.entity';

@ValidatorConstraint({ async: true })
export class IsEmailAlreadyExistConstraint implements ValidatorConstraintInterface {

    validate(email: any, args: ValidationArguments) {
        const userRepository = getRepository(User);
        return userRepository.findOne({email}).then(user => {
            // if (user) return false;
            return !user;
        });
    }

}

export function IsEmailAlreadyExist(validationOptions?: ValidationOptions) {
   return (object: any, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsEmailAlreadyExistConstraint,
        });
   };
}
