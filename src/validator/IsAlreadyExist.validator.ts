import {registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments} from 'class-validator';
import {getRepository} from 'typeorm';
import {User} from '../user/user.entity';

@ValidatorConstraint({ async: true })
export class IsUserEmailAlreadyExistConstraint implements ValidatorConstraintInterface {

    async validate(email: any, args: ValidationArguments) {
        const userRepository = getRepository(User);
        // return userRepository.findOne({email}).then(user => {
        //     // if (user) return false;
        //     return !user;
        // });

        // tslint:disable-next-line:no-console
        // console.log('user:::::::::::', (await userRepository.findOne({email})));
        return !(await userRepository.findOne({email}));
    }

}

export function IsUserEmailAlreadyExist(validationOptions?: ValidationOptions) {
   return (object: any, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsUserEmailAlreadyExistConstraint,
        });
   };
}
