import { Base } from 'src/common/entity/base-entity.dto';
import { Column, Entity } from 'typeorm';

@Entity()
export class Role extends Base {
  @Column()
  name: string;

  @Column('text')
  description: string;
}
