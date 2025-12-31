# Cartelera de Cine - Tutorial Vue 3

Este tutorial te guiará para crear la **misma aplicación** de cartelera de cine, pero ahora usando **Vue 3**. Es ideal para comparar y entender las diferencias entre trabajar con React y Vue.

## ¿Qué vamos a construir?

La **misma** aplicación que la versión React:
- Se conecta a Supabase (la misma base de datos)
- Obtiene la lista de películas
- Muestra las películas en tarjetas visuales

**Pero ahora con Vue 3**, que nos da:
- Manejo automático del DOM
- Re-renderizado eficiente
- Componentes reutilizables
- Composition API para lógica reactiva

---

## Comparación: React vs Vue

| Aspecto | React | Vue |
|---------|-------|-----|
| **Manipulación DOM** | Automática con JSX | Automática con Template |
| **Actualización** | React actualiza solo lo necesario | Vue actualiza solo lo necesario |
| **Componentes** | Funciones que retornan JSX | Archivos `.vue` con template/script/style |
| **Estado** | Hooks (`useState`) | Composition API (`ref`, `reactive`) |
| **Efectos** | Hooks (`useEffect`) | Lifecycle hooks (`onMounted`) |
| **Sintaxis** | JSX (HTML + JavaScript) | Template (HTML puro + directivas) |

---

## Tecnologías utilizadas

| Tecnología | Para qué sirve |
|------------|----------------|
| **Vue 3** | Framework progresivo para construir interfaces de usuario |
| **TypeScript** | JavaScript con tipos |
| **Vite** | Herramienta de desarrollo (la misma en todos los proyectos) |
| **Supabase** | Base de datos en la nube (la misma en todos) |

---

## Paso 1: Crear el proyecto con Vite

Abre tu terminal y ejecuta:

```bash
npm create vite@latest billboard -- --template vue-ts
cd billboard
npm install
```

**Diferencia con React:**
- React usa: `--template react-ts`
- Vue usa: `--template vue-ts`

---

## Paso 2: Entender la estructura inicial

Vite con Vue genera:

```
billboard/
├── index.html          # Página principal (usa <div id="app">)
├── package.json        # Incluye Vue
├── tsconfig.json       # Configuración TypeScript
└── src/
    ├── main.ts         # Punto de entrada (monta Vue)
    ├── App.vue         # Componente principal
    ├── style.css       # Estilos globales
    └── components/
        └── HelloWorld.vue  # Componente de ejemplo
```

**Diferencias con React:**
- Archivos `.vue` en lugar de `.tsx` (Vue Single File Components)
- Componente `App.vue` como base
- `main.ts` monta Vue en el DOM

---

## Paso 3: Crear la estructura en capas

**La misma estructura** que en React:

```
src/
├── config/             # Configuración
│   └── supabase.ts
├── types/              # Interfaces
│   └── movie.ts
├── api/                # Conexión con la API
│   └── movies.ts
├── components/         # Componentes visuales (ahora son Vue)
│   └── MovieCard.vue   # .vue en lugar de .tsx
├── App.vue             # Componente principal
├── App.css             # Estilos
├── main.ts             # Punto de entrada
└── index.css           # Estilos globales
```

Crea las carpetas:

```bash
mkdir src/config
mkdir src/types
mkdir src/api
```

---

## Paso 4: Configuración de Supabase

### Crear el archivo `src/config/supabase.ts`

**EXACTAMENTE IGUAL** que en React y Vanilla TypeScript:

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

**✅ Sin cambios** - La configuración es idéntica en todas las versiones.

---

## Paso 5: Definir la Interface

### Crear el archivo `src/types/movie.ts`

**EXACTAMENTE IGUAL** que en React:

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

**EXACTAMENTE IGUAL** que en React:

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

## Paso 7: Componente MovieCard (Vue)

### Crear el archivo `src/components/MovieCard.vue`

**AQUÍ EMPIEZAN LAS DIFERENCIAS:**

```vue
<!-- ============================================
     COMPONENTE MOVIE CARD (VUE)
     ============================================
     Un componente Vue tiene 3 secciones:
     1. <template>: HTML con directivas de Vue
     2. <script setup>: Lógica del componente
     3. <style>: Estilos (opcional)
-->

<script setup lang="ts">
// Props: parámetros que recibe el componente
// defineProps es una función especial de Vue
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

### Comparación con React:

| React | Vue |
|-------|-----|
| `function MovieCard({ movie }: MovieCardProps)` | `defineProps<{ movie: Movie }>()` |
| Retorna **JSX** | Usa **template** |
| `{movie.title}` | `{{ movie.title }}` |
| `className="..."` | `class="..."` (normal) |
| `src={movie.image}` | `:src="movie.image"` o `v-bind:src` |

---

## Paso 8: Componente App (Vue)

### Crear/modificar `src/App.vue`

**AQUÍ ESTÁ LA DIFERENCIA MÁS GRANDE:**

```vue
<!-- ============================================
     COMPONENTE PRINCIPAL - APP (VUE)
     ============================================
