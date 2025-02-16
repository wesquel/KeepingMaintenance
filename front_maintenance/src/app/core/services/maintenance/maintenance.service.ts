import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Maintenance } from '../../models/maintenance.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MaintenanceService {

  private apiUrl = environment.apiUrl + '/maintenance';

  constructor(private http: HttpClient) {}

  getMaintenances(page: number = 0, size: number = 10): Observable<any> {
    console.log(`${this.apiUrl}?page=${page}&size=${size}`);
    return this.http.get<any>(`${this.apiUrl}?page=${page}&size=${size}`);
  }

  createMaintenance(payload: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, payload);
  }

  getMaintenancesById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateMaintenance(
    maintenanceData: {
      id: number;
      name: string;
      description: string;
      statusRequest: { id: number };
      deviceRequest: {
        name: string;
        description: string;
        deviceTypeRequest: { id: number };
      };
    }
  ): Observable<Maintenance> {
    return this.http.put<Maintenance>(`${this.apiUrl}`, maintenanceData);
  }
}
