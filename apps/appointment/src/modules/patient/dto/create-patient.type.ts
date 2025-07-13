import { Genders } from 'libs/enums';

export class CreatePatient {
  firstname: string;
  lastname: string;
  job: string;
  pregnant: boolean;
  gender: Genders;
}
