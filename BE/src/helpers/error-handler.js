import { ErrorCodes, HttpException } from "../exceptions/base.root.js";
import { InternalException } from "../exceptions/internal-exception.js";
import logger from "../utils/logger.js";

export const errorHandler = (method) => {
  return async (req, res, next) => {
    try {
      await method(req, res, next);
    } catch (err) {
      logger.error(err);
      let exception;
      if (err instanceof HttpException) exception = err;
      else
        exception = new InternalException(
          err?.issues
            ? "Validation error"
            : err?.message || "Something went wrong",
          err,
          ErrorCodes.INTERNAL_EXCEPTION,
        );
      next(exception);
    }
  };
};
