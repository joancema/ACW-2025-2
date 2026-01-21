// ============================================
// SERVICIO DE ACTORES - CRUD COMPLETO
// ============================================
// Este servicio maneja todas las operaciones CRUD
// para los actores

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap, map } from 'rxjs';
import { Actor } from '../models/actor.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActorService {
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
  // READ - Obtener todos los actores
  // ============================================
  getActors(): Observable<Actor[]> {
    return this.http.get<Actor[]>(`${this.apiUrl}/actors?order=name.asc`, { 
      headers: this.getHeaders() 
    }).pipe(
      tap(actors => console.log('Actores obtenidos:', actors.length)),
      catchError(error => {
        console.error('Error al obtener actores:', error);
        return of([]);
      })
    );
  }

  // ============================================
  // READ - Obtener un actor por ID
  // ============================================
  getActor(id: string): Observable<Actor | null> {
    return this.http.get<Actor[]>(`${this.apiUrl}/actors?id=eq.${id}`, {
      headers: this.getHeaders()
    }).pipe(
      map(actors => actors && actors.length > 0 ? actors[0] : null),
      tap(actor => console.log('Actor obtenido:', actor)),
      catchError(error => {
        console.error('Error al obtener actor:', error);
        return of(null);
      })
    );
  }

  // ============================================
  // CREATE - Crear un nuevo actor
  // ============================================
  createActor(actor: Omit<Actor, 'id' | 'created_at'>): Observable<Actor | null> {
    return this.http.post<Actor[]>(`${this.apiUrl}/actors`, actor, {
      headers: this.getHeaders()
    }).pipe(
      map(actors => actors && actors.length > 0 ? actors[0] : null),
      tap(result => console.log('Actor creado:', result)),
      catchError(error => {
        console.error('Error al crear actor:', error);
        return of(null);
      })
    );
  }

  // ============================================
  // UPDATE - Actualizar un actor existente
  // ============================================
  updateActor(id: string, actor: Partial<Actor>): Observable<Actor | null> {
    const { id: _, created_at, ...actorData } = actor as Actor;
    
    return this.http.patch<Actor[]>(`${this.apiUrl}/actors?id=eq.${id}`, actorData, {
      headers: this.getHeaders()
    }).pipe(
      map(actors => actors && actors.length > 0 ? actors[0] : null),
      tap(result => console.log('Actor actualizado:', result)),
      catchError(error => {
        console.error('Error al actualizar actor:', error);
        return of(null);
      })
    );
  }

  // ============================================
  // DELETE - Eliminar un actor
  // ============================================
  deleteActor(id: string): Observable<boolean> {
    return this.http.delete(`${this.apiUrl}/actors?id=eq.${id}`, {
      headers: this.getHeaders()
    }).pipe(
      map(() => true),
      tap(() => console.log('Actor eliminado:', id)),
      catchError(error => {
        console.error('Error al eliminar actor:', error);
        return of(false);
      })
    );
  }
}
