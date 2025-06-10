import { Base } from 'src/common/entity/base-entity.dto';
import { Column, Entity, Unique } from 'typeorm';

@Entity()
@Unique(['email', 'phone'])
export class User extends Base {
  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ length: 11 })
  phone: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ length: 10 })
  nationalCode: string;

  @Column()
  avatar: string;

  @Column()
  fathername: string;
}
