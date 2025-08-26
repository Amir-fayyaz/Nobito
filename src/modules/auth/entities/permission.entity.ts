import { BaseAppEntity } from '@common/entity/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Permission extends BaseAppEntity {
  @Column()
  title: string;

  @Column({ nullable: false })
  description: string;
}
