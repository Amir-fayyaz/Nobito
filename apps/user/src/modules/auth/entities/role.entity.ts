import { Base } from 'apps/user/src/common/entity/base-entity.dto';
import { Column, Entity, Index, OneToMany } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Role extends Base {
  @Column({ unique: true, nullable: false })
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @OneToMany(() => User, (user) => user.role)
  user: User[];
}
