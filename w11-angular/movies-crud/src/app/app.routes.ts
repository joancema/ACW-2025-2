// ============================================
// CONFIGURACIÓN DE RUTAS
// ============================================
// Define todas las rutas de la aplicación

import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BillboardComponent } from './components/billboard/billboard.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieFormComponent } from './components/movie-form/movie-form.component';

export const routes: Routes = [
  // Ruta principal - Página de inicio
  {
    path: '',
    component: HomeComponent
  },
  
  // Ruta para la cartelera pública
  {
    path: 'billboard',
    component: BillboardComponent
  },
  
  // Ruta para administración - Lista de películas
  {
    path: 'admin',
    component: MovieListComponent
  },
  
  // Ruta para crear nueva película
  {
    path: 'admin/new',
    component: MovieFormComponent
  },
  
  // Ruta para editar película existente (con parámetro id)
  {
    path: 'admin/edit/:id',
    component: MovieFormComponent
  },
  
  // Ruta wildcard - Redirige a home si la ruta no existe
  {
    path: '**',
    redirectTo: ''
  }
];
