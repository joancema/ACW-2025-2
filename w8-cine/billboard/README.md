# Cartelera de Cine - Tutorial Paso a Paso

Este tutorial te guiará para crear una aplicación web que muestra una cartelera de cine, consumiendo datos desde una API REST (Supabase).

## ¿Qué vamos a construir?

Una página web que:
- Se conecta a una base de datos en la nube (Supabase)
- Obtiene la lista de películas usando `fetch`
- Muestra las películas en tarjetas visuales

## Tecnologías utilizadas

| Tecnología | Para qué sirve |
|------------|----------------|
| **TypeScript** | JavaScript con tipos, ayuda a evitar errores |
| **Vite** | Herramienta que hace que el desarrollo sea rápido |
| **Supabase** | Base de datos en la nube con API REST gratuita |
| **HTML/CSS** | Estructura y estilos de la página |

---

## Paso 1: Crear el proyecto con Vite

Abre tu terminal y ejecuta:

```bash
npm create vite@latest billboard -- --template vanilla-ts
cd billboard
npm install
```

Esto crea un proyecto con TypeScript listo para usar.

---

## Paso 2: Entender la estructura inicial

Vite genera estos archivos:

```
billboard/
├── index.html          # Página principal
├── package.json        # Dependencias del proyecto
├── tsconfig.json       # Configuración de TypeScript
└── src/
    ├── main.ts         # Código principal
    └── style.css       # Estilos
```

---

## Paso 3: Crear la estructura en capas

Vamos a organizar el código en carpetas según su responsabilidad:

```
src/
├── config/             # Configuración
│   └── supabase.ts
├── types/              # Interfaces (tipos de datos)
│   └── movie.ts
├── api/                # Conexión con la API
│   └── movies.ts
├── components/         # Componentes visuales
│   └── MovieCard.ts
├── main.ts             # Archivo principal
└── style.css           # Estilos
```

Crea las carpetas manualmente o con estos comandos:

```bash
mkdir src/config
mkdir src/types
mkdir src/api
mkdir src/components
```

---

## Paso 4: Configuración de Supabase

### ¿Qué es Supabase?
Supabase es una base de datos en la nube que automáticamente genera una API REST para acceder a tus datos.

### Crear el archivo `src/config/supabase.ts`

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

