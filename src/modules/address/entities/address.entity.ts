import { BaseAppEntity } from '@common/entity/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Address extends BaseAppEntity {
  @Column()
  province: string;

  @Column()
  city: string;

  @Column({ nullable: true, type: 'decimal', precision: 10, scale: 8 })
  latitude: number;

  @Column({ nullable: true, type: 'decimal', precision: 11, scale: 8 })
  longitude: number;
}
