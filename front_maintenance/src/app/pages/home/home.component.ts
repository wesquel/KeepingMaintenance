import { ChangeDetectionStrategy, Component} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { TableMaintenanceComponent } from "../../components/table-maintenance/table-maintenance.component";

@Component({
  selector: 'app-home',
  imports: [MatFormFieldModule, MatIconModule, MatInputModule, TableMaintenanceComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

}
