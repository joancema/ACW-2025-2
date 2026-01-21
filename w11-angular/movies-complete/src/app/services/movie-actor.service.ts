// ============================================
// SERVICIO DE RELACIÓN PELÍCULA-ACTOR
// ============================================
// Este servicio maneja la tabla intermedia que relaciona
// películas con actores (relación muchos a muchos)

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap, map } from 'rxjs';
import { MovieActor } from '../models/movie-actor.model';
import { Actor } from '../models/actor.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieActorService {
  private apiUrl = environment.supabaseUrl;
  private apiKey = environment.supabaseKey;

  constructor(private http: HttpClient) {}

  // ============================================
  // HEADERS PRIVADOS
  // ============================================
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'apikey': this.apiKey,
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    });
  }

  // ============================================
  // READ - Obtener actores de una película
  // ============================================
  // Usa la funcionalidad de "embedding" de Supabase para
  // obtener los datos del actor junto con la relación
  getActorsByMovie(movieId: string): Observable<Actor[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/movie_actors?movie_id=eq.${movieId}&select=actor_id,actors(id,name)`, 
      { headers: this.getHeaders() }
    ).pipe(
      map(results => results.map(r => r.actors)),
      tap(actors => console.log('Actores de película obtenidos:', actors.length)),
      catchError(error => {
        console.error('Error al obtener actores de película:', error);
        return of([]);
      })
    );
  }

  // ============================================
  // CREATE - Agregar actor a una película
  // ============================================
  addActorToMovie(movieId: string, actorId: string): Observable<MovieActor | null> {
    const relation = {
      movie_id: movieId,
      actor_id: actorId
    };

    return this.http.post<MovieActor[]>(`${this.apiUrl}/movie_actors`, relation, {
      headers: this.getHeaders()
    }).pipe(
      map(relations => relations && relations.length > 0 ? relations[0] : null),
      tap(result => console.log('Actor agregado a película:', result)),
      catchError(error => {
        console.error('Error al agregar actor a película:', error);
        return of(null);
      })
    );
  }

  // ============================================
  // DELETE - Remover actor de una película
  // ============================================
  removeActorFromMovie(movieId: string, actorId: string): Observable<boolean> {
    return this.http.delete(
      `${this.apiUrl}/movie_actors?movie_id=eq.${movieId}&actor_id=eq.${actorId}`, 
      { headers: this.getHeaders() }
    ).pipe(
      map(() => true),
      tap(() => console.log('Actor removido de película')),
      catchError(error => {
        console.error('Error al remover actor de película:', error);
        return of(false);
      })
    );
  }

  // ============================================
  // DELETE - Remover todos los actores de una película
  // ============================================
  // Útil cuando se elimina una película
  removeAllActorsFromMovie(movieId: string): Observable<boolean> {
    return this.http.delete(
      `${this.apiUrl}/movie_actors?movie_id=eq.${movieId}`, 
      { headers: this.getHeaders() }
    ).pipe(
      map(() => true),
      tap(() => console.log('Todos los actores removidos de película')),
      catchError(error => {
        console.error('Error al remover actores de película:', error);
        return of(false);
      })
    );
  }
}
