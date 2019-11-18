import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Nike {
    @Field()
    createdAt: Date;

    @Field()
    name: string;

    @Field()
    priceReduced: string;

    @Field()
    priceOriginal: string;

    @Field()
    picture: string;

    @Field()
    href: string;

    @Field()
    gender: string;
}
