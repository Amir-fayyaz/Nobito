import { Base } from 'libs/entities';
import { Column, Entity } from 'typeorm';

@Entity()
export class SurgeryHistory extends Base {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column('timestamp')
  surgeryDate: string;

  @Column()
  bodyPart: string;

  @Column({ nullable: true })
  surgerName: string;

  @Column({ nullable: true })
  hospitalName: string;

  //!relation to patient table
  @Column()
  patientId: number;
}
