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

export enum Currency {
    USD = 'USD',
    VND = 'VND',
}

export enum ProductStatus {
    Sale = 'Sale',
    New = 'New',
    Limited = 'Limited',
    Release = 'Release',
    LowInStock = 'LowInStock',
    OutOfStock = 'OutOfStock',
}

export enum OrderStatus {
    Requested = 'Requested',
    Ordered = 'Ordered',
    PendingDelivery  = 'Pending Delivery',
    Received = 'Received',
    Canceled = 'Canceled',
}

export enum InvoiceStatus {
    Open = 'Open',
    Paid = 'Paid',
}

export enum Discount {
    SALE10 = 10,
    SALE15 = 15,
    SALE20 = 20,
    SALE25 = 25,
    SALE30 = 30,
    SALE50 = 50,
}

export enum PrimaryTopSize {
    XXS = 'XXS',
    XS = 'XS',
    S = 'S',
    M = 'M',
    L = 'L',
    XL = 'XL',
    XXL = 'XXL',
}

export enum PrimaryBottomSize {
    S28 = '28',
    S29 = '29',
    S30 = '30',
    S31 = '31',
    S32 = '32',
    S33 = '33',
}

export enum SecondarySize {
    L28 = '28',
    L29 = '29',
    L30 = '30',
    L31 = '31',
    L32 = '32',
    L33 = '33',
}
