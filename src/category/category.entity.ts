import { Base } from '../common/base.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class Category extends Base {
    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    title1: string;

    @Column()
    title2: string;

    @Column()
    url: string;
}
