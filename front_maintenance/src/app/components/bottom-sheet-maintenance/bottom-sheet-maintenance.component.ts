import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatListModule, MatNavList } from '@angular/material/list';

@Component({
  selector: 'app-bottom-sheet-maintenance',
  templateUrl: './bottom-sheet-maintenance.component.html',
  styleUrls: ['./bottom-sheet-maintenance.component.css'],
  imports: [MatNavList, CommonModule, MatListModule]
})
export class BottomSheetMaintenanceComponent {
  options = [
    { title: 'Option 1', description: 'Description for Option 1', action: () => this.performAction('Option 1') },
    { title: 'Option 2', description: 'Description for Option 2', action: () => this.performAction('Option 2') },
    { title: 'Option 3', description: 'Description for Option 3', action: () => this.performAction('Option 3') },
  ];

  performAction(option: string): void {
    console.log(`Action performed for: ${option}`);
  }
}
