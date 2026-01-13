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
7. [Paso 5: Crear el Servicio de Películas](#paso-5-crear-el-servicio-de-películas)
8. [Paso 6: Crear el Componente MovieCard](#paso-6-crear-el-componente-moviecard)
9. [Paso 7: Actualizar el Componente App](#paso-7-actualizar-el-componente-app)
10. [Paso 8: Agregar los Estilos](#paso-8-agregar-los-estilos)
11. [Paso 9: Ejecutar el proyecto](#paso-9-ejecutar-el-proyecto)
12. [Resumen de diferencias](#resumen-diferencias-clave)
13. [Conceptos de Angular](#conceptos-nuevos-de-angular)
14. [Errores comunes](#errores-comunes)
15. [Próximos pasos](#próximos-pasos)

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
│       └── movie-card.component.ts
├── app.component.ts     # Componente principal
├── app.component.html   # Template principal
├── app.component.css    # Estilos principales
└── app.config.ts        # Configuración
```

**Crear las carpetas:**

```bash
mkdir src/app/models
mkdir src/app/services
mkdir src/app/components
mkdir src/app/components/movie-card
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

## Paso 5: Crear el Servicio de Películas

### ¿Qué es un Servicio en Angular?

En Angular, los **servicios** son clases que:
- Encapsulan lógica de negocio reutilizable
- Se comparten entre componentes
- Se inyectan usando Dependency Injection (DI)
- Son singletons por defecto

**Esto es diferente de React/Vue** donde típicamente usamos funciones simples.

### Crear el archivo `src/app/services/movie.service.ts`

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
// - Se pueden inyectar en cualquier componente

import { Injectable } from '@angular/core';
import { Movie } from '../models/movie';

// ============================================
// CONFIGURACIÓN DE SUPABASE
// ============================================
// Los mismos valores que en React y Vue
const SUPABASE_URL = 'https://TU-PROYECTO.supabase.co/rest/v1';
const SUPABASE_KEY = 'TU-ANON-KEY-AQUI';

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

## Paso 6: Crear el Componente MovieCard

### ¿Qué es un Componente en Angular?

Los componentes en Angular son **clases TypeScript** decoradas con `@Component()`. Tienen:
- **selector**: Cómo se usa en el HTML
- **template**: El HTML del componente
- **styles**: CSS del componente (encapsulado)
- **imports**: Otros componentes/módulos que usa

### Crear el archivo `src/app/components/movie-card/movie-card.component.ts`

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
// - Template y estilos pueden estar en archivos separados

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
  
  // template: El HTML del componente (inline para componentes pequeños)
  template: `
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
  `,
  
  // styles: Estilos del componente (encapsulados por defecto)
  styles: [`
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
  `]
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

  @Input() movie!: Movie;
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

## Paso 7: Actualizar el Componente App

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
// - Lifecycle hooks como métodos de clase (ngOnInit)
// - Template separado del código TypeScript

import { Component, OnInit, inject } from '@angular/core';
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
export class AppComponent implements OnInit {
  // ============================================
  // INYECCIÓN DE DEPENDENCIAS
  // ============================================
  // inject() es la forma moderna de inyectar servicios en Angular 14+
  
  private movieService = inject(MovieService);

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
  // MÉTODO PARA CARGAR PELÍCULAS
  // ============================================

  async loadMovies(): Promise<void> {
    this.loading = true;
    this.movies = await this.movieService.getMovies();
    this.loading = false;
  }
}
```

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

## Paso 8: Agregar los Estilos

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

## Paso 9: Ejecutar el proyecto

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
| **inject()** | Función para inyectar servicios (Angular 14+) |
| **ngOnInit** | Lifecycle hook que se ejecuta al inicializar el componente |
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
    ├── styles.css                    # Estilos globales
    └── app/
        ├── models/
        │   └── movie.ts              # Interface Movie
        ├── services/
        │   └── movie.service.ts      # Servicio de API
        ├── components/
        │   └── movie-card/
        │       └── movie-card.component.ts
        ├── app.component.ts          # Componente principal
        ├── app.component.html        # Template principal
        ├── app.component.css         # Estilos del componente
        └── app.config.ts             # Configuración
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
