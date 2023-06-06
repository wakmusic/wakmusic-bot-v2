import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { PlaylistImageEntity } from './playlistImage.entity';
import { PlaylistSongEntity } from './playlistSong.entity';

@Entity({ name: 'playlist' })
export class PlaylistEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  key: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @ManyToOne(() => UserEntity, (user) => user.id, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity;

  @ManyToOne(() => PlaylistImageEntity, (image) => image.id, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'image_id', referencedColumnName: 'id' })
  image: PlaylistImageEntity;

  @OneToMany(() => PlaylistSongEntity, (songs) => songs.playlist)
  songs: Array<PlaylistSongEntity>;

  @Column({ name: 'create_at', type: 'bigint' })
  createAt: number;
}
