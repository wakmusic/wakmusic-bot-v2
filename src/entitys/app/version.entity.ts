import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'version' })
export class VersionEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  os: string;

  @Column({ type: 'varchar', length: 255 })
  version: string;

  @Column({ type: 'bool', default: 0 })
  force: boolean;

  @Column({
    name: 'create_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP()',
  })
  createAt: Date;
}
