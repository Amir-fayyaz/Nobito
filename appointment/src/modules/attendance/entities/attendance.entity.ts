import { Base } from 'src/common/entity/base-entity.dto';
import { Column, Entity } from 'typeorm';

@Entity()
export class Attenddance extends Base {
  @Column({ type: 'timestamp' })
  startTime: string;

  @Column({ type: 'timestamp' })
  existTime: string;

  @Column()
  personnelId: number;
}
