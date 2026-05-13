import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { type Publisher } from './publisher.entity.js';

@Entity()
export class Website {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @ManyToOne('Publisher', (publisher: Publisher) => publisher.websites, {
    onDelete: 'CASCADE',
  })
  publisher!: Publisher;

  @Column({ length: 255 })
  name!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
