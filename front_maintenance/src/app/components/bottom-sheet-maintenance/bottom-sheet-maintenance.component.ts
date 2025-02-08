import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatListModule, MatNavList } from '@angular/material/list';
import { DialogRegisterMaintenanceComponent } from '../dialog-register-maintenance/dialog-register-maintenance.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditMaintenanceComponent } from '../dialog-edit-maintenance/dialog-edit-maintenance.component';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-bottom-sheet-maintenance',
  templateUrl: './bottom-sheet-maintenance.component.html',
  styleUrls: ['./bottom-sheet-maintenance.component.css'],
  imports: [MatNavList, CommonModule, MatListModule]
})
export class BottomSheetMaintenanceComponent {


  constructor(
    private dialog: MatDialog,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { maintenanceId: number },
    private bottomSheetRef: MatBottomSheetRef<BottomSheetMaintenanceComponent>
  ) {}

  performAction(option: string): void {
    console.log(`Action performed for: ${option}`);
  }

  openDialog(): void {
    this.dialog.open(DialogEditMaintenanceComponent, {
      width: '800px',
      height: '600px',
      panelClass: 'custom-dialog',
      data: {maintenanceId : this.data.maintenanceId}
    });
    this.bottomSheetRef.dismiss();
  }
}
