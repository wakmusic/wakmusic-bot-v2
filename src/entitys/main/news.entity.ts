import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'news' })
export class NewsEntity extends BaseEntity {
  @PrimaryColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'text', nullable: true })
  title: string;

  @Column({ type: 'int', nullable: true })
  time: number;

  constructor(partial: Partial<NewsEntity>) {
    super();
    Object.assign(this, partial);
  }
}
