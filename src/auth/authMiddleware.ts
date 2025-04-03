import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY as string; // Use a strong secret key

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);
  if (token == null) {
    res.sendStatus(401);
    return;
  } // If no token, unauthorized

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      res.sendStatus(403);
      return;
    } // If token is invalid, forbidden
    req.body.user = user;
    next(); // Proceed to the next middleware or route handler
  });
};
