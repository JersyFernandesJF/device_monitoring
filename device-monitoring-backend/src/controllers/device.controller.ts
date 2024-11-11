import { Request, Response } from "express";
import {
  UpdateDeviceStatusUseCase,
  CreateDeviceUseCase,
  DeleteDeviceUseCase,
  ToogleDeviceStatusUseCase,
  GetAllDeviceUseCase,
  GetDeviceByIdUseCase,
  GetDeviceByStatusUseCase,
} from "../use-cases";
import { DeviceStatus } from "../enums";
import { io } from "../";
import { socketEventHandler } from "../index";

export const getAllDevices = async (req: Request, res: Response) => {
  const useCase = new GetAllDeviceUseCase();
  const devices = await useCase.execute();
  if (devices) res.json(devices);
  else res.status(404).json({ error: "Devices not found" });
};

export const getDeviceById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const useCase = new GetDeviceByIdUseCase();
  const device = await useCase.execute(id);

  if (device) res.json(device);
  else res.status(404).json({ error: "Device not found" });
};

export const updateDevicesStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  const useCase = new UpdateDeviceStatusUseCase();
  const updatedDevice = await useCase.execute(id, status);

  if (updatedDevice) {
    socketEventHandler.emitDeviceStatusUpdated(updatedDevice);
    res.json(updatedDevice);
  } else res.status(404).json({ error: "Device not found" });
};

export const getAllDevicesByStatus = async (req: Request, res: Response) => {
  const { status } = req.query;

  const useCase = new GetDeviceByStatusUseCase();
  const devicesByStatus = await useCase.execute(status as DeviceStatus);

  if (devicesByStatus) res.json(devicesByStatus);
  else res.status(404).json({ error: "Device not found" });
};

export const toogleDevicesStatus = async (req: Request, res: Response) => {
  const { id } = req.params;

  const useCase = new ToogleDeviceStatusUseCase();
  const updatedDevice = await useCase.execute(id);

  if (updatedDevice) {
    socketEventHandler.emitDeviceStatusUpdated(updatedDevice);
    res.json(updatedDevice);
  } else res.status(404).json({ error: "Device not found" });
};

export const createDevice = async (req: Request, res: Response) => {
  const useCase = new CreateDeviceUseCase();
  const newDevice = await useCase.execute(req.body);

  if (newDevice) {
    socketEventHandler.emitDeviceCreated(newDevice);
    res.status(201).json(newDevice);
  } else res.status(400).json({ error: "Something wrong happened" });
};

export const deleteDevice = async (req: Request, res: Response) => {
  const { id } = req.params;
  const useCase = new DeleteDeviceUseCase();
  const result = await useCase.execute(id);
  if (result) {
    socketEventHandler.emitDeviceDeleted(id);
    res.status(204).send();
  } else {
    res.status(404).json({ error: "Device not found" });
  }
};
