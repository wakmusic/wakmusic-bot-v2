import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PlaylistEntity } from './playlist.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'playlist_copy' })
export class PlaylistCopyEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'int' })
  date: number;

  @OneToOne(() => PlaylistEntity, (playlist) => playlist.key, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'playlist_key', referencedColumnName: 'key' })
  playlist: PlaylistEntity;

  @ManyToOne(() => UserEntity, (user) => user.id, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'owner_id', referencedColumnName: 'id' })
  owner: UserEntity;

  @Column({ type: 'bigint' })
  count: number;

  @Column({ name: 'create_at', type: 'bigint' })
  createAt: number;
}
