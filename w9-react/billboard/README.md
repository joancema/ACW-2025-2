# Cartelera de Cine - Tutorial React

Este tutorial te guiará para crear la **misma aplicación** de cartelera de cine, pero ahora usando **React**. Es ideal para comparar y entender las diferencias entre trabajar con y sin un framework.

## ¿Qué vamos a construir?

La **misma** aplicación que la versión Vanilla TypeScript:
- Se conecta a Supabase (la misma base de datos)
- Obtiene la lista de películas
- Muestra las películas en tarjetas visuales

**Pero ahora con React**, que nos da:
- Manejo automático del DOM
- Re-renderizado eficiente
- Componentes reutilizables
- Hooks para estado y efectos

---

## Comparación: Vanilla TS vs React

| Aspecto | Vanilla TypeScript | React |
|---------|-------------------|-------|
| **Manipulación DOM** | Manual con `innerHTML` | Automática con JSX |
| **Actualización** | Reemplazamos todo el HTML | React actualiza solo lo necesario |
| **Componentes** | Funciones que retornan strings | Funciones que retornan JSX |
| **Estado** | Variables normales | Hooks (`useState`) |
| **Efectos** | Código directo | Hooks (`useEffect`) |
| **Sintaxis** | Template literals | JSX (HTML + JavaScript) |

---

## Tecnologías utilizadas

| Tecnología | Para qué sirve |
|------------|----------------|
| **React** | Framework para construir interfaces de usuario |
| **TypeScript** | JavaScript con tipos |
| **Vite** | Herramienta de desarrollo (la misma en ambos proyectos) |
| **Supabase** | Base de datos en la nube (la misma en ambos) |

---

## Paso 1: Crear el proyecto con Vite

Abre tu terminal y ejecuta:

```bash
npm create vite@latest billboard -- --template react-ts
cd billboard
npm install
```

**Diferencia con Vanilla:**
- Vanilla usa: `--template vanilla-ts`
- React usa: `--template react-ts`

---

## Paso 2: Entender la estructura inicial

Vite con React genera:

```
billboard/
├── index.html          # Página principal (usa <div id="root">)
├── package.json        # Incluye React y ReactDOM
├── tsconfig.json       # Configuración TypeScript
└── src/
    ├── main.tsx        # Punto de entrada (monta React)
    ├── App.tsx         # Componente principal
    ├── App.css         # Estilos del App
    └── index.css       # Estilos globales
```

**Diferencias con Vanilla:**
- Archivos `.tsx` en lugar de `.ts` (TSX = TypeScript + JSX)
- Componente `App.tsx` como base
- `main.tsx` monta React en el DOM

---

## Paso 3: Crear la estructura en capas

**La misma estructura** que en Vanilla TypeScript:

```
src/
├── config/             # Configuración
│   └── supabase.ts
├── types/              # Interfaces
│   └── movie.ts
├── api/                # Conexión con la API
│   └── movies.ts
├── components/         # Componentes visuales (ahora son React)
│   └── MovieCard.tsx   # .tsx en lugar de .ts
├── App.tsx             # Componente principal
├── App.css             # Estilos
├── main.tsx            # Punto de entrada
└── index.css           # Estilos globales
```

Crea las carpetas:

```bash
mkdir src/config
mkdir src/types
mkdir src/api
mkdir src/components
```

---

## Paso 4: Configuración de Supabase

### Crear el archivo `src/config/supabase.ts`

**EXACTAMENTE IGUAL** que en Vanilla TypeScript:

```typescript
// ============================================
// CONFIGURACIÓN DE SUPABASE
// ============================================
// Aquí guardamos los datos de conexión a Supabase.
// Estos valores se obtienen del panel de Supabase > Settings > API

// URL base de la API REST de Supabase
export const SUPABASE_URL = 'https://TU-PROYECTO.supabase.co/rest/v1'

// Clave pública (anon key) para autenticación
export const SUPABASE_KEY = 'TU-ANON-KEY-AQUI'
```

**✅ Sin cambios** - La configuración es idéntica en ambas versiones.

---

## Paso 5: Definir la Interface

### Crear el archivo `src/types/movie.ts`

**EXACTAMENTE IGUAL** que en Vanilla TypeScript:

```typescript
// ============================================
// INTERFACE MOVIE
// ============================================
// Define la estructura de datos de una película.

export interface Movie {
  id: string
  title: string
  image: string
  description: string
  genre: string
}
```

**✅ Sin cambios** - Los tipos son los mismos.

---

## Paso 6: Crear la capa API

### Crear el archivo `src/api/movies.ts`

**EXACTAMENTE IGUAL** que en Vanilla TypeScript:

```typescript
// ============================================
// API DE PELÍCULAS
// ============================================

import { SUPABASE_URL, SUPABASE_KEY } from '../config/supabase'
import type { Movie } from '../types/movie'

// Obtiene todas las películas de Supabase
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

**✅ Sin cambios** - La lógica de API es la misma.

---

## Paso 7: Componente MovieCard (React)

### Crear el archivo `src/components/MovieCard.tsx`

**AQUÍ EMPIEZAN LAS DIFERENCIAS:**

```typescript
// ============================================
// COMPONENTE MOVIE CARD (REACT)
// ============================================

