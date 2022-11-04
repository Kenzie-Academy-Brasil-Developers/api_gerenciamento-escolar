import { Response } from "express";

export const handleError = (err: appError, res: Response) => {
  const { statusCode, message } = err;

  return res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};

class appError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 400) {
    super();

    this.message = message;
    this.statusCode = statusCode;
  }
}

export { appError };
