import { Base } from 'apps/user/src/common/entity/base-entity.dto';
import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { Personnel } from '../../personnel/entities/personnel.entity';

@Entity()
@Unique(['name'])
export class Position extends Base {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @OneToMany(() => Personnel, (personnel) => personnel.position)
  personnel: Personnel[];
}
