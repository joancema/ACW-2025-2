# 📊 Comparación Lado a Lado: React vs Vue

Este documento muestra el **mismo código** implementado en ambas versiones para que puedas ver las diferencias exactas.

---

## 1. Archivo Principal

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

### 💚 Vue: `App.vue`

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getMovies } from './api/movies'
import MovieCard from './components/MovieCard.vue'
import type { Movie } from './types/movie'
import './App.css'

const movies = ref<Movie[]>([])
const loading = ref(true)

async function loadMovies() {
  loading.value = true
  const data = await getMovies()
  movies.value = data
  loading.value = false
}

onMounted(() => {
  loadMovies()
})
</script>

<template>
  <div id="app">
    <p v-if="loading" class="loading">Cargando cartelera...</p>

    <p v-else-if="movies.length === 0" class="empty">
      No hay películas en cartelera
    </p>

    <template v-else>
      <header class="header">
        <h1>Cartelera de Cine</h1>
      </header>
      <main class="billboard">
        <MovieCard 
          v-for="movie in movies" 
          :key="movie.id" 
          :movie="movie" 
        />
      </main>
    </template>
  </div>
</template>
```

### 🔍 Diferencias Clave:

| Aspecto | React | Vue |
|---------|-------|-----|
| **Estructura** | Todo en JavaScript/JSX | Template separado de lógica |
| **Estado** | `useState()` | `ref()` |
| **Acceso al estado** | `movies` | `movies.value` (en JS), `movies` (en template) |
| **Actualizar estado** | `setMovies(data)` | `movies.value = data` |
| **Lifecycle** | `useEffect(() => {}, [])` | `onMounted(() => {})` |
| **Condicionales** | `if` + `return` JSX | `v-if`, `v-else-if`, `v-else` |
| **Listas** | `.map()` | `v-for` |
| **Atributo class** | `className` | `class` |

---

## 2. Componente MovieCard

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

### 💚 Vue: `MovieCard.vue`

```vue
<script setup lang="ts">
import type { Movie } from '../types/movie'

defineProps<{
  movie: Movie
}>()
</script>

<template>
  <div class="movie-card">
    <img 
      :src="movie.image" 
      :alt="movie.title" 
      class="movie-poster"
    />
    <div class="movie-info">
      <h3 class="movie-title">{{ movie.title }}</h3>
      <span class="movie-genre">{{ movie.genre }}</span>
      <p class="movie-description">{{ movie.description }}</p>
    </div>
  </div>
</template>
```

### 🔍 Diferencias Clave:

| Aspecto | React | Vue |
|---------|-------|-----|
| **Estructura** | Todo en JSX | Template + Script separados |
| **Props** | Interface + desestructuración | `defineProps<T>()` |
| **Template** | JSX | HTML puro |
| **Variables** | `{movie.title}` | `{{ movie.title }}` |
| **Atributo class** | `className="..."` | `class="..."` |
| **Binding dinámico** | `src={movie.image}` | `:src="movie.image"` |

---

## 3. Archivos que SON IGUALES

Estos archivos son **exactamente iguales** en todas las versiones (Vanilla, React, Vue):

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

**🎯 Conclusión:** La lógica de negocio (API, tipos, configuración) **no cambia** entre frameworks.

---

## 4. Punto de Entrada

### ⚛️ React: `main.tsx`

```typescript
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

### 💚 Vue: `main.ts`

```typescript
import { createApp } from 'vue'
import './index.css'
import App from './App.vue'

createApp(App).mount('#app')
```

### 🔍 Diferencias:

| Aspecto | React | Vue |
|---------|-------|-----|
| **Función de montaje** | `createRoot().render()` | `createApp().mount()` |
| **StrictMode** | Incluido | No necesario |
| **Elemento raíz** | `#root` | `#app` |
| **Extensión del App** | `.tsx` | `.vue` |

---

## 5. HTML

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

### 💚 Vue: `index.html`

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Cartelera de Cine - Vue</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

### 🔍 Diferencias:

- React: `<div id="root"></div>` + `main.tsx`
- Vue: `<div id="app"></div>` + `main.ts`

---

## 6. CSS

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

## 7. package.json

### ⚛️ React

```json
{
  "name": "billboard",
  "dependencies": {
    "react": "^19.2.0",
    "react-dom": "^19.2.0"
  },
  "devDependencies": {
    "@types/react": "^19.2.5",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^5.1.1",
    "typescript": "~5.9.3",
    "vite": "^7.2.4"
  }
}
```

### 💚 Vue

```json
{
  "name": "billboard",
  "dependencies": {
    "vue": "^3.5.24"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^6.0.1",
    "typescript": "~5.9.3",
    "vite": "^7.2.4",
    "vue-tsc": "^3.1.4"
  }
}
```

### 🔍 Diferencias:

- React: Necesita `react` + `react-dom` + tipos
- Vue: Solo necesita `vue` + plugin de Vite
- Vue: Usa `vue-tsc` para type checking

---

