import { BaseAppEntity } from '@common/entity/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Position extends BaseAppEntity {
  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;
}
