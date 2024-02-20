// message, status code, error code, errors

export class HttpException extends Error {
  message;
  statusCode;
  errorCode;
  errors;

  constructor(message, errorCode, statusCode, errors) {
    super(message);
    this.message = message;
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export const ErrorCodes = {
  USER_NOT_FOUND: 1001,
  USER_ALREADY_EXISTS: 1002,
  INCORRECT_PASSWORD: 1003,
  BAD_REQUEST: 1004,
  UNPROCESSABLE_ENTITY: 20001,
  INTERNAL_EXCEPTION: 3001,
  UNAUTHORIZED: 4001,
};
