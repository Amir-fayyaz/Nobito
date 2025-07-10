import { Base } from 'apps/appointment/src/common/entity/base-entity.dto';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

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
  parent: TreatmentCategory;

  @Column({ nullable: true })
  parentId: number;
}
