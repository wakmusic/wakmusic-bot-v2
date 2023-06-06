import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'playlist_copy_log' })
export class PlaylistCopyLogEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'int' })
  date: number;

  @Column({ name: 'playlist_key', type: 'varchar', length: 255 })
  playlistKey: string;

  @Column({ name: 'new_playlist_key', type: 'varchar', length: 255 })
  newPlaylistKey: string;

  @Column({ name: 'playlist_owner_id', type: 'varchar', length: 255 })
  playlistOwnerId: string;

  @Column({ name: 'new_playlist_owner_id', type: 'varchar', length: 255 })
  newPlaylistOwnerId: string;

  @Column({ name: 'create_at', type: 'bigint' })
  createAt: number;
}