import type { Movie } from '../types/movie'

// Props: parámetros que recibe el componente
interface MovieCardProps {
  movie: Movie
}

// Componente funcional de React
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

### Comparación con Vanilla:

| Vanilla TypeScript | React |
|-------------------|-------|
| `function renderMovieCard(movie: Movie): string` | `function MovieCard({ movie }: MovieCardProps)` |
| Retorna un **string** de HTML | Retorna **JSX** (elementos React) |
| Template literals con `` `...` `` | JSX directo `<div>...</div>` |
| `${movie.title}` | `{movie.title}` |
| `class="..."` | `className="..."` |

---

## Paso 8: Componente App (React)

### Crear/modificar `src/App.tsx`

**AQUÍ ESTÁ LA DIFERENCIA MÁS GRANDE:**

```typescript
// ============================================
// COMPONENTE PRINCIPAL - APP (REACT)
// ============================================

import { useState, useEffect } from 'react'
import { getMovies } from './api/movies'
import { MovieCard } from './components/MovieCard'
import type { Movie } from './types/movie'
import './App.css'

function App() {
  // ============================================
  // ESTADO DEL COMPONENTE
  // ============================================
  
  // Estado para guardar las películas
  const [movies, setMovies] = useState<Movie[]>([])
  
  // Estado para saber si está cargando
  const [loading, setLoading] = useState(true)

  // ============================================
  // EFECTOS (Side Effects)
  // ============================================
  
  useEffect(() => {
    async function loadMovies() {
      setLoading(true)
      const data = await getMovies()
      setMovies(data)
      setLoading(false)
    }

    loadMovies()
  }, []) // [] = ejecutar solo una vez al montar

  // ============================================
  // RENDERIZADO CONDICIONAL
  // ============================================
  
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

  // ============================================
  // RENDERIZADO PRINCIPAL
  // ============================================
  
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

### Comparación detallada con Vanilla:

#### 1. **Manejo de Estado**

**Vanilla TypeScript:**
```typescript
let movies: Movie[] = []  // Variable normal
```

**React:**
```typescript
const [movies, setMovies] = useState<Movie[]>([])
// useState crea un estado reactivo
// movies: el valor actual
// setMovies: función para actualizar el estado
```

#### 2. **Carga de datos**

**Vanilla TypeScript:**
```typescript
async function renderBillboard() {
  app.innerHTML = '<p>Cargando...</p>'
  const movies = await getMovies()
  app.innerHTML = '...' // Reemplazamos todo
}

renderBillboard() // Ejecutamos inmediatamente
```

**React:**
```typescript
useEffect(() => {
  async function loadMovies() {
    setLoading(true)
    const data = await getMovies()
    setMovies(data)  // Actualiza el estado
    setLoading(false)
  }
  loadMovies()
}, []) // Se ejecuta al montar el componente
```

#### 3. **Renderizado de la lista**

**Vanilla TypeScript:**
```typescript
const cardsHTML = movies.map(movie => 
  renderMovieCard(movie)  // Retorna string
).join('')  // Une todos los strings

app.innerHTML = `<main>${cardsHTML}</main>`
```

**React:**
```typescript
{movies.map(movie => (
  <MovieCard key={movie.id} movie={movie} />
  // Retorna componente React
))}
// React maneja la inserción en el DOM
```

---

## Paso 9: Punto de entrada

### Modificar `src/main.tsx`

```typescript
// ============================================
// MAIN - PUNTO DE ENTRADA (REACT)
// ============================================

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

### Comparación con Vanilla:

**Vanilla TypeScript:**
```typescript
import './style.css'
import { renderBillboard } from './billboard'

renderBillboard()  // Llamada directa a función
```

**React:**
```typescript
import App from './App'

createRoot(document.getElementById('root')!).render(
  <App />  // Monta el componente React
)
```

---

## Paso 10: Los Estilos CSS

### `src/App.css`

**EXACTAMENTE IGUALES** que en Vanilla TypeScript:

```css
/* Reset básico */
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
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

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

.loading,
.empty {
  text-align: center;
  padding: 50px;
  font-size: 1.2rem;
  color: #888;
}
```

**✅ Sin cambios** - El CSS es idéntico porque el HTML generado es el mismo.

---

## Paso 11: Ejecutar el proyecto

```bash
npm run dev
```

Abre tu navegador en `http://localhost:5173`

**Nota:** Tanto Vanilla como React usan Vite, así que los comandos y el puerto son los mismos.

---

## Resumen: Diferencias Clave

### ✅ Lo que es IGUAL en ambos proyectos:

1. **Configuración de Supabase** (`config/supabase.ts`)
2. **Interfaces TypeScript** (`types/movie.ts`)
3. **Capa API** (`api/movies.ts`)
4. **Estilos CSS** (mismo diseño visual)
5. **Estructura de carpetas** (misma organización)
6. **Vite como bundler** (misma herramienta de desarrollo)

