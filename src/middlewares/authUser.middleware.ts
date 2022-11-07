import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

export const authUser = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let token = request.headers.authorization;

  if (!token) {
    return response.status(401).json({
      message: "Invalid token",
    });
  }
  token = token.split(" ")[1];

  jwt.verify(
    token as string,
    process.env.SECRET_KEY as string,
    (error: any, decoded: any) => {
      if (error) {
        return response.status(401).json({
          message: "Invalid token",
        });
      }
      request.body.decodifiedToken = { email: decoded.email, id: decoded.sub };

      next();
    }
  );
};
