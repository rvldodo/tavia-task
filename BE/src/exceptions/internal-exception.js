import { HttpException } from "./base.root.js";

export class InternalException extends HttpException {
  constructor(message, errorCode, errors) {
    super(message, errorCode, 500, errors);
  }
}
