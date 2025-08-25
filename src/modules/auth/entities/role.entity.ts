import { BaseAppEntity } from '@common/entity/base.entity';
import { Column } from 'typeorm';

export class Role extends BaseAppEntity {
  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;
}
