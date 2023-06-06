import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserLikeEntity } from './userLike.entity';
import { LikeEntity } from './like.entity';

@Entity({ name: 'user_like_song' })
export class UserLikeSongEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ManyToOne(() => UserLikeEntity, (userLikes) => userLikes.likes, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_likes_id', referencedColumnName: 'id' })
  userLike: UserLikeEntity;

  @ManyToOne(() => LikeEntity, (like) => like.id, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'like_id', referencedColumnName: 'id' })
  like: LikeEntity;

  @Column({ type: 'bigint' })
  order: number;
}
