import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomSheetMaintenanceComponent } from './bottom-sheet-maintenance.component';

describe('BottomSheetMaintenanceComponent', () => {
  let component: BottomSheetMaintenanceComponent;
  let fixture: ComponentFixture<BottomSheetMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BottomSheetMaintenanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BottomSheetMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
