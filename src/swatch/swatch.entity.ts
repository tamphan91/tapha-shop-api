import { Base } from '../common/base.entity';
import { Entity, Column} from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity()
export class Swatch extends Base {
    @ApiModelProperty({ example: 'blue', description: 'blue' })
    @Column()
    name: string;

    @Column('text', {nullable: true})
    image: string;
}