-->

<script setup lang="ts">
// ============================================
// IMPORTS
// ============================================
import { ref, onMounted } from 'vue'
import { getMovies } from './api/movies'
import MovieCard from './components/MovieCard.vue'
import type { Movie } from './types/movie'
import './App.css'

// ============================================
// ESTADO DEL COMPONENTE
// ============================================
// ref: Crea una referencia reactiva (similar a useState)

// Estado para guardar las películas
const movies = ref<Movie[]>([])

// Estado para saber si está cargando
const loading = ref(true)

// ============================================
// FUNCIONES
// ============================================

// Función para cargar las películas
async function loadMovies() {
  loading.value = true
  const data = await getMovies()
  movies.value = data
  loading.value = false
}

// ============================================
// LIFECYCLE HOOKS
// ============================================
// onMounted: Se ejecuta cuando el componente se monta
// Similar a useEffect(() => {}, []) en React

onMounted(() => {
  loadMovies()
})
</script>

<template>
  <!-- ============================================
       RENDERIZADO CONDICIONAL
       ============================================ -->
  
  <!-- Mientras carga, mostramos mensaje -->
  <div id="app">
    <p v-if="loading" class="loading">Cargando cartelera...</p>

    <!-- Si no hay películas, mostramos mensaje -->
    <p v-else-if="movies.length === 0" class="empty">
      No hay películas en cartelera
    </p>

    <!-- Contenido principal -->
    <template v-else>
      <header class="header">
        <h1>Cartelera de Cine</h1>
      </header>
      <main class="billboard">
        <!-- 
          v-for: Directiva para iterar sobre arrays
          :key: Vue necesita una key única (similar a React)
        -->
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

### Comparación detallada con React:

#### 1. **Manejo de Estado**

**React:**
```typescript
const [movies, setMovies] = useState<Movie[]>([])
// movies: el valor actual
// setMovies: función para actualizar el estado
```

**Vue:**
```typescript
const movies = ref<Movie[]>([])
// movies.value: el valor actual
// movies.value = [...]: actualizar directamente
```

#### 2. **Carga de datos**

**React:**
```typescript
useEffect(() => {
  async function loadMovies() {
    setLoading(true)
    const data = await getMovies()
    setMovies(data)
    setLoading(false)
  }
  loadMovies()
}, []) // Se ejecuta al montar el componente
```

**Vue:**
```typescript
onMounted(() => {
  loadMovies()
})

async function loadMovies() {
  loading.value = true
  const data = await getMovies()
  movies.value = data
  loading.value = false
}
```

#### 3. **Renderizado de la lista**

**React:**
```typescript
{movies.map(movie => (
  <MovieCard key={movie.id} movie={movie} />
))}
```

**Vue:**
```vue
<MovieCard 
  v-for="movie in movies" 
  :key="movie.id" 
  :movie="movie" 
/>
```

---

## Paso 9: Punto de entrada

### Modificar `src/main.ts`

```typescript
// ============================================
// MAIN - PUNTO DE ENTRADA (VUE)
// ============================================

import { createApp } from 'vue'
import './index.css'
import App from './App.vue'

createApp(App).mount('#app')
```

### Comparación con React:

**React:**
```typescript
import { createRoot } from 'react-dom/client'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

**Vue:**
```typescript
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

---

## Paso 10: Los Estilos CSS

### `src/App.css`

**EXACTAMENTE IGUALES** que en React:

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

**Nota:** React, Vue y Vanilla usan Vite, así que los comandos y el puerto son los mismos.

---

## Resumen: Diferencias Clave

### ✅ Lo que es IGUAL en todos los proyectos:

1. **Configuración de Supabase** (`config/supabase.ts`)
2. **Interfaces TypeScript** (`types/movie.ts`)
3. **Capa API** (`api/movies.ts`)
4. **Estilos CSS** (mismo diseño visual)
5. **Estructura de carpetas** (misma organización)
6. **Vite como bundler** (misma herramienta de desarrollo)

### 🔄 Lo que es DIFERENTE:

