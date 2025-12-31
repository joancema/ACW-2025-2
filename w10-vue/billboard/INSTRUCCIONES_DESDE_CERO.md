# 📝 Instrucciones Detalladas - Crear Proyecto desde Cero

Este documento contiene **instrucciones paso a paso** para crear el proyecto de cartelera de cine con Vue 3 desde cero. Ideal para seguir en clase con los estudiantes.

---

## 🎯 Objetivo

Crear una aplicación de cartelera de cine que:
- Se conecte a Supabase
- Muestre películas en tarjetas
- Use Vue 3 con TypeScript
- Tenga la misma funcionalidad que la versión React

---

## 📋 Requisitos Previos

Antes de empezar, asegúrate de tener instalado:

```bash
# Verificar versiones
node --version   # v18 o superior
npm --version    # v9 o superior
```

Si no tienes Node.js instalado:
- Descarga desde [nodejs.org](https://nodejs.org/)
- Instala la versión LTS (Long Term Support)

---

## 🚀 Paso 1: Crear el Proyecto con Vite

### 1.1 Ejecutar el comando de creación

```bash
npm create vite@latest billboard -- --template vue-ts
```

**Explicación:**
- `npm create vite@latest`: Usa Vite para crear un proyecto
- `billboard`: Nombre del proyecto
- `--template vue-ts`: Template de Vue 3 con TypeScript

### 1.2 Entrar al directorio y instalar dependencias

```bash
cd billboard
npm install
```

### 1.3 Verificar que funciona

```bash
npm run dev
```

Abre `http://localhost:5173` en tu navegador. Deberías ver la página de bienvenida de Vue.

**Punto de pausa:** Asegúrate de que todos los estudiantes llegaron hasta aquí.

---

## 📁 Paso 2: Entender la Estructura Inicial

Explica la estructura que Vite generó:

```
billboard/
├── node_modules/       # Dependencias (no tocar)
├── public/             # Archivos estáticos
├── src/                # Código fuente
│   ├── assets/         # Imágenes, fuentes, etc.
│   ├── components/     # Componentes Vue
│   │   └── HelloWorld.vue
│   ├── App.vue         # Componente principal
│   ├── main.ts         # Punto de entrada
│   └── style.css       # Estilos globales
├── index.html          # HTML base
├── package.json        # Dependencias y scripts
├── tsconfig.json       # Configuración TypeScript
└── vite.config.ts      # Configuración Vite
```

**Conceptos clave:**
- `src/`: Aquí va todo nuestro código
- `main.ts`: Punto de entrada, monta Vue
- `App.vue`: Componente raíz
- `.vue`: Single File Components (template + script + style)

---

## 🗂️ Paso 3: Crear la Estructura de Carpetas

### 3.1 Crear carpetas para organizar el código

```bash
# Desde la raíz del proyecto
mkdir src/config
mkdir src/types
mkdir src/api
```

**Explicación de cada carpeta:**
- `config/`: Configuración (Supabase, constantes)
- `types/`: Interfaces TypeScript
- `api/`: Funciones para consumir APIs
- `components/`: Componentes Vue (ya existe)

### 3.2 Verificar la estructura

```bash
ls -la src/
```

Deberías ver:
```
src/
├── api/
├── assets/
├── components/
├── config/
├── types/
├── App.vue
├── main.ts
└── style.css
```

---

## 🔧 Paso 4: Configurar Supabase

### 4.1 Crear el archivo de configuración

```bash
touch src/config/supabase.ts
```

### 4.2 Agregar el contenido

Abre `src/config/supabase.ts` y agrega:

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

**⚠️ IMPORTANTE:** Los estudiantes deben reemplazar con sus propios valores de Supabase.

### 4.3 Obtener las credenciales de Supabase

1. Ve a [supabase.com](https://supabase.com)
2. Inicia sesión o crea una cuenta
3. Crea un nuevo proyecto (o usa uno existente)
4. Ve a **Settings** > **API**
5. Copia:
   - **Project URL** → `SUPABASE_URL` (agrega `/rest/v1` al final)
   - **anon public** → `SUPABASE_KEY`

**Ejemplo:**
```typescript
export const SUPABASE_URL = 'https://mefqiknqtmsrvygeghnw.supabase.co/rest/v1'
export const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
```

---

## 📊 Paso 5: Crear la Tabla en Supabase

### 5.1 Crear la tabla `movies`

En el panel de Supabase:

1. Ve a **Table Editor**
2. Click en **New table**
3. Nombre: `movies`
4. Agrega las columnas:

| Nombre | Tipo | Configuración |
|--------|------|---------------|
| `id` | uuid | Primary key, Default value: `gen_random_uuid()` |
| `title` | text | - |
| `image` | text | - |
| `description` | text | - |
| `genre` | text | - |
| `created_at` | timestamptz | Default value: `now()` |

5. Click en **Save**

### 5.2 Configurar permisos (RLS)

1. Ve a **Authentication** > **Policies**
2. Encuentra la tabla `movies`
3. Click en **New Policy**
4. Selecciona **Enable read access for all users**
5. Click en **Review** y luego **Save policy**

### 5.3 Agregar datos de prueba

En el **Table Editor**, click en **Insert row** y agrega algunas películas:

```
Título: The Matrix
Imagen: https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg
Descripción: Un hacker descubre la verdad sobre su realidad
Género: Ciencia Ficción

Título: Inception
Imagen: https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg
Descripción: Un ladrón que roba secretos a través de los sueños
Género: Ciencia Ficción

Título: The Dark Knight
Imagen: https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg
Descripción: Batman enfrenta al Joker en Gotham City
Género: Acción
```

---

## 🎨 Paso 6: Definir la Interface TypeScript

### 6.1 Crear el archivo

```bash
touch src/types/movie.ts
```

### 6.2 Agregar el contenido

```typescript
// ============================================
// INTERFACE MOVIE
// ============================================
// Define la estructura de datos de una película.
// Esto permite que TypeScript valide que estamos
// usando los campos correctos en todo el código.

export interface Movie {
  id: string
  title: string
  image: string
  description: string
  genre: string
}
```

**Explicación:**
- `interface`: Define la forma de un objeto
- `export`: Permite usar esta interface en otros archivos
- Los campos coinciden con las columnas de la tabla en Supabase

---

## 🔌 Paso 7: Crear la Capa API

### 7.1 Crear el archivo

```bash
touch src/api/movies.ts
```

### 7.2 Agregar el contenido

```typescript
// ============================================
// API DE PELÍCULAS
// ============================================
// Aquí están las funciones que se comunican con
// la REST API de Supabase para obtener datos.

import { SUPABASE_URL, SUPABASE_KEY } from '../config/supabase'
import type { Movie } from '../types/movie'

// Obtiene todas las películas de Supabase
export async function getMovies(): Promise<Movie[]> {
  // Hacemos la petición GET a la tabla "movies"
  const response = await fetch(`${SUPABASE_URL}/movies`, {
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`
    }
  })

  // Si hay error, lo mostramos en consola
  if (!response.ok) {
    console.error('Error al obtener películas:', response.statusText)
    return []
  }

  // Convertimos la respuesta a JSON y la retornamos
  const movies: Movie[] = await response.json()
  return movies
}
```

**Conceptos clave:**
- `async/await`: Para operaciones asíncronas
- `fetch`: API nativa del navegador para hacer peticiones HTTP
- `Promise<Movie[]>`: La función retorna una promesa que resuelve a un array de películas
- Headers: Necesarios para autenticarse con Supabase

---

## 🎬 Paso 8: Crear el Componente MovieCard

### 8.1 Crear el archivo

```bash
touch src/components/MovieCard.vue
```

### 8.2 Agregar el contenido

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

**Explicación del código:**

1. **`<script setup lang="ts">`**: Composition API con TypeScript
2. **`defineProps`**: Define las props que recibe el componente
3. **`<template>`**: HTML del componente
4. **`:src="movie.image"`**: Binding dinámico (equivale a `v-bind:src`)
5. **`{{ movie.title }}`**: Interpolación de texto (mustache syntax)

**Diferencias con React:**
- Vue: `class` → React: `className`
- Vue: `:src="value"` → React: `src={value}`
- Vue: `{{ value }}` → React: `{value}`

---

## 🏠 Paso 9: Modificar el Componente App

### 9.1 Reemplazar el contenido de `src/App.vue`

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

**Explicación detallada:**

### Imports
```typescript
import { ref, onMounted } from 'vue'
```
- `ref`: Crea una referencia reactiva
- `onMounted`: Hook del ciclo de vida

### Estado
```typescript
const movies = ref<Movie[]>([])
const loading = ref(true)
```
- `ref()`: Similar a `useState()` en React
- `.value`: Para acceder/modificar en JavaScript
- En el template no necesitas `.value`

### Lifecycle
```typescript
onMounted(() => {
  loadMovies()
})
```
- Se ejecuta cuando el componente se monta
- Similar a `useEffect(() => {}, [])` en React

### Template
```vue
<p v-if="loading">Cargando...</p>
<p v-else-if="movies.length === 0">No hay películas</p>
<template v-else>...</template>
```
- `v-if`: Renderizado condicional
- `v-else-if`, `v-else`: Alternativas
- `<template>`: Contenedor sin renderizar

### Iteración
```vue
<MovieCard 
  v-for="movie in movies" 
  :key="movie.id" 
  :movie="movie" 
