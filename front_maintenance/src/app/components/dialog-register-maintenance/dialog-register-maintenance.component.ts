import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
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

@Component({
  selector: 'app-dialog-register-maintenance',
  standalone: true, // Especifica que o componente é standalone
  imports: [
    MatFormFieldModule, MatDialogActions, MatDialogClose,
    CommonModule, MatIconModule, FormsModule, MatInputModule,
    ReactiveFormsModule, MatButtonModule, MatDividerModule,
    MatSelectModule, MatStepperModule
  ],
  templateUrl: './dialog-register-maintenance.component.html',
  styleUrls: ['./dialog-register-maintenance.component.css'] // Corrigido
})
export class DialogRegisterMaintenanceComponent implements OnInit{

  maintenanceFormGroup: FormGroup;
  deviceFormGroup: FormGroup;
  selectedValue!: string;

  statuses: Status[] = [];
  deviceTypes: DeviceType[] = [];

  constructor(private formBuilder: FormBuilder, private statusService: StatusService, private deviceTypeService: DeviceTypeService) {
    this.maintenanceFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      statusRequest: this.formBuilder.group({
        id: ['', Validators.required], // Controle para "statusRequest.id"
      }),
    });

    this.deviceFormGroup = this.formBuilder.group({
      deviceName: ['', Validators.required], // Controle para "deviceRequest.name"
      deviceDescription: ['', Validators.required], // Controle para "deviceRequest.description"
      deviceTypeRequest: this.formBuilder.group({
        id: ['', Validators.required], // Controle para "deviceRequest.deviceTypeRequest.id"
      }),
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
        this.deviceTypes = data.map(status => ({
          id: status.id,
          name: status.name
        }));
      },
      error: (error) => {
        console.error('Erro ao buscar deviceTypes:', error);
      },
      complete: () => {
        console.log('Requisição completa');
      }
    });
  }

}
