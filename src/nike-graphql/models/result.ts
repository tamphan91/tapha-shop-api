import { Field, ID, ObjectType } from 'type-graphql';
import { Nike } from './nike';

@ObjectType()
export class Result {
    @Field(type => [Nike])
    items: Nike[];

    @Field()
    itemCount: number;

    @Field()
    total: number;

    @Field()
    pageCount: number;
}
