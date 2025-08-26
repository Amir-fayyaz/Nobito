import { BaseAppEntity } from '@common/entity/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { PermissionCategory } from './permission-category.entity';

@Entity()
export class Permission extends BaseAppEntity {
  @Column({ unique: true })
  title: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => PermissionCategory, (pc) => pc.permissions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'categoryId' })
  permissionCategory: PermissionCategory;

  @Column()
  categoryId: string;
}
