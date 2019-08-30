import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity, Column } from 'typeorm';

export abstract class Base extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;

    @Column('smallint', {default: 1})
    state: number;
}
