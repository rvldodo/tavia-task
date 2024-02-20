import { HttpException } from "./base.root.js";

export class UnauthorizedException extends HttpException {
  constructor(message, errorCode) {
    super(message, errorCode, 403, null);
  }
}
