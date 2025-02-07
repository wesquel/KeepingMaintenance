import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MaintenanceService {
  private readonly apiUrl = 'http://127.0.0.1:8080/maintenance';

  constructor(private http: HttpClient) {}

  getMaintenances(page: number = 0, size: number = 10): Observable<any> {
    console.log(`${this.apiUrl}?page=${page}&size=${size}`);
    return this.http.get<any>(`${this.apiUrl}?page=${page}&size=${size}`);
  }

  createMaintenance(payload: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, payload);
  }
}
