import { Base } from 'apps/appointment/src/common/entity/base-entity.dto';
import { Column, Entity } from 'typeorm';

@Entity()
export class Attendance extends Base {
  @Column({ type: 'timestamp' })
  startTime: string;

  @Column({ type: 'timestamp' })
  exitTime: string;

  @Column()
  personnelId: number;
}
