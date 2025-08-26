import { BaseAppEntity } from '@common/entity/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Permission } from './permission.entity';

@Entity()
export class PermissionCategory extends BaseAppEntity {
  @Column()
  title: string;

  @OneToMany(() => Permission, (permission) => permission.permissionCategory)
  permissions: Permission[];
}