| Aspecto | React | Vue |
|---------|-------|-----|
| **Extensión de archivos** | `.tsx` para componentes | `.vue` para componentes |
| **Estructura de componentes** | Todo en JS/JSX | Template + Script + Style |
| **Template** | JSX `<div>...</div>` | HTML puro con directivas |
| **Insertar variables** | `{variable}` | `{{ variable }}` |
| **Atributo class** | `className="..."` | `class="..."` (normal) |
| **Binding dinámico** | `src={value}` | `:src="value"` o `v-bind:src` |
| **Estado** | `useState()` | `ref()` o `reactive()` |
| **Acceso al estado** | `movies` | `movies.value` |
| **Actualizar estado** | `setMovies(data)` | `movies.value = data` |
| **Lifecycle** | `useEffect()` | `onMounted()`, `onUnmounted()`, etc. |
| **Condicionales** | `if` + `return` JSX | `v-if`, `v-else-if`, `v-else` |
| **Listas** | `.map()` con `key` | `v-for` con `:key` |
| **Props** | Interface + desestructuración | `defineProps<T>()` |

---

## Conceptos Nuevos de Vue

| Concepto | Descripción |
|----------|-------------|
| **Single File Component (SFC)** | Archivo `.vue` con template, script y style |
| **Template** | HTML puro con directivas especiales de Vue |
| **Directivas** | Atributos especiales (`v-if`, `v-for`, `v-bind`, etc.) |
| **ref()** | Crea una referencia reactiva para valores primitivos |
| **reactive()** | Crea un objeto reactivo |
| **.value** | Acceso al valor de un `ref` en JavaScript |
| **Composition API** | Nueva forma de organizar lógica (Vue 3) |
| **onMounted** | Hook que se ejecuta al montar el componente |
| **defineProps** | Macro para definir props (compile-time) |
| **v-bind o :** | Binding dinámico de atributos |
| **{{ }}** | Interpolación de texto (mustache syntax) |

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

---

## ¿Cuándo usar cada uno?

### React es mejor para:
- Ecosistema más grande (más librerías)
- Desarrollo móvil (React Native)
- Equipos grandes con experiencia en React
- Proyectos empresariales complejos

### Vue es mejor para:
- Curva de aprendizaje más suave
- Proyectos que empiezan pequeños y crecen
- Separación clara de template/lógica/estilos
- Documentación en español más completa
- Integración progresiva en proyectos existentes

---

## Ventajas de Vue sobre React

1. **Sintaxis más simple**: Templates HTML puros vs JSX
2. **Curva de aprendizaje**: Más fácil para principiantes
3. **Single File Components**: Todo en un archivo organizado
4. **Directivas intuitivas**: `v-if`, `v-for` son más claras
5. **No necesitas `className`**: Usas `class` normal
6. **Documentación**: Excelente y en español

---

## Ventajas de React sobre Vue

1. **Ecosistema más grande**: Más librerías y recursos
2. **React Native**: Desarrollo móvil con la misma tecnología
3. **Demanda laboral**: Más ofertas de trabajo
4. **Flexibilidad**: Menos opiniones sobre cómo hacer las cosas
5. **TypeScript**: Mejor soporte en algunos casos

---

## Configuración de Supabase

**LA MISMA para todos los proyectos:**

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

### "Cannot read property 'value' of undefined"
**Causa**: Olvidaste usar `.value` para acceder a un `ref`  
**Solución**: En JavaScript usa `movies.value`, en template usa `movies`

### "Property does not exist on type"
**Causa**: TypeScript no reconoce las props  
**Solución**: Define las props con `defineProps<{ ... }>()`

### "v-for should have explicit keys"
**Causa**: Olvidaste agregar `:key` al iterar  
**Solución**: `<MovieCard v-for="movie in movies" :key="movie.id" ... />`

### "Failed to resolve component"
**Causa**: No importaste el componente  
**Solución**: `import MovieCard from './components/MovieCard.vue'`

---

## Próximos Pasos

Ahora que entiendes las diferencias, puedes:

1. **Comparar los tres proyectos** (Vanilla, React, Vue)
2. **Agregar un formulario** para crear películas
3. **Implementar filtros** por género
4. **Agregar routing** con Vue Router
5. **Usar Pinia** para estado global

---

## Conclusión

Has creado la **misma aplicación** en Vanilla TypeScript, React y Vue. Ahora entiendes:

✅ Qué problemas resuelve Vue  
✅ Las diferencias entre React y Vue  
✅ Cuándo vale la pena usar cada framework  
✅ Que la lógica de negocio (API, tipos, config) puede ser la misma  

**La mejor forma de aprender es comparar los tres proyectos** y ver cómo cada uno resuelve los mismos problemas de manera diferente.

¡Felicidades! Ahora dominas Vanilla TypeScript, React y Vue para consumir APIs.
