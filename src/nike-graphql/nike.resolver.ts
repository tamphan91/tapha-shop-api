import { Resolver } from 'type-graphql';
import { Nike } from './models/nike';
import { Query, Args } from '@nestjs/graphql';
import { NikesService } from '../nike/nikes.service';
import { Result } from './models/result';
import { NikeArgs } from './dto/nike.args';

@Resolver(of => Nike)
export class NikeResolver {
    constructor(private readonly nikeService: NikesService) {}

    @Query(returns => Result)
    nikes(@Args() nikeArgs: NikeArgs): Promise<Result> {
        // tslint:disable-next-line:no-console
        console.log(nikeArgs);
        return this.nikeService.findAll(nikeArgs.search, nikeArgs.page, nikeArgs.gender, nikeArgs.limits);
    }
}
