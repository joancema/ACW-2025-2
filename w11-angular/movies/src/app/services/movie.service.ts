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
// - Usa HttpClient en lugar de fetch

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Movie } from '../models/movie';
import { environment } from '../../environments/environment';

// ============================================
// DECORADOR @Injectable
// ============================================
// providedIn: 'root' significa que Angular creará
// una única instancia del servicio para toda la app

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  // Variables de entorno (configuradas en environments/)
  private apiUrl = environment.supabaseUrl;
  private apiKey = environment.supabaseKey;

  // ============================================
  // INYECCIÓN DE DEPENDENCIAS
  // ============================================
  // HttpClient se inyecta automáticamente por Angular
  // Esto es posible porque configuramos provideHttpClient() en app.config.ts
  
  constructor(private http: HttpClient) {}

  // ============================================
  // MÉTODO PARA OBTENER PELÍCULAS
  // ============================================
  // Retorna un Observable (patrón reactivo de Angular)
  //
  // Comparación:
  // React/Vue: async function getMovies(): Promise<Movie[]>
  // Angular:   getMovies(): Observable<Movie[]>

  getMovies(): Observable<Movie[]> {
    // Configurar headers para Supabase
    const headers = new HttpHeaders({
      'apikey': this.apiKey,
      'Authorization': `Bearer ${this.apiKey}`
    });

    // Hacer petición GET con HttpClient
    // get<Movie[]> indica que esperamos un array de películas
    return this.http.get<Movie[]>(`${this.apiUrl}/movies`, { headers })
      .pipe(
        // Manejo de errores con operadores RxJS
        catchError(error => {
          console.error('Error al obtener películas:', error);
          // Retorna un array vacío en caso de error
          return of([]);
        })
      );
  }

  // ============================================
  // MÉTODO ALTERNATIVO: Convertir a Promise
  // ============================================
  // Si prefieres trabajar con async/await (como en React/Vue),
  // puedes convertir el Observable a Promise con firstValueFrom()
  //
  // import { firstValueFrom } from 'rxjs';
  //
  // async getMoviesAsync(): Promise<Movie[]> {
  //   const headers = new HttpHeaders({
  //     'apikey': this.apiKey,
  //     'Authorization': `Bearer ${this.apiKey}`
  //   });
  //
  //   try {
  //     return await firstValueFrom(
  //       this.http.get<Movie[]>(`${this.apiUrl}/movies`, { headers })
  //     );
  //   } catch (error) {
  //     console.error('Error:', error);
  //     return [];
  //   }
  // }
}
