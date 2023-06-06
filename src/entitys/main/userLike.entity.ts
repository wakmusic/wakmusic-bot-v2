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
import { UserLikeSongEntity } from './userLikeSong.entity';

@Entity({ name: 'user_like' })
export class UserLikeEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @OneToOne(() => UserEntity, (user) => user.likes, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity;

  @Column({ name: 'user_id', type: 'bigint', unique: true })
  userId: number;

  @OneToMany(() => UserLikeSongEntity, (songs) => songs.userLike, {
    eager: true,
  })
  likes: Array<UserLikeSongEntity>;
}
