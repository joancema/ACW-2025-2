# 📊 Comparación Lado a Lado: Vanilla TS vs React

Este documento muestra el **mismo código** implementado en ambas versiones para que puedas ver las diferencias exactas.

---

## 1. Archivo Principal

### 📁 Vanilla TypeScript: `main.ts`

```typescript
import './style.css'
import { getMovies } from './api/movies'
import { renderMovieCard } from './components/MovieCard'

async function renderBillboard(): Promise<void> {
  const app = document.querySelector<HTMLDivElement>('#app')!
  
  app.innerHTML = '<p class="loading">Cargando cartelera...</p>'
  
  const movies = await getMovies()
  
  if (movies.length === 0) {
    app.innerHTML = '<p class="empty">No hay películas en cartelera</p>'
    return
  }
  
  const cardsHTML = movies.map(movie => renderMovieCard(movie)).join('')
  
  app.innerHTML = `
    <header class="header">
      <h1>Cartelera de Cine</h1>
    </header>
    <main class="billboard">
      ${cardsHTML}
    </main>
  `
}

renderBillboard()
```

### ⚛️ React: `App.tsx`

```typescript
import { useState, useEffect } from 'react'
import { getMovies } from './api/movies'
import { MovieCard } from './components/MovieCard'
import type { Movie } from './types/movie'
import './App.css'

function App() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadMovies() {
      setLoading(true)
      const data = await getMovies()
      setMovies(data)
      setLoading(false)
    }
    loadMovies()
  }, [])

  if (loading) {
    return (
      <div id="app">
        <p className="loading">Cargando cartelera...</p>
      </div>
    )
  }

  if (movies.length === 0) {
    return (
      <div id="app">
        <p className="empty">No hay películas en cartelera</p>
      </div>
    )
  }

  return (
    <div id="app">
      <header className="header">
        <h1>Cartelera de Cine</h1>
      </header>
      <main className="billboard">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </main>
    </div>
  )
}

export default App
```

### 🔍 Diferencias Clave:

| Aspecto | Vanilla | React |
|---------|---------|-------|
| **Variables de estado** | No hay concepto de "estado" | `useState()` para datos reactivos |
| **Carga de datos** | Función `async` ejecutada inmediatamente | `useEffect()` con dependencias |
| **Actualización de UI** | `innerHTML = ...` (reemplaza todo) | React actualiza solo lo necesario |
| **Condicionales** | `if` + `innerHTML` | `if` + `return` JSX |
| **Loop** | `.map().join('')` | `.map()` directo |

---

## 2. Componente MovieCard

### 📁 Vanilla TypeScript: `MovieCard.ts`

```typescript
import type { Movie } from '../types/movie'

export function renderMovieCard(movie: Movie): string {
  return `
    <div class="movie-card">
      <img src="${movie.image}" alt="${movie.title}" class="movie-poster">
      <div class="movie-info">
        <h3 class="movie-title">${movie.title}</h3>
        <span class="movie-genre">${movie.genre}</span>
        <p class="movie-description">${movie.description}</p>
      </div>
    </div>
  `
}
```

### ⚛️ React: `MovieCard.tsx`

```typescript
import type { Movie } from '../types/movie'

interface MovieCardProps {
  movie: Movie
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="movie-card">
      <img 
        src={movie.image} 
        alt={movie.title} 
        className="movie-poster"
      />
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <span className="movie-genre">{movie.genre}</span>
        <p className="movie-description">{movie.description}</p>
      </div>
    </div>
  )
}
```

### 🔍 Diferencias Clave:

| Aspecto | Vanilla | React |
|---------|---------|-------|
| **Tipo de retorno** | `: string` | JSX (implícito) |
| **Sintaxis** | Template literals `` `...` `` | JSX `<div>...</div>` |
| **Variables** | `${movie.title}` | `{movie.title}` |
| **Atributo class** | `class="..."` | `className="..."` |
| **Props** | Parámetro directo | Interface `MovieCardProps` |

---

## 3. Archivos que SON IGUALES

Estos archivos son **exactamente iguales** en ambas versiones:

### ✅ `config/supabase.ts`

```typescript
export const SUPABASE_URL = 'https://mefqiknqtmsrvygeghnw.supabase.co/rest/v1'
export const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
```

### ✅ `types/movie.ts`

```typescript
export interface Movie {
  id: string
  title: string
  image: string
  description: string
  genre: string
}
```

### ✅ `api/movies.ts`

```typescript
import { SUPABASE_URL, SUPABASE_KEY } from '../config/supabase'
import type { Movie } from '../types/movie'

export async function getMovies(): Promise<Movie[]> {
  const response = await fetch(`${SUPABASE_URL}/movies`, {
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`
    }
  })

  if (!response.ok) {
    console.error('Error al obtener películas:', response.statusText)
    return []
  }

  const movies: Movie[] = await response.json()
  return movies
}
```

**🎯 Conclusión:** La lógica de negocio (API, tipos, configuración) **no cambia** con React.

---

## 4. HTML

### 📁 Vanilla TypeScript: `index.html`

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Cartelera de Cine</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

### ⚛️ React: `index.html`

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Cartelera de Cine - React</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### 🔍 Diferencias:

- Vanilla: `<div id="app"></div>` + `main.ts`
- React: `<div id="root"></div>` + `main.tsx`

---

## 5. CSS

### ✅ Los estilos son IDÉNTICOS

Ambos proyectos usan el mismo CSS porque el HTML final generado es el mismo:

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

/* ... etc ... */
```

---

