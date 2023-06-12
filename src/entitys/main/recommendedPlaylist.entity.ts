import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RecommendedPlaylistImageEntity } from './recommendedPlaylistImage.entity';
import { RecommendedPlaylistSongEntity } from './recommendedPlaylistSong.entity';

@Entity({ name: 'recommended_playlist' })
export class RecommendedPlaylistEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  key: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @OneToMany(() => RecommendedPlaylistSongEntity, (songs) => songs.playlist)
  songs: Array<RecommendedPlaylistSongEntity>;

  @OneToOne(() => RecommendedPlaylistImageEntity, (image) => image.playlist, {
    eager: true,
  })
  image: RecommendedPlaylistImageEntity;

  @Column({ type: 'boolean' })
  public: boolean;

  @Column({ name: 'create_at', type: 'bigint' })
  createAt: number;

  @Column({ type: 'bigint' })
  order: number;
}
