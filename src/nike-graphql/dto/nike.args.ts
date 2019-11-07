import { ArgsType, Field, Int } from 'type-graphql';
import { Min } from 'class-validator';
import { Gender } from '../../common/constants';

@ArgsType()
export class NikeArgs {
    @Field()
    search: string = null;

    @Field(type => Int)
    @Min(0)
    page: number = 0;

    @Field()
    gender: Gender = null;

    @Min(parseInt(process.env.LIMIT_PAGE, null))
    @Field(type => Int)
    limits: number = parseInt(process.env.LIMIT_PAGE, null);
}
