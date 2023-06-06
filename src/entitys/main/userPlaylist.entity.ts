import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { UserPlaylistPlaylistEntity } from './userPlaylistPlaylist.entity';

@Entity({ name: 'user_playlist' })
export class UserPlaylistEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @OneToOne(() => UserEntity, (user) => user.playlists, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity;

  @Column({ name: 'user_id', type: 'bigint', unique: true })
  userId: number;

  @OneToMany(
    () => UserPlaylistPlaylistEntity,
    (playlists) => playlists.userPlaylist
  )
  playlists: Array<UserPlaylistPlaylistEntity>;
}
