import { CommonModule } from '@angular/common';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper'
import { StatusService } from '../../core/services/status/status.service';
import { Status } from '../../core/models/status.model';
import { DeviceType } from '../../core/models/device-type.model';
import { DeviceTypeService } from '../../core/services/deviceType/device-type.service';
import { MaintenanceService } from '../../core/services/maintenance/maintenance.service';
import { ResponseDialogComponent } from '../response-dialog/response-dialog.component';
import { TableMaintenanceComponent } from '../table-maintenance/table-maintenance.component';
import { MaintenanceUpdateService } from '../../core/services/maintenanceUpdate/maintenance-update.service';

@Component({
  selector: 'app-dialog-register-maintenance',
  standalone: true, // Especifica que o componente é standalone
  imports: [
    MatFormFieldModule, MatDialogClose,
    CommonModule, MatIconModule, FormsModule, MatInputModule,
    ReactiveFormsModule, MatButtonModule, MatDividerModule,
    MatSelectModule, MatStepperModule
  ],
  templateUrl: './dialog-register-maintenance.component.html',
  styleUrls: ['./dialog-register-maintenance.component.css'] // Corrigido
})
export class DialogRegisterMaintenanceComponent implements OnInit {

  maintenanceFormGroup: FormGroup;
  deviceFormGroup: FormGroup;
  selectedValue!: string;

  statuses: Status[] = [];
  deviceTypes: DeviceType[] = [];

  constructor(private formBuilder: FormBuilder,
    private statusService: StatusService,
    private deviceTypeService: DeviceTypeService,
    private maintenanceService: MaintenanceService,
    private dialogRef: MatDialogRef<DialogRegisterMaintenanceComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public tableComponent: TableMaintenanceComponent,
    private maintenanceUpdateService: MaintenanceUpdateService

  ) {
    this.maintenanceFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],  // Changed to FormControl
    });

    this.deviceFormGroup = this.formBuilder.group({
      deviceName: ['', Validators.required], // Controle para "deviceRequest.name"
      deviceDescription: ['', Validators.required], // Controle para "deviceRequest.description"
      deviceType: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.statusService.getStatuses().subscribe({
      next: (data: Status[]) => {
        this.statuses = data.map(status => ({
          id: status.id,
          name: status.name,
          description: status.description
        }));
      },
      error: (error) => {
        console.error('Erro ao buscar status:', error);
      },
      complete: () => {
        console.log('Requisição completa');
      }
    });

    this.deviceTypeService.getDeviceTypes().subscribe({
      next: (data: DeviceType[]) => {
        this.deviceTypes = data.map(deviceType => ({
          id: deviceType.id,
          name: deviceType.name
        }));
      },
      error: (error) => {
        console.error('Erro ao buscar deviceTypes:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.maintenanceFormGroup.valid && this.deviceFormGroup.valid) {
      const payload = {
        name: this.maintenanceFormGroup.value.name,
        description: this.maintenanceFormGroup.value.description,
        statusRequest: {
          id: this.maintenanceFormGroup.value.status
        },
        deviceRequest: {
          name: this.deviceFormGroup.value.deviceName,
          description: this.deviceFormGroup.value.deviceDescription,
          deviceTypeRequest: {
            id: this.deviceFormGroup.value.deviceType
          }
        }
      };

      this.maintenanceService.createMaintenance(payload).subscribe({
        next: (response) => {
          console.log('Manutenção criada com sucesso:', response);
          this.dialogRef.close();
          this.dialog.open(ResponseDialogComponent, {
            data: { id: response.id },
            width: '400px'
          });
          this.maintenanceUpdateService.notifyMaintenanceUpdated();
        },
        error: (error) => {
          console.error('Erro ao criar manutenção:', error);
        }
      });
    } else {
      console.error('Formulários inválidos');
    }
  }

}
