import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DevicesModule } from './devices/devices.module';
import { DeviceListComponent } from './devices/device-list/device-list.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:3000/api/devices', options: {} };

@NgModule({
  declarations: [AppComponent, DeviceListComponent],
  imports: [BrowserModule, DevicesModule, SocketIoModule.forRoot(config)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
