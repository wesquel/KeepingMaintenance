import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Maintenance } from '../../core/models/maintenance.model';
import { MaintenanceService } from '../../core/services/maintenance/maintenance.service';
import { MatChipsModule } from '@angular/material/chips';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetMaintenanceComponent } from '../bottom-sheet-maintenance/bottom-sheet-maintenance.component';
import { MaintenanceUpdateService } from '../../core/services/maintenanceUpdate/maintenance-update.service';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-table-maintenance',
  templateUrl: './table-maintenance.component.html',
  styleUrls: ['./table-maintenance.component.css'],
  imports: [MatTableModule, MatPaginatorModule, CommonModule, MatChipsModule, MatSortModule],
  providers: [MaintenanceService],
})
export class TableMaintenanceComponent implements AfterViewInit, OnChanges {

  private _liveAnnouncer = inject(LiveAnnouncer);

  displayedColumns: string[] = ['id', 'name', 'status'];
  dataSource = new MatTableDataSource<Maintenance>([]);
  filteredData: Maintenance[] = [...this.dataSource.data]; // Use a propriedade `data` para inicializar

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  @Input() filter: string = '';

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constructor(
    private maintenanceService: MaintenanceService,
    private bottomSheet: MatBottomSheet,
    private maintenanceUpdateService: MaintenanceUpdateService
  ) {}


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.fetchMaintenances();
    this.dataSource.sort = this.sort;

    this.maintenanceUpdateService.maintenanceUpdated$.subscribe(() => {
      this.fetchMaintenances(); // Atualiza a lista de manutenções
    });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  fetchMaintenances(): void {
    this.maintenanceService.getMaintenances(0, 100000).subscribe({
      next: (data) => {
        this.dataSource.data = data.content;
        this.applyFilter(); // Aplica o filtro após os dados serem atualizados
        this.dataSource._updateChangeSubscription(); // Atualiza a tabela
      },
      error: (err) => console.error('Error fetching maintenances:', err),
    });
  }

  openBottomSheet(maintenanceId: number): void {
    this.bottomSheet.open(BottomSheetMaintenanceComponent, {
      data: {maintenanceId: maintenanceId}
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.applyFilter();
  }

  applyFilter(): void {
    const filterValue = this.filter.trim().toLowerCase();
    this.dataSource.filter = filterValue;
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
