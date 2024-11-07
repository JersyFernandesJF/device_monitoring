import { Device } from "../entities/device.entity";
import { DeviceStatus } from "../enums";
import { DeviceService } from "../services/device.service";

export class ToogleDeviceStatusUseCase {
  private deviceService: DeviceService;

  constructor(){
    this.deviceService = new DeviceService();
  }
  async execute(id:string):Promise<Device| null>{
    const device = await this.deviceService.getDeviceById(id);
    if(!device) return null;

    return this.deviceService.updateDeviceStatus(id,  device.status == DeviceStatus.OFFLINE ? DeviceStatus.ONLINE : DeviceStatus.OFFLINE);
  }
}