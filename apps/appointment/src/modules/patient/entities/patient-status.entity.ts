import { Base } from 'libs/entities';
import { PatientStatusEnum } from 'libs/enums';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Patient } from './patient.entity';

@Entity('patient_status')
export class PatientStatus extends Base {
  @Column({
    type: 'enum',
    enum: PatientStatusEnum,
    default: PatientStatusEnum.SICK,
  })
  status: PatientStatusEnum;

  @ManyToOne(() => Patient, (patient) => patient.id)
  patient: Patient;
  @Column()
  patientId: number;
}
