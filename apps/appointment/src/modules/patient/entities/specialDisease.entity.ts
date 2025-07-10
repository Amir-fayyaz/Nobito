import { Base } from 'libs/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class SpecialDisease extends Base {
  @Column()
  title: string;

  @Column()
  descripion: string;

  //! relation to patient entity
  @Column()
  patiendId: number;
}
