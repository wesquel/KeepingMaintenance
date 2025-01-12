import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./pages/home/home.component";
import { SidenavbarComponent } from "./components/sidenavbar/sidenavbar.component";

@Component({
  selector: 'app-root',
  imports: [SidenavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front_maintenance';
}