import { Connection } from 'mongoose';
import { AdidasSchema } from './schemas/nike.schema';

export const adidasProviders = [
  {
    provide: 'SALE_MODEL',
    useFactory: (connection: Connection) => connection.model('SALE', AdidasSchema),
    inject: ['ADIDAS_CONNECTION'],
  }, {
    provide: 'NORMAL_MODEL',
    useFactory: (connection: Connection) => connection.model('NORMAL', AdidasSchema),
    inject: ['ADIDAS_CONNECTION'],
  },
];
