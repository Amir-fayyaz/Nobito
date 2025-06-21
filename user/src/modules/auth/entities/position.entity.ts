import { Base } from 'src/common/entity/base-entity.dto';
import { Personnel } from 'src/modules/personnel/entities/personnel.entity';
import { Column, Entity, OneToMany, Unique } from 'typeorm';

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
