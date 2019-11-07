import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind } from 'graphql';
import { Logger } from '@nestjs/common';

@Scalar('Date', type => Date)
export class DateScalar implements CustomScalar<number, Date> {
  description = 'Date custom scalar type';

  parseValue(value: number): Date {
    Logger.log('parseValue');
    return new Date(value); // value from the client
  }

  serialize(value: Date): number {
    Logger.log('serialize');
    return value.getTime(); // value sent to the client
  }

  parseLiteral(ast: any): Date {
    Logger.log('parseLiteral');
    if (ast.kind === Kind.INT) {
      return new Date(ast.value);
    }
    return null;
  }
}
