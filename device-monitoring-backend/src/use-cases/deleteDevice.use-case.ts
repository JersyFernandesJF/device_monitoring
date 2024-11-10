import { DeviceService } from "../services/device.service";

export class DeleteDeviceUseCase {
  private deviceService: DeviceService;

  constructor() {
    this.deviceService = new DeviceService();
  }
  async execute(id: string): Promise<boolean> {
    const device = await this.deviceService.deleteDevice(id);
    if (!device) return false;

    return device;
  }
}
