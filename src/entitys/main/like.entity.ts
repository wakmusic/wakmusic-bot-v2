import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SongEntity } from './song.entity';

@Entity({ name: 'like' })
export class LikeEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @OneToOne(() => SongEntity, (song) => song.like, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'song_id', referencedColumnName: 'id' })
  song: SongEntity;

  @Column({ name: 'song_id', type: 'bigint', unique: true })
  songId: number;

  @Column({ type: 'bigint', default: 0 })
  likes: number;
}
