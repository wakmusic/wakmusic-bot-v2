import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CategoryEntity } from './category.entity';

@Entity({ name: 'qna' })
export class QnaEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ManyToOne(() => CategoryEntity, (category) => category.id, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  category: CategoryEntity;

  @Column({ type: 'varchar', length: 255, unique: true })
  question: string;

  @Column({ type: 'longtext' })
  description: string;

  @Column({ name: 'create_at', type: 'bigint' })
  createAt: number;
}
