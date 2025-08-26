import { BaseAppEntity } from '@common/entity/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Permission extends BaseAppEntity {
  @Column({ unique: true })
  title: string;

  @Column({ nullable: true })
  description: string;
}
