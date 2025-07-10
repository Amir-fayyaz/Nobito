import { Base } from 'libs/entities';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Patient } from './patient.entity';

@Entity()
export class AlergyHistory extends Base {
  @Column()
  title: string;

  @Column()
  description: string;

  //! relation to patient
  @ManyToOne(() => Patient, (patient) => patient.alergies)
  patient: Patient;
  @Column()
  patientId: number;
}
