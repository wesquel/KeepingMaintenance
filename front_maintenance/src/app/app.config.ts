import { ApplicationConfig } from '@angular/core';
import { provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { MatIconModule } from '@angular/material/icon';  // Certifique-se de que o MatIconModule está importado
import { HomeComponent } from './pages/home/home.component';
import { SidenavbarComponent } from './components/sidenavbar/sidenavbar.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    MatIconModule,  // Adicione MatIconModule aos provedores
    HomeComponent,
    SidenavbarComponent
  ]
};
