import { Device } from "../entities/device.entity";
import { DeviceService } from "../services/device.service";

export class GetAllDeviceUseCase {
  private deviceService: DeviceService;

  constructor() {
    this.deviceService = new DeviceService();
  }
  async execute(): Promise<Device[] | null> {
    const device = await this.deviceService.getAllDevices();
    if (!device) return null;

    return device;
  }
}
