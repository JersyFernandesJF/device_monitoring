import { Request, Response } from "express";
import { DeviceService } from "../services/device.service";
import { DeviceStatus } from "../enums";

const deviceService = new DeviceService();

export const getAllDevices = async (req: Request, res: Response) => {
  const devices = await deviceService.getAllDevices();

  res.json(devices);
};

export const getDeviceById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const device = await deviceService.getDeviceById(id);

  res.json(device);
};

export const updateDevicesStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!Object.values(DeviceStatus).includes(status)) {
    res.status(400).json({ error: "Invalid status" });
  }

  const device = await deviceService.updateDeviceStatus(id, status);

  if (device) res.json(device);
  else res.status(404).json({ error: "Device not found" });
};
