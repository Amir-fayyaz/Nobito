import { Base } from 'libs/entities';
import { Genders } from 'libs/enums';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { AlergyHistory } from './alergy-history.entity';
import { Medications } from './medications.entity';
import { SpecialDisease } from './specialDisease.entity';
import { SurgeryHistory } from './surgery-history.entity';

@Entity()
export class Patient extends Base {
  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  job: string;

  @Column()
  pregnant: boolean;

  @Column({ type: 'enum', enum: Genders, default: Genders.UNKNOWN })
  gender: Genders;

  // relations
  @OneToMany(() => AlergyHistory, (alergy) => alergy.patient)
  alergies: AlergyHistory[];

  @OneToMany(() => Medications, (medication) => medication.patient)
  medications: Medications[];

  @OneToMany(() => SpecialDisease, (specialDisease) => specialDisease.patient)
  specailDisease: SpecialDisease[];

  @OneToMany(() => SurgeryHistory, (surgeryHistory) => surgeryHistory.patient)
  surgeryHistory: SurgeryHistory[];

  // patient-status id
}
