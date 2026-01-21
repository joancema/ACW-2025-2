// ============================================
// SERVICIO DE CATEGORÍAS - CRUD COMPLETO
// ============================================
// Este servicio maneja todas las operaciones CRUD
// para las categorías de películas

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap, map } from 'rxjs';
import { Category } from '../models/category.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
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
  // READ - Obtener todas las categorías
  // ============================================
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories?order=name.asc`, { 
      headers: this.getHeaders() 
    }).pipe(
      tap(categories => console.log('Categorías obtenidas:', categories.length)),
      catchError(error => {
        console.error('Error al obtener categorías:', error);
        return of([]);
      })
    );
  }

  // ============================================
  // READ - Obtener una categoría por ID
  // ============================================
  getCategory(id: string): Observable<Category | null> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories?id=eq.${id}`, {
      headers: this.getHeaders()
    }).pipe(
      map(categories => categories && categories.length > 0 ? categories[0] : null),
      tap(category => console.log('Categoría obtenida:', category)),
      catchError(error => {
        console.error('Error al obtener categoría:', error);
        return of(null);
      })
    );
  }

  // ============================================
  // CREATE - Crear una nueva categoría
  // ============================================
  createCategory(category: Omit<Category, 'id' | 'created_at'>): Observable<Category | null> {
    return this.http.post<Category[]>(`${this.apiUrl}/categories`, category, {
      headers: this.getHeaders()
    }).pipe(
      map(categories => categories && categories.length > 0 ? categories[0] : null),
      tap(result => console.log('Categoría creada:', result)),
      catchError(error => {
        console.error('Error al crear categoría:', error);
        return of(null);
      })
    );
  }

  // ============================================
  // UPDATE - Actualizar una categoría existente
  // ============================================
  updateCategory(id: string, category: Partial<Category>): Observable<Category | null> {
    const { id: _, created_at, ...categoryData } = category as Category;
    
    return this.http.patch<Category[]>(`${this.apiUrl}/categories?id=eq.${id}`, categoryData, {
      headers: this.getHeaders()
    }).pipe(
      map(categories => categories && categories.length > 0 ? categories[0] : null),
      tap(result => console.log('Categoría actualizada:', result)),
      catchError(error => {
        console.error('Error al actualizar categoría:', error);
        return of(null);
      })
    );
  }

  // ============================================
  // DELETE - Eliminar una categoría
  // ============================================
  deleteCategory(id: string): Observable<boolean> {
    return this.http.delete(`${this.apiUrl}/categories?id=eq.${id}`, {
      headers: this.getHeaders()
    }).pipe(
      map(() => true),
      tap(() => console.log('Categoría eliminada:', id)),
      catchError(error => {
        console.error('Error al eliminar categoría:', error);
        return of(false);
      })
    );
  }
}
