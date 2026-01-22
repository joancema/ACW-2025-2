# 🎬 Sistema de Gestión de Películas - Angular
## Guía Completa: Crear la Aplicación desde Cero

Esta guía te llevará paso a paso para crear una aplicación completa de gestión de películas usando Angular 19 y Supabase.

---

## 📋 Tabla de Contenidos

1. [Requisitos Previos](#requisitos-previos)
2. [Paso 1: Crear el Proyecto Angular](#paso-1-crear-el-proyecto-angular)
3. [Paso 2: Configurar Supabase](#paso-2-configurar-supabase)
4. [Paso 3: Crear la Estructura del Proyecto](#paso-3-crear-la-estructura-del-proyecto)
5. [Paso 4: Crear los Modelos](#paso-4-crear-los-modelos)
6. [Paso 5: Crear los Servicios](#paso-5-crear-los-servicios)
7. [Paso 6: Crear los Componentes](#paso-6-crear-los-componentes)
8. [Paso 7: Configurar las Rutas](#paso-7-configurar-las-rutas)
9. [Paso 8: Configurar Variables de Entorno](#paso-8-configurar-variables-de-entorno)
10. [Paso 9: Ejecutar la Aplicación](#paso-9-ejecutar-la-aplicación)

---

## ⚙️ Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

1. **Node.js** (versión 18 o superior)
   - Descarga desde: https://nodejs.org/
   - Verifica la instalación: `node --version`

2. **npm** (viene con Node.js)
   - Verifica la instalación: `npm --version`

3. **Angular CLI** (instalación global)
   ```bash
   npm install -g @angular/cli
   ```
   - Verifica la instalación: `ng version`

4. **Cuenta en Supabase**
   - Crea una cuenta gratuita en: https://supabase.com

---

## Paso 1: Crear el Proyecto Angular

### ¿Qué vamos a hacer?

Vamos a crear un nuevo proyecto Angular desde cero usando el CLI (Command Line Interface). El CLI de Angular es una herramienta que automatiza la creación de archivos y la configuración inicial del proyecto, ahorrándonos mucho tiempo.

### 1.1. Crear el Proyecto

Abre una terminal y ejecuta:

```bash
ng new movies-complete --routing --style=css --standalone
```

**Explicación de los parámetros:**
- `movies-complete`: Nombre del proyecto (puedes cambiarlo si quieres)
- `--routing`: Habilita el sistema de rutas (necesario para navegar entre páginas)
- `--style=css`: Usa CSS para estilos (en lugar de SCSS o SASS)
- `--standalone`: Crea componentes standalone (la forma moderna de Angular, sin módulos)

**¿Qué hace este comando?**
El CLI crea toda la estructura de carpetas, archivos de configuración, y dependencias necesarias para un proyecto Angular funcional. Esto incluye TypeScript, el compilador, y todas las herramientas de desarrollo.

### 1.2. Navegar al Proyecto

```bash
cd movies-complete
```

**¿Por qué?**
Necesitamos estar dentro de la carpeta del proyecto para ejecutar los siguientes comandos.

### 1.3. Verificar la Instalación

```bash
npm start
```

**¿Qué hace este comando?**
Inicia el servidor de desarrollo de Angular, que compila tu aplicación y la sirve en `http://localhost:4200`. Este servidor tiene "hot reload", lo que significa que cuando cambies código, la página se actualiza automáticamente.

Abre tu navegador en `http://localhost:4200`. Deberías ver la página de bienvenida de Angular. Presiona `Ctrl+C` en la terminal para detener el servidor.

---

## Paso 2: Configurar Supabase

### ¿Qué vamos a hacer?

Supabase es una plataforma que nos proporciona una base de datos PostgreSQL en la nube, junto con una API REST automática. En este paso crearemos las tablas de nuestra base de datos y configuraremos los permisos de acceso.

### 2.1. Crear un Proyecto en Supabase

1. Ve a https://supabase.com
2. Inicia sesión o crea una cuenta nueva
3. Haz clic en **"New Project"**
4. Completa el formulario:
   - **Name**: `movies-app` (o el nombre que prefieras)
   - **Database Password**: Crea una contraseña segura (guárdala en un lugar seguro)
   - **Region**: Elige la región más cercana a ti
   - **Pricing Plan**: Selecciona **"Free"**
5. Haz clic en **"Create new project"**
6. Espera 1-2 minutos mientras se inicializa el proyecto

**¿Por qué Supabase?**
Supabase nos da una base de datos real sin necesidad de instalar PostgreSQL en nuestra computadora. Además, genera automáticamente una API REST para cada tabla, lo que hace muy fácil conectarnos desde Angular.

### 2.2. Crear las Tablas en Supabase

1. En tu proyecto de Supabase, ve al menú lateral izquierdo
2. Haz clic en **"SQL Editor"** (ícono de base de datos)
3. Haz clic en **"New query"** (botón verde en la parte superior)
4. Copia y pega el siguiente script SQL:

```sql
-- ============================================
-- SCRIPT DE CONFIGURACIÓN DE BASE DE DATOS
-- ============================================

-- 1. TABLA DE CATEGORÍAS
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. TABLA DE PELÍCULAS
CREATE TABLE IF NOT EXISTS movies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  image TEXT NOT NULL,
  description TEXT NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. TABLA DE ACTORES
CREATE TABLE IF NOT EXISTS actors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. TABLA INTERMEDIA PELÍCULA-ACTOR
CREATE TABLE IF NOT EXISTS movie_actors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  movie_id UUID REFERENCES movies(id) ON DELETE CASCADE NOT NULL,
  actor_id UUID REFERENCES actors(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(movie_id, actor_id)
);

-- 5. ÍNDICES PARA MEJORAR EL RENDIMIENTO
CREATE INDEX IF NOT EXISTS idx_movies_category_id ON movies(category_id);
CREATE INDEX IF NOT EXISTS idx_movie_actors_movie_id ON movie_actors(movie_id);
CREATE INDEX IF NOT EXISTS idx_movie_actors_actor_id ON movie_actors(actor_id);

-- 6. POLÍTICAS DE SEGURIDAD (RLS)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE movies ENABLE ROW LEVEL SECURITY;
ALTER TABLE actors ENABLE ROW LEVEL SECURITY;
ALTER TABLE movie_actors ENABLE ROW LEVEL SECURITY;

-- Políticas para CATEGORIES
CREATE POLICY "Permitir lectura pública de categorías" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Permitir inserción pública de categorías" ON categories
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir actualización pública de categorías" ON categories
  FOR UPDATE USING (true);

CREATE POLICY "Permitir eliminación pública de categorías" ON categories
  FOR DELETE USING (true);

-- Políticas para MOVIES
CREATE POLICY "Permitir lectura pública de películas" ON movies
  FOR SELECT USING (true);

CREATE POLICY "Permitir inserción pública de películas" ON movies
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir actualización pública de películas" ON movies
  FOR UPDATE USING (true);

CREATE POLICY "Permitir eliminación pública de películas" ON movies
  FOR DELETE USING (true);

-- Políticas para ACTORS
CREATE POLICY "Permitir lectura pública de actores" ON actors
  FOR SELECT USING (true);

CREATE POLICY "Permitir inserción pública de actores" ON actors
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir actualización pública de actores" ON actors
  FOR UPDATE USING (true);

CREATE POLICY "Permitir eliminación pública de actores" ON actors
  FOR DELETE USING (true);

-- Políticas para MOVIE_ACTORS
CREATE POLICY "Permitir lectura pública de movie_actors" ON movie_actors
  FOR SELECT USING (true);

CREATE POLICY "Permitir inserción pública de movie_actors" ON movie_actors
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir actualización pública de movie_actors" ON movie_actors
  FOR UPDATE USING (true);

CREATE POLICY "Permitir eliminación pública de movie_actors" ON movie_actors
  FOR DELETE USING (true);
```

5. Haz clic en **"Run"** (botón verde) o presiona `Ctrl+Enter`
6. Deberías ver un mensaje de éxito

**¿Qué hace este script?**
- **Crea 4 tablas**: categories, movies, actors, y movie_actors (tabla intermedia)
- **Establece relaciones**: `category_id` en movies referencia a categories, y movie_actors conecta películas con actores
- **Crea índices**: Mejoran la velocidad de búsqueda en la base de datos
- **Configura RLS (Row Level Security)**: Define quién puede leer/escribir datos. En este caso, permitimos acceso público para desarrollo (en producción deberías restringirlo)

**Relaciones importantes:**
- Una categoría puede tener muchas películas (1 a muchos)
- Una película puede tener muchos actores y un actor puede estar en muchas películas (muchos a muchos, por eso necesitamos la tabla movie_actors)

### 2.3. Verificar las Tablas Creadas

1. En Supabase, ve a **"Table Editor"** en el menú lateral
2. Deberías ver 4 tablas:
   - `categories`
   - `movies`
   - `actors`
   - `movie_actors`

**¿Por qué verificar?**
Asegura que el script SQL se ejecutó correctamente y que las tablas están listas para usar.

### 2.4. Obtener las Credenciales de API

1. En Supabase, ve a **"Settings"** (ícono de engranaje) en el menú lateral
2. Haz clic en **"API"** en el submenú
3. Encuentra la sección **"Project API keys"**
4. Copia los siguientes valores (los necesitarás más adelante):
   - **Project URL**: Algo como `https://xxxxx.supabase.co`
   - **anon public key**: Una cadena larga que empieza con `eyJ...`

**¿Qué son estas credenciales?**
- **Project URL**: La dirección de tu base de datos en la nube
- **anon key**: Una clave de acceso que permite a tu aplicación Angular comunicarse con Supabase. La clave "anon" es pública y segura para usar en el frontend (pero solo permite las operaciones que definimos en las políticas RLS)

**IMPORTANTE**: Guarda estos valores en un archivo de texto temporal, los usarás en el Paso 8.

---

## Paso 3: Crear la Estructura del Proyecto

### ¿Qué vamos a hacer?

Vamos a crear las carpetas donde organizaremos nuestro código. En Angular, es una buena práctica separar los diferentes tipos de archivos en carpetas específicas: modelos (tipos de datos), servicios (lógica de negocio), y componentes (interfaz de usuario).

### 3.1. Crear las Carpetas

En la terminal, dentro de la carpeta `movies-complete`, ejecuta:

```bash
mkdir -p src/app/models
mkdir -p src/app/services
mkdir -p src/app/components
```

**¿Qué hace este comando?**
- `mkdir -p`: Crea carpetas (el `-p` crea las carpetas padre si no existen)
- `models/`: Aquí guardaremos las interfaces TypeScript que definen la estructura de nuestros datos (Movie, Category, Actor)
- `services/`: Aquí guardaremos los servicios que se comunican con la API de Supabase
- `components/`: Aquí guardaremos los componentes de la interfaz (páginas y formularios)

### 3.2. Verificar la Estructura

Tu estructura de carpetas debería verse así:

```
src/app/
├── components/
├── models/
├── services/
├── app.component.ts
├── app.component.html
├── app.component.css
├── app.config.ts
└── app.routes.ts
```

**¿Por qué esta organización?**
Mantener el código organizado hace que sea más fácil encontrar archivos, entender la estructura del proyecto, y trabajar en equipo. Cada carpeta tiene un propósito específico.

---

## Paso 4: Crear los Modelos

### ¿Qué vamos a hacer?

Los modelos (o interfaces en TypeScript) definen la "forma" de nuestros datos. Son como plantillas que le dicen a TypeScript qué propiedades tiene cada objeto. Esto nos ayuda a prevenir errores y hace el código más fácil de entender.

### 4.1. Crear el Modelo de Categoría

```bash
ng generate interface models/category
```

Esto creará el archivo `src/app/models/category.ts`. **Edita el archivo** y reemplaza su contenido con:

```typescript
export interface Category {
  id: string;
  name: string;
  created_at?: string;
}
```

**¿Qué es una interface?**
Una interface en TypeScript es como un contrato que define qué propiedades debe tener un objeto. En este caso, `Category` debe tener un `id` (string), un `name` (string), y opcionalmente un `created_at` (el `?` significa opcional).

**¿Por qué usar interfaces?**
TypeScript nos avisará si intentamos usar una propiedad que no existe, o si pasamos un objeto con la forma incorrecta. Esto previene muchos errores antes de que la aplicación se ejecute.

### 4.2. Crear el Modelo de Actor

```bash
ng generate interface models/actor
```

Esto creará el archivo `src/app/models/actor.ts`. **Edita el archivo** y reemplaza su contenido con:

```typescript
export interface Actor {
  id: string;
  name: string;
  created_at?: string;
}
```

**Explicación:**
Similar a Category, Actor tiene un id único, un nombre, y una fecha de creación opcional.

### 4.3. Crear el Modelo de Película

```bash
ng generate interface models/movie
```

Esto creará el archivo `src/app/models/movie.ts`. **Edita el archivo** y reemplaza su contenido con:

```typescript
export interface Movie {
  id: string;
  title: string;
  image: string;
  description: string;
  category_id: string;
  created_at?: string;
}

export interface MovieWithDetails extends Movie {
  category?: {
    id: string;
    name: string;
  };
  actors?: Array<{
    id: string;
    name: string;
  }>;
}
```

**¿Qué hace `extends`?**
`MovieWithDetails extends Movie` significa que MovieWithDetails tiene todas las propiedades de Movie, más algunas adicionales. Esto es útil porque cuando mostramos la lista de películas, queremos también mostrar el nombre de la categoría y los actores, no solo sus IDs.

### 4.4. Crear el Modelo de Relación Película-Actor

```bash
ng generate interface models/movie-actor
```

Esto creará el archivo `src/app/models/movie-actor.ts`. **Edita el archivo** y reemplaza su contenido con:

```typescript
export interface MovieActor {
  id: string;
  movie_id: string;
  actor_id: string;
  created_at?: string;
}
```

**¿Por qué esta tabla intermedia?**
Como una película puede tener muchos actores y un actor puede estar en muchas películas (relación muchos a muchos), necesitamos una tabla intermedia que guarde estas relaciones. Esta tabla solo guarda los IDs de la película y del actor.

---

## Paso 5: Crear los Servicios

### ¿Qué vamos a hacer?

Los servicios son clases que contienen la lógica para comunicarse con la API de Supabase. En lugar de hacer peticiones HTTP directamente en los componentes, las centralizamos en servicios. Esto hace el código más organizado y reutilizable.

### 5.1. Crear el Servicio de Películas

```bash
ng generate service services/movie
```

Esto creará el archivo `src/app/services/movie.service.ts`. **Edita el archivo** y reemplaza su contenido con:

```typescript
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, map, tap } from 'rxjs';
import { Movie, MovieWithDetails } from '../models/movie';
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

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/movies?order=title.asc`, { 
      headers: this.getHeaders() 
    }).pipe(
      catchError(error => {
        console.error('Error al obtener películas:', error);
        return of([]);
      })
    );
  }

  getMoviesWithDetails(): Observable<MovieWithDetails[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/movies?select=*,categories(id,name),movie_actors(actors(id,name))&order=title.asc`, 
      { headers: this.getHeaders() }
    ).pipe(
      map(movies => movies.map(movie => ({
        ...movie,
        category: movie.categories,
        actors: movie.movie_actors?.map((ma: any) => ma.actors) || []
      }))),
      catchError(error => {
        console.error('Error al obtener películas con detalles:', error);
        return of([]);
      })
    );
  }

  getMovie(id: string): Observable<Movie | null> {
    return this.http.get<Movie[]>(`${this.apiUrl}/movies?id=eq.${id}`, {
      headers: this.getHeaders()
    }).pipe(
      map(movies => movies && movies.length > 0 ? movies[0] : null),
      catchError(error => {
        console.error('Error al obtener película:', error);
        return of(null);
      })
    );
  }

  createMovie(movie: Omit<Movie, 'id' | 'created_at'>): Observable<Movie | null> {
    return this.http.post<Movie[]>(`${this.apiUrl}/movies`, movie, {
      headers: this.getHeaders()
    }).pipe(
      map(movies => movies && movies.length > 0 ? movies[0] : null),
      catchError(error => {
        console.error('Error al crear película:', error);
        return of(null);
      })
    );
  }

  updateMovie(id: string, movie: Partial<Movie>): Observable<Movie | null> {
    const { id: _, created_at, ...movieData } = movie as Movie;
    
    return this.http.patch<Movie[]>(`${this.apiUrl}/movies?id=eq.${id}`, movieData, {
      headers: this.getHeaders()
    }).pipe(
      map(movies => movies && movies.length > 0 ? movies[0] : null),
      catchError(error => {
        console.error('Error al actualizar película:', error);
        return of(null);
      })
    );
  }

  deleteMovie(id: string): Observable<boolean> {
    return this.http.delete(`${this.apiUrl}/movies?id=eq.${id}`, {
      headers: this.getHeaders()
    }).pipe(
      map(() => true),
      catchError(error => {
        console.error('Error al eliminar película:', error);
        return of(false);
      })
    );
  }
}
```

**Conceptos importantes:**

- **`@Injectable({ providedIn: 'root' })`**: Hace que Angular cree una sola instancia del servicio para toda la aplicación (patrón Singleton). Esto es eficiente y permite compartir datos entre componentes.

- **`Observable`**: Es parte de RxJS, una librería para programación reactiva. Un Observable es como una promesa, pero puede emitir múltiples valores a lo largo del tiempo. Las peticiones HTTP en Angular devuelven Observables.

- **`.pipe()`**: Permite transformar o manejar los datos antes de que lleguen al componente. `catchError` captura errores y `map` transforma los datos.

- **`getHeaders()`**: Crea los headers HTTP necesarios para autenticarse con Supabase. Cada petición necesita la API key.

- **CRUD completo**: Este servicio implementa todas las operaciones básicas:
  - **Create**: `createMovie()` - Crea una nueva película
  - **Read**: `getMovies()`, `getMovie()` - Lee películas
  - **Update**: `updateMovie()` - Actualiza una película
  - **Delete**: `deleteMovie()` - Elimina una película

### 5.2. Crear el Servicio de Categorías

```bash
ng generate service services/category
```

Esto creará el archivo `src/app/services/category.service.ts`. **Edita el archivo** y reemplaza su contenido con:

```typescript
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, map } from 'rxjs';
import { Category } from '../models/category';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
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

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories?order=name.asc`, {
      headers: this.getHeaders()
    }).pipe(
      catchError(error => {
        console.error('Error al obtener categorías:', error);
        return of([]);
      })
    );
  }

  createCategory(category: Omit<Category, 'id' | 'created_at'>): Observable<Category | null> {
    return this.http.post<Category[]>(`${this.apiUrl}/categories`, category, {
      headers: this.getHeaders()
    }).pipe(
      map(categories => categories && categories.length > 0 ? categories[0] : null),
      catchError(error => {
        console.error('Error al crear categoría:', error);
        return of(null);
      })
    );
  }
}
```

**¿Por qué solo dos métodos?**
Para este proyecto, solo necesitamos leer y crear categorías. Si quisieras editar o eliminar categorías, agregarías métodos similares a los del MovieService.

### 5.3. Crear el Servicio de Actores

```bash
ng generate service services/actor
```

Esto creará el archivo `src/app/services/actor.service.ts`. **Edita el archivo** y reemplaza su contenido con:

```typescript
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, map } from 'rxjs';
import { Actor } from '../models/actor';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActorService {
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

  getActors(): Observable<Actor[]> {
    return this.http.get<Actor[]>(`${this.apiUrl}/actors?order=name.asc`, {
      headers: this.getHeaders()
    }).pipe(
      catchError(error => {
        console.error('Error al obtener actores:', error);
        return of([]);
      })
    );
  }

  createActor(actor: Omit<Actor, 'id' | 'created_at'>): Observable<Actor | null> {
    return this.http.post<Actor[]>(`${this.apiUrl}/actors`, actor, {
      headers: this.getHeaders()
    }).pipe(
      map(actors => actors && actors.length > 0 ? actors[0] : null),
      catchError(error => {
        console.error('Error al crear actor:', error);
        return of(null);
      })
    );
  }
}
```

**Similar al CategoryService**: Solo necesitamos leer y crear actores.

### 5.4. Crear el Servicio de Relaciones Película-Actor

```bash
ng generate service services/movie-actor
```

Esto creará el archivo `src/app/services/movie-actor.service.ts`. **Edita el archivo** y reemplaza su contenido con:

```typescript
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, map } from 'rxjs';
import { Actor } from '../models/actor';
import { MovieActor } from '../models/movie-actor';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieActorService {
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

  getActorsByMovie(movieId: string): Observable<Actor[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/movie_actors?movie_id=eq.${movieId}&select=*,actors(*)`,
      { headers: this.getHeaders() }
    ).pipe(
      map(results => results.map((r: any) => r.actors)),
      catchError(error => {
        console.error('Error al obtener actores de la película:', error);
        return of([]);
      })
    );
  }

  addActorToMovie(movieId: string, actorId: string): Observable<MovieActor | null> {
    return this.http.post<MovieActor[]>(
      `${this.apiUrl}/movie_actors`,
      { movie_id: movieId, actor_id: actorId },
      { headers: this.getHeaders() }
    ).pipe(
      map(results => results && results.length > 0 ? results[0] : null),
      catchError(error => {
        console.error('Error al agregar actor a la película:', error);
        return of(null);
      })
    );
  }

  removeActorFromMovie(movieId: string, actorId: string): Observable<boolean> {
    return this.http.delete(
      `${this.apiUrl}/movie_actors?movie_id=eq.${movieId}&actor_id=eq.${actorId}`,
      { headers: this.getHeaders() }
    ).pipe(
      map(() => true),
      catchError(error => {
        console.error('Error al remover actor de la película:', error);
        return of(false);
      })
    );
  }

  removeAllActorsFromMovie(movieId: string): Observable<boolean> {
    return this.http.delete(
      `${this.apiUrl}/movie_actors?movie_id=eq.${movieId}`,
      { headers: this.getHeaders() }
    ).pipe(
      map(() => true),
      catchError(error => {
        console.error('Error al remover actores de la película:', error);
        return of(false);
      })
    );
  }
}
```

**¿Qué hace este servicio?**
Maneja las relaciones entre películas y actores. Permite:
- Obtener todos los actores de una película
- Agregar un actor a una película (crea un registro en movie_actors)
- Remover un actor de una película
- Remover todos los actores de una película (útil cuando eliminamos una película)

---

## Paso 6: Crear los Componentes

### ¿Qué vamos a hacer?

Los componentes son las "piezas" de la interfaz de usuario. Cada componente tiene tres archivos:
- `.ts`: La lógica (qué hace el componente)
- `.html`: La estructura (qué se muestra)
- `.css`: Los estilos (cómo se ve)

Angular usa componentes para crear interfaces modulares y reutilizables.

### 6.1. Crear el Componente de Lista de Películas

```bash
ng generate component components/movie-list --standalone
```

Esto creará los archivos:
- `src/app/components/movie-list/movie-list.component.ts`
- `src/app/components/movie-list/movie-list.component.html`
- `src/app/components/movie-list/movie-list.component.css`

**¿Qué hace este componente?**
Muestra todas las películas en formato de tarjetas. Permite crear nuevas películas, editar existentes, y eliminarlas.

**Conceptos clave del código:**

- **`ngOnInit()`**: Se ejecuta cuando el componente se carga. Es el lugar perfecto para cargar datos iniciales.
- **`subscribe()`**: Los Observables no hacen nada hasta que te "suscribes" a ellos. Es como decir "cuando lleguen los datos, haz esto".
- **`@if`, `@for`**: Son las nuevas directivas de control de flujo de Angular 17+. `@if` muestra contenido condicionalmente, `@for` repite elementos.
- **`[src]`, `(click)`**: Son ejemplos de data binding:
  - `[src]` es property binding (pasa datos al elemento)
  - `(click)` es event binding (escucha eventos del usuario)

**Edita `movie-list.component.ts`** y reemplaza su contenido con:

```typescript
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { MovieActorService } from '../../services/movie-actor.service';
import { MovieWithDetails } from '../../models/movie';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent implements OnInit {
  movies: MovieWithDetails[] = [];
  loading = true;

  constructor(
    private movieService: MovieService,
    private movieActorService: MovieActorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.loading = true;
    
    this.movieService.getMoviesWithDetails().subscribe({
      next: (movies) => {
        this.movies = movies;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar películas:', error);
        this.loading = false;
      }
    });
  }

  onEdit(movieId: string): void {
    this.router.navigate(['/movies/edit', movieId]);
  }

  onDelete(movieId: string, movieTitle: string): void {
    if (confirm(`¿Estás seguro de eliminar la película "${movieTitle}"?`)) {
      this.movieActorService.removeAllActorsFromMovie(movieId).subscribe({
        next: () => {
          this.movieService.deleteMovie(movieId).subscribe({
            next: (success) => {
              if (success) {
                alert('Película eliminada exitosamente');
                this.loadMovies();
              } else {
                alert('Error al eliminar la película');
              }
            }
          });
        }
      });
    }
  }

  onCreateNew(): void {
    this.router.navigate(['/movies/new']);
  }
}
```

**Edita `movie-list.component.html`** y reemplaza su contenido con:

```html
<div class="container">
  <div class="header">
    <h1>🎬 Mis Películas</h1>
    <button class="btn-create" (click)="onCreateNew()">+ Nueva Película</button>
  </div>

  @if (loading) {
    <p>Cargando películas...</p>
  } @else if (movies.length === 0) {
    <div class="empty-state">
      <p>No hay películas aún. ¡Crea tu primera película!</p>
    </div>
  } @else {
    <div class="movies-grid">
      @for (movie of movies; track movie.id) {
        <div class="movie-card">
          <img [src]="movie.image" [alt]="movie.title" />
          <div class="movie-info">
            <h2>{{ movie.title }}</h2>
            @if (movie.category) {
              <span class="category">{{ movie.category.name }}</span>
            }
            <p class="description">{{ movie.description }}</p>
            @if (movie.actors && movie.actors.length > 0) {
              <div class="actors">
                <strong>Actores:</strong>
                <span>{{ movie.actors.map(a => a.name).join(', ') }}</span>
              </div>
            }
            <div class="actions">
              <button class="btn-edit" (click)="onEdit(movie.id)">✏️ Editar</button>
              <button class="btn-delete" (click)="onDelete(movie.id, movie.title)">🗑️ Eliminar</button>
            </div>
          </div>
        </div>
      }
    </div>
  }
</div>
```

**Edita `movie-list.component.css`** y reemplaza su contenido con:

```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.header h1 {
  margin: 0;
}

.btn-create {
  background-color: #2196F3;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.btn-create:hover {
  background-color: #1976D2;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #666;
}

.movies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.movie-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.movie-card img {
  width: 100%;
  height: 400px;
  object-fit: cover;
}

.movie-info {
  padding: 15px;
}

.movie-info h2 {
  margin: 0 0 10px 0;
  font-size: 20px;
}

.category {
  display: inline-block;
  background-color: #E3F2FD;
  color: #1976D2;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  margin-bottom: 10px;
}

.description {
  color: #666;
  margin: 10px 0;
  line-height: 1.5;
}

.actors {
  margin: 10px 0;
  font-size: 14px;
}

.actors strong {
  margin-right: 5px;
}

.actions {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.btn-edit, .btn-delete {
  flex: 1;
  padding: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-edit {
  background-color: #4CAF50;
  color: white;
}

.btn-delete {
  background-color: #f44336;
  color: white;
}
```

### 6.2. Crear el Componente de Formulario de Películas

```bash
ng generate component components/movie-form --standalone
```

**¿Qué hace este componente?**
Muestra un formulario para crear o editar películas. Usa formularios reactivos de Angular, que son más potentes que los formularios tradicionales porque se manejan desde TypeScript.

**Conceptos importantes:**

- **Formularios Reactivos**: Usamos `FormBuilder` y `FormGroup` para crear formularios controlados por código. Esto nos permite:
  - Validar campos en tiempo real
  - Acceder a los valores fácilmente
  - Manejar errores de forma programática

- **Validaciones**: `Validators.required`, `Validators.minLength()`, `Validators.pattern()` aseguran que el usuario ingrese datos correctos.

- **Modo edición vs creación**: El componente detecta si hay un `id` en la URL para saber si está editando o creando.

**Edita los tres archivos generados** con el código completo. Por limitaciones de espacio, aquí está el código TypeScript. Los archivos HTML y CSS son extensos, así que los incluiré en la siguiente sección.

**`movie-form.component.ts`:**

```typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { CategoryService } from '../../services/category.service';
import { MovieActorService } from '../../services/movie-actor.service';
import { Category } from '../../models/category';
import { Actor } from '../../models/actor';
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
  categories: Category[] = [];
  movieActors: Actor[] = [];
  isEditMode = false;
  movieId: string | null = null;
  loading = false;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private movieService: MovieService,
    private categoryService: CategoryService,
    private movieActorService: MovieActorService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.movieForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      category_id: ['', [Validators.required]],
      image: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/)]],
      description: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    this.movieId = this.route.snapshot.paramMap.get('id');
    
    if (this.movieId) {
      this.isEditMode = true;
    }

    this.loadCategories();

    if (this.movieId) {
      this.loadMovie(this.movieId);
      this.loadMovieActors(this.movieId);
    }
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      }
    });
  }

  loadMovie(id: string): void {
    this.loading = true;
    
    this.movieService.getMovie(id).subscribe({
      next: (movie) => {
        if (movie) {
          this.movieForm.patchValue({
            title: movie.title,
            category_id: movie.category_id,
            image: movie.image,
            description: movie.description
          });
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        alert('Error al cargar la película');
        this.router.navigate(['/movies']);
      }
    });
  }

  loadMovieActors(movieId: string): void {
    this.movieActorService.getActorsByMovie(movieId).subscribe({
      next: (actors) => {
        this.movieActors = actors;
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
            this.router.navigate(['/movies']);
          }
          this.submitting = false;
        }
      });
    } else {
      this.movieService.createMovie(movieData).subscribe({
        next: (result) => {
          if (result) {
            alert('Película creada exitosamente');
            this.router.navigate(['/movies']);
          }
          this.submitting = false;
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/movies']);
  }

  goToNewCategory(): void {
    const currentUrl = this.router.url;
    this.router.navigate(['/categories/new'], { 
      queryParams: { returnUrl: currentUrl } 
    });
  }

  goToAddActor(): void {
    if (this.isEditMode && this.movieId) {
      this.router.navigate(['/actors/select'], { 
        queryParams: { movieId: this.movieId } 
      });
    } else {
      alert('Debes guardar la película primero antes de agregar actores');
    }
  }

  removeActor(actorId: string): void {
    if (!this.movieId) return;

    if (confirm('¿Estás seguro de remover este actor de la película?')) {
      this.movieActorService.removeActorFromMovie(this.movieId, actorId).subscribe({
        next: () => {
          if (this.movieId) {
            this.loadMovieActors(this.movieId);
          }
        }
      });
    }
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

**`movie-form.component.html`:**

```html
<div class="container">
  <h1>{{ isEditMode ? 'Editar Película' : 'Nueva Película' }}</h1>

  @if (loading) {
    <p>Cargando...</p>
  } @else {
    <form [formGroup]="movieForm" (ngSubmit)="onSubmit()">
      <div class="form-group">
        <label>Título *</label>
        <input type="text" formControlName="title" placeholder="Ej: El Padrino" />
        @if (isFieldInvalid('title')) {
          <span class="error">{{ getErrorMessage('title') }}</span>
        }
      </div>

      <div class="form-group">
        <label>URL de la Imagen *</label>
        <input type="text" formControlName="image" placeholder="https://ejemplo.com/imagen.jpg" />
        @if (isFieldInvalid('image')) {
          <span class="error">{{ getErrorMessage('image') }}</span>
        }
      </div>

      <div class="form-group">
        <label>Descripción *</label>
        <textarea formControlName="description" rows="4" placeholder="Sinopsis de la película"></textarea>
        @if (isFieldInvalid('description')) {
          <span class="error">{{ getErrorMessage('description') }}</span>
        }
      </div>

      <div class="form-group">
        <label>Categoría *</label>
        <div class="category-select">
          <select formControlName="category_id">
            <option value="">Selecciona una categoría</option>
            @for (category of categories; track category.id) {
              <option [value]="category.id">{{ category.name }}</option>
            }
          </select>
          <button type="button" class="btn-secondary" (click)="goToNewCategory()">+ Nueva</button>
        </div>
        @if (isFieldInvalid('category_id')) {
          <span class="error">{{ getErrorMessage('category_id') }}</span>
        }
      </div>

      @if (isEditMode && movieActors.length > 0) {
        <div class="form-group">
          <label>Actores</label>
          <div class="actors-list">
            @for (actor of movieActors; track actor.id) {
              <div class="actor-item">
                <span>{{ actor.name }}</span>
                <button type="button" class="btn-remove" (click)="removeActor(actor.id)">✕</button>
              </div>
            }
          </div>
        </div>
      }

      @if (isEditMode) {
        <div class="form-group">
          <button type="button" class="btn-secondary" (click)="goToAddActor()">+ Agregar Actor</button>
        </div>
      }

      <div class="form-actions">
        <button type="button" class="btn-cancel" (click)="onCancel()">Cancelar</button>
        <button type="submit" class="btn-submit" [disabled]="submitting">
          {{ submitting ? 'Guardando...' : (isEditMode ? 'Actualizar' : 'Crear') }}
        </button>
      </div>
    </form>
  }
</div>
```

**`movie-form.component.css`:**

```css
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input, textarea, select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
}

.error {
  color: #f44336;
  font-size: 14px;
  display: block;
  margin-top: 5px;
}

.category-select {
  display: flex;
  gap: 10px;
}

.category-select select {
  flex: 1;
}

.actors-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.actor-item {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #f5f5f5;
  padding: 8px 12px;
  border-radius: 4px;
}

.btn-remove {
  background: none;
  border: none;
  color: #f44336;
  cursor: pointer;
  font-size: 18px;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 30px;
}

.btn-cancel, .btn-submit, .btn-secondary {
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.btn-cancel {
  background-color: #ccc;
  color: #333;
}

.btn-submit {
  background-color: #2196F3;
  color: white;
}

.btn-secondary {
  background-color: #4CAF50;
  color: white;
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
```

### 6.3. Crear el Componente de Formulario de Categorías

```bash
ng generate component components/category-form --standalone
```

**¿Qué hace este componente?**
Un formulario simple para crear categorías. Es más simple que el formulario de películas porque solo tiene un campo.

**Característica especial:**
Usa `queryParams` para recordar de dónde vino el usuario y regresarlo después de crear la categoría. Esto mejora la experiencia de usuario.

**Edita `category-form.component.ts`:**

```typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent implements OnInit {
  categoryForm: FormGroup;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.categoryForm.invalid) {
      return;
    }

    this.submitting = true;
    const categoryData = this.categoryForm.value;

    this.categoryService.createCategory(categoryData).subscribe({
      next: (result) => {
        if (result) {
          alert('Categoría creada exitosamente');
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/movies';
          this.router.navigate([returnUrl]);
        }
        this.submitting = false;
      },
      error: () => {
        alert('Error al crear la categoría');
        this.submitting = false;
      }
    });
  }

  onCancel(): void {
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/movies';
    this.router.navigate([returnUrl]);
  }
}
```

**Edita `category-form.component.html`:**

```html
<div class="container">
  <h1>Nueva Categoría</h1>

  <form [formGroup]="categoryForm" (ngSubmit)="onSubmit()">
    <div class="form-group">
      <label>Nombre de la Categoría *</label>
      <input type="text" formControlName="name" placeholder="Ej: Acción, Drama, Comedia" />
      @if (categoryForm.get('name')?.invalid && categoryForm.get('name')?.touched) {
        <span class="error">El nombre es requerido (mínimo 2 caracteres)</span>
      }
    </div>

    <div class="form-actions">
      <button type="button" class="btn-cancel" (click)="onCancel()">Cancelar</button>
      <button type="submit" class="btn-submit" [disabled]="submitting">
        {{ submitting ? 'Creando...' : 'Crear Categoría' }}
      </button>
    </div>
  </form>
</div>
```

**Edita `category-form.component.css`:**

```css
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
}

.error {
  color: #f44336;
  font-size: 14px;
  display: block;
  margin-top: 5px;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 30px;
}

.btn-cancel, .btn-submit {
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.btn-cancel {
  background-color: #ccc;
  color: #333;
}

.btn-submit {
  background-color: #2196F3;
  color: white;
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
```

### 6.4. Crear el Componente de Formulario de Actores

```bash
ng generate component components/actor-form --standalone
```

**¿Qué hace este componente?**
Permite agregar actores a una película. El usuario puede:
- Seleccionar un actor existente de un dropdown
- O crear un nuevo actor escribiendo su nombre

**Lógica interesante:**
Si el usuario crea un nuevo actor, primero se crea el actor en la base de datos, y luego se crea la relación con la película. Todo esto sucede automáticamente.

**Edita `actor-form.component.ts`:**

```typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { ActorService } from '../../services/actor.service';
import { MovieActorService } from '../../services/movie-actor.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actor-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './actor-form.component.html',
  styleUrl: './actor-form.component.css'
})
export class ActorFormComponent implements OnInit {
  actorForm: FormGroup;
  actors: any[] = [];
  movieId: string | null = null;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private actorService: ActorService,
    private movieActorService: MovieActorService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.actorForm = this.fb.group({
      actor_id: [''],
      new_actor_name: ['']
    });
  }

  ngOnInit(): void {
    this.movieId = this.route.snapshot.queryParams['movieId'];
    this.loadActors();
  }

  loadActors(): void {
    this.actorService.getActors().subscribe({
      next: (actors) => {
        this.actors = actors;
      }
    });
  }

  onSubmit(): void {
    if (!this.movieId) {
      alert('Error: No se especificó la película');
      return;
    }

    const actorId = this.actorForm.get('actor_id')?.value;
    const newActorName = this.actorForm.get('new_actor_name')?.value?.trim();

    if (!actorId && !newActorName) {
      alert('Debes seleccionar un actor o crear uno nuevo');
      return;
    }

    this.submitting = true;

    if (actorId) {
      // Agregar actor existente
      this.movieActorService.addActorToMovie(this.movieId, actorId).subscribe({
        next: (result) => {
          if (result) {
            alert('Actor agregado exitosamente');
            this.router.navigate(['/movies/edit', this.movieId]);
          }
          this.submitting = false;
        }
      });
    } else if (newActorName) {
      // Crear nuevo actor y agregarlo
      this.actorService.createActor({ name: newActorName }).subscribe({
        next: (newActor) => {
          if (newActor) {
            this.movieActorService.addActorToMovie(this.movieId!, newActor.id).subscribe({
              next: (result) => {
                if (result) {
                  alert('Actor creado y agregado exitosamente');
                  this.router.navigate(['/movies/edit', this.movieId]);
                }
                this.submitting = false;
              }
            });
          } else {
            alert('Error al crear el actor');
            this.submitting = false;
          }
        }
      });
    }
  }

  onCancel(): void {
    if (this.movieId) {
      this.router.navigate(['/movies/edit', this.movieId]);
    } else {
      this.router.navigate(['/movies']);
    }
  }
}
```

**Edita `actor-form.component.html`:**

```html
<div class="container">
  <h1>Agregar Actor</h1>

  <form [formGroup]="actorForm" (ngSubmit)="onSubmit()">
    <div class="form-group">
      <label>Seleccionar Actor Existente</label>
      <select formControlName="actor_id">
        <option value="">-- Selecciona un actor --</option>
        @for (actor of actors; track actor.id) {
          <option [value]="actor.id">{{ actor.name }}</option>
        }
      </select>
    </div>

    <div class="divider">
      <span>O</span>
    </div>

    <div class="form-group">
      <label>Crear Nuevo Actor</label>
      <input type="text" formControlName="new_actor_name" placeholder="Nombre del actor" />
    </div>

    <div class="form-actions">
      <button type="button" class="btn-cancel" (click)="onCancel()">Cancelar</button>
      <button type="submit" class="btn-submit" [disabled]="submitting">
        {{ submitting ? 'Agregando...' : 'Agregar Actor' }}
      </button>
    </div>
  </form>
</div>
```

**Edita `actor-form.component.css`:**

```css
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input, select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
}

.divider {
  text-align: center;
  margin: 20px 0;
  position: relative;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: #ddd;
}

.divider span {
  background: white;
  padding: 0 15px;
  position: relative;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 30px;
}

.btn-cancel, .btn-submit {
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.btn-cancel {
  background-color: #ccc;
  color: #333;
}

.btn-submit {
  background-color: #2196F3;
  color: white;
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
```

---

## Paso 7: Configurar las Rutas

### ¿Qué vamos a hacer?

Las rutas definen qué componente se muestra cuando el usuario visita una URL específica. Por ejemplo, cuando alguien va a `/movies`, Angular muestra el `MovieListComponent`.

### Configurar las Rutas

Edita el archivo `src/app/app.routes.ts` y reemplaza su contenido con:

```typescript
import { Routes } from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieFormComponent } from './components/movie-form/movie-form.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { ActorFormComponent } from './components/actor-form/actor-form.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/movies',
    pathMatch: 'full'
  },
  {
    path: 'movies',
    component: MovieListComponent
  },
  {
    path: 'movies/new',
    component: MovieFormComponent
  },
  {
    path: 'movies/edit/:id',
    component: MovieFormComponent
  },
  {
    path: 'categories/new',
    component: CategoryFormComponent
  },
  {
    path: 'actors/select',
    component: ActorFormComponent
  },
  {
    path: '**',
    redirectTo: '/movies'
  }
];
```

**Explicación de las rutas:**

- **`path: ''`**: La ruta raíz (`/`) redirige a `/movies`
- **`path: 'movies'`**: Muestra la lista de películas
- **`path: 'movies/new'`**: Muestra el formulario para crear una película
- **`path: 'movies/edit/:id'`**: El `:id` es un parámetro dinámico. Si vas a `/movies/edit/123`, el componente puede obtener ese `123` para cargar la película correcta
- **`path: '**'`**: Cualquier ruta que no coincida con las anteriores redirige a `/movies` (útil para manejar URLs incorrectas)

**¿Cómo funciona el routing?**
Angular usa el componente `<router-outlet>` (que está en `app.component.html`) para mostrar el componente correspondiente a la ruta actual. Cuando cambias de ruta, Angular destruye el componente anterior y crea el nuevo, sin recargar toda la página (Single Page Application - SPA).

---

## Paso 8: Configurar Variables de Entorno

### ¿Qué vamos a hacer?

Las variables de entorno guardan configuraciones que cambian entre desarrollo y producción. En nuestro caso, guardamos las credenciales de Supabase. Esto es importante porque:
- Mantiene las credenciales organizadas
- Permite usar diferentes bases de datos en desarrollo y producción
- Evita hardcodear valores en el código

### 8.1. Editar environment.ts

Edita el archivo `src/environments/environment.ts` y reemplaza su contenido con:

```typescript
export const environment = {
  production: false,
  supabaseUrl: 'TU_PROJECT_URL_AQUI/rest/v1',
  supabaseKey: 'TU_ANON_KEY_AQUI'
};
```

**Reemplaza los valores:**
- `TU_PROJECT_URL_AQUI`: Pega tu Project URL de Supabase y agrega `/rest/v1` al final
  - Ejemplo: `https://abcdefghijklmnop.supabase.co/rest/v1`
- `TU_ANON_KEY_AQUI`: Pega tu anon public key de Supabase
  - Ejemplo: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

**¿Por qué `/rest/v1`?**
Supabase expone su API REST en la ruta `/rest/v1`. Esta es la URL base para todas las peticiones a las tablas.

### 8.2. Editar environment.prod.ts

Edita el archivo `src/environments/environment.prod.ts` y usa los mismos valores:

```typescript
export const environment = {
  production: true,
  supabaseUrl: 'TU_PROJECT_URL_AQUI/rest/v1',
  supabaseKey: 'TU_ANON_KEY_AQUI'
};
```

**¿Cuándo se usa cada archivo?**
- `environment.ts`: Se usa cuando ejecutas `npm start` (desarrollo)
- `environment.prod.ts`: Se usa cuando ejecutas `npm run build` (producción)

Por ahora, puedes usar los mismos valores en ambos.

---

## Paso 9: Ejecutar la Aplicación

### ¿Qué vamos a hacer?

Finalmente, vamos a iniciar el servidor de desarrollo y ver nuestra aplicación funcionando.

### 9.1. Iniciar el Servidor de Desarrollo

En la terminal, ejecuta:

```bash
npm start
```

**¿Qué hace este comando?**
- Compila tu código TypeScript a JavaScript
- Inicia un servidor web local
- Abre la aplicación en `http://localhost:4200`
- Observa cambios en los archivos y recarga automáticamente

### 9.2. Abrir en el Navegador

La aplicación se abrirá automáticamente en `http://localhost:4200`. Si no se abre automáticamente, abre tu navegador y ve a esa dirección.

### 9.3. Verificar que Todo Funciona

1. Deberías ver la lista de películas (aunque esté vacía)
2. Haz clic en "Nueva Película"
3. Crea una categoría primero (haz clic en "+ Nueva" en el campo de categoría)
4. Completa el formulario y crea tu primera película
5. Edita la película para agregar actores

**Flujo completo:**
1. Lista de películas → 2. Nueva película → 3. Crear categoría → 4. Volver al formulario → 5. Crear película → 6. Editar película → 7. Agregar actores

---

## 🐛 Solución de Problemas Comunes

### Error: "Cannot find module '@angular/core'"

**Causa**: Las dependencias no están instaladas correctamente.

**Solución:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Error: "No se pueden cargar las películas"

**Verifica:**
1. Que ejecutaste el script SQL en Supabase (Paso 2.2)
2. Que las credenciales en `environment.ts` son correctas
3. Que la URL termina en `/rest/v1`
4. Abre la consola del navegador (F12) para ver errores específicos

**¿Cómo verificar?**
Abre la consola del navegador (F12 → Console). Si ves errores de red, probablemente las credenciales están mal. Si ves errores 404, probablemente no ejecutaste el script SQL.

### Error: "CORS" o "Network Error"

**Causa**: Problema con la URL o las credenciales.

**Solución:**
- Asegúrate de que la URL en `environment.ts` termine en `/rest/v1`
- Verifica que no haya espacios o caracteres extra en las credenciales
- Copia las credenciales directamente desde Supabase sin modificarlas

### Las imágenes no se muestran

**Causa**: URL de imagen inválida.

**Solución:**
- Verifica que las URLs de las imágenes empiecen con `http://` o `https://`
- Prueba la URL directamente en el navegador (deberías ver la imagen)
- Usa URLs de imágenes públicas (no requieren autenticación)

### Error al importar modelos

**Nota importante**: Cuando uses `ng generate interface`, el CLI crea archivos sin la extensión `.model.ts`. Si prefieres mantener la convención `.model.ts`, puedes renombrar los archivos después de generarlos, o ajustar las importaciones en los servicios.

Por ejemplo, si generaste `ng generate interface models/movie`, el archivo será `movie.ts`, pero puedes importarlo como:
```typescript
import { Movie } from '../models/movie';
```

---

## ✅ Verificación Final

Tu aplicación está completa cuando puedes:

- [ ] Ver la lista de películas (aunque esté vacía inicialmente)
- [ ] Crear una nueva categoría desde el formulario de películas
- [ ] Crear una nueva película con todos los campos
- [ ] Editar una película existente
- [ ] Agregar actores a una película (después de guardarla)
- [ ] Eliminar una película con confirmación

**Si todas estas funciones trabajan, ¡felicidades! Has creado una aplicación Angular completa con base de datos. 🎉**

---

## 📚 Conceptos Clave que Aprendiste

1. **Componentes**: Piezas reutilizables de la interfaz de usuario
2. **Servicios**: Lógica de negocio y comunicación con APIs
3. **Modelos/Interfaces**: Definición de la estructura de datos
4. **Routing**: Navegación entre diferentes vistas
5. **Formularios Reactivos**: Formularios controlados por código con validaciones
6. **Observables**: Manejo asíncrono de datos con RxJS
7. **CRUD**: Create, Read, Update, Delete - operaciones básicas de base de datos
8. **Relaciones de BD**: Uno a muchos y muchos a muchos

---

**¡Felicidades! Has creado una aplicación Angular completa con base de datos. 🎉**
