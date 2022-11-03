import { NextFunction, Request, Response } from "express";
import { appError } from "../errors/appError";

const handleErrorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof appError) {
    return res.status(error.statusCode).json({
      status: "error",
      message: error.message,
      statusCode: error.statusCode,
    });
  }
  console.log(error);

  return res.status(500).json({ message: "Internal server error" });
};

export default handleErrorMiddleware;
