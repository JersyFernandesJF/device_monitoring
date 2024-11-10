import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { DeviceService } from '../../services/device.service';
import { Device } from '../../models/device.model';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { SocketService } from '../../services/socket.service';

interface DeviceType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-device-list',
  standalone: true,
  imports: [
    CommonModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonToggleModule,
    MatSelectModule,
  ],
  templateUrl: './device-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./device-list.component.css'],
})
export class DeviceListComponent implements OnInit {
  hideMultipleSelectionIndicator = false;

  deviceTypes: DeviceType[] = [
    { value: 'SMART_TV', viewValue: 'Smart TV' },
    { value: 'SMARTPHONE', viewValue: 'Smartphone' },
    { value: 'IOT_DEVICE', viewValue: 'IoT device' },
  ];

  devices: Partial<Device[]> = [];

  constructor(
    private deviceService: DeviceService,
    private cdr: ChangeDetectorRef,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    this.refreshDeviceList();
    this.listenToSocketEvents();
  }

  refreshDeviceList() {
    this.deviceService.getDevices().subscribe((data) => {
      this.devices = data;
      this.cdr.markForCheck();
    });
  }

  toogleStatus(id: string): void {
    this.deviceService.toogleDeviceById(id).subscribe(
      (response) => {
        console.log(response)
        this.devices = this.devices.map((device) =>
          device?.id === id ? response : device
        );
        this.cdr.markForCheck();
      },
      (error) => {
        console.error('Erro ao alterar status', error);
      }
    );
  }

  onToggleChange(event: any): void {
    if (event.value === 'all') {
      this.refreshDeviceList();
    } else {
      this.deviceService.getAllDevicesByStatus(event.value).subscribe(
        (response) => {
          this.devices = response;
          this.cdr.markForCheck();
        },
        (error) => {
          console.error('Error changing status!', error);
        }
      );
    }
  }
  listenToSocketEvents() {
    this.socketService.on('deviceStatusUpdated').subscribe((updatedDevice) => {
      console.log("Status Updated")
      console.log(updatedDevice)
      this.devices = this.devices.map((device) =>
        device?.id === updatedDevice.id ? updatedDevice : device
      );
      this.cdr.markForCheck();
    });

    this.socketService.on('deviceCreated').subscribe((newDevice) => {
      console.log("Device Created")
      this.devices = [...this.devices, newDevice];
      this.cdr.markForCheck();
    });

    this.socketService.on('deviceDeleted').subscribe(({ id }) => {
      console.log("Device deleted")
      this.devices = this.devices.filter((device) => device?.id !== id);
      this.cdr.markForCheck();
    });
  }
}
