import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PlaylistEntity } from './playlist.entity';
import { SongEntity } from './song.entity';

@Entity({ name: 'playlist_song' })
export class PlaylistSongEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ManyToOne(() => PlaylistEntity, (playlist) => playlist.songs, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'playlist_id', referencedColumnName: 'id' })
  playlist: PlaylistEntity;

  @Column({ name: 'playlist_id', type: 'bigint' })
  playlistId: number;

  @ManyToOne(() => SongEntity, (song) => song.id, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'song_id', referencedColumnName: 'id' })
  song: SongEntity;

  @Column({ type: 'bigint' })
  order: number;
}
