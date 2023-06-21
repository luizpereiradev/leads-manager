const errorMap: { [key: string]: number } = {
  PAGE_NOT_FOUND: 404,
  ID_NOT_FOUND: 404,
  NAME_NOT_FOUND: 404,
  STATUS_NOT_FOUND: 404,
  VALIDATION_ERROR: 400,
  EMAIL_ALREADY_EXISTS: 409,
  INVALID_NAME: 422,
  INVALID_EMAIL: 422,
  INVALID_PHONE: 422,
};

export const mapError = (type: string | null) => (type ? errorMap[type] : 500);
