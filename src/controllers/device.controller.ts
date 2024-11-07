import { Request, Response } from "express";
import { DeviceService } from "../services/device.service";
import {
  UpdateDeviceStatusUseCase,
  CreateDeviceUseCase,
  DeleteDeviceUseCase,
  ToogleDeviceStatusUseCase,
} from "../use-cases";

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

  const useCase = new UpdateDeviceStatusUseCase();
  const updatedDevice = await useCase.execute(id, status);

  if (updatedDevice) res.json(updatedDevice);
  else res.status(404).json({ error: "Device not found" });
};
export const toogleDevicesStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  const useCase = new ToogleDeviceStatusUseCase();
  const updatedDevice = await useCase.execute(id);

  if (updatedDevice) res.json(updatedDevice);
  else res.status(404).json({ error: "Device not found" });
};

export const createDevice = async (req: Request, res: Response) => {
  const useCase = new CreateDeviceUseCase();
  const newDevice = await useCase.execute(req.body);
  if (newDevice) res.status(201).json(newDevice);
  else res.status(400).json({ error: "Something wrong happened" });
};

export const deleteDevice = async (req: Request, res: Response) => {
  const { id } = req.params;
  const useCase = new DeleteDeviceUseCase();
  const result = await useCase.execute(id);
  if (result) {
    res.status(204).send();
  } else {
    res.status(404).json({ error: "Device not found" });
  }
};
