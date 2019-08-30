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
