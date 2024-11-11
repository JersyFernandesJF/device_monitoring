import { Server } from "socket.io";
import { Device } from "../entities/device.entity";
import { SocketEventsEnum } from "../enums";


export class SocketEventHandler {
  private io: Server;

  constructor(io: Server) {
    this.io = io;
  }

  emitDeviceStatusUpdated(device: Device): void {
    this.io.emit(SocketEventsEnum.DEVICE_STATUS_UPDATED, device);
  }

  emitDeviceCreated(device: Device): void {
    this.io.emit(SocketEventsEnum.DEVICE_CREATED, device);
  }

  emitDeviceDeleted(deviceId: string): void {
    this.io.emit(SocketEventsEnum.DEVICE_DELETED, { id: deviceId });
  }
}