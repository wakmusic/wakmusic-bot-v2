import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RecommendedPlaylistEntity } from './recommendedPlaylist.entity';
import { SongEntity } from './song.entity';

@Entity({ name: 'recommended_playlist_song' })
export class RecommendedPlaylistSongEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ManyToOne(() => RecommendedPlaylistEntity, (playlist) => playlist.songs, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'playlist_id', referencedColumnName: 'id' })
  playlist: RecommendedPlaylistEntity;

  @ManyToOne(() => SongEntity, (song) => song.id, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'song_id', referencedColumnName: 'id' })
  song: SongEntity;

  @Column({ type: 'bigint' })
  order: number;
}
