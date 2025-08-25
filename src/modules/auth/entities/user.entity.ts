import { Column } from 'typeorm';

export class User {
  @Column()
  name: string;
}
