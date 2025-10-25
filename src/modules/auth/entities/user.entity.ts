import { BaseApplicationEntity } from '@common/entity/base.entity';
import { GenderEnum } from '@common/enums/gender.enum';
import { Column, Entity, Index } from 'typeorm';

@Entity()
@Index(['firstName', 'lastName'])
export class User extends BaseApplicationEntity {
  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ unique: true })
  phone: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true, unique: true })
  nationalCode: string;

  @Column({ type: 'enum', enum: GenderEnum, nullable: true })
  gender: GenderEnum;

  @Column({ nullable: true })
  refreshToken: string;
}
