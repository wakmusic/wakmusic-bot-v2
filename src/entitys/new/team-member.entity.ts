import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ImageEntity } from './image.entity';

@Entity({
  name: 'member',
  database: 'team',
})
export class TeamMemberEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'member_id', type: 'int', nullable: false })
  memberId: number;

  @Column({ name: 'discord_id', type: 'varchar', length: 191, nullable: false })
  discordId: string;

  @Column({ name: 'profile_id', type: 'int', nullable: false })
  profileId: number;

  @Column({ name: 'team_id', type: 'int', nullable: false })
  teamId: number;

  @Column({ name: 'part_id', type: 'int', nullable: false })
  partId: number;

  @Column({ name: 'is_lead', type: 'bool', nullable: false, default: false })
  isLead: boolean;

  @Column({ name: 'is_manager', type: 'bool', nullable: false, default: false })
  isManager: boolean;

  @Column({ name: 'order', type: 'int', nullable: false })
  order: number;

  @Column({ name: 'created_at', type: 'bigint', nullable: false })
  createdAt: number;

  @Column({ name: 'updated_at', type: 'bigint', nullable: false })
  updatedAt: number;

  @Column({ name: 'deleted_at', type: 'bigint', nullable: true })
  deletedAt?: number | null;

  @OneToOne(() => ImageEntity, (image) => image.id, {
    createForeignKeyConstraints: false,
    nullable: false,
  })
  @JoinColumn({ name: 'profile_id', referencedColumnName: 'id' })
  profile: ImageEntity;
}
