import { Base } from 'libs/entities';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Patient } from './patient.entity';

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
  @ManyToOne(() => Patient, (patient) => patient.surgeryHistory)
  patient: Patient;
  @Column()
  patientId: number;
}
