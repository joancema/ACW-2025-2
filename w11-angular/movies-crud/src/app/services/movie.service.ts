// ============================================
// SERVICIO DE PELÍCULAS - CRUD COMPLETO
// ============================================
// Este servicio maneja todas las operaciones CRUD
// (Create, Read, Update, Delete) con la API de Supabase

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap, map } from 'rxjs';
import { Movie } from '../models/movie';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = environment.supabaseUrl;
  private apiKey = environment.supabaseKey;

  constructor(private http: HttpClient) {}

  // ============================================
  // HEADERS PRIVADOS
  // ============================================
  // Método auxiliar para no repetir los headers en cada petición
  
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'apikey': this.apiKey,
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation' // Supabase retorna el objeto creado/actualizado
    });
  }

  // ============================================
  // READ - Obtener todas las películas
  // ============================================
  
  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/movies`, { 
      headers: this.getHeaders() 
    }).pipe(
      tap(movies => console.log('Películas obtenidas:', movies.length)),
      catchError(error => {
        console.error('Error al obtener películas:', error);
        return of([]);
      })
    );
  }

  // ============================================
  // READ - Obtener una película por ID
  // ============================================
  
  getMovie(id: string): Observable<Movie | null> {
    return this.http.get<Movie[]>(`${this.apiUrl}/movies?id=eq.${id}`, {
      headers: this.getHeaders()
    }).pipe(
      map(movies => movies && movies.length > 0 ? movies[0] : null),
      tap(movie => console.log('Película obtenida:', movie)),
      catchError(error => {
        console.error('Error al obtener película:', error);
        return of(null);
      })
    );
  }

  // ============================================
  // CREATE - Crear una nueva película
  // ============================================
  
  createMovie(movie: Omit<Movie, 'id'>): Observable<Movie | null> {
    return this.http.post<Movie[]>(`${this.apiUrl}/movies`, movie, {
      headers: this.getHeaders()
    }).pipe(
      map(movies => movies && movies.length > 0 ? movies[0] : null),
      tap(result => console.log('Película creada:', result)),
      catchError(error => {
        console.error('Error al crear película:', error);
        return of(null);
      })
    );
  }

  // ============================================
  // UPDATE - Actualizar una película existente
  // ============================================
  
  updateMovie(id: string, movie: Partial<Movie>): Observable<Movie | null> {
    // Removemos el id del objeto para no enviarlo en el body
    const { id: _, ...movieData } = movie as Movie;
    
    return this.http.patch<Movie[]>(`${this.apiUrl}/movies?id=eq.${id}`, movieData, {
      headers: this.getHeaders()
    }).pipe(
      map(movies => movies && movies.length > 0 ? movies[0] : null),
      tap(result => console.log('Película actualizada:', result)),
      catchError(error => {
        console.error('Error al actualizar película:', error);
        return of(null);
      })
    );
  }

  // ============================================
  // DELETE - Eliminar una película
  // ============================================
  
  deleteMovie(id: string): Observable<boolean> {
    return this.http.delete(`${this.apiUrl}/movies?id=eq.${id}`, {
      headers: this.getHeaders()
    }).pipe(
      map(() => true),
      tap(() => console.log('Película eliminada:', id)),
      catchError(error => {
        console.error('Error al eliminar película:', error);
        return of(false);
      })
    );
  }
}