## 6. package.json

### 📁 Vanilla TypeScript

```json
{
  "name": "billboard",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "typescript": "~5.9.3",
    "vite": "^7.2.4"
  }
}
```

### ⚛️ React

```json
{
  "name": "billboard",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.2.0",
    "react-dom": "^19.2.0"
  },
  "devDependencies": {
    "@types/react": "^19.2.5",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^5.1.1",
    "eslint": "^9.39.1",
    "typescript": "~5.9.3",
    "vite": "^7.2.4"
  }
}
```

### 🔍 Diferencias:

- React añade: `react`, `react-dom`, tipos, ESLint, plugin de Vite
- Vanilla: Solo necesita TypeScript y Vite

---

## 7. Estructura de Carpetas

### Ambas versiones tienen la MISMA estructura:

```
src/
├── config/
│   └── supabase.ts      ✅ Igual
├── types/
│   └── movie.ts         ✅ Igual
├── api/
│   └── movies.ts        ✅ Igual
├── components/
│   └── MovieCard.tsx/ts 🔄 Diferente (sintaxis)
├── App.tsx/main.ts      🔄 Diferente (enfoque)
└── styles.css           ✅ Igual
```

---

## 8. Flujo de Ejecución

### 📁 Vanilla TypeScript

```
1. index.html carga main.ts
2. main.ts ejecuta renderBillboard()
3. Muestra "Cargando..."
4. getMovies() hace fetch a Supabase
5. movies.map(renderMovieCard).join('')
6. innerHTML reemplaza todo el contenido
7. Pantalla actualizada
```

### ⚛️ React

```
1. index.html carga main.tsx
2. main.tsx monta <App />
3. App.tsx: useState crea estado inicial
4. App.tsx: useEffect se ejecuta
5. getMovies() hace fetch a Supabase
6. setMovies(data) actualiza estado
7. React detecta cambio y re-renderiza
8. Pantalla actualizada (solo lo necesario)
```

---

## 9. Conceptos Clave

### 📁 Vanilla TypeScript

| Concepto | Descripción |
|----------|-------------|
| **Template Literals** | `` `<div>${variable}</div>` `` |
| **innerHTML** | Reemplaza contenido HTML |
| **querySelector** | Busca elementos en el DOM |
| **Funciones** | Retornan strings de HTML |
| **Imperativo** | Le dices al DOM paso a paso qué hacer |

### ⚛️ React

| Concepto | Descripción |
|----------|-------------|
| **JSX** | `<div>{variable}</div>` |
| **Virtual DOM** | React compara y actualiza eficientemente |
| **Componentes** | Funciones que retornan JSX |
| **useState** | Estado reactivo |
| **useEffect** | Ejecutar código en momentos específicos |
| **Declarativo** | Describes cómo se ve la UI, React la actualiza |

---

## 10. Ventajas y Desventajas

### 📁 Vanilla TypeScript

**✅ Ventajas:**
- Más simple, menos conceptos
- Menos dependencias (bundle pequeño)
- Control total sobre el DOM
- Fácil de debuggear

**❌ Desventajas:**
- Manipulación manual del DOM
- Reemplaza todo el HTML (ineficiente)
- Difícil de escalar
- Sin componentes reutilizables reales

### ⚛️ React

**✅ Ventajas:**
- Actualización eficiente del DOM
- Componentes reutilizables
- Estado reactivo
- Gran ecosistema
- Escalable

**❌ Desventajas:**
- Curva de aprendizaje
- Más dependencias (bundle grande)
- Abstracción (menos control directo)

---

## 11. Tabla Resumen Final

| Característica | Vanilla TS | React |
|----------------|-----------|-------|
| **Dificultad** | ⭐⭐ Fácil | ⭐⭐⭐⭐ Medio |
| **Bundle Size** | ~10KB | ~150KB |
| **Performance** | Buena para apps pequeñas | Excelente para apps grandes |
| **Mantenibilidad** | 😐 Media | 😃 Alta |
| **Reutilización** | 😐 Limitada | 😃 Excelente |
| **Ecosistema** | 🔧 Limitado | 🚀 Enorme |
| **Actualizaciones** | 🐌 Reemplaza todo | ⚡ Solo lo necesario |

---

## 12. ¿Cuándo usar cada uno?

### 📁 Usa Vanilla TypeScript si:

- ✅ Tu app tiene pocas pantallas
- ✅ No necesitas muchas actualizaciones dinámicas
- ✅ Quieres el bundle más pequeño posible
- ✅ Estás aprendiendo los fundamentos
- ✅ Es un proyecto personal simple

### ⚛️ Usa React si:

- ✅ Tu app es compleja (muchas pantallas/componentes)
- ✅ Necesitas actualizaciones frecuentes de la UI
- ✅ Trabajas en equipo
- ✅ Necesitas routing, state management, etc.
- ✅ Es un proyecto profesional

---

## 🎯 Conclusión

**Ambas versiones hacen EXACTAMENTE lo mismo:**
- Consumen la misma API de Supabase
- Muestran las mismas películas
- Tienen el mismo diseño visual

**La diferencia está en CÓMO lo hacen:**
- Vanilla: Manipulación directa y manual del DOM
- React: Componentes reactivos y Virtual DOM

**¿Cuál es mejor?** Depende del contexto. Para una cartelera simple, Vanilla es suficiente. Para una plataforma de streaming completa (Netflix), React es mejor.

**Lo más importante:** Entender ambos enfoques te hace un mejor desarrollador, porque sabes cuándo usar cada herramienta.
