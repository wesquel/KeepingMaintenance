import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidenavbar',
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    RouterModule,
  ],
})
export class SidenavbarComponent {
  isCollapsed = false;

  constructor(private cdr: ChangeDetectorRef) {}

  toggleSidenav(): void {
    this.isCollapsed = !this.isCollapsed;
    this.cdr.detectChanges();
    window.dispatchEvent(new Event('resize'));
  }

}
