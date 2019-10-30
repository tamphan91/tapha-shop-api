import { Document } from 'mongoose';
export interface Adidas extends Document {
    readonly created: Date;
    readonly name: string;
    readonly priceReduced: string;
    readonly priceOriginal: string;
    readonly picture: string;
    readonly href: string;
    readonly gender: string;
}
