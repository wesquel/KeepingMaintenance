import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRegisterMaintenanceComponent } from './dialog-register-maintenance.component';

describe('DialogRegisterMaintenanceComponent', () => {
  let component: DialogRegisterMaintenanceComponent;
  let fixture: ComponentFixture<DialogRegisterMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogRegisterMaintenanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogRegisterMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
