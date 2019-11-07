import * as mongoose from 'mongoose';

export const databaseProviders = [
    {
        provide: 'NIKE_CONNECTION',
        useFactory: async (): Promise<typeof mongoose> =>
            await mongoose.createConnection(process.env.MONGODB_NIKE_URI,
             { useNewUrlParser: true, useUnifiedTopology: true }),
    },
    {
        provide: 'ADIDAS_CONNECTION',
        useFactory: async (): Promise<typeof mongoose> =>
            await mongoose.createConnection(process.env.MONGODB_ADIDAS_URI,
             { useNewUrlParser: true, useUnifiedTopology: true }),
    },
];
