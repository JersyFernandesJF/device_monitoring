import { DeviceRepository } from "../repositories/device.repository";
import { Device } from "../entities/device.entity";
import { DeviceStatus } from "../enums";

export class DeviceService {
  async getAllDevices(): Promise<Device[]> {
    return DeviceRepository.find({
      order: {
        created_at: 'ASC',
      },
    });
  }

  async getDeviceById(id: string): Promise<Device | null> {
    return DeviceRepository.findOne({ where: { id } });
  }

  async updateDeviceStatus(
    id: string,
    status: DeviceStatus
  ): Promise<Device | null> {
    const device = await DeviceRepository.findOneBy({ id });

    if (device) {
      device.status = status;
      device.lastActivity = new Date();
      return DeviceRepository.save(device);
    }
    return null;
  }
  async createDevice(deviceData: Partial<Device>): Promise<Device | null> {
    const device = await DeviceRepository.findOne({
      where: { ipAddress: deviceData.ipAddress },
    });
    if (device) {
      return null;
    }
    const newDevice = DeviceRepository.create(deviceData);
    return DeviceRepository.save(newDevice);
  }

  async deleteDevice(id: string): Promise<boolean> {
    const device = await DeviceRepository.findOneBy({ id });
    if (device) {
      await DeviceRepository.remove(device);
      return true;
    }
    return false;
  }
}
