import 'dotenv/config';

export const jwtConstants = {
    secret: process.env.APP_KEY,
};

export enum UserRole {
    Admin = 'Admin',
    Moderator = 'Moderator',
    User = 'User',
}
