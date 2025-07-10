import { Base } from 'libs/entities';
import { Column } from 'typeorm';

export class AlergyHistory extends Base {
  @Column()
  title: string;

  @Column()
  description: string;

  //! relation to patient
  @Column()
  patientId: number;
}
