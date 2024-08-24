import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'image',
  database: 'main',
})
export class ImageEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'type', type: 'varchar', length: 191, nullable: false })
  type: string;

  @Column({ name: 'name', type: 'varchar', length: 191, nullable: false })
  name: string;

  @Column({ name: 'current_version_id', type: 'int', nullable: true })
  currentVersionId?: number | null;

  @Column({ name: 'order', type: 'int', nullable: true })
  order?: number | null;

  @Column({ name: 'created_at', type: 'bigint', nullable: false })
  createdAt: number;

  @Column({ name: 'updated_at', type: 'bigint', nullable: false })
  updatedAt: number;

  @Column({ name: 'deleted_at', type: 'bigint', nullable: true })
  deletedAt?: number | null;
}
