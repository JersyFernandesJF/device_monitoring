import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { DeviceType, DeviceStatus } from "../enums";

@Entity("device")
export class Device {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true, nullable: false })
  ipAddress: string;

  @Column({ nullable: false })
  macAddress: string;

  @Column({ type: "enum", enum: DeviceType, default: DeviceType.SMART_TV })
  type: DeviceType;

  @Column({ type: "enum", enum: DeviceStatus, default: DeviceStatus.OFFLINE })
  status: DeviceStatus;

  @UpdateDateColumn()
  lastActivity: Date;

  @CreateDateColumn()
  created_at: Date;
}
