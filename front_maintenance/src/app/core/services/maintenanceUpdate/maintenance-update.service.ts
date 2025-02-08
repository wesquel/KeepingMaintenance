import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceUpdateService {

  constructor() { }

  private maintenanceUpdated = new Subject<void>();

  maintenanceUpdated$ = this.maintenanceUpdated.asObservable();

  notifyMaintenanceUpdated(): void {
    this.maintenanceUpdated.next();
  }
}