/>
```
- `v-for`: Itera sobre el array
- `:key`: Identificador único (obligatorio)
- `:movie`: Pasa la prop al componente hijo

---

## 🎨 Paso 10: Agregar los Estilos

### 10.1 Crear `src/App.css`

Reemplaza el contenido con:

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

### 10.2 Modificar `src/index.css`

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
```

---

## 🚀 Paso 11: Modificar el Punto de Entrada

### 11.1 Editar `src/main.ts`

Reemplaza el contenido con:

```typescript
import { createApp } from 'vue'
import './index.css'
import App from './App.vue'

createApp(App).mount('#app')
```

**Explicación:**
- `createApp(App)`: Crea la instancia de Vue
- `.mount('#app')`: Monta la app en el elemento con id="app"

---

## 🌐 Paso 12: Verificar el HTML

### 12.1 Editar `index.html`

Asegúrate de que tenga:

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

---

## ✅ Paso 13: Probar la Aplicación

### 13.1 Ejecutar el servidor de desarrollo

```bash
npm run dev
```

### 13.2 Abrir en el navegador

Abre `http://localhost:5173`

### 13.3 Verificar que funciona

Deberías ver:
1. El título "Cartelera de Cine"
2. Las películas que agregaste en Supabase
3. Hover sobre las tarjetas (efecto de escala)

