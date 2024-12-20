import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Device } from '../models/device.model';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private apiUrl = 'http://localhost:3000/api/devices/';
  constructor(private http: HttpClient) {}

  getDevices(): Observable<Device[]> {
    return this.http.get<Device[]>(`${this.apiUrl}`);
  }

  getAllDevicesByStatus(status: string): Observable<Device[]> {
    return this.http.get<Device[]>(`${this.apiUrl}/status?status=${status}`);
  }

  toogleDeviceById(id: string): Observable<Device> {
    return this.http.put<Device>(`${this.apiUrl}/${id}/toogle`, {});
  }
  getDevicesById(id: string): Observable<Device> {
    return this.http.get<Device>(`${this.apiUrl}/${id}`);
  }

  createDevice(device: Partial<Device>): Observable<Device> {
    return this.http.post<Device>(`${this.apiUrl}`, device);
  }
  updateDeviceStatus(id: string, status: string): Observable<Device> {
    return this.http.put<Device>(`${this.apiUrl}/${id}/status`, { status });
  }

  deleteDevice(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
