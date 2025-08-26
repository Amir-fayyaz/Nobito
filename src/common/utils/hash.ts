import * as bcrypt from 'bcrypt';

export async function Hash(data: any): Promise<string> {
  return await bcrypt.hash(data, 10);
}

export function Compare(data: any, hashedData: string): boolean {
  return bcrypt.compareSync(data, hashedData);
}
