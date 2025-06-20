import { Base } from 'src/common/entity/base-entity.dto';
import { Column, Entity, Unique } from 'typeorm';

@Entity()
@Unique(['name'])
export class Position extends Base {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;
}
