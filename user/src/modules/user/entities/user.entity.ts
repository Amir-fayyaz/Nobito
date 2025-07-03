import { Base } from 'src/common/entity/base-entity.dto';
import { Role } from 'src/modules/auth/entities/role.entity';
import { Column, Entity, ManyToOne, Unique } from 'typeorm';

@Entity()
@Unique(['email', 'phone'])
export class User extends Base {
  @Column({ nullable: true })
  firstname: string;

  @Column({ nullable: true })
  lastname: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
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
