import {registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments} from 'class-validator';
import {getRepository} from 'typeorm';
// import {User} from '../user/user.entity';
import { Category } from '../category/category.entity';

@ValidatorConstraint({ async: true })
export class CheckCategoryConstraint implements ValidatorConstraintInterface {

    async validate(categoryId: any, args: ValidationArguments) {
        const categoryRepository = getRepository(Category);
        const category = await categoryRepository.findOne(categoryId, {relations: ['childCategories']});
        return category.childCategories.length === 0;
    }

}

export function CheckCategory(validationOptions?: ValidationOptions) {
   return (object: any, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: CheckCategoryConstraint,
        });
   };
}
