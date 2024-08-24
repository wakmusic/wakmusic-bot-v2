import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'image_version',
  database: 'main',
})
export class ImageVersionEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'image_id', type: 'int', nullable: false })
  imageId: number;

  @Column({ name: 'url', type: 'varchar', length: 191, nullable: false })
  url: string;

  @Column({ name: 'created_at', type: 'bigint', nullable: false })
  createdAt: number;

  @Column({ name: 'deleted_at', type: 'bigint', nullable: true })
  deletedAt: number;
}
