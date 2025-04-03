import { Request, Response } from "express";

export const handleProfile = (req: Request, res: Response) => {
  console.log("Profile route hit");
  res.send("Profile route hit token valid");
};

export const handleOrders = (req: Request, res: Response) => {
  console.log("Orders route hit");
  res.send("Orders route hit");
};
