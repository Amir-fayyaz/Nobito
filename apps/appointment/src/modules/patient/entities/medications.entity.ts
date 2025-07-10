import { Base } from 'libs/entities';
import { Column, Entity } from 'typeorm';

@Entity()
export class Medications extends Base {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column('timestamp')
  startDate: string;

  @Column('timestamp')
  endDate: string;

  //! relation to patient
  @Column()
  patientId: number;
}
