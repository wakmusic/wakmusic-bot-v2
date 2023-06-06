import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProfileEntity } from './profile.entity';
import { UserLikeEntity } from './userLike.entity';
import { UserPermissionEntity } from './userPermission.entity';
import { UserPlaylistEntity } from './userPlaylist.entity';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ name: 'user_id', type: 'varchar', length: 255 })
  userId: string;

  @Column({ type: 'varchar', length: 255 })
  platform: string;

  @ManyToOne(() => ProfileEntity, (profile) => profile.id, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'profile_id', referencedColumnName: 'id' })
  profile: ProfileEntity;

  @Column({ name: 'profile_id', type: 'bigint' })
  profileId: number;

  @Column({ type: 'varchar', length: 255 })
  displayName: string;

  @Column({ name: 'first_login_time', type: 'bigint' })
  firstLoginTime: number;

  @OneToOne(() => UserPlaylistEntity, (playlists) => playlists.user)
  playlists: UserPlaylistEntity;

  @OneToOne(() => UserLikeEntity, (likes) => likes.user)
  likes: UserLikeEntity;

  @OneToOne(() => UserPermissionEntity, (permission) => permission.user)
  permission: UserPermissionEntity;

  @Column({ name: 'create_at', type: 'bigint' })
  createAt: number;
}
