import { Device } from "../entities/device.entity";
import { DeviceService } from "../services/device.service";

export class GetDeviceByIdUseCase {
  private deviceService: DeviceService;

  constructor() {
    this.deviceService = new DeviceService();
  }
  async execute(id: string): Promise<Device | null> {
    const device = await this.deviceService.getDeviceById(id);
    if (!device) return null;

    return device;
  }
}
