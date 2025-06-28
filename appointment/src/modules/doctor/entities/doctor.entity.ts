import { Base } from 'src/common/entity/base-entity.dto';
import { Column, Entity } from 'typeorm';

@Entity()
export class Doctor extends Base {
  @Column({ nullable: true, unique: true })
  doctorNumber: string;

  @Column()
  personnelId: number;
}
