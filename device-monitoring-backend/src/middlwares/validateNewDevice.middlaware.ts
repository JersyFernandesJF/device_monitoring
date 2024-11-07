import { Request, Response, NextFunction } from "express";
import { DeviceStatus } from "../enums";

export const validateNewDevice = (req: Request, res: Response, next: NextFunction): void => {
  const {status, type} = req.body;

  if(!Object.values(DeviceStatus).includes(status) || !Object.values(DeviceStatus).includes(type)){
     res.status(400).json({ error: 'Invalid device status'});
  }
  next();
}