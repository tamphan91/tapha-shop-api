import { Connection } from 'mongoose';
import { NikeSchema } from './schemas/nike.schema';

export const nikesProviders = [
  {
    provide: 'SALE_MODEL',
    useFactory: (connection: Connection) => connection.model('SALE', NikeSchema),
    inject: ['NIKE_CONNECTION'],
  }, {
    provide: 'NORMAL_MODEL',
    useFactory: (connection: Connection) => connection.model('NORMAL', NikeSchema),
    inject: ['NIKE_CONNECTION'],
  },
];