## 8. Estructura de Carpetas

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
│   └── MovieCard        🔄 Diferente (sintaxis)
├── App                  🔄 Diferente (enfoque)
└── styles.css           ✅ Igual
```

---

## 9. Flujo de Ejecución

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

### 💚 Vue

```
1. index.html carga main.ts
2. main.ts monta App.vue
3. App.vue: ref() crea estado reactivo
4. App.vue: onMounted se ejecuta
5. getMovies() hace fetch a Supabase
6. movies.value = data actualiza ref
7. Vue detecta cambio y re-renderiza
8. Pantalla actualizada (solo lo necesario)
```

---

## 10. Conceptos Clave

### ⚛️ React

| Concepto | Descripción |
|----------|-------------|
| **JSX** | `<div>{variable}</div>` |
| **useState** | Hook para estado reactivo |
| **useEffect** | Hook para efectos secundarios |
| **Props** | Interface + desestructuración |
| **className** | Atributo para clases CSS |

### 💚 Vue

| Concepto | Descripción |
|----------|-------------|
| **Template** | `<div>{{ variable }}</div>` |
| **ref()** | Función para estado reactivo |
| **onMounted** | Hook de ciclo de vida |
| **defineProps** | Macro para definir props |
| **class** | Atributo normal para clases CSS |
| **Directivas** | `v-if`, `v-for`, `v-bind`, etc. |

---

## 11. Sintaxis Detallada

### Variables en Templates

```typescript
// React
<h1>{title}</h1>

// Vue
<h1>{{ title }}</h1>
```

### Clases CSS

```typescript
// React
<div className="card">

// Vue
<div class="card">
```

### Binding Dinámico

```typescript
// React
<img src={movie.image} alt={movie.title} />

// Vue
<img :src="movie.image" :alt="movie.title" />
```

### Condicionales

```typescript
// React
{loading ? (
  <p>Cargando...</p>
) : (
  <p>Contenido</p>
)}

// Vue
<p v-if="loading">Cargando...</p>
<p v-else>Contenido</p>
```

### Listas

```typescript
// React
{movies.map(movie => (
  <MovieCard key={movie.id} movie={movie} />
))}

// Vue
<MovieCard 
  v-for="movie in movies" 
  :key="movie.id" 
  :movie="movie" 
/>
```

### Estado

```typescript
// React
const [count, setCount] = useState(0)
setCount(count + 1)

// Vue
const count = ref(0)
count.value++
```

### Eventos

```typescript
// React
<button onClick={handleClick}>Click</button>

// Vue
<button @click="handleClick">Click</button>
```

---

## 12. Ventajas y Desventajas

### ⚛️ React

**✅ Ventajas:**
- Ecosistema más grande
- React Native para móviles
- Más ofertas de trabajo
- Flexibilidad total
- Gran comunidad

**❌ Desventajas:**
- Curva de aprendizaje más empinada
- JSX puede confundir al principio
- `className` en lugar de `class`
- Más boilerplate para estado

### 💚 Vue

**✅ Ventajas:**
- Curva de aprendizaje suave
- Templates HTML puros
- Single File Components
- Documentación excelente
- `class` normal (no `className`)
- Menos boilerplate

**❌ Desventajas:**
- Ecosistema más pequeño
- Menos ofertas de trabajo
- No hay equivalente a React Native
- `.value` puede olvidarse

---

## 13. Tabla Resumen Final

| Característica | React | Vue |
|----------------|-------|-----|
| **Dificultad** | ⭐⭐⭐⭐ Medio-Alto | ⭐⭐⭐ Medio |
| **Bundle Size** | ~45 KB | ~40 KB |
| **Performance** | ⚡⚡⚡⚡⚡ | ⚡⚡⚡⚡⚡ |
| **Mantenibilidad** | 😃 Alta | 😃 Alta |
| **Reutilización** | 😃 Excelente | 😃 Excelente |
| **Ecosistema** | 🚀 Enorme | 🔧 Grande |
| **Documentación** | 📚 Buena | 📚 Excelente |
| **Curva de aprendizaje** | 📈 Empinada | 📊 Suave |

---

## 14. ¿Cuándo usar cada uno?

### ⚛️ Usa React si:

- ✅ Necesitas React Native (desarrollo móvil)
- ✅ Tu equipo ya conoce React
- ✅ Necesitas el ecosistema más grande
- ✅ Es un proyecto empresarial grande
- ✅ Hay más ofertas de trabajo en tu región

### 💚 Usa Vue si:

- ✅ Eres principiante en frameworks
- ✅ Quieres una curva de aprendizaje suave
- ✅ Prefieres templates HTML puros
- ✅ Valoras la documentación clara
- ✅ Quieres código más limpio y simple
- ✅ El proyecto puede crecer progresivamente

---

## 🎯 Conclusión

**Ambas versiones hacen EXACTAMENTE lo mismo:**
- Consumen la misma API de Supabase
- Muestran las mismas películas
- Tienen el mismo diseño visual

**La diferencia está en CÓMO lo hacen:**
- React: JSX, hooks, `className`
- Vue: Templates, Composition API, directivas

**¿Cuál es mejor?** Ambos son excelentes. React tiene más demanda laboral, Vue es más fácil de aprender.

**Lo más importante:** Entender ambos enfoques te hace un mejor desarrollador, porque sabes cuándo usar cada herramienta.

---

## 📊 Comparación de Código

### Líneas de código (aproximado)

| Proyecto | Líneas de código |
|----------|-----------------|
| React | ~85 líneas |
| Vue | ~75 líneas |

**Conclusión:** Vue tiende a ser más conciso gracias a las directivas y templates.

---

## 🔄 Migración React → Vue

Si vienes de React, estos son los cambios principales:

| React | Vue | Notas |
|-------|-----|-------|
| `useState(value)` | `ref(value)` | En Vue usa `.value` en JS |
| `useEffect(() => {}, [])` | `onMounted(() => {})` | Más específico en Vue |
| `{variable}` | `{{ variable }}` | Doble llave en Vue |
| `className` | `class` | Normal en Vue |
| `src={value}` | `:src="value"` | Binding con `:` |
| `.map()` | `v-for` | Directiva en Vue |
| `condition && <div>` | `v-if` | Más declarativo |
| `onClick={fn}` | `@click="fn"` | Sintaxis más corta |

---

**¡Ahora conoces las diferencias entre React y Vue!** 🎉