### ¿De dónde saco estos valores?
1. Ve a [supabase.com](https://supabase.com) y crea una cuenta
2. Crea un nuevo proyecto
3. Ve a **Settings > API**
4. Copia la **URL** y la **anon public key**

---

## Paso 5: Definir la Interface (Tipos)

### ¿Qué es una Interface?
Una interface define la "forma" de un objeto. Le dice a TypeScript qué propiedades debe tener.

### Crear el archivo `src/types/movie.ts`

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

### ¿Por qué usar interfaces?
- TypeScript te avisa si escribes mal un campo (ej: `moive.tittle`)
- El editor te muestra autocompletado
- Documenta qué datos esperas recibir

---

## Paso 6: Crear la capa API

### ¿Qué hace esta capa?
Se encarga de la comunicación con el servidor. Usa `fetch` para hacer peticiones HTTP.

### Crear el archivo `src/api/movies.ts`

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

### Explicación línea por línea:

1. **`import { SUPABASE_URL, SUPABASE_KEY }`** - Traemos la configuración
2. **`import type { Movie }`** - Traemos el tipo (solo para TypeScript)
3. **`async function`** - Función asíncrona (espera respuesta del servidor)
4. **`Promise<Movie[]>`** - La función promete retornar un array de películas
5. **`fetch(url, options)`** - Hace la petición HTTP GET
6. **`headers`** - Supabase requiere la API key en los headers
7. **`response.ok`** - Es `true` si la respuesta fue exitosa (200-299)
8. **`response.json()`** - Convierte la respuesta a objeto JavaScript

---

## Paso 7: Crear el Componente Visual

### ¿Qué es un componente?
Es una función que genera HTML. Recibe datos y retorna el HTML correspondiente.

### Crear el archivo `src/components/MovieCard.ts`

```typescript
// ============================================
// COMPONENTE MOVIE CARD
// ============================================
// Este componente genera el HTML de una tarjeta
// de película para mostrar en la cartelera.

import type { Movie } from '../types/movie'

// Genera el HTML de una tarjeta de película
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

### Explicación:

- **`movie: Movie`** - El parámetro debe ser un objeto tipo Movie
- **`: string`** - La función retorna un string (el HTML)
- **Template literals** - Usamos \`backticks\` para insertar variables con `${}`

---

## Paso 8: El Archivo Principal

### Crear/modificar `src/main.ts`

```typescript
// ============================================
// MAIN - COMPONENTE BILLBOARD
// ============================================
// Este es el archivo principal que orquesta todo.
// Importa las funciones de las otras capas y
// renderiza la cartelera de cine.

import './style.css'
import { getMovies } from './api/movies'
import { renderMovieCard } from './components/MovieCard'

// ============================================
// RENDERIZAR CARTELERA
// ============================================
// Obtiene las películas y las muestra en pantalla
async function renderBillboard(): Promise<void> {
  // Obtenemos el contenedor principal
  const app = document.querySelector<HTMLDivElement>('#app')!

  // Mostramos mensaje de carga
  app.innerHTML = '<p class="loading">Cargando cartelera...</p>'

  // Obtenemos las películas de Supabase
  const movies = await getMovies()

  // Si no hay películas, mostramos mensaje
  if (movies.length === 0) {
    app.innerHTML = '<p class="empty">No hay películas en cartelera</p>'
    return
  }

  // Generamos el HTML de todas las tarjetas
  const cardsHTML = movies.map(movie => renderMovieCard(movie)).join('')

  // Renderizamos la cartelera completa
  app.innerHTML = `
    <header class="header">
      <h1>Cartelera de Cine</h1>
    </header>
    <main class="billboard">
      ${cardsHTML}
    </main>
  `
}

// ============================================
// INICIAR APP
// ============================================
renderBillboard()
```

### Explicación:

1. **`import './style.css'`** - Carga los estilos CSS
2. **`document.querySelector('#app')!`** - Busca el elemento con id="app"
3. **`!`** - Le dice a TypeScript "confía, este elemento existe"
4. **`movies.map(...).join('')`** - Convierte cada película a HTML y une todo

---

## Paso 9: Los Estilos CSS

### Modificar `src/style.css`

```css
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

#app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* Header */
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

/* Grid de películas */
.billboard {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 25px;
}

/* Tarjeta de película */
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

/* Estados */
.loading,
.empty {
  text-align: center;
  padding: 50px;
  font-size: 1.2rem;
  color: #888;
}
```

---

## Paso 10: Configurar la Base de Datos

### Crear la tabla en Supabase

1. Ve a tu proyecto en Supabase
2. Click en **Table Editor** (menú izquierdo)
3. Click en **New Table**
4. Nombre: `movies`
5. Agrega estas columnas:

| Nombre | Tipo | Configuración |
|--------|------|---------------|
| id | uuid | Primary Key, Default: `gen_random_uuid()` |
| title | text | Not null |
| image | text | Not null |
| description | text | - |
| genre | text | - |

6. Click en **Save**

### Agregar datos de prueba

En el Table Editor, click en **Insert row** y agrega algunas películas:

```
title: "Dune: Part Two"
image: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg"
description: "Paul Atreides se une a los Fremen en su viaje de venganza."
genre: "Ciencia Ficción"
```

### Habilitar acceso público (Row Level Security)

1. Ve a **Authentication > Policies**
2. Busca la tabla `movies`
3. Click en **New Policy**
4. Selecciona **Enable read access for all users**
5. Click en **Save**

---

## Paso 11: Ejecutar el proyecto

```bash
npm run dev
```

Abre tu navegador en `http://localhost:5173`

---

## Resumen: Flujo de Datos

```
┌─────────────────────────────────────────────────────────────┐
│                        NAVEGADOR                            │
│                                                             │
│  index.html                                                 │
│      │                                                      │
│      ▼                                                      │
│  main.ts (renderBillboard)                                  │
│      │                                                      │
│      ├──► api/movies.ts (getMovies)                        │
│      │        │                                             │
│      │        ├──► config/supabase.ts (URL, KEY)           │
│      │        │                                             │
│      │        └──► fetch() ────────────────────────────┐   │
│      │                                                  │   │
│      └──► components/MovieCard.ts (renderMovieCard)    │   │
│               │                                         │   │
│               ▼                                         │   │
│           HTML en pantalla                              │   │
│                                                         │   │
└─────────────────────────────────────────────────────────│───┘
                                                          │
                                                          ▼
                                              ┌───────────────────┐
                                              │     SUPABASE      │
                                              │   (Base de datos) │
                                              │                   │
                                              │   Tabla: movies   │
                                              └───────────────────┘
```

---

## Conceptos Clave Aprendidos

| Concepto | Descripción |
|----------|-------------|
| **TypeScript** | JavaScript con tipos que ayudan a evitar errores |
| **Interface** | Define la estructura de un objeto |
| **import type** | Importa solo el tipo (no genera código JS) |
| **async/await** | Espera respuestas de operaciones asíncronas |
| **fetch** | Función nativa para hacer peticiones HTTP |
| **Template Literals** | Strings con \`backticks\` que permiten `${}` |
| **Componentes** | Funciones que generan HTML reutilizable |
| **Capas** | Separar código por responsabilidad |

---

## Errores Comunes

### "Importing binding name 'Movie' is not found"
**Solución:** Usa `import type { Movie }` en lugar de `import { Movie }`

### "No hay películas en cartelera"
**Posibles causas:**
- La tabla `movies` no existe en Supabase
- No hay datos en la tabla
- Row Level Security no permite lectura pública
- URL o API key incorrectas

### La página no carga
**Solución:** Revisa la consola del navegador (F12 > Console) para ver el error

---

## Próximos Pasos

Una vez domines este proyecto, puedes agregar:
- Buscador de películas
- Filtro por género
- Modal con más detalles
- Agregar/editar películas (CRUD completo)

¡Felicidades! Has creado tu primera aplicación TypeScript con arquitectura en capas.

