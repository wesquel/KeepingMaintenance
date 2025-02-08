import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditMaintenanceComponent } from './dialog-edit-maintenance.component';

describe('DialogEditMaintenanceComponent', () => {
  let component: DialogEditMaintenanceComponent;
  let fixture: ComponentFixture<DialogEditMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEditMaintenanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEditMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
