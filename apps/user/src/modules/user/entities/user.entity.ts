import { Base } from 'apps/user/src/common/entity/base-entity.dto';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Role } from '../../auth/entities/role.entity';

@Entity()
export class User extends Base {
  @Column({ nullable: true })
  firstname: string;

  @Column({ nullable: true })
  lastname: string;

  @Column({ nullable: true, unique: true })
  phone: string;

  @Column({ nullable: true, unique: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  nationalCode: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  fathername: string;

  @Column('boolean', { default: false })
  isVerified: boolean;

  @Column({ default: 1 })
  roleId: number;

  @ManyToOne(() => Role, (role) => role.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  role: Role;
}
