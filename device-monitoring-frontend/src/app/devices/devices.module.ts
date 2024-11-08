import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DevicesRoutingModule } from './devices-routing.module';
import { DeviceListComponent } from './device-list/device-list.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DevicesRoutingModule,
    RouterModule,
  ]
})
export class DevicesModule { }
