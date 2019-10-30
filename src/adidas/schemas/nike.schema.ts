import * as mongoose from 'mongoose';

export const AdidasSchema = new mongoose.Schema({
    name: String,
    priceReduced: String,
    priceOriginal: String,
    picture: String,
    href: String,
    gender: String,
}, { timestamps: true});
