import { BaseAppEntity } from '@common/entity/base.entity';
import { Column } from 'typeorm';

export class Permission extends BaseAppEntity {
  @Column()
  title: string;

  @Column({ nullable: false })
  description: string;
}
