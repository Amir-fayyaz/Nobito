import { Base } from 'src/common/entity/base-entity.dto';
import { Position } from 'src/modules/auth/entities/position.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Personnel extends Base {
  @Column()
  name: string;

  @Column()
  PersonnelNumber: string;

  @Column()
  salary_amount: number;

  @Column()
  resume: string;

  //relations
  @ManyToOne(() => Position, (position) => position.personnel)
  position: Position;
  @Column()
  positionId: number;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
  @Column()
  userId: number;
}
