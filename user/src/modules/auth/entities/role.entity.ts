import { Base } from 'src/common/entity/base-entity.dto';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, Index, OneToMany } from 'typeorm';

@Entity()
@Index(['name'])
export class Role extends Base {
  @Column({ unique: true, nullable: false })
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @OneToMany(() => User, (user) => user.role)
  user: User[];
}
