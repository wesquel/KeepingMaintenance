import { ChangeDetectionStrategy, Component, inject} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { TableMaintenanceComponent } from "../../components/table-maintenance/table-maintenance.component";
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DialogRegisterMaintenanceComponent } from '../../components/dialog-register-maintenance/dialog-register-maintenance.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [MatFormFieldModule, MatIconModule, MatInputModule,
    TableMaintenanceComponent, MatButtonModule, MatDividerModule, CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

  readonly dialog = inject(MatDialog);
  filterValue: string = '';

  // Método para atualizar o valor do filtro
  onFilterChange(value: string): void {
    this.filterValue = value.trim().toLowerCase();
  }

  openDialog(): void {
    this.dialog.open(DialogRegisterMaintenanceComponent, {
      width: '800px', // Largura personalizada
      height: '600px', // Altura personalizada
    });
  }
}
