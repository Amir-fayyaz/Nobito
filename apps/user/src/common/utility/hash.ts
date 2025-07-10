import { compareSync, genSalt, hashSync } from 'bcrypt';

export async function hash(data: any): Promise<string> {
  return hashSync(data, await genSalt());
}

export function compare(data: string, hashedData: string): boolean {
  return compareSync(data, hashedData);
}