---

## 🐛 Solución de Problemas Comunes

### Error: "Cannot find module 'vue'"

**Solución:**
```bash
npm install
```

### Error: "Failed to fetch"

**Causas posibles:**
1. URL de Supabase incorrecta
2. API Key incorrecta
3. Tabla no existe
4. RLS policies no configuradas

**Verificar:**
```typescript
// En src/config/supabase.ts
console.log('URL:', SUPABASE_URL)
console.log('Key:', SUPABASE_KEY.substring(0, 20) + '...')
```

### Error: "Cannot read property 'value' of undefined"

**Causa:** Olvidaste usar `.value` para acceder a un ref

**Solución:**
```typescript
// ❌ Incorrecto
console.log(movies)

// ✅ Correcto
console.log(movies.value)
```

### La página está en blanco

**Pasos:**
1. Abre la consola del navegador (F12)
2. Busca errores en rojo
3. Lee el mensaje de error
4. Verifica que todos los archivos existan

---

## 📊 Paso 14: Comparar con React

### Diferencias Clave

| Aspecto | React | Vue |
|---------|-------|-----|
| **Archivos** | `.tsx` | `.vue` |
| **Estado** | `useState()` | `ref()` |
| **Acceso** | `movies` | `movies.value` (JS), `movies` (template) |
| **Lifecycle** | `useEffect()` | `onMounted()` |
| **Template** | JSX | HTML con directivas |
| **Variables** | `{value}` | `{{ value }}` |
| **Clases** | `className` | `class` |
| **Binding** | `src={value}` | `:src="value"` |
| **Listas** | `.map()` | `v-for` |
| **Condicionales** | `condition && <div>` | `v-if` |

---

## 🎯 Paso 15: Ejercicios para Estudiantes

### Ejercicio 1: Agregar contador
Muestra el número total de películas debajo del título.

### Ejercicio 2: Agregar rating
Agrega un campo `rating` (número de estrellas) a cada película.

### Ejercicio 3: Filtrar por género
Agrega botones para filtrar películas por género.

### Ejercicio 4: Búsqueda
Agrega un campo de búsqueda para filtrar por título.

### Ejercicio 5: Formulario
Crea un formulario para agregar nuevas películas.

---

## 📚 Recursos Adicionales

- [Vue 3 Docs (Español)](https://es.vuejs.org/)
- [Vite Docs](https://vitejs.dev)
- [Supabase Docs](https://supabase.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## ✅ Checklist Final

Marca cuando completes cada paso:

- [ ] Paso 1: Proyecto creado con Vite
- [ ] Paso 2: Estructura entendida
- [ ] Paso 3: Carpetas creadas
- [ ] Paso 4: Supabase configurado
- [ ] Paso 5: Tabla creada en Supabase
- [ ] Paso 6: Interface definida
- [ ] Paso 7: Capa API creada
- [ ] Paso 8: MovieCard creado
- [ ] Paso 9: App.vue modificado
- [ ] Paso 10: Estilos agregados
- [ ] Paso 11: main.ts modificado
- [ ] Paso 12: HTML verificado
- [ ] Paso 13: Aplicación funcionando
- [ ] Paso 14: Comparación con React
- [ ] Paso 15: Ejercicios propuestos

---

## 🎓 Conclusión

¡Felicidades! Has creado una aplicación completa con Vue 3, TypeScript y Supabase.

**Conceptos aprendidos:**
- Single File Components (.vue)
- Composition API (ref, onMounted)
- Props con defineProps
- Directivas (v-if, v-for, v-bind)
- Consumo de APIs con fetch
- TypeScript con Vue
- Arquitectura en capas

**Próximos pasos:**
- Compara con la versión React
- Agrega más funcionalidades
- Experimenta con Vue Router
- Prueba Pinia para estado global

---

**Tiempo estimado:** 2-3 horas de clase  
**Nivel:** Principiante-Intermedio  
**Prerrequisitos:** HTML, CSS, JavaScript básico

