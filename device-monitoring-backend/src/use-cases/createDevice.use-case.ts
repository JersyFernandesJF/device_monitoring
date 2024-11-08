import { DeviceService } from "../services/device.service";
import { Device } from "../entities/device.entity";

export class CreateDeviceUseCase {
  private deviceService: DeviceService;

  constructor() {
    this.deviceService = new DeviceService();
  }

  async execute(deviceData: Partial<Device>): Promise<Device | null> {
    const newDevice = await this.deviceService.createDevice(deviceData);

    if (!newDevice) return null;
    return newDevice;
  }
}
