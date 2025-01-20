import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Maintenance } from '../../core/models/maintenance.model';
import { MaintenanceService } from '../../core/services/maintenance/maintenance.service';
import {MatChipsModule} from '@angular/material/chips';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetMaintenanceComponent } from '../bottom-sheet-maintenance/bottom-sheet-maintenance.component';


@Component({
  selector: 'app-table-maintenance',
  templateUrl: './table-maintenance.component.html',
  styleUrls: ['./table-maintenance.component.css'],
  imports: [MatTableModule, MatPaginatorModule, CommonModule, MatChipsModule],
  providers: [MaintenanceService],
})
export class TableMaintenanceComponent implements AfterViewInit, OnChanges {

  displayedColumns: string[] = ['id', 'name', 'status'];
  dataSource = new MatTableDataSource<Maintenance>([]);
  filteredData: Maintenance[] = [...this.dataSource.data]; // Use a propriedade `data` para inicializar

  @Input() filter: string = '';

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constructor(private maintenanceService: MaintenanceService, private bottomSheet: MatBottomSheet) {}


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.fetchMaintenances();
  }

  private fetchMaintenances(): void {
    this.maintenanceService.getMaintenances(0, 100000).subscribe({
      next: (data) => {
        this.dataSource.data = data.content;
        this.filteredData = [...this.dataSource.data];
      },
      error: (err) => console.error('Error fetching maintenances:', err),
    });
  }

  openBottomSheet(): void {
    this.bottomSheet.open(BottomSheetMaintenanceComponent);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.applyFilter();
  }

  applyFilter(): void {
    const filterValue = this.filter.trim().toLowerCase();
    this.filteredData = this.dataSource.data.filter(item =>
      item.id.toString().toLowerCase().includes(filterValue) // Converta o `id` para string
    );
  }

  getStatusClass(statusName: string): string {
    switch (statusName) {
      case 'Pending Inspection':
        return 'status-pending';
      case 'Operational':
        return 'status-operational';
      case 'Inoperative':
        return 'status-inoperative';
      case 'Parts Required':
        return 'status-parts-required';
      default:
        return '';
    }
  }

}
