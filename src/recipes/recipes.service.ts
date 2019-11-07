import { Injectable } from '@nestjs/common';
import { NewRecipeInput } from './dto/new-recipe.input';
import { RecipesArgs } from './dto/recipes.args';
import { Recipe } from './models/recipe';

@Injectable()
export class RecipesService {
    /**
     * MOCK
     * Put some real business logic here
     * Left for demonstration purposes
     */

    recipes = new Array<Recipe>();
    index = 1;
    async create(data: NewRecipeInput): Promise<Recipe> {
        const rep = Object.assign(new Recipe(), data);
        rep.id = this.index++ + '';
        rep.creationDate = new Date();
        this.recipes.push(rep);
        return rep;
    }

    async findOneById(id: string): Promise<Recipe> {
        return {} as any;
    }

    async findAll(recipesArgs: RecipesArgs): Promise<Recipe[]> {
        return this.recipes;
    }

    async remove(id: string): Promise<boolean> {
        return true;
    }
}
