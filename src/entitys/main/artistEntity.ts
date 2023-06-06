import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GroupEntity } from './group.entity';
import { ArtistImageVersionEntity } from './artistImageVersion.entity';
import { SongEntity } from './song.entity';

@Entity({ name: 'artist' })
export class ArtistEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  order: number;

  @Column({ name: 'artist_id', type: 'varchar', length: 255 })
  artistId: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  short: string;

  @Column({ type: 'boolean', default: 0 })
  graduated: boolean;

  @OneToOne(() => GroupEntity, (group) => group.artist)
  group: GroupEntity;

  @ManyToMany(() => SongEntity, (song) => song.artists, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable({
    name: 'artist_song',
    joinColumn: {
      name: 'artist_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'song_id',
      referencedColumnName: 'id',
    },
  })
  songs: Array<SongEntity>;

  @Column({ type: 'longtext', nullable: true })
  title: string;

  @Column({ name: 'app_title', type: 'longtext', nullable: true })
  appTitle: string;

  @Column({ type: 'longtext', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  color: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  youtube: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  twitch: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  instagram: string;

  @OneToOne(
    () => ArtistImageVersionEntity,
    (artistImageVersion) => artistImageVersion.artist
  )
  image: ArtistImageVersionEntity;
}
