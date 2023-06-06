import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CategoryEntity } from './category.entity';

@Entity({ name: 'notice' })
export class NoticeEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ManyToOne(() => CategoryEntity, (category) => category.id, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  category: CategoryEntity;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ name: 'main_text', type: 'longtext', nullable: true })
  mainText: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  thumbnail: string;

  @Column({ type: 'simple-array', nullable: true })
  images: Array<string>;

  @Column({ name: 'create_at', type: 'bigint' })
  createAt: number;

  @Column({ name: 'start_at', type: 'bigint' })
  startAt: number;

  @Column({ name: 'end_at', type: 'bigint' })
  endAt: number;
}
