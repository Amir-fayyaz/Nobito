import * as bcrypt from 'bcrypt';

export function Hash(data: any): string {
  return bcrypt.hashSync(data, 10);
}

export function Compare(data: any, hashedData: string): boolean {
  return bcrypt.compareSync(data, hashedData);
}
