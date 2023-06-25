import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserPlaylistEntity } from './userPlaylist.entity';
import { PlaylistEntity } from './playlist.entity';

@Entity({ name: 'user_playlist_playlist' })
export class UserPlaylistPlaylistEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ManyToOne(
    () => UserPlaylistEntity,
    (userPlaylists) => userPlaylists.playlists,
    {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    }
  )
  @JoinColumn({ name: 'user_playlist_id', referencedColumnName: 'id' })
  userPlaylist: UserPlaylistEntity;

  @Column({ name: 'user_playlist_id', type: 'bigint' })
  userPlaylistId: number;

  @OneToOne(() => PlaylistEntity, (playlist) => playlist.id, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'playlist_id', referencedColumnName: 'id' })
  playlist: PlaylistEntity;

  @Column({ name: 'playlist_id', type: 'bigint' })
  playlistId: number;

  @Column({ type: 'bigint' })
  order: number;
}
