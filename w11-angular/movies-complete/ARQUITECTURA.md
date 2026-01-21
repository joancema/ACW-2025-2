# 🏗️ Arquitectura del Sistema de Películas

## 📊 Diagrama de Componentes

```
┌─────────────────────────────────────────────────────────────┐
│                      APLICACIÓN ANGULAR                      │
│                                                               │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              CAPA DE PRESENTACIÓN                      │  │
│  │                                                         │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐ │  │
│  │  │ MovieList    │  │ MovieForm    │  │ CategoryForm│ │  │
│  │  │ Component    │  │ Component    │  │ Component   │ │  │
│  │  └──────────────┘  └──────────────┘  └─────────────┘ │  │
│  │         │                  │                  │        │  │
│  │         │                  │                  │        │  │
│  │  ┌──────────────┐         │                  │        │  │
│  │  │ ActorForm    │         │                  │        │  │
│  │  │ Component    │         │                  │        │  │
│  │  └──────────────┘         │                  │        │  │
│  └─────────────────────────────────────────────────────────┘
│                               │
│  ┌─────────────────────────────────────────────────────────┐
│  │              CAPA DE SERVICIOS                          │
│  │                                                         │
│  │  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐ │
│  │  │ MovieService │  │CategoryService│ │ActorService │ │
│  │  └──────────────┘  └──────────────┘  └─────────────┘ │
│  │         │                  │                  │        │
│  │  ┌──────────────┐         │                  │        │
│  │  │MovieActor    │         │                  │        │
│  │  │Service       │         │                  │        │
│  │  └──────────────┘         │                  │        │
│  └─────────────────────────────────────────────────────────┘
│                               │
│  ┌─────────────────────────────────────────────────────────┐
│  │              HTTP CLIENT (Angular)                      │
│  └─────────────────────────────────────────────────────────┘
└───────────────────────────────────────────────────────────────┘
                               │
                               │ REST API
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                      SUPABASE (Backend)                      │
│                                                               │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                  BASE DE DATOS                         │  │
│  │                                                         │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐│  │
│  │  │categories│  │  movies  │  │  actors  │  │movie_  ││  │
│  │  │          │  │          │  │          │  │actors  ││  │
│  │  └──────────┘  └──────────┘  └──────────┘  └────────┘│  │
│  └───────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────────┘
```

## 🔄 Flujo de Datos

### Ejemplo: Crear una Película

```
1. Usuario llena el formulario
   │
   ▼
2. MovieFormComponent.onSubmit()
   │
   ▼
3. MovieService.createMovie(movieData)
   │
   ▼
4. HttpClient.post() → Envía datos a Supabase
   │
   ▼
5. Supabase guarda en la base de datos
   │
   ▼
6. Supabase devuelve la película creada
   │
   ▼
7. MovieService recibe la respuesta
   │
   ▼
8. MovieFormComponent muestra mensaje de éxito
   │
   ▼
9. Router navega a la lista de películas
```

## 🗂️ Estructura de Archivos

```
movies-complete/
│
├── src/
│   ├── app/
│   │   ├── components/              # 🎨 Componentes visuales
│   │   │   ├── movie-list/
│   │   │   │   ├── movie-list.component.ts
│   │   │   │   ├── movie-list.component.html
│   │   │   │   └── movie-list.component.css
│   │   │   ├── movie-form/
│   │   │   ├── category-form/
│   │   │   └── actor-form/
│   │   │
│   │   ├── services/                # 🔧 Lógica de negocio
│   │   │   ├── movie.service.ts
│   │   │   ├── category.service.ts
│   │   │   ├── actor.service.ts
│   │   │   └── movie-actor.service.ts
│   │   │
│   │   ├── models/                  # 📋 Definiciones de tipos
│   │   │   ├── movie.model.ts
│   │   │   ├── category.model.ts
│   │   │   ├── actor.model.ts
│   │   │   └── movie-actor.model.ts
│   │   │
│   │   ├── app.routes.ts            # 🗺️ Configuración de rutas
│   │   ├── app.config.ts            # ⚙️ Configuración global
│   │   ├── app.component.ts         # 🏠 Componente raíz
│   │   └── app.component.html
│   │
│   ├── environments/                # 🌍 Variables de entorno
│   │   ├── environment.ts
│   │   └── environment.prod.ts
│   │
│   ├── styles.css                   # 🎨 Estilos globales
│   └── index.html                   # 📄 HTML principal
│
├── SUPABASE_SETUP.sql              # 🗄️ Script de base de datos
├── README.md                        # 📖 Documentación principal
├── GUIA_ESTUDIANTES.md             # 📚 Guía para estudiantes
├── ARQUITECTURA.md                 # 🏗️ Este archivo
└── package.json                     # 📦 Dependencias
```

