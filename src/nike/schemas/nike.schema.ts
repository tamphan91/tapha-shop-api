import * as mongoose from 'mongoose';

// ~ table
export const NikeSchema = new mongoose.Schema({
    name: String,
    priceReduced: String,
    priceOriginal: String,
    picture: String,
    href: String,
    gender: String,
}, { timestamps: true});
