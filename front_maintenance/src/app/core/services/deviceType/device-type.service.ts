import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeviceType } from '../../models/device-type.model';
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root'
})
export class DeviceTypeService {
  private apiUrl = environment.apiUrl + '/deviceType';

  constructor(private http: HttpClient) {}

  getDeviceTypes(): Observable<DeviceType[]> {
    return this.http.get<DeviceType[]>(this.apiUrl);
  }
}
