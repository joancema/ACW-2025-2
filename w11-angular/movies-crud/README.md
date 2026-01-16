# Sistema de Gestión de Películas - Angular CRUD

Una aplicación completa de gestión de películas construida con Angular que demuestra operaciones CRUD (Crear, Leer, Actualizar, Eliminar) conectada a Supabase.

## 📋 Tabla de Contenidos

1. [Descripción del Proyecto](#descripción-del-proyecto)
2. [Características](#características)
3. [Tecnologías Utilizadas](#tecnologías-utilizadas)
4. [Arquitectura del Proyecto](#arquitectura-del-proyecto)
5. [Paso 1: Crear el Proyecto](#paso-1-crear-el-proyecto-desde-cero)
6. [Paso 2: Configurar Variables de Entorno](#paso-2-configurar-variables-de-entorno)
7. [Paso 3: Configurar HttpClient](#paso-3-configurar-httpclient)
8. [Paso 4: Crear el Modelo de Datos](#paso-4-crear-el-modelo-de-datos)
9. [Paso 5: Crear el Servicio CRUD](#paso-5-crear-el-servicio-crud)
10. [Paso 6: Crear el Componente MovieCard](#paso-6-crear-el-componente-moviecard)
11. [Paso 7: Crear la Página Home](#paso-7-crear-la-página-home)
12. [Paso 8: Crear el Componente Billboard](#paso-8-crear-el-componente-billboard)
13. [Paso 9: Crear el Componente MovieList](#paso-9-crear-el-componente-movielist)
14. [Paso 10: Crear el Componente MovieForm](#paso-10-crear-el-componente-movieform)
15. [Paso 11: Configurar las Rutas](#paso-11-configurar-las-rutas)
16. [Paso 12: Actualizar AppComponent](#paso-12-actualizar-appcomponent)
17. [Paso 13: Estilos Globales](#paso-13-estilos-globales)
18. [Paso 14: Ejecutar la Aplicación](#paso-14-ejecutar-la-aplicación)
19. [Conceptos Clave de Angular](#conceptos-clave-de-angular)
20. [Comandos Útiles](#comandos-útiles)

---

## Descripción del Proyecto

Este proyecto es una aplicación web completa que permite:
- **Ver** una cartelera pública de películas
- **Administrar** el catálogo de películas (crear, editar, eliminar)
- **Navegar** entre diferentes páginas usando Angular Router
- **Validar** formularios con Reactive Forms
- **Conectar** con una API REST (Supabase)

---

## Características

✅ **CRUD Completo**: Crear, leer, actualizar y eliminar películas  
✅ **Routing**: Navegación entre múltiples páginas  
✅ **Formularios Reactivos**: Validaciones en tiempo real  
✅ **HttpClient**: Peticiones HTTP con Observables  
✅ **Variables de Entorno**: Configuración separada por ambiente  
✅ **Componentes Reutilizables**: Arquitectura modular  
✅ **Responsive Design**: Adaptable a diferentes pantallas  
✅ **TypeScript**: Tipado fuerte y autocompletado  

---

## Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Angular** | 19.x | Framework principal |
| **TypeScript** | 5.7.x | Lenguaje de programación |
| **RxJS** | 7.8.x | Programación reactiva |
| **Angular Router** | 19.x | Navegación entre páginas |
| **Reactive Forms** | 19.x | Formularios con validaciones |
| **HttpClient** | 19.x | Cliente HTTP |
| **Supabase** | REST API | Base de datos en la nube |

---

## Arquitectura del Proyecto

```
src/app/
├── models/                    # Interfaces TypeScript
│   └── movie.ts              # Interface Movie
├── services/                  # Servicios (lógica de negocio)
│   └── movie.service.ts      # Servicio CRUD de películas
├── components/                # Componentes reutilizables
│   ├── movie-card/           # Tarjeta de película
│   ├── billboard/            # Cartelera pública
│   ├── movie-list/           # Lista administrativa
│   └── movie-form/           # Formulario crear/editar
├── pages/                     # Páginas principales
│   └── home/                 # Página de inicio
├── environments/              # Variables de entorno
│   ├── environment.ts        # Desarrollo
│   └── environment.prod.ts   # Producción
├── app.component.ts          # Componente raíz
├── app.routes.ts             # Configuración de rutas
└── app.config.ts             # Configuración global
```

---

## Paso 1: Crear el Proyecto desde Cero

### 1.1 Instalar Angular CLI

```bash
npm install -g @angular/cli
```

### 1.2 Crear el Proyecto

```bash
ng new movies-crud --style=css --ssr=false --skip-tests
cd movies-crud
```

**Opciones explicadas:**
- `--style=css`: Usar CSS para estilos
- `--ssr=false`: Sin Server-Side Rendering
- `--skip-tests`: No generar archivos de prueba

### 1.3 Crear la Estructura de Carpetas

```bash
# Crear carpetas para modelos, servicios y componentes
mkdir src/app/models
mkdir src/app/services
mkdir src/app/pages
mkdir -p src/app/components/movie-card
mkdir -p src/app/components/billboard
mkdir -p src/app/components/movie-list
mkdir -p src/app/components/movie-form
mkdir -p src/app/pages/home
mkdir -p src/environments
```

### 1.4 Verificar que Compile

```bash
ng serve
```

Deberías ver la página de bienvenida de Angular en `http://localhost:4200`. Presiona `Ctrl+C` para detener el servidor.

---

## Paso 2: Configurar Variables de Entorno

Las variables de entorno permiten separar la configuración de desarrollo y producción.

### 2.1 Crear `src/environments/environment.ts`

```typescript
export const environment = {
  production: false,
  supabaseUrl: 'https://TU-PROYECTO.supabase.co/rest/v1',
  supabaseKey: 'TU-ANON-KEY-AQUI'
};
```

### 2.2 Crear `src/environments/environment.prod.ts`

```typescript
export const environment = {
  production: true,
  supabaseUrl: 'https://TU-PROYECTO-PROD.supabase.co/rest/v1',
  supabaseKey: 'TU-ANON-KEY-PRODUCCION'
};
```

### 2.3 Configurar Supabase

1. Ve a [supabase.com](https://supabase.com)
2. Crea un proyecto
3. Crea la tabla `movies`:

```sql
CREATE TABLE movies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  genre TEXT NOT NULL,
  image TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

4. Habilita acceso público en RLS policies:

```sql
-- Permitir todas las operaciones públicamente (solo para desarrollo)
CREATE POLICY "Allow all operations" ON movies
FOR ALL USING (true) WITH CHECK (true);
```

5. Copia tu URL y API Key desde Settings > API

### 2.4 Verificar

El proyecto debería seguir compilando sin errores.

---

## Paso 3: Configurar HttpClient

HttpClient es el cliente HTTP nativo de Angular para hacer peticiones a APIs.

### 3.1 Modificar `src/app/app.config.ts`

```typescript
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch())  // ← Habilita HttpClient
  ]
};
```

**¿Qué hace `provideHttpClient()`?**
- Habilita el servicio HttpClient en toda la aplicación
- `withFetch()` usa la API Fetch nativa del navegador

### 3.2 Verificar

```bash
ng serve
```

Debería compilar sin errores.

---

## Paso 4: Crear el Modelo de Datos

### 4.1 Crear `src/app/models/movie.ts`

```typescript
export interface Movie {
  id: string;
  title: string;
  genre: string;
  image: string;
  description: string;
}
```

**¿Por qué usar interfaces?**
- TypeScript valida los tipos en tiempo de desarrollo
- Autocompletado en el IDE
- Previene errores de tipado

### 4.2 Verificar

El proyecto debería compilar correctamente.

---

## Paso 5: Crear el Servicio CRUD

Los servicios en Angular encapsulan la lógica de negocio y las peticiones HTTP.

### 5.1 Generar el Servicio

```bash
ng generate service services/movie
```

### 5.2 Implementar `src/app/services/movie.service.ts`

```typescript
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

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'apikey': this.apiKey,
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    });
  }

  // READ - Obtener todas las películas
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

  // READ - Obtener una película por ID
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

  // CREATE - Crear una nueva película
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

  // UPDATE - Actualizar una película
  updateMovie(id: string, movie: Partial<Movie>): Observable<Movie | null> {
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

  // DELETE - Eliminar una película
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
```

**Conceptos clave:**
- `@Injectable({ providedIn: 'root' })`: El servicio es un singleton
- `Observable`: Patrón reactivo de RxJS
- `pipe()`: Encadena operadores RxJS
- `map()`: Transforma la respuesta
- `catchError()`: Maneja errores

### 5.3 Verificar

```bash
ng serve
```

Debería compilar sin errores. El servicio está listo pero aún no se usa.

---

## Paso 6: Crear el Componente MovieCard

Este es un componente presentacional que muestra una película en formato de tarjeta.

### 6.1 Generar el Componente

```bash
ng generate component components/movie-card
```

### 6.2 Implementar `src/app/components/movie-card/movie-card.component.ts`

```typescript
import { Component, Input } from '@angular/core';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css'
})
export class MovieCardComponent {
  @Input() movie!: Movie;
}
```

### 6.3 Crear `src/app/components/movie-card/movie-card.component.html`

```html
<div class="movie-card">
  <img 
    [src]="movie.image" 
    [alt]="movie.title" 
    class="movie-poster"
  />
  <div class="movie-info">
    <h3 class="movie-title">{{ movie.title }}</h3>
    <span class="movie-genre">{{ movie.genre }}</span>
    <p class="movie-description">{{ movie.description }}</p>
  </div>
</div>
```

### 6.4 Crear `src/app/components/movie-card/movie-card.component.css`

```css
.movie-card {
  background-color: #16213e;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s;
}

.movie-card:hover {
  transform: scale(1.03);
}

.movie-poster {
  width: 100%;
  height: 350px;
  object-fit: cover;
}

.movie-info {
  padding: 15px;
}

.movie-title {
  font-size: 1.2rem;
  margin-bottom: 8px;
  color: #fff;
}

.movie-genre {
  display: inline-block;
  background-color: #e94560;
  color: #fff;
  padding: 4px 10px;
  border-radius: 15px;
  font-size: 0.8rem;
  margin-bottom: 10px;
}

.movie-description {
  font-size: 0.9rem;
  color: #aaa;
  line-height: 1.4;
}
```

**Conceptos:**
- `@Input()`: Recibe datos del componente padre
- `standalone: true`: Componente independiente
- Componente presentacional (solo muestra datos)

### 6.5 Verificar

```bash
ng serve
```

Debería compilar sin errores.

---

## Paso 7: Crear la Página Home

La página home es el punto de entrada con navegación a las diferentes secciones.

### 7.1 Generar el Componente

```bash
ng generate component pages/home
```

### 7.2 Implementar `src/app/pages/home/home.component.ts`

```typescript
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
```

### 7.3 Crear `src/app/pages/home/home.component.html`

```html
<div class="home-container">
  <header class="home-header">
    <h1>{{ title }}</h1>
    <p class="subtitle">Bienvenido al sistema de gestión de cartelera de cine</p>
  </header>

  <div class="cards-container">
    <div class="nav-card">
      <div class="card-icon">🎬</div>
      <h2>Cartelera</h2>
      <p>Explora las películas en cartelera</p>
      <a routerLink="/billboard" class="card-button">Ver Cartelera</a>
    </div>

    <div class="nav-card">
      <div class="card-icon">⚙️</div>
      <h2>Administración</h2>
      <p>Gestiona el catálogo de películas</p>
      <a routerLink="/admin" class="card-button">Administrar</a>
    </div>
  </div>
</div>
```

### 7.4 Crear `src/app/pages/home/home.component.css`

```css
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.home-header {
  text-align: center;
  margin-bottom: 60px;
}

.home-header h1 {
  font-size: 3rem;
  color: #e94560;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 1.2rem;
  color: #aaa;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 800px;
  margin: 0 auto;
}

.nav-card {
  background-color: #16213e;
  border-radius: 15px;
  padding: 40px;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
  border: 2px solid transparent;
}

.nav-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 30px rgba(233, 69, 96, 0.3);
  border-color: #e94560;
}

.card-icon {
  font-size: 4rem;
  margin-bottom: 20px;
}

.nav-card h2 {
  font-size: 1.8rem;
  color: #fff;
  margin-bottom: 10px;
}

.nav-card p {
  color: #aaa;
  margin-bottom: 25px;
}

.card-button {
  display: inline-block;
  background-color: #e94560;
  color: #fff;
  padding: 12px 30px;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.3s, transform 0.2s;
}

.card-button:hover {
  background-color: #d63651;
  transform: scale(1.05);
}
```

### 7.5 Verificar

```bash
ng serve
```

Debería compilar sin errores.

---

## Paso 8: Crear el Componente Billboard

Muestra las películas en formato de cartelera pública.

### 8.1 Generar el Componente

```bash
ng generate component components/billboard
```

### 8.2 Implementar `src/app/components/billboard/billboard.component.ts`

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieService } from '../../services/movie.service';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { Movie } from '../../models/movie';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-billboard',
  standalone: true,
  imports: [MovieCardComponent, RouterLink],
  templateUrl: './billboard.component.html',
  styleUrl: './billboard.component.css'
})
export class BillboardComponent implements OnInit, OnDestroy {
  movies: Movie[] = [];
  loading = true;
  private subscription?: Subscription;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadMovies(): void {
    this.loading = true;
    
    this.subscription = this.movieService.getMovies().subscribe({
      next: (data) => {
        this.movies = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar películas:', error);
        this.loading = false;
      }
    });
  }
}
```

### 8.3 Crear `src/app/components/billboard/billboard.component.html`

```html
<div class="billboard-container">
  <header class="billboard-header">
    <a routerLink="/" class="back-link">← Volver al inicio</a>
    <h1>Cartelera de Cine</h1>
  </header>

  @if (loading) {
    <p class="loading">Cargando cartelera...</p>
  } @else if (movies.length === 0) {
    <p class="empty">No hay películas en cartelera</p>
  } @else {
    <div class="billboard-grid">
      @for (movie of movies; track movie.id) {
        <app-movie-card [movie]="movie" />
      }
    </div>
  }
</div>
```

### 8.4 Crear `src/app/components/billboard/billboard.component.css`

```css
.billboard-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.billboard-header {
  text-align: center;
  padding: 30px 0;
  border-bottom: 2px solid #e94560;
  margin-bottom: 30px;
  position: relative;
}

.back-link {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  color: #e94560;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s;
}

.back-link:hover {
  color: #d63651;
}

.billboard-header h1 {
  font-size: 2.5rem;
  color: #e94560;
}

.billboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 25px;
}

.loading,
.empty {
  text-align: center;
  padding: 50px;
  font-size: 1.2rem;
  color: #888;
}
```

### 8.5 Verificar

```bash
ng serve
```

Debería compilar sin errores.

---

## Paso 9: Crear el Componente MovieList

Lista administrativa con opciones de crear, editar y eliminar.

### 9.1 Generar el Componente

```bash
ng generate component components/movie-list
```

### 9.2 Implementar `src/app/components/movie-list/movie-list.component.ts`

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent implements OnInit, OnDestroy {
  movies: Movie[] = [];
  loading = true;
  private subscription?: Subscription;

  constructor(
    private movieService: MovieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadMovies(): void {
    this.loading = true;
    
    this.subscription = this.movieService.getMovies().subscribe({
      next: (data) => {
        this.movies = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar películas:', error);
        this.loading = false;
      }
    });
  }

  onEdit(movie: Movie): void {
    this.router.navigate(['/admin/edit', movie.id]);
  }

  onDelete(movie: Movie): void {
    if (confirm(`¿Estás seguro de eliminar "${movie.title}"?`)) {
      this.movieService.deleteMovie(movie.id).subscribe({
        next: (success) => {
          if (success) {
            this.loadMovies();
          }
        },
        error: (error) => {
          console.error('Error al eliminar película:', error);
          alert('Error al eliminar la película');
        }
      });
    }
  }

  onCreate(): void {
    this.router.navigate(['/admin/new']);
  }
}
```

### 9.3 Crear el template y estilos

Crea `src/app/components/movie-list/movie-list.component.html`:

```html
<div class="admin-container">
  <header class="admin-header">
    <div class="header-content">
      <a routerLink="/" class="back-link">← Volver al inicio</a>
      <h1>Administración de Películas</h1>
      <button (click)="onCreate()" class="btn-create">+ Nueva Película</button>
    </div>
  </header>

  @if (loading) {
    <p class="loading">Cargando películas...</p>
  } @else if (movies.length === 0) {
    <div class="empty-state">
      <p>No hay películas registradas</p>
      <button (click)="onCreate()" class="btn-create-large">Crear Primera Película</button>
    </div>
  } @else {
    <div class="table-container">
      <table class="movies-table">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Título</th>
            <th>Género</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          @for (movie of movies; track movie.id) {
            <tr>
              <td>
                <img [src]="movie.image" [alt]="movie.title" class="movie-thumbnail">
              </td>
              <td class="movie-title">{{ movie.title }}</td>
              <td>
                <span class="genre-badge">{{ movie.genre }}</span>
              </td>
              <td class="movie-description">{{ movie.description }}</td>
              <td class="actions">
                <button (click)="onEdit(movie)" class="btn-edit" title="Editar">✏️</button>
                <button (click)="onDelete(movie)" class="btn-delete" title="Eliminar">🗑️</button>
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  }
</div>
```

Crea `src/app/components/movie-list/movie-list.component.css` (ver archivo completo en el proyecto).

### 9.4 Verificar

```bash
ng serve
```

Debería compilar sin errores.

---

## Paso 10: Crear el Componente MovieForm

Formulario reactivo para crear y editar películas.

### 10.1 Generar el Componente

```bash
ng generate component components/movie-form
```

### 10.2 Implementar `src/app/components/movie-form/movie-form.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './movie-form.component.html',
  styleUrl: './movie-form.component.css'
})
export class MovieFormComponent implements OnInit {
  movieForm: FormGroup;
  isEditMode = false;
  movieId: string | null = null;
  loading = false;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private movieService: MovieService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.movieForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      genre: ['', [Validators.required]],
      image: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/)]],
      description: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    this.movieId = this.route.snapshot.paramMap.get('id');
    
    if (this.movieId) {
      this.isEditMode = true;
      this.loadMovie(this.movieId);
    }
  }

  loadMovie(id: string): void {
    this.loading = true;
    
    this.movieService.getMovie(id).subscribe({
      next: (movie) => {
        if (movie) {
          this.movieForm.patchValue({
            title: movie.title,
            genre: movie.genre,
            image: movie.image,
            description: movie.description
          });
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar película:', error);
        this.loading = false;
        alert('Error al cargar la película');
        this.router.navigate(['/admin']);
      }
    });
  }

  onSubmit(): void {
    if (this.movieForm.invalid) {
      Object.keys(this.movieForm.controls).forEach(key => {
        this.movieForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.submitting = true;
    const movieData = this.movieForm.value;

    if (this.isEditMode && this.movieId) {
      this.movieService.updateMovie(this.movieId, movieData).subscribe({
        next: (result) => {
          if (result) {
            alert('Película actualizada exitosamente');
            this.router.navigate(['/admin']);
          }
          this.submitting = false;
        },
        error: (error) => {
          console.error('Error al actualizar película:', error);
          alert('Error al actualizar la película');
          this.submitting = false;
        }
      });
    } else {
      this.movieService.createMovie(movieData).subscribe({
        next: (result) => {
          if (result) {
            alert('Película creada exitosamente');
            this.router.navigate(['/admin']);
          }
          this.submitting = false;
        },
        error: (error) => {
          console.error('Error al crear película:', error);
          alert('Error al crear la película');
          this.submitting = false;
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/admin']);
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.movieForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getErrorMessage(fieldName: string): string {
    const field = this.movieForm.get(fieldName);
    
    if (field?.hasError('required')) {
      return 'Este campo es requerido';
    }
    if (field?.hasError('minlength')) {
      const minLength = field.errors?.['minlength'].requiredLength;
      return `Mínimo ${minLength} caracteres`;
    }
    if (field?.hasError('pattern')) {
      return 'Debe ser una URL válida (http:// o https://)';
    }
    
    return '';
  }
}
```

### 10.3 Crear el template y estilos

Crea el HTML y CSS del formulario (ver archivos completos en el proyecto).

### 10.4 Verificar

```bash
ng serve
```

Debería compilar sin errores. Ahora todos los componentes existen.

---

## Paso 11: Configurar las Rutas

**Ahora sí podemos configurar las rutas** porque todos los componentes ya existen.

### 11.1 Modificar `src/app/app.routes.ts`

```typescript
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BillboardComponent } from './components/billboard/billboard.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieFormComponent } from './components/movie-form/movie-form.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'billboard',
    component: BillboardComponent
  },
  {
    path: 'admin',
    component: MovieListComponent
  },
  {
    path: 'admin/new',
    component: MovieFormComponent
  },
  {
    path: 'admin/edit/:id',
    component: MovieFormComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
```

**Tipos de rutas:**
- `path: ''`: Ruta raíz (home)
- `path: 'billboard'`: Ruta estática
- `path: 'admin/edit/:id'`: Ruta con parámetro dinámico
- `path: '**'`: Wildcard (captura cualquier ruta no definida)

### 11.2 Verificar

```bash
ng serve
```

Debería compilar sin errores. Las rutas están configuradas.

---

## Paso 12: Actualizar AppComponent

El componente raíz solo contiene el `router-outlet` para renderizar las rutas.

### 12.1 Modificar `src/app/app.component.ts`

```typescript
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
```

### 12.2 Modificar `src/app/app.component.html`

```html
<div id="app">
  <router-outlet />
</div>
```

### 12.3 Modificar `src/app/app.component.css`

```css
#app {
  min-height: 100vh;
}
```

**¿Qué es `router-outlet`?**
- Marca el lugar donde se renderizan los componentes según la ruta activa
- Similar a `<Outlet />` en React Router
- Similar a `<router-view />` en Vue Router

### 12.4 Verificar

```bash
ng serve
```

Debería compilar sin errores.

---

## Paso 13: Estilos Globales

### 13.1 Modificar `src/styles.css`

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #1a1a2e;
  color: #eee;
  min-height: 100vh;
}

#app {
  min-height: 100vh;
}
```

### 13.2 Verificar

```bash
ng serve
```

---

## Paso 14: Ejecutar la Aplicación

### 14.1 Iniciar el Servidor

```bash
ng serve
```

### 14.2 Probar la Aplicación

Abre tu navegador en `http://localhost:4200`

**Flujo de prueba:**
1. ✅ Verás la página Home con dos tarjetas
2. ✅ Click en "Ver Cartelera" → Muestra las películas
3. ✅ Click en "Administrar" → Muestra la tabla de películas
4. ✅ Click en "+ Nueva Película" → Formulario de creación
5. ✅ Crear una película → Redirige a admin
6. ✅ Click en ✏️ → Formulario de edición
7. ✅ Click en 🗑️ → Confirma y elimina

### 14.3 Compilar para Producción

```bash
ng build --configuration=production
```

Los archivos compilados estarán en `dist/movies-crud/`.

---

## Conceptos Clave de Angular

### 1. **Componentes**
- Bloques de construcción de la UI
- Tienen template (HTML), lógica (TS) y estilos (CSS)
- Pueden ser standalone o parte de un módulo

### 2. **Servicios**
- Clases que encapsulan lógica de negocio
- Se inyectan en componentes
- Son singletons por defecto

### 3. **Inyección de Dependencias**
- Patrón para compartir servicios
- Angular crea y gestiona las instancias
- Se usa en el constructor

### 4. **Observables (RxJS)**
- Patrón para datos asíncronos
- Más potente que Promises
- Se pueden cancelar con `unsubscribe()`

### 5. **Routing**
- Navegación entre páginas
- `routerLink` para enlaces
- `router.navigate()` para navegación programática

### 6. **Reactive Forms**
- Formularios con validaciones
- `FormBuilder` para construir
- `FormGroup` y `FormControl`

### 7. **Lifecycle Hooks**
- `ngOnInit`: Al inicializar el componente
- `ngOnDestroy`: Al destruir el componente
- `ngOnChanges`: Cuando cambian los @Input()

### 8. **Directivas**
- `@if`: Renderizado condicional (Angular 17+)
- `@for`: Iteración (Angular 17+)
- `[property]`: Property binding
- `(event)`: Event binding

---

## Comandos Útiles

### Generar Componentes

```bash
ng generate component nombre
ng g c nombre  # Abreviado
```

### Generar Servicios

```bash
ng generate service nombre
ng g s nombre  # Abreviado
```

### Ejecutar Aplicación

```bash
ng serve                    # Desarrollo
ng serve --open            # Abre el navegador
ng serve --port 3000       # Puerto personalizado
```

### Compilar

```bash
ng build                              # Desarrollo
ng build --configuration=production   # Producción
```

---

## Estructura Final del Proyecto

```
movies-crud/
├── src/
│   ├── app/
│   │   ├── models/
│   │   │   └── movie.ts
│   │   ├── services/
│   │   │   └── movie.service.ts
│   │   ├── components/
│   │   │   ├── movie-card/
│   │   │   ├── billboard/
│   │   │   ├── movie-list/
│   │   │   └── movie-form/
│   │   ├── pages/
│   │   │   └── home/
│   │   ├── app.component.ts
│   │   ├── app.routes.ts
│   │   └── app.config.ts
│   ├── environments/
│   │   ├── environment.ts
│   │   └── environment.prod.ts
│   ├── styles.css
│   └── main.ts
├── angular.json
├── package.json
└── tsconfig.json
```

---

## Próximos Pasos

Una vez que domines este proyecto, puedes:

1. **Agregar autenticación** con guards
2. **Implementar paginación** en la lista
3. **Agregar búsqueda y filtros**
4. **Implementar interceptors** para manejo de errores
5. **Agregar animaciones** con Angular Animations
6. **Implementar lazy loading** para optimizar
7. **Agregar testing** con Jasmine/Karma

---

## Conclusión

Has creado una aplicación Angular completa con:

✅ CRUD completo con Supabase  
✅ Routing y navegación  
✅ Formularios reactivos con validaciones  
✅ HttpClient y Observables  
✅ Variables de entorno  
✅ Arquitectura modular y escalable  

**Lo más importante:** Siguiendo estos pasos en orden, el proyecto compila sin errores en cada etapa. Cada paso se construye sobre el anterior de manera lógica.

¡Felicidades! Ahora tienes una base sólida para construir aplicaciones Angular profesionales.
