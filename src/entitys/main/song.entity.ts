import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ArtistEntity } from './artistEntity';
import { LikeEntity } from './like.entity';
import { ChartHourlyEntity } from './chartHourly.entity';
import { ChartDailyEntity } from './chartDaily.entity';
import { ChartWeeklyEntity } from './chartWeekly.entity';
import { ChartMonthlyEntity } from './chartMonthly.entity';
import { ChartTotalEntity } from './chartTotal.entity';

@Entity({ name: 'song' })
export class SongEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ name: 'song_id', type: 'varchar', length: 255, unique: true })
  songId: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255 })
  artist: string;

  @ManyToMany(() => ArtistEntity, (artist) => artist.songs, {})
  artists: Array<ArtistEntity>;

  @OneToOne(() => LikeEntity, (like) => like.song)
  like: LikeEntity;

  @Column({ type: 'varchar', length: 255, nullable: true })
  remix: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  reaction: string;

  @Column({ type: 'int' })
  date: number;

  @Column({ type: 'bigint' })
  start: number;

  @Column({ type: 'bigint' })
  end: number;

  @OneToOne(() => ChartTotalEntity, (total) => total.song)
  total: ChartTotalEntity;

  @OneToOne(() => ChartHourlyEntity, (hourly) => hourly.song)
  hourly: ChartHourlyEntity;

  @OneToOne(() => ChartDailyEntity, (daily) => daily.song)
  daily: ChartDailyEntity;

  @OneToOne(() => ChartWeeklyEntity, (weekly) => weekly.song)
  weekly: ChartWeeklyEntity;

  @OneToOne(() => ChartMonthlyEntity, (monthly) => monthly.song)
  monthly: ChartMonthlyEntity;
}
