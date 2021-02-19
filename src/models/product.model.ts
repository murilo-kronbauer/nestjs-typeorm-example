import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({})
  code: string;

  @Column({})
  name: string;

  @Column({})
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn({ nullable: true })
  updatedAt: Date;
}
