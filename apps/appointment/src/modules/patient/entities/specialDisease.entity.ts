import { Base } from 'libs/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Patient } from './patient.entity';

@Entity()
export class SpecialDisease extends Base {
  @Column()
  title: string;

  @Column()
  descripion: string;

  //! relation to patient entity
  @ManyToOne(() => Patient, (patient) => patient.specailDisease)
  patient: Patient;
  @Column()
  patiendId: number;
}
