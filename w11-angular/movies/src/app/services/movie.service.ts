// ============================================
// SERVICIO DE PELÍCULAS (ANGULAR)
// ============================================
// En Angular, los servicios son clases decoradas con @Injectable()
// que encapsulan la lógica de negocio y comunicación con APIs.
//
// DIFERENCIAS CON REACT/VUE:
// - Angular usa el patrón de inyección de dependencias
// - Los servicios son singletons por defecto
// - Se pueden inyectar en cualquier componente

import { Injectable } from '@angular/core';
import { Movie } from '../models/movie';

// ============================================
// CONFIGURACIÓN DE SUPABASE
// ============================================
// Los mismos valores que en React y Vue
const SUPABASE_URL = 'https://mefqiknqtmsrvygeghnw.supabase.co/rest/v1';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1lZnFpa25xdG1zcnZ5Z2VnaG53Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExNDQyNzYsImV4cCI6MjA3NjcyMDI3Nn0.aqg9_3Yl6dBULyNRwxS_BEJj1hjv7TNBFkxHVsrDAVA';

// ============================================
// DECORADOR @Injectable
// ============================================
// providedIn: 'root' significa que Angular creará
// una única instancia del servicio para toda la app

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  // ============================================
  // MÉTODO PARA OBTENER PELÍCULAS
  // ============================================
  // La lógica es IGUAL que en React y Vue,
  // solo cambia cómo se organiza en una clase

  async getMovies(): Promise<Movie[]> {
    try {
      const response = await fetch(`${SUPABASE_URL}/movies`, {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`
        }
      });

      if (!response.ok) {
        console.error('Error al obtener películas:', response.statusText);
        return [];
      }

      const movies: Movie[] = await response.json();
      return movies;

    } catch (error) {
      console.error('Error de conexión:', error);
      return [];
    }
  }
}
