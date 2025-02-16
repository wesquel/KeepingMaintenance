import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { Maintenance } from '../../core/models/maintenance.model';
import { MatTableDataSource } from '@angular/material/table';
import { MaintenanceService } from '../../core/services/maintenance/maintenance.service';
import { StatusService } from '../../core/services/status/status.service';
import { DeviceTypeService } from '../../core/services/deviceType/device-type.service';
import { Status } from '../../core/models/status.model';
import { DeviceType } from '../../core/models/device-type.model';
import { TableMaintenanceComponent } from '../table-maintenance/table-maintenance.component';
import { ResponseDialogComponent } from '../response-dialog/response-dialog.component';
import { MaintenanceUpdateService } from '../../core/services/maintenanceUpdate/maintenance-update.service';

@Component({
  selector: 'app-dialog-edit-maintenance',
  imports: [MatIcon, MatFormFieldModule, MatDialogClose,
      CommonModule, MatIconModule, FormsModule, MatInputModule,
      ReactiveFormsModule, MatButtonModule, MatDividerModule,
      MatSelectModule, MatStepperModule],
  templateUrl: './dialog-edit-maintenance.component.html',
  styleUrl: './dialog-edit-maintenance.component.css'
})
export class DialogEditMaintenanceComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { maintenanceId: number },
    private http: HttpClient,
    private maintenanceService: MaintenanceService,
    private statusService: StatusService,
    private deviceTypeService: DeviceTypeService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public tableComponent: TableMaintenanceComponent,
    private dialogRef: MatDialogRef<DialogEditMaintenanceComponent>,
    private dialog: MatDialog,
    private maintenanceUpdateService: MaintenanceUpdateService
  ) {}

  maintenanceFormGroup!: FormGroup;
  deviceFormGroup!: FormGroup;

  statuses: Status[] = [];
  deviceTypes: DeviceType[] = [];

  dataSource = new MatTableDataSource<Maintenance>([]);

  ngOnInit() {
    this.initializeForms();
    this.loadStatusAndDeviceTypes();
    this.loadMaintenanceData(this.data.maintenanceId);
  }

  loadStatusAndDeviceTypes(): void {
    this.statusService.getStatuses().subscribe({
      next: (data) => {
        this.statuses = data;
      },
      error: (error) => {
        console.error('Erro ao buscar status:', error);
      }
    });

    this.deviceTypeService.getDeviceTypes().subscribe({
      next: (data) => {
        this.deviceTypes = data;
      },
      error: (error) => {
        console.error('Erro ao buscar tipos de dispositivos:', error);
      }
    });
  }

  initializeForms(): void {
    this.maintenanceFormGroup = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required]
    });

    this.deviceFormGroup = this.fb.group({
      deviceName: ['', Validators.required],
      deviceDescription: ['', Validators.required],
      deviceType: ['', Validators.required]
    });
  }

  loadMaintenanceData(id: number): void {
    this.maintenanceService.getMaintenanceById(id).subscribe({
      next: (data) => {
        this.maintenanceFormGroup.patchValue({
          name: data.name,
          description: data.description,
          status: data.statusResponse.id
        });

        this.deviceFormGroup.patchValue({
          deviceName: data.deviceResponse.name,
          deviceDescription: data.deviceResponse.description,
          deviceType: data.deviceResponse.deviceTypeResponse.id
        });
      },
      error: (error) => {
        console.error('Erro ao carregar dados da manutenção:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.maintenanceFormGroup.valid && this.deviceFormGroup.valid) {
      const maintenanceData = {
        id: this.data.maintenanceId,
        name: this.maintenanceFormGroup.value.name,
        description: this.maintenanceFormGroup.value.description,
        statusRequest: { id: this.maintenanceFormGroup.value.status },
        deviceRequest: {
          name: this.deviceFormGroup.value.deviceName,
          description: this.deviceFormGroup.value.deviceDescription,
          deviceTypeRequest: { id: this.deviceFormGroup.value.deviceType }
        }
      };

      this.maintenanceService.updateMaintenance(maintenanceData).subscribe({
        next: () => {
          console.log('Manutenção atualizada com sucesso!');
          this.dialogRef.close();
          this.dialog.open(ResponseDialogComponent, {
            data: { id: this.data.maintenanceId, action: 'update' },
            width: '400px'
          });
          this.maintenanceUpdateService.notifyMaintenanceUpdated();
        },
        error: (error) => {
          console.error('Erro ao atualizar manutenção:', error);
        }
      });
    }
  }

}
