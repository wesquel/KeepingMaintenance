import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatListModule, MatNavList } from '@angular/material/list';
import { DialogRegisterMaintenanceComponent } from '../dialog-register-maintenance/dialog-register-maintenance.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditMaintenanceComponent } from '../dialog-edit-maintenance/dialog-edit-maintenance.component';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-bottom-sheet-maintenance',
  templateUrl: './bottom-sheet-maintenance.component.html',
  styleUrls: ['./bottom-sheet-maintenance.component.css'],
  imports: [MatNavList, CommonModule, MatListModule]
})
export class BottomSheetMaintenanceComponent {


  constructor(
    private dialog: MatDialog,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { maintenanceId: number }
  ) {}

  options = [
    { title: 'Option 1', description: 'Description for Option 1', action: () => this.performAction('Option 1') },
    { title: 'Option 2', description: 'Description for Option 2', action: () => this.performAction('Option 2') },
    { title: 'Option 3', description: 'Description for Option 3', action: () => this.performAction('Option 3') },
  ];

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
  }
}
