import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DeviceListComponent } from './devices/device-list/device-list.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterOutlet,
    RouterLink,
    DeviceListComponent,
    MatSlideToggleModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'device-monitoring-frontend';
}
