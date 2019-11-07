import { Module } from '@nestjs/common';
import { NikeResolver } from './nike.resolver';
import { NikesModule } from '../nike/nikes.module';
import { DateScalar } from '../common/scalars/date.scalar';

@Module({
    imports: [NikesModule],
    providers: [NikeResolver],
})
export class NikeModule {}
