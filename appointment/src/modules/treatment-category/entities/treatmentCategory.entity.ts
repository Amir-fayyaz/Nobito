import { Base } from 'src/common/entity/base-entity.dto';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class TreatmentCategory extends Base {
  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(
    () => TreatmentCategory,
    (treatmentCateogry) => treatmentCateogry.id,
    { cascade: true },
  )
  @JoinColumn({ name: 'parentId' })
  TreatmentCategory: TreatmentCategory;

  @Column()
  parentId: number;
}
