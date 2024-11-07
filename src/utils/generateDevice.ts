import { Device } from '../entities/device.entity';
import { DeviceStatus } from '../enums';
import { DeviceType } from '../enums/deviceType.enum';

export const generateDevice = (): Device => {
  const device = new Device();
  device.type = DeviceType.SMARTPHONE;
  device.ipAddress = `192.168.1.${Math.floor(Math.random() * 255)}`;
  device.macAddress = `00:0a:95:9d:${Math.floor(Math.random() * 99)}:${Math.floor(Math.random() * 99)}`;
  device.status = DeviceStatus.OFFLINE;
  return device;
};
