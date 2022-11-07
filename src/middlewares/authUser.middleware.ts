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
      //Comentado pois ainda precisamos criar os services e controllers que geram o token
      // request.user = { isAdm: decoded.isAdm, id: decoded.sub };

      next();
    }
  );
};
