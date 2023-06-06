import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ArtistEntity } from './artistEntity';

@Entity({ name: 'group' })
export class GroupEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @OneToOne(() => ArtistEntity, (artist) => artist.group, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'artist_id', referencedColumnName: 'id' })
  artist: ArtistEntity;

  @Column({ type: 'varchar', length: 255 })
  en: string;

  @Column({ type: 'varchar', length: 255 })
  kr: string;
}
