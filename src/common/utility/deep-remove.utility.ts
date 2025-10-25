const sensitiveFields = ['password', 'nationalCode'];

export const deepRemoveSensitiveFields = (obj: any) => {
  if (Array.isArray(obj)) {
    return obj.map((item) => deepRemoveSensitiveFields(item));
  } else if (obj && typeof obj === 'object') {
    const sanitized = {};

    for (const [key, value] of Object.entries(obj)) {
      if (!sensitiveFields.includes(key)) {
        sanitized[key] = deepRemoveSensitiveFields(value);
      }
    }

    return sanitized;
  }

  return obj;
};