### 🔄 Lo que es DIFERENTE:

| Aspecto | Vanilla TypeScript | React |
|---------|-------------------|-------|
| **Extensión de archivos** | `.ts` para componentes | `.tsx` para componentes |
| **Componentes** | Funciones que retornan `string` | Funciones que retornan `JSX` |
| **Template** | Template literals `` `...` `` | JSX `<div>...</div>` |
| **Insertar variables** | `${variable}` | `{variable}` |
| **Atributo class** | `class="..."` | `className="..."` |
| **Manipulación DOM** | `innerHTML = '...'` | React maneja automáticamente |
| **Estado** | Variables normales | `useState()` |
| **Efectos** | Código directo | `useEffect()` |
| **Actualización** | Reemplazar todo el HTML | React actualiza solo lo necesario |
| **Renderizado condicional** | `if` + `innerHTML` | `if` + `return` JSX |
| **Listas** | `.map().join('')` | `.map()` directo con `key` |

---

## Conceptos Nuevos de React

| Concepto | Descripción |
|----------|-------------|
| **JSX** | Sintaxis que mezcla HTML con JavaScript |
| **Componente** | Función que retorna JSX |
| **Props** | Parámetros que se pasan a los componentes |
| **useState** | Hook para crear estado reactivo |
| **useEffect** | Hook para ejecutar código cuando algo cambia |
| **key** | Identificador único para elementos de listas |
| **className** | Atributo JSX para clases CSS (en lugar de `class`) |
| **StrictMode** | Modo que ayuda a detectar problemas en desarrollo |

---

## Flujo de Datos - Comparación

### Vanilla TypeScript:

```
main.ts → renderBillboard()
  ↓
api/movies.ts → getMovies()
  ↓
Supabase → retorna datos
  ↓
movies.map(renderMovieCard).join('')
  ↓
innerHTML = '...' (DOM actualizado)
```

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

---

## ¿Cuándo usar cada uno?

### Vanilla TypeScript es mejor para:
- Proyectos pequeños y simples
- Aprender los fundamentos del DOM
- No necesitas re-renderizado frecuente
- Quieres menos dependencias

### React es mejor para:
- Aplicaciones grandes y complejas
- Interfaces que cambian frecuentemente
- Componentes reutilizables
- Ecosistema de herramientas (routing, state management, etc.)
- Desarrollo en equipo

---

## Ventajas de React sobre Vanilla

1. **DOM Virtual**: React solo actualiza lo que cambió, no todo
2. **Componentes Reutilizables**: `<MovieCard />` se puede usar en cualquier lugar
3. **Estado Reactivo**: Cuando cambias el estado, React actualiza automáticamente
4. **Ecosistema**: Miles de librerías compatibles
5. **Developer Experience**: Mejores herramientas de desarrollo

---

## Desventajas de React vs Vanilla

1. **Más complejo**: Curva de aprendizaje más empinada
2. **Más dependencias**: React + ReactDOM + otros
3. **Bundle más grande**: El archivo final es más pesado
4. **Abstracción**: Menos control directo sobre el DOM

---

## Configuración de Supabase

**LA MISMA para ambos proyectos:**

1. Ve a [supabase.com](https://supabase.com)
2. Crea la tabla `movies` con las columnas:
   - `id` (uuid, primary key)
   - `title` (text)
   - `image` (text)
   - `description` (text)
   - `genre` (text)
3. Habilita acceso público en RLS policies
4. Agrega datos de prueba

---

## Errores Comunes

### "React is not defined"
**Causa**: Olvidaste importar React (en versiones antiguas)  
**Solución**: En React 17+, no es necesario importar React en cada archivo

### "Cannot read property 'map' of undefined"
**Causa**: El estado `movies` es undefined  
**Solución**: Inicializa el estado: `useState<Movie[]>([])`

### "Each child in a list should have a unique key"
**Causa**: Olvidaste agregar `key` al mapear  
**Solución**: `{movies.map(movie => <MovieCard key={movie.id} ... />)}`

---

## Próximos Pasos

Ahora que entiendes las diferencias, puedes:

1. **Comparar ambos proyectos lado a lado**
2. **Agregar un formulario** para crear películas
3. **Implementar filtros** por género
4. **Agregar routing** con React Router
5. **Usar Context API** para estado global

---

## Conclusión

Has creado la **misma aplicación** en Vanilla TypeScript y React. Ahora entiendes:

✅ Qué problemas resuelve React  
✅ Cuándo vale la pena usar un framework  
✅ Las diferencias fundamentales entre ambos enfoques  
✅ Que la lógica de negocio (API, tipos, config) puede ser la misma  

**La mejor forma de aprender es comparar ambos proyectos** y ver cómo cada uno resuelve los mismos problemas de manera diferente.

¡Felicidades! Ahora dominas tanto Vanilla TypeScript como React para consumir APIs.
