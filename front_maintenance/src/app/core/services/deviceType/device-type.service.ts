import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeviceType } from '../../models/device-type.model';

@Injectable({
  providedIn: 'root'
})
export class DeviceTypeService {
  private apiUrl = 'http://127.0.0.1:8080/deviceType';

  constructor(private http: HttpClient) {}

  getDeviceTypes(): Observable<DeviceType[]> {
    return this.http.get<DeviceType[]>(this.apiUrl);
  }
}
