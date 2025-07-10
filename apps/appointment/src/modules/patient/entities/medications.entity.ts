import { Base } from 'libs/entities';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Patient } from './patient.entity';

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

  @ManyToOne(() => Patient, (patient) => patient.medications)
  patient: Patient;
  @Column()
  patientId: number;
}
