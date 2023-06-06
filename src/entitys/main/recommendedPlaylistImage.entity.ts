import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RecommendedPlaylistEntity } from './recommendedPlaylist.entity';

@Entity({ name: 'recommended_playlist_image' })
export class RecommendedPlaylistImageEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @OneToOne(() => RecommendedPlaylistEntity, (playlist) => playlist.image, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'playlist_id', referencedColumnName: 'id' })
  playlist: RecommendedPlaylistEntity;

  @Column({ type: 'int' })
  round: number;

  @Column({ type: 'int' })
  square: number;
}
