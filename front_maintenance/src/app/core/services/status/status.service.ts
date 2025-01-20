import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Status } from '../../models/status.model';

@Injectable({
  providedIn: 'root'
})
export class StatusService  {

  private apiUrl = 'http://127.0.0.1:8080/status';

  constructor(private http: HttpClient) {}

  getStatuses(): Observable<Status[]> {
    return this.http.get<Status[]>(this.apiUrl);
  }
}
