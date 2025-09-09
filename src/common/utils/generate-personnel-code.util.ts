import { createHash } from 'crypto';

export const generatePersonnelCodeFromUUID = (uuid: string): string => {
  const hash = createHash('sha1').update(uuid).digest('hex');
  const code = parseInt(hash.substring(0, 6), 16) % 1000000;
  return code.toString().padStart(6, '0');
};