## 🔐 Seguridad y Autenticación

### Row Level Security (RLS)

Actualmente, las políticas de Supabase permiten acceso público:

```sql
-- Política actual (para desarrollo)
CREATE POLICY "Permitir lectura pública" ON movies
  FOR SELECT USING (true);
```

### Para Producción (Mejora Futura)

```sql
-- Política con autenticación
CREATE POLICY "Solo usuarios autenticados" ON movies
  FOR SELECT USING (auth.role() = 'authenticated');
```

## 📡 API REST de Supabase

### Endpoints Utilizados

```
GET    /movies                    # Obtener todas las películas
GET    /movies?id=eq.{id}        # Obtener una película
POST   /movies                    # Crear película
PATCH  /movies?id=eq.{id}        # Actualizar película
DELETE /movies?id=eq.{id}        # Eliminar película

GET    /categories                # Obtener todas las categorías
POST   /categories                # Crear categoría

GET    /actors                    # Obtener todos los actores
POST   /actors                    # Crear actor

GET    /movie_actors?movie_id=eq.{id}  # Obtener actores de película
POST   /movie_actors              # Agregar actor a película
DELETE /movie_actors?movie_id=eq.{id}&actor_id=eq.{id}  # Remover actor
```

## 🎯 Patrones de Diseño Utilizados

### 1. Dependency Injection (DI)

```typescript
constructor(
  private movieService: MovieService,  // ← Inyección
  private router: Router
) {}
```

### 2. Observable Pattern (RxJS)

```typescript
this.movieService.getMovies().subscribe({
  next: (movies) => this.movies = movies,
  error: (error) => console.error(error)
});
```

### 3. Reactive Forms

```typescript
this.movieForm = this.fb.group({
  title: ['', Validators.required]
});
```

### 4. Service Layer Pattern

```
Component → Service → HTTP → API
```

## 🚀 Optimizaciones Futuras

### 1. Caché de Datos

```typescript
private cachedMovies: Movie[] = [];

getMovies(): Observable<Movie[]> {
  if (this.cachedMovies.length > 0) {
    return of(this.cachedMovies);
  }
  return this.http.get<Movie[]>(...);
}
```

### 2. Lazy Loading de Componentes

```typescript
{
  path: 'movies',
  loadComponent: () => import('./components/movie-list/...')
}
```

### 3. Paginación

```typescript
getMovies(page: number, limit: number): Observable<Movie[]> {
  return this.http.get<Movie[]>(
    `${this.apiUrl}/movies?limit=${limit}&offset=${page * limit}`
  );
}
```

### 4. Búsqueda y Filtros

```typescript
searchMovies(query: string): Observable<Movie[]> {
  return this.http.get<Movie[]>(
    `${this.apiUrl}/movies?title=ilike.*${query}*`
  );
}
```

## 📊 Métricas del Proyecto

- **Componentes**: 4
- **Servicios**: 4
- **Modelos**: 4
- **Rutas**: 6
- **Tablas de BD**: 4
- **Líneas de código**: ~1,500
- **Archivos TypeScript**: 16
- **Archivos HTML**: 4
- **Archivos CSS**: 5

## 🎓 Conceptos Avanzados

### Observables vs Promises

```typescript
// Promise (ejecuta inmediatamente)
fetch('/api/movies').then(data => console.log(data));

// Observable (ejecuta cuando te suscribes)
this.http.get('/api/movies').subscribe(data => console.log(data));
```

### Pipe Operators

```typescript
this.movieService.getMovies().pipe(
  map(movies => movies.filter(m => m.category_id === 'action')),
  tap(movies => console.log('Filtered:', movies)),
  catchError(error => of([]))
).subscribe(movies => this.movies = movies);
```

### Standalone Components

```typescript
@Component({
  standalone: true,  // ← No necesita módulo
  imports: [CommonModule, ReactiveFormsModule],
  ...
})
```

---

**Este documento es una referencia técnica para entender la arquitectura completa del sistema.**
