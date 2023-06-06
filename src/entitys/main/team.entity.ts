import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'team' })
export class TeamEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  team: string;

  @Column({ type: 'text', nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  role: string;
}
