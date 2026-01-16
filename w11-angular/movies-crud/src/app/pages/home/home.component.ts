// ============================================
// COMPONENTE HOME - Página Principal
// ============================================
// Esta es la página de inicio con navegación a las diferentes secciones

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  title = 'Sistema de Gestión de Películas';
}
