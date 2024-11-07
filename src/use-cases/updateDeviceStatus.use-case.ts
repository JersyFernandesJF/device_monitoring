import { DeviceService } from "../services/device.service";
import { DeviceStatus } from "../enums";
import { Device } from "../entities/device.entity";

export class UpdateDeviceStatusUseCase {
  private deviceService: DeviceService;

  constructor() {
    this.deviceService = new DeviceService();
  }

  async execute(id: string, status: DeviceStatus): Promise<Device | null> {
    const device = await this.deviceService.getDeviceById(id);
    if (!device) return null;

    return this.deviceService.updateDeviceStatus(id, status);
  }
}
