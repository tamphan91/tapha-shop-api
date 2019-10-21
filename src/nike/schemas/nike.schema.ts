import * as mongoose from 'mongoose';

export const NikeSchema = new mongoose.Schema({
    name: String,
    priceReduced: String,
    priceOriginal: String,
    picture: String,
    href: String,
    type: String,
}, { timestamps: true});
