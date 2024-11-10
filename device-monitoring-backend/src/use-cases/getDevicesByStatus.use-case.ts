import { Device } from "../entities/device.entity";
import { DeviceStatus } from "../enums";
import { DeviceService } from "../services/device.service";

export class GetDeviceByStatusUseCase {
  private deviceService: DeviceService;

  constructor() {
    this.deviceService = new DeviceService();
  }
  async execute(status: DeviceStatus): Promise<Device[] | null> {
    const devices = await this.deviceService.getAllDeviceByStatus(status);
    if (!devices) return null;

    return devices;
  }
}
