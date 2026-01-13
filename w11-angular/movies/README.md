# Cartelera de Cine - Tutorial Angular

Este tutorial te guiará para crear la **misma aplicación** de cartelera de cine, pero ahora usando **Angular**. Es ideal para comparar y entender las diferencias entre trabajar con React, Vue y Angular.

## ¿Qué vamos a construir?

La **misma** aplicación que las versiones anteriores:
- Se conecta a Supabase (la misma base de datos)
- Obtiene la lista de películas
- Muestra las películas en tarjetas visuales

**Pero ahora con Angular**, que nos da:
- Manejo automático del DOM
- Re-renderizado eficiente
- Componentes reutilizables
- Inyección de dependencias
- TypeScript nativo

---

## Tabla de Contenidos

1. [Comparación: React vs Vue vs Angular](#comparación-react-vs-vue-vs-angular)
2. [Tecnologías utilizadas](#tecnologías-utilizadas)
3. [Paso 1: Crear el proyecto](#paso-1-crear-el-proyecto-con-angular-cli)
4. [Paso 2: Entender la estructura inicial](#paso-2-entender-la-estructura-inicial)
5. [Paso 3: Crear la estructura en capas](#paso-3-crear-la-estructura-en-capas)
6. [Paso 4: Crear la Interface Movie](#paso-4-crear-la-interface-movie)
7. [Paso 5: Configurar Variables de Entorno](#paso-5-configurar-variables-de-entorno)
8. [Paso 6: Configurar HttpClient](#paso-6-configurar-httpclient)
9. [Paso 7: Crear el Servicio de Películas](#paso-7-crear-el-servicio-de-películas)
10. [Paso 8: Crear el Componente MovieCard](#paso-8-crear-el-componente-moviecard)
11. [Paso 9: Actualizar el Componente App](#paso-9-actualizar-el-componente-app)
12. [Paso 10: Agregar los Estilos](#paso-10-agregar-los-estilos)
13. [Paso 11: Ejecutar el proyecto](#paso-11-ejecutar-el-proyecto)
14. [Resumen de diferencias](#resumen-diferencias-clave)
15. [Conceptos de Angular](#conceptos-nuevos-de-angular)
16. [Errores comunes](#errores-comunes)
17. [Comandos del CLI - Referencia Rápida](#comandos-del-cli---referencia-rápida)
18. [Próximos pasos](#próximos-pasos)

---

## Comparación: React vs Vue vs Angular

| Aspecto | React | Vue | Angular |
|---------|-------|-----|---------|
| **Tipo** | Biblioteca | Framework progresivo | Framework completo |
| **Manipulación DOM** | Automática con JSX | Automática con Template | Automática con Template |
| **Componentes** | Funciones + JSX | Archivos `.vue` | Clases con decoradores |
| **Estado** | Hooks (`useState`) | Composition API (`ref`) | Propiedades de clase |
| **Efectos** | `useEffect` | `onMounted` | `ngOnInit` |
| **Props** | Desestructuración | `defineProps` | `@Input()` |
| **Servicios** | No incluido | No incluido | Inyección de dependencias |
| **TypeScript** | Opcional | Opcional | Nativo |
| **CLI** | Vite | Vite | Angular CLI |

---

## Tecnologías utilizadas

| Tecnología | Para qué sirve |
|------------|----------------|
| **Angular 19** | Framework completo para construir aplicaciones web |
| **TypeScript** | JavaScript con tipos (nativo en Angular) |
| **Angular CLI** | Herramienta de línea de comandos |
| **Supabase** | Base de datos en la nube (la misma en todos) |

---

## Paso 1: Crear el proyecto con Angular CLI

### Instalar Angular CLI (si no lo tienes)

```bash
npm install -g @angular/cli
```

### Crear el proyecto

```bash
ng new movies --style=css --ssr=false --skip-tests
cd movies
```

**Opciones explicadas:**
- `--style=css`: Usar CSS para estilos (también puede ser scss, sass, less)
- `--ssr=false`: Sin Server-Side Rendering (más simple para aprender)
- `--skip-tests`: No generar archivos de prueba

**Diferencia con React/Vue:**
- React usa: `npm create vite@latest billboard -- --template react-ts`
- Vue usa: `npm create vite@latest billboard -- --template vue-ts`
- Angular usa: `ng new movies` (tiene su propio CLI)

---

## Paso 2: Entender la estructura inicial

Angular CLI genera una estructura más compleja que Vite:

```
movies/
├── angular.json          # Configuración del proyecto Angular
├── package.json          # Dependencias
├── tsconfig.json         # Configuración TypeScript
├── src/
│   ├── index.html        # Página principal (<app-root>)
│   ├── main.ts           # Punto de entrada (bootstrapApplication)
│   ├── styles.css        # Estilos globales
│   └── app/
│       ├── app.component.ts      # Componente principal (clase)
│       ├── app.component.html    # Template del componente
│       ├── app.component.css     # Estilos del componente
│       ├── app.config.ts         # Configuración de la app
│       └── app.routes.ts         # Rutas (para routing)
```

**Diferencias clave con React/Vue:**

| Aspecto | React/Vue | Angular |
|---------|-----------|---------|
| **Componentes** | Un archivo `.tsx` o `.vue` | Múltiples archivos: `.ts`, `.html`, `.css` |
| **Punto de entrada** | `main.tsx` | `main.ts` |
| **Configuración** | `vite.config.ts` | `angular.json` |
| **CLI** | Vite | Angular CLI (`ng`) |

---

## Paso 3: Crear la estructura en capas

**La misma estructura conceptual** que en React y Vue:

```
src/app/
├── models/              # Interfaces TypeScript
│   └── movie.ts
├── services/            # Servicios (API, lógica de negocio)
│   └── movie.service.ts
├── components/          # Componentes visuales
│   └── movie-card/
│       ├── movie-card.component.ts      # Lógica
│       ├── movie-card.component.html    # Template
│       └── movie-card.component.css     # Estilos
├── app.component.ts     # Componente principal
├── app.component.html   # Template principal
├── app.component.css    # Estilos principales
└── app.config.ts        # Configuración
```

### 🚀 Usando Angular CLI para generar archivos

**Angular CLI puede generar automáticamente** servicios, componentes y más. Esto es mucho más rápido que crear archivos manualmente:

```bash
# Generar un servicio
ng generate service services/movie
# o abreviado:
ng g s services/movie

# Generar un componente
ng generate component components/movie-card
# o abreviado:
ng g c components/movie-card
```

**Ventajas del CLI:**
- Crea la estructura de archivos correcta automáticamente
- Aplica las convenciones de nomenclatura de Angular
- Configura los decoradores con los valores por defecto
- Ahorra tiempo y evita errores

**Para las interfaces**, como son archivos simples, se pueden crear manualmente o usar:

```bash
# Crear carpeta de modelos
mkdir src/app/models
```

**Nota sobre convenciones de Angular:**
- Las carpetas se nombran en `kebab-case`
- Los archivos siguen el patrón: `nombre.tipo.ts` (ejemplo: `movie.service.ts`)
- Los componentes pueden tener su propia carpeta con múltiples archivos

---

## Paso 4: Crear la Interface Movie

### Crear el archivo `src/app/models/movie.ts`

**EXACTAMENTE IGUAL** que en React y Vue:

```typescript
// ============================================
// INTERFACE MOVIE
// ============================================
// Define la estructura de datos de una película.
// Esto permite que TypeScript valide que estamos
// usando los campos correctos en todo el código.
//
// ✅ IGUAL que en React y Vue - Las interfaces TypeScript
// son independientes del framework.

export interface Movie {
  id: string
  title: string
  image: string
  description: string
  genre: string
}
```

**✅ Sin cambios** - Las interfaces TypeScript son iguales en todos los frameworks.

---

## Paso 5: Configurar Variables de Entorno

### ¿Por qué usar variables de entorno?

Las variables de entorno permiten:
- Separar configuración de desarrollo y producción
- No exponer claves sensibles en el código
- Cambiar configuraciones sin modificar el código

### Crear archivos de entorno

Angular maneja las variables de entorno con archivos específicos:

**Crear `src/environments/environment.ts` (desarrollo):**

```typescript
// ============================================
// VARIABLES DE ENTORNO - DESARROLLO
// ============================================
// Este archivo se usa cuando ejecutas `ng serve`.

export const environment = {
  production: false,
  supabaseUrl: 'https://TU-PROYECTO.supabase.co/rest/v1',
  supabaseKey: 'TU-ANON-KEY-AQUI'
};
```

**Crear `src/environments/environment.prod.ts` (producción):**

```typescript
// ============================================
// VARIABLES DE ENTORNO - PRODUCCIÓN
// ============================================
// Este archivo se usa cuando compilas con `ng build --configuration=production`.

export const environment = {
  production: true,
  supabaseUrl: 'https://TU-PROYECTO-PROD.supabase.co/rest/v1',
  supabaseKey: 'TU-ANON-KEY-PRODUCCION'
};
```

### Cómo funciona

Angular automáticamente usa el archivo correcto según el comando:

```bash
ng serve                              # Usa environment.ts
ng build                              # Usa environment.ts
ng build --configuration=production   # Usa environment.prod.ts
```

**Importante**: Agrega estos archivos a `.gitignore` si contienen datos sensibles:

```
# .gitignore
src/environments/environment.ts
src/environments/environment.prod.ts
```

---

## Paso 6: Configurar HttpClient

### ¿Qué es HttpClient?

`HttpClient` es el cliente HTTP nativo de Angular. Ventajas sobre `fetch`:
- Integrado con el sistema de inyección de dependencias
- Retorna Observables (patrón reactivo)
- Interceptores para modificar peticiones/respuestas
- Mejor manejo de errores
- Testing más fácil

### Habilitar HttpClient en `src/app/app.config.ts`

```typescript
// ============================================
// CONFIGURACIÓN GLOBAL DE LA APLICACIÓN
// ============================================

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    
    // ← Habilita HttpClient para toda la aplicación
    provideHttpClient(withFetch())
  ]
};
```

**Explicación:**
- `provideHttpClient()`: Habilita el servicio HttpClient
- `withFetch()`: Usa la API Fetch nativa del navegador (más moderno)

---

## Paso 7: Crear el Servicio de Películas

### ¿Qué es un Servicio en Angular?

En Angular, los **servicios** son clases que:
- Encapsulan lógica de negocio reutilizable
- Se comparten entre componentes
- Se inyectan usando Dependency Injection (DI)
- Son singletons por defecto
- **Usan HttpClient para peticiones HTTP**

**Esto es diferente de React/Vue** donde típicamente usamos funciones simples con fetch.

### 🚀 Generar el servicio con CLI

```bash
ng generate service services/movie
# o abreviado:
ng g s services/movie
```

Esto genera automáticamente:
- `src/app/services/movie.service.ts` - El servicio con el decorador `@Injectable`
- `src/app/services/movie.service.spec.ts` - Archivo de pruebas (si no usaste `--skip-tests`)

### Modificar el archivo `src/app/services/movie.service.ts`

Después de generarlo con el CLI, modifica el contenido:

```typescript
// ============================================
// SERVICIO DE PELÍCULAS (ANGULAR)
// ============================================
// En Angular, los servicios son clases decoradas con @Injectable()
// que encapsulan la lógica de negocio y comunicación con APIs.
//
// DIFERENCIAS CON REACT/VUE:
// - Angular usa el patrón de inyección de dependencias
// - Los servicios son singletons por defecto
// - Usa HttpClient en lugar de fetch
// - Retorna Observables en lugar de Promises

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Movie } from '../models/movie';
import { environment } from '../../environments/environment';

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
    return this.http.get<Movie[]>(`${this.apiUrl}/movies`, { headers })
      .pipe(
        // Manejo de errores con operadores RxJS
        catchError(error => {
          console.error('Error al obtener películas:', error);
          return of([]); // Retorna array vacío en caso de error
        })
      );
  }
}
```

### ¿Qué son los Observables?

Los **Observables** son como Promises, pero más potentes:

| Característica | Promise | Observable |
|----------------|---------|------------|
| **Valores** | Un solo valor | Múltiples valores en el tiempo |
| **Cancelable** | No | Sí (unsubscribe) |
| **Lazy** | Se ejecuta inmediatamente | Se ejecuta al suscribirse |
| **Operadores** | then/catch | pipe, map, filter, etc. |

**Ejemplo de conversión:**

```typescript
// Con Promise (React/Vue)
const movies = await getMovies();

// Con Observable (Angular)
this.service.getMovies().subscribe(movies => {
  // usar movies aquí
});
```

### Comparación con React/Vue

| Aspecto | React/Vue | Angular |
|---------|-----------|---------|
| **Organización** | Función exportada | Clase con decorador |
| **Reutilización** | Import directo | Inyección de dependencias |
| **Estado global** | Necesita Context/Pinia | Singleton por defecto |
| **Testing** | Mock manual | Inyección de mocks |

**Ejemplo de la misma lógica:**

```typescript
// React/Vue (función simple)
export async function getMovies(): Promise<Movie[]> {
  const response = await fetch(...)
  return response.json()
}

// Angular (clase con decorador)
@Injectable({ providedIn: 'root' })
export class MovieService {
  async getMovies(): Promise<Movie[]> {
    const response = await fetch(...)
    return response.json()
  }
}
```

---

## Paso 8: Crear el Componente MovieCard

### ¿Qué es un Componente en Angular?

Los componentes en Angular son **clases TypeScript** decoradas con `@Component()`. Tienen:
- **selector**: Cómo se usa en el HTML
- **templateUrl**: Archivo HTML del componente
- **styleUrl**: Archivo CSS del componente (encapsulado)
- **imports**: Otros componentes/módulos que usa

### 🚀 Generar el componente con CLI

```bash
ng generate component components/movie-card
# o abreviado:
ng g c components/movie-card
```

Esto genera automáticamente **3 archivos**:

```
src/app/components/movie-card/
├── movie-card.component.ts      # Lógica del componente
├── movie-card.component.html    # Template HTML
├── movie-card.component.css     # Estilos CSS
└── movie-card.component.spec.ts # Pruebas (si no usaste --skip-tests)
```

**Esta es la forma estándar de Angular** - cada componente tiene sus archivos separados, lo que facilita la organización y el mantenimiento.

### Modificar el archivo `src/app/components/movie-card/movie-card.component.ts`

Después de generarlo con el CLI, modifica el contenido:

```typescript
// ============================================
// COMPONENTE MOVIE CARD (ANGULAR)
// ============================================
// Este componente recibe los datos de una película
// y los muestra en una tarjeta visual.
//
// DIFERENCIAS CON REACT/VUE:
// - Angular usa decoradores (@Component, @Input)
// - Los componentes son clases TypeScript
// - Las props se definen con @Input()
// - Template y estilos están en archivos separados

import { Component, Input } from '@angular/core';
import { Movie } from '../../models/movie';

@Component({
  // ============================================
  // METADATOS DEL COMPONENTE
  // ============================================
  
  // selector: Cómo se usa el componente en HTML
  // Equivalente a: <MovieCard /> en React/Vue
  selector: 'app-movie-card',
  
  // standalone: true permite usar el componente sin módulos
  // (característica moderna de Angular 14+)
  standalone: true,
  
  // imports: Otros componentes/módulos que usa este componente
  imports: [],
  
  // templateUrl: Archivo HTML separado (generado por el CLI)
  templateUrl: './movie-card.component.html',
  
  // styleUrl: Archivo CSS separado (generado por el CLI)
  styleUrl: './movie-card.component.css'
})
export class MovieCardComponent {
  // ============================================
  // INPUT: PROPS DEL COMPONENTE
  // ============================================
  // @Input() define una propiedad que se puede pasar desde el padre
  //
  // Comparación:
  // React:  function MovieCard({ movie }: { movie: Movie })
  // Vue:    defineProps<{ movie: Movie }>()
  // Angular: @Input() movie!: Movie
  //
  // El ! indica que TypeScript debe confiar en que
  // siempre se pasará un valor (required input)

  @Input() movie!: Movie;
}
```

### Crear el template `src/app/components/movie-card/movie-card.component.html`

```html
<!-- ============================================
     TEMPLATE DEL COMPONENTE MOVIE CARD
     ============================================
     DIFERENCIAS CON REACT/VUE:
     - Binding de propiedades: [src]="movie.image"
       React: src={movie.image}
       Vue: :src="movie.image"
     - Interpolación: {{ movie.title }}
       React: {movie.title}
       Vue: {{ movie.title }}
     - class normal (igual que Vue, diferente de React className)
-->

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

### Crear los estilos `src/app/components/movie-card/movie-card.component.css`

```css
/* ============================================
   ESTILOS DEL COMPONENTE MOVIE CARD
   ============================================
   Angular encapsula los estilos por defecto,
   así que estos estilos NO afectan otros componentes.
*/

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

### Comparación de Props/Inputs

| Framework | Definición de Props |
|-----------|---------------------|
| **React** | `function MovieCard({ movie }: { movie: Movie })` |
| **Vue** | `defineProps<{ movie: Movie }>()` |
| **Angular** | `@Input() movie!: Movie;` |

### Comparación de Template/JSX

| Framework | Binding de atributos | Interpolación |
|-----------|---------------------|---------------|
| **React** | `src={movie.image}` | `{movie.title}` |
| **Vue** | `:src="movie.image"` | `{{ movie.title }}` |
| **Angular** | `[src]="movie.image"` | `{{ movie.title }}` |

---

## Paso 9: Actualizar el Componente App

### Modificar `src/app/app.component.ts`

```typescript
// ============================================
// COMPONENTE PRINCIPAL - APP (ANGULAR)
// ============================================
// Este es el componente raíz que orquesta toda la aplicación.
//
// DIFERENCIAS CON REACT/VUE:
// - Angular usa decoradores (@Component)
// - Inyección de dependencias para servicios
// - Lifecycle hooks como métodos de clase (ngOnInit, ngOnDestroy)
// - Trabaja con Observables (patrón reactivo)

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieService } from './services/movie.service';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { Movie } from './models/movie';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MovieCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  // ============================================
  // INYECCIÓN DE DEPENDENCIAS
  // ============================================
  // MovieService se inyecta automáticamente por Angular
  
  private subscription?: Subscription;

  // ============================================
  // ESTADO DEL COMPONENTE
  // ============================================
  // En Angular, el estado son propiedades de la clase.
  //
  // Comparación:
  // React:   const [movies, setMovies] = useState<Movie[]>([])
  // Vue:     const movies = ref<Movie[]>([])
  // Angular: movies: Movie[] = []
  
  movies: Movie[] = [];
  loading = true;

  // Constructor: Se ejecuta cuando se crea la instancia
  constructor(private movieService: MovieService) {}

  // ============================================
  // LIFECYCLE HOOK: ngOnInit
  // ============================================
  // Se ejecuta cuando el componente se inicializa.
  //
  // Comparación:
  // React:   useEffect(() => { loadMovies() }, [])
  // Vue:     onMounted(() => { loadMovies() })
  // Angular: ngOnInit() { this.loadMovies() }

  ngOnInit(): void {
    this.loadMovies();
  }

  // ============================================
  // LIFECYCLE HOOK: ngOnDestroy
  // ============================================
  // Se ejecuta cuando el componente se destruye.
  // Es importante cancelar las suscripciones para evitar memory leaks.

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // ============================================
  // MÉTODO PARA CARGAR PELÍCULAS
  // ============================================
  // Usa Observables (patrón reactivo de Angular)
  //
  // Comparación:
  // React/Vue: async loadMovies() { const data = await getMovies(); setMovies(data) }
  // Angular:   loadMovies() { this.service.getMovies().subscribe(data => this.movies = data) }

  loadMovies(): void {
    this.loading = true;
    
    // subscribe() es como .then() en Promises
    // Pero con más control: next, error, complete
    this.subscription = this.movieService.getMovies().subscribe({
      // next: Se ejecuta cuando llegan los datos
      next: (data) => {
        this.movies = data;
        this.loading = false;
      },
      
      // error: Se ejecuta si hay un error
      error: (error) => {
        console.error('Error al cargar películas:', error);
        this.loading = false;
      },
      
      // complete: Se ejecuta cuando el Observable termina (opcional)
      complete: () => {
        console.log('Carga de películas completada');
      }
    });
  }
}
```

### Diferencias clave con React/Vue

| Aspecto | React/Vue | Angular |
|---------|-----------|---------|
| **Petición HTTP** | `await fetch()` o `await axios.get()` | `http.get().subscribe()` |
| **Tipo de retorno** | Promise | Observable |
| **Manejo de datos** | `setMovies(data)` o `movies.value = data` | `this.movies = data` |
| **Cancelación** | AbortController | `unsubscribe()` |
| **Cleanup** | useEffect return o onUnmounted | `ngOnDestroy()` |

### Modificar `src/app/app.component.html`

```html
<!-- ============================================
     TEMPLATE DEL COMPONENTE PRINCIPAL (ANGULAR)
     ============================================
-->

<div id="app">
  <!-- ============================================
       RENDERIZADO CONDICIONAL
       ============================================
       Angular 17+ usa la nueva sintaxis @if/@else
       Equivalente a:
       - React: {loading && <p>...</p>}
       - Vue:   <p v-if="loading">...</p>
  -->
  
  @if (loading) {
    <p class="loading">Cargando cartelera...</p>
  } @else if (movies.length === 0) {
    <p class="empty">No hay películas en cartelera</p>
  } @else {
    <header class="header">
      <h1>Cartelera de Cine</h1>
    </header>
    
    <main class="billboard">
      <!-- ============================================
           ITERACIÓN CON @for
           ============================================
           Angular 17+ usa @for en lugar de *ngFor.
           
           Comparación:
           - React: {movies.map(movie => <MovieCard key={movie.id} />)}
           - Vue:   <MovieCard v-for="movie in movies" :key="movie.id" />
           - Angular: @for (movie of movies; track movie.id) { }
      -->
      @for (movie of movies; track movie.id) {
        <app-movie-card [movie]="movie" />
      }
    </main>
  }
</div>
```

### Comparación de Renderizado Condicional

| Framework | Sintaxis |
|-----------|----------|
| **React** | `{loading ? <Loading /> : <Content />}` |
| **Vue** | `<Loading v-if="loading" />` `<Content v-else />` |
| **Angular** | `@if (loading) { } @else { }` |

### Comparación de Iteración

| Framework | Sintaxis |
|-----------|----------|
| **React** | `{movies.map(m => <Card key={m.id} movie={m} />)}` |
| **Vue** | `<Card v-for="m in movies" :key="m.id" :movie="m" />` |
| **Angular** | `@for (m of movies; track m.id) { <Card [movie]="m" /> }` |

---

## Paso 10: Agregar los Estilos

### Estilos globales: `src/styles.css`

```css
/* ============================================
   ESTILOS GLOBALES (ANGULAR)
   ============================================
   Estos estilos aplican a toda la aplicación.
   Son los mismos que en React y Vue.
*/

/* Reset básico */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Fuente y colores base */
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #1a1a2e;
  color: #eee;
  min-height: 100vh;
}

/* Contenedor principal */
#app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
```

### Estilos del componente App: `src/app/app.component.css`

```css
/* ============================================
   ESTILOS DEL COMPONENTE APP
   ============================================ */

.header {
  text-align: center;
  padding: 30px 0;
  border-bottom: 2px solid #e94560;
  margin-bottom: 30px;
}

.header h1 {
  font-size: 2.5rem;
  color: #e94560;
}

.billboard {
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

**Nota sobre estilos en Angular:**
- Los estilos definidos en `app.component.css` están **encapsulados** por defecto
- Solo afectan al componente donde se definen
- Los estilos en `styles.css` son **globales**
- Esto es diferente de React/Vue donde los estilos son globales por defecto

---

## Paso 11: Ejecutar el proyecto

```bash
ng serve
```

Abre tu navegador en `http://localhost:4200`

**Diferencias en comandos:**

| Framework | Comando | Puerto |
|-----------|---------|--------|
| **React** | `npm run dev` | 5173 |
| **Vue** | `npm run dev` | 5173 |
| **Angular** | `ng serve` | 4200 |

---

## Resumen: Diferencias Clave

### ✅ Lo que es IGUAL en todos los proyectos:

1. **Interfaces TypeScript** (`models/movie.ts`)
2. **Lógica de API** (fetch a Supabase)
3. **Estilos CSS** (mismo diseño visual)
4. **Estructura de carpetas** (misma organización conceptual)
5. **Resultado final** (misma aplicación)

### 🔄 Lo que es DIFERENTE:

| Aspecto | React | Vue | Angular |
|---------|-------|-----|---------|
| **Extensión** | `.tsx` | `.vue` | `.ts` + `.html` + `.css` |
| **Componentes** | Funciones | SFC | Clases + Decoradores |
| **Props** | Desestructuración | `defineProps` | `@Input()` |
| **Estado** | `useState()` | `ref()` | Propiedades de clase |
| **Lifecycle** | `useEffect()` | `onMounted()` | `ngOnInit()` |
| **Servicios** | Funciones sueltas | Funciones sueltas | Clases inyectables |
| **Binding** | `src={value}` | `:src="value"` | `[src]="value"` |
| **Condicionales** | Operador ternario | `v-if` | `@if` |
| **Loops** | `.map()` | `v-for` | `@for` |
| **CLI** | Vite | Vite | Angular CLI |

---

## Conceptos Nuevos de Angular

| Concepto | Descripción |
|----------|-------------|
| **Decoradores** | Funciones que modifican clases (`@Component`, `@Injectable`, `@Input`) |
| **Standalone** | Componentes que no necesitan módulos (Angular 14+) |
| **Inyección de dependencias** | Sistema para compartir servicios entre componentes |
| **HttpClient** | Cliente HTTP nativo de Angular (reemplaza fetch) |
| **Observables** | Patrón reactivo para manejar datos asíncronos (RxJS) |
| **subscribe()** | Método para escuchar valores de un Observable |
| **pipe()** | Operador para transformar datos en Observables |
| **environment** | Archivos para variables de entorno (dev/prod) |
| **ngOnInit** | Lifecycle hook que se ejecuta al inicializar el componente |
| **ngOnDestroy** | Lifecycle hook que se ejecuta al destruir el componente |
| **@Input()** | Decorador para definir props que vienen del padre |
| **@Output()** | Decorador para definir eventos que van al padre |
| **Property binding** | `[property]="value"` para binding unidireccional |
| **Interpolación** | `{{ variable }}` para mostrar valores en el template |
| **@if/@for** | Nueva sintaxis de control de flujo (Angular 17+) |
| **track** | Similar a `key` en React/Vue, optimiza el rendering |

---

## Flujo de Datos - Comparación

### React:

```
main.tsx → monta <App />
  ↓
App.tsx → useEffect ejecuta loadMovies()
  ↓
api/movies.ts → getMovies()
  ↓
Supabase → retorna datos
  ↓
setMovies(data) → actualiza estado
  ↓
React re-renderiza automáticamente
  ↓
movies.map(<MovieCard />) → componentes
  ↓
React actualiza DOM eficientemente
```

### Vue:

```
main.ts → monta App.vue
  ↓
App.vue → onMounted ejecuta loadMovies()
  ↓
api/movies.ts → getMovies()
  ↓
Supabase → retorna datos
  ↓
movies.value = data → actualiza ref
  ↓
Vue re-renderiza automáticamente
  ↓
v-for crea componentes → <MovieCard />
  ↓
Vue actualiza DOM eficientemente
```

### Angular:

```
main.ts → bootstrapApplication(AppComponent)
  ↓
AppComponent → ngOnInit ejecuta loadMovies()
  ↓
MovieService.getMovies() (inyectado)
  ↓
Supabase → retorna datos
  ↓
this.movies = data → actualiza propiedad
  ↓
Angular detecta cambio y re-renderiza
  ↓
@for crea componentes → <app-movie-card />
  ↓
Angular actualiza DOM eficientemente
```

---

## ¿Cuándo usar cada uno?

### React es mejor para:
- Ecosistema más grande (más librerías)
- Desarrollo móvil (React Native)
- Equipos con experiencia en React
- Proyectos que necesitan flexibilidad

### Vue es mejor para:
- Curva de aprendizaje más suave
- Proyectos que empiezan pequeños
- Separación clara de template/lógica/estilos
- Documentación en español completa

### Angular es mejor para:
- Aplicaciones empresariales grandes
- Equipos que prefieren estructura rígida
- Proyectos que necesitan todo incluido
- TypeScript obligatorio desde el inicio
- Inyección de dependencias nativa

---

## Ventajas de Angular

1. **Todo incluido**: Routing, HTTP client, forms, testing
2. **TypeScript nativo**: No necesita configuración adicional
3. **Inyección de dependencias**: Facilita testing y modularidad
4. **CLI potente**: Genera código, componentes, servicios
5. **Estructura clara**: Convenciones estrictas
6. **Soporte empresarial**: Mantenido por Google

---

## Desventajas de Angular

1. **Curva de aprendizaje**: Más conceptos que aprender
2. **Verboso**: Más código para lo mismo
3. **Múltiples archivos**: Un componente puede tener 3-4 archivos
4. **Decoradores**: Sintaxis poco familiar al principio
5. **Ecosistema cerrado**: Menos librerías de terceros

---

## Configuración de Supabase

**LA MISMA para todos los proyectos:**

1. Ve a [supabase.com](https://supabase.com)
2. Crea o usa tu proyecto existente
3. Crea la tabla `movies` con las columnas:
   - `id` (uuid, primary key)
   - `title` (text)
   - `image` (text)
   - `description` (text)
   - `genre` (text)
4. Habilita acceso público en RLS policies
5. Copia los valores de Settings > API:
   - Project URL
   - anon key

---

## Errores Comunes

### "Property 'movie' has no initializer"
**Causa**: TypeScript requiere inicialización de propiedades  
**Solución**: Usar `!` para indicar que siempre se pasará: `@Input() movie!: Movie`

### "Can't bind to 'movie' since it isn't a known property"
**Causa**: No importaste el componente en `imports`  
**Solución**: Agregar `MovieCardComponent` al array `imports` del componente padre

### "No provider for MovieService"
**Causa**: El servicio no está correctamente configurado  
**Solución**: Asegúrate de tener `@Injectable({ providedIn: 'root' })`

### "Template parse errors"
**Causa**: Error de sintaxis en el template  
**Solución**: Verificar que uses `@if`/`@for` (Angular 17+) o `*ngIf`/`*ngFor` (versiones anteriores)

### "Cannot find module"
**Causa**: Path de import incorrecto  
**Solución**: Verificar que las rutas sean correctas: `'../models/movie'`

---

## Estructura Final del Proyecto

```
movies/
├── angular.json
├── package.json
├── tsconfig.json
└── src/
    ├── index.html
    ├── main.ts
    ├── styles.css                              # Estilos globales
    ├── environments/                           # ← Variables de entorno
    │   ├── environment.ts                      # Desarrollo
    │   └── environment.prod.ts                 # Producción
    └── app/
        ├── models/
        │   └── movie.ts                        # Interface Movie
        ├── services/
        │   └── movie.service.ts                # Servicio con HttpClient
        ├── components/
        │   └── movie-card/
        │       ├── movie-card.component.ts     # Lógica del componente
        │       ├── movie-card.component.html   # Template HTML
        │       └── movie-card.component.css    # Estilos CSS
        ├── app.component.ts                    # Componente principal
        ├── app.component.html                  # Template principal
        ├── app.component.css                   # Estilos del componente
        ├── app.config.ts                       # Configuración (con HttpClient)
        └── app.routes.ts                       # Rutas
```

---

## Comandos del CLI - Referencia Rápida

Angular CLI es una herramienta poderosa. Aquí están los comandos más usados:

### Crear proyecto

```bash
ng new nombre-proyecto                    # Crear nuevo proyecto
ng new nombre-proyecto --style=scss       # Con SCSS
ng new nombre-proyecto --skip-tests       # Sin archivos de prueba
ng new nombre-proyecto --ssr=false        # Sin Server-Side Rendering
```

### Generar archivos

```bash
# Componentes
ng generate component nombre              # Genera componente con archivos separados
ng g c nombre                             # Abreviado
ng g c nombre --inline-template           # Template en el .ts
ng g c nombre --inline-style              # Estilos en el .ts
ng g c nombre --skip-tests                # Sin archivo de pruebas
ng g c carpeta/nombre                     # En una subcarpeta

# Servicios
ng generate service nombre                # Genera servicio
ng g s nombre                             # Abreviado
ng g s carpeta/nombre                     # En una subcarpeta

# Otros
ng generate interface nombre              # Genera interface
ng generate pipe nombre                   # Genera pipe
ng generate directive nombre              # Genera directiva
ng generate guard nombre                  # Genera guard
```

### Ejecutar y compilar

```bash
ng serve                                  # Servidor de desarrollo (localhost:4200)
ng serve --port 3000                      # En puerto específico
ng serve --open                           # Abre el navegador automáticamente
ng build                                  # Compila para producción
ng build --configuration=production       # Compila optimizado
```

### Ver ayuda

```bash
ng help                                   # Ayuda general
ng generate --help                        # Ayuda de generate
ng g c --help                             # Ayuda de componente
```

---

## Próximos Pasos

Ahora que entiendes las diferencias, puedes:

1. **Comparar los cuatro proyectos** (Vanilla, React, Vue, Angular)
2. **Agregar un formulario** para crear películas
3. **Implementar filtros** por género
4. **Agregar routing** con Angular Router
5. **Usar HttpClient** de Angular en lugar de fetch
6. **Agregar signals** (nuevo sistema reactivo de Angular 16+)

---

## Conclusión

Has creado la **misma aplicación** en Vanilla TypeScript, React, Vue y Angular. Ahora entiendes:

✅ Qué problemas resuelve Angular  
✅ Las diferencias entre React, Vue y Angular  
✅ Cuándo vale la pena usar cada framework  
✅ Que la lógica de negocio (API, tipos) puede ser la misma  
✅ Cómo Angular estructura las aplicaciones con servicios y componentes

**La mejor forma de aprender es comparar los cuatro proyectos** y ver cómo cada uno resuelve los mismos problemas de manera diferente.

¡Felicidades! Ahora dominas Vanilla TypeScript, React, Vue y Angular para consumir APIs.
