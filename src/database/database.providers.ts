import * as mongoose from 'mongoose';

export const databaseProviders = [
    {
        provide: 'NIKE_CONNECTION',
        useFactory: async (): Promise<typeof mongoose> =>
            await mongoose.createConnection('mongodb+srv://tamphan91:5ba7bay5ba@sale-wqeq8.mongodb.net/nike?retryWrites=true&w=majority',
             { useNewUrlParser: true, useUnifiedTopology: true }),
    },
    {
        provide: 'ADIDAS_CONNECTION',
        useFactory: async (): Promise<typeof mongoose> =>
            await mongoose.createConnection('mongodb+srv://tamphan91:5ba7bay5ba@sale-wqeq8.mongodb.net/adidas?retryWrites=true&w=majority',
             { useNewUrlParser: true, useUnifiedTopology: true }),
    },
];
