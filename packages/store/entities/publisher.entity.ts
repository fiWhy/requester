import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { type Website } from './website.entity.js';

@Entity()
export class Publisher {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ length: 255 })
  name!: string;

  @Column({ length: 255, unique: true })
  email!: string;

  @OneToMany('Website', (website: Website) => website.publisher)
  websites!: Website[];

  @Column({ length: 255 })
  contact_name!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
