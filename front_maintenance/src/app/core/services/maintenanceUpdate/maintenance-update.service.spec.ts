import { TestBed } from '@angular/core/testing';

import { MaintenanceUpdateService } from './maintenance-update.service';

describe('MaintenanceUpdateService', () => {
  let service: MaintenanceUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaintenanceUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
