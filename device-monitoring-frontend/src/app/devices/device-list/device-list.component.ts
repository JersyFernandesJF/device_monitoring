import { Component, inject, OnInit } from '@angular/core';
import { DeviceService } from '../../services/device.service';
import { Device } from '../../models/device.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  MatSlideToggleModule,
  _MatSlideToggleRequiredValidatorModule,
} from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-device-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    FormsModule,
    _MatSlideToggleRequiredValidatorModule,
    ReactiveFormsModule,
  ],
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css'],
})

export class DeviceListComponent implements OnInit {
  private _formBuilder = inject(FormBuilder);
  devices: Partial<Device[]> = [];

  isChecked = true;
  formGroup = this._formBuilder.group({
    enableWifi: '',
    acceptTerms: ['', Validators.requiredTrue],
  });

  constructor(private deviceService: DeviceService) {}

  ngOnInit(): void {
    this.refreshDeviceList();
  }
  alertFormValues(formGroup: FormGroup) {
    alert(JSON.stringify(formGroup.value, null, 2));
  }
  refreshDeviceList() {
    this.deviceService.getDevices().subscribe((data) => {
      this.devices = data;
    });
  }
  toogleStatus(id: string): void {
    this.deviceService.toogleDeviceById(id).subscribe(
      (response) => {},
      (error) => {
        console.error('Erro ao alterar status', error);
      }
    );
  }
}
