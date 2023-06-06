import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SongEntity } from './song.entity';

@Entity({ name: 'chart_total' })
export class ChartTotalEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @OneToOne(() => SongEntity, (song) => song.daily, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'song_id', referencedColumnName: 'id' })
  song: SongEntity;

  @Column({ type: 'bigint' })
  views: number;

  @Column({ type: 'int' })
  increase: number;

  @Column({ type: 'int' })
  last: number;
}
