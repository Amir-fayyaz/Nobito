import { BaseAppEntity } from '@common/entity/base.entity';
import { User } from '@module/auth/entities/user.entity';
import { Position } from '@module/position/entities/position.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity()
export class Personnel extends BaseAppEntity {
  @Column()
  fullName: string;

  @Column({ nullable: true })
  resume: string;

  @Column({ type: 'double' })
  salary: number;

  @ManyToOne(() => Position, (position) => position.id)
  @JoinColumn()
  position: Position;

  @Column()
  positionId: string;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: User;

  @Column()
  userId: string;

  @Column({ unique: true, nullable: true })
  personnelCode: string;
}
