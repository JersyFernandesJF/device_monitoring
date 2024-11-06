import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { DeviceType, DeviceStatus } from "../enums";

@Entity("device")
export class Device {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  ipAddress: string;

  @Column()
  macAddress: string;

  @Column({ type: "enum", enum: DeviceType })
  type: DeviceType;

  @Column({ type: "enum", enum: DeviceStatus })
  status: DeviceStatus;
   
  @UpdateDateColumn()
  lastActivity: Date;
  
  @CreateDateColumn()
  created_at: Date;
}
