import { AppDataSource } from "../config/database";
import { Device } from "../entities/device.entity";

export const DeviceRepository = AppDataSource.getRepository(Device);