import 'dotenv/config';

export const jwtConstants = {
    secret: process.env.APP_KEY,
};

export enum UserRole {
    Admin = 'Admin',
    Moderator = 'Moderator',
    User = 'User',
}

export enum Gender {
    Male = 'Male',
    Famale = 'Famale',
    Boy = 'Boy',
    Girl = 'Girl',
    Other = 'Other',
}

export enum Provider {
    GOOGLE = 'google',
    FACEBOOK = 'facebook',
}

export enum ProductStatus {
    Sale = 'Sale',
    New = 'New',
    Limited = 'Limited',
    Release = 'Release',
    LowInStock = 'LowInStock',
    OutOfStock = 'OutOfStock',
}

export enum Discount {
    SALE10 = 10,
    SALE15 = 15,
    SALE20 = 20,
    SALE25 = 25,
    SALE30 = 30,
    SALE50 = 50,
}
