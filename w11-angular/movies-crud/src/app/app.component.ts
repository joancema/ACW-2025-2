// ============================================
// COMPONENTE PRINCIPAL - APP
// ============================================
// Este es el componente raíz que contiene el router-outlet
// para renderizar las diferentes páginas según la ruta

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Sistema de Gestión de Películas';
}
