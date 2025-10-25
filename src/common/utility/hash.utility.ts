import * as bcrypt from 'bcrypt';

export const HashPasswordInObject = async (obj: any): Promise<any> => {
  if (Array.isArray(obj)) {
    return await Promise.all(obj.map((item) => HashPasswordInObject(item)));
  } else if (obj && typeof obj === 'object' && !(obj instanceof Date)) {
    const result = Array.isArray(obj) ? [...obj] : { ...obj };

    for (const key of Object.keys(result)) {
      if (key === 'password' && typeof result[key] === 'string') {
        result[key] = await Hash(result[key]);
      } else if (result[key] && typeof result[key] === 'object') {
        result[key] = await HashPasswordInObject(result[key]);
      }
    }

    return result;
  }

  return obj;
};

export const Hash = async (str: string): Promise<string> => {
  const saltRounds = 12;

  return await bcrypt.hash(str, saltRounds);
};

export const Compare = async (
  data: any,
  encrypted: string,
): Promise<boolean> => {
  return await bcrypt.compare(data, encrypted);
};
