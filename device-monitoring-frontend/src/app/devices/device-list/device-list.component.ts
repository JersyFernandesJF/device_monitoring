import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  inject,
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
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';

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
    MatInputModule
  ],
  templateUrl: './device-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./device-list.component.css'],
})
export class DeviceListComponent implements OnInit {
  hideMultipleSelectionIndicator = false;
  currentFilter: string = 'all';
  private _snackBar = inject(MatSnackBar); 
  devices: Partial<Device[]> = [];
  filteredDevices: Partial<Device[]> = []
  macAddressFilter: string = ""

  deviceTypes: DeviceType[] = [
    { value: 'SMART_TV', viewValue: 'Smart TV' },
    { value: 'SMARTPHONE', viewValue: 'Smartphone' },
    { value: 'IOT_DEVICE', viewValue: 'IoT device' },
  ];

 

  constructor(
    private deviceService: DeviceService,
    private cdr: ChangeDetectorRef,
    private socketService: SocketService,
  ) {}

  ngOnInit(): void {
    this.refreshDeviceListByFilter();
    this.filteredDevices = this.devices;
    this.listenToSocketEvents();
    
  }
  openSnackBar(message: string, action: string) {
    return this._snackBar.open(message, action);
  }

  filterDevicesByMacAddress() {
    const filter = this.macAddressFilter.trim().toLowerCase();
    this.filteredDevices = this.devices.filter((device) =>
      device?.macAddress?.toLowerCase().includes(filter)
    );
  }
  refreshDeviceListByFilter() {
    if (this.currentFilter === 'all') {
      this.deviceService.getDevices().subscribe((data) => {
        this.devices = data;
        this.devices = this.sortDevicesByCreatedAt(this.devices);
        this.filterDevicesByMacAddress();
        this.cdr.markForCheck();
      });
    } else {
      this.deviceService
        .getAllDevicesByStatus(this.currentFilter)
        .subscribe((response) => {
          this.devices = response;
          this.devices = this.sortDevicesByCreatedAt(this.devices);
          this.filterDevicesByMacAddress();
          this.cdr.markForCheck();
        });
    }
  }

  toogleStatus(id: string): void {
    this.deviceService.toogleDeviceById(id).subscribe((response)=>{
      this.openSnackBar("Device Updated: " +response.macAddress, "Ok")
    });
    this.refreshDeviceListByFilter();
    
  }

  onToggleChange(event: any): void {
    this.currentFilter = event.value;
    this.refreshDeviceListByFilter();
  }

  listenToSocketEvents() {
    this.socketService.on('deviceStatusUpdated').subscribe((updatedDevice) => {
      this.openSnackBar("Device Updated Status: " +updatedDevice.macAddress, "Go there")

      this.refreshDeviceListByFilter();
    });

    this.socketService.on('deviceCreated').subscribe((newDevice) => {
      this.openSnackBar("Device Created: " +newDevice.macAddress, "Ok")
      this.refreshDeviceListByFilter();
    });

    this.socketService.on('deviceDeleted').subscribe(({ id }) => {
      this.openSnackBar("Device deleted: " +id, "Ok")
      this.refreshDeviceListByFilter();
    });
  }
  

  private sortDevicesByCreatedAt(
    devices: Partial<Device[]>
  ): Partial<Device[]> {
    return devices.sort(
      (a, b) =>
        new Date(a!.created_at).getTime() - new Date(b!.created_at).getTime()
    );
  }
}
