import { Request, Response, NextFunction } from "express";
import { DeviceStatus } from "../enums";

export const validateDeviceStatus = (req: Request, res: Response, next: NextFunction): void => {
  const { status } = req.body;

  if(!Object.values(DeviceStatus).includes(status)){
     res.status(400).json({ error: 'Invalid device status'});
  }
  next();
}