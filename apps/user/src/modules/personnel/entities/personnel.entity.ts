import { Base } from 'apps/user/src/common/entity/base-entity.dto';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Position } from '../../auth/entities/position.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Personnel extends Base {
  @Column()
  name: string;

  @Column({ nullable: true, unique: true })
  PersonnelNumber: string;

  @Column()
  salary_amount: number;

  @Column()
  resume: string;

  //relations
  @ManyToOne(() => Position, (position) => position.personnel, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  position: Position;
  @Column()
  positionId: number;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;
  @Column()
  userId: number;
}
