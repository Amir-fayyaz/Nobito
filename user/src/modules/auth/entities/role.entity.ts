import { Base } from 'src/common/entity/base-entity.dto';
import { Column, Entity, Index } from 'typeorm';

@Entity()
@Index(['name'])
export class Role extends Base {
  @Column({ unique: true, nullable: false })
  name: string;

  @Column('text', { nullable: true })
  description: string;
}
