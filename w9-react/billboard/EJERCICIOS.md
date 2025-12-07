# 🎯 Ejercicios Prácticos - React vs Vanilla

Estos ejercicios te ayudarán a entender las diferencias entre React y Vanilla TypeScript.

---

## 📝 Ejercicios de Observación

### Ejercicio 1: Comparar Archivos Idénticos

**Tarea:** Abre estos archivos en ambos proyectos y confirma que son IDÉNTICOS:

1. `src/config/supabase.ts`
2. `src/types/movie.ts`
3. `src/api/movies.ts`

**Pregunta:** ¿Por qué estos archivos no cambian entre Vanilla y React?

<details>
<summary>Ver respuesta</summary>

Porque son **lógica de negocio pura** (TypeScript normal):
- No manipulan el DOM
- No dependen del framework
- Solo definen tipos y consumen APIs

Esta es una ventaja de separar en capas: la lógica de negocio es independiente de la UI.
</details>

---

### Ejercicio 2: Identificar Diferencias en MovieCard

**Tarea:** Abre ambos archivos:
- `w8-cine/billboard/src/components/MovieCard.ts` (Vanilla)
- `w9-react/billboard/src/components/MovieCard.tsx` (React)

**Preguntas:**

1. ¿Qué tipo retorna la función en cada versión?
   - Vanilla: _________
   - React: _________

2. ¿Cómo se insertan las variables?
   - Vanilla: `${movie.title}`
   - React: _________

3. ¿Cómo se llama el atributo de clase CSS?
   - Vanilla: `class="..."`
   - React: _________

<details>
<summary>Ver respuestas</summary>

1. Vanilla retorna `string`, React retorna `JSX.Element` (implícito)
2. React usa `{movie.title}` (sin el `$`)
3. React usa `className="..."` porque `class` es palabra reservada en JavaScript
</details>

---

### Ejercicio 3: Comparar la Lógica Principal

**Tarea:** Compara estos archivos:
- `w8-cine/billboard/src/main.ts`
- `w9-react/billboard/src/App.tsx`

**Completa la tabla:**

| Aspecto | Vanilla | React |
|---------|---------|-------|
| ¿Cómo se guardan las películas? | Variable normal | _________ |
| ¿Cuándo se cargan los datos? | Inmediatamente | _________ |
| ¿Cómo se actualiza la UI? | innerHTML | _________ |
| ¿Cómo se muestra "Cargando"? | if + innerHTML | _________ |

<details>
<summary>Ver respuestas</summary>

| Aspecto | Vanilla | React |
|---------|---------|-------|
| ¿Cómo se guardan las películas? | Variable normal | `useState<Movie[]>([])` |
| ¿Cuándo se cargan los datos? | Inmediatamente | `useEffect(() => {}, [])` |
| ¿Cómo se actualiza la UI? | innerHTML | React re-renderiza |
| ¿Cómo se muestra "Cargando"? | if + innerHTML | `if (loading) return <p>...</p>` |
</details>

---

## 💻 Ejercicios de Código

### Ejercicio 4: Agregar un Contador (Fácil)

**En la versión React**, agrega un contador de películas.

**Pistas:**
1. En `App.tsx`, debajo del `<h1>`, agrega:
   ```tsx
   <p className="count">Total de películas: {movies.length}</p>
   ```

2. Agrega estilos en `App.css`:
   ```css
   .count {
     text-align: center;
     color: #aaa;
     margin-top: 10px;
   }
   ```

**Pregunta:** ¿Cómo harías lo mismo en Vanilla TypeScript?

<details>
<summary>Ver solución Vanilla</summary>

En `main.ts`, dentro del template literal:

```typescript
app.innerHTML = `
  <header class="header">
    <h1>Cartelera de Cine</h1>
    <p class="count">Total de películas: ${movies.length}</p>
  </header>
  <main class="billboard">
    ${cardsHTML}
  </main>
`
```
</details>

---

### Ejercicio 5: Agregar Rating a las Películas (Medio)

**Objetivo:** Mostrar una calificación (1-5 estrellas) en cada película.

**Paso 1:** Actualiza la interface `Movie` en AMBOS proyectos:

```typescript
export interface Movie {
  id: string
  title: string
  image: string
  description: string
  genre: string
  rating: number  // ⭐ Nuevo campo
}
```

**Paso 2 (React):** Actualiza `MovieCard.tsx`:

```tsx
export function MovieCard({ movie }: MovieCardProps) {
  // Generar estrellas
  const stars = '⭐'.repeat(movie.rating)
  
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
        <p className="movie-rating">{stars}</p>  {/* ⭐ Nuevo */}
        <p className="movie-description">{movie.description}</p>
      </div>
    </div>
  )
}
```

**Paso 2 (Vanilla):** Actualiza `MovieCard.ts`:

```typescript
export function renderMovieCard(movie: Movie): string {
  const stars = '⭐'.repeat(movie.rating)
  
  return `
    <div class="movie-card">
      <img src="${movie.image}" alt="${movie.title}" class="movie-poster">
      <div class="movie-info">
        <h3 class="movie-title">${movie.title}</h3>
        <span class="movie-genre">${movie.genre}</span>
        <p class="movie-rating">${stars}</p>
        <p class="movie-description">${movie.description}</p>
      </div>
    </div>
  `
}
```

**Pregunta:** ¿Notaste que la lógica (`'⭐'.repeat(movie.rating)`) es la misma en ambos?

---

### Ejercicio 6: Filtrar por Género (Difícil)

**Solo en React** (por ahora), agrega un botón para filtrar películas.

**Paso 1:** Agrega un nuevo estado en `App.tsx`:

```tsx
const [movies, setMovies] = useState<Movie[]>([])
const [loading, setLoading] = useState(true)
const [selectedGenre, setSelectedGenre] = useState<string>('all')  // ⭐ Nuevo
```

**Paso 2:** Filtra las películas antes de renderizar:

```tsx
// Después de los if (loading) y if (movies.length === 0)

const filteredMovies = selectedGenre === 'all' 
  ? movies 
  : movies.filter(m => m.genre === selectedGenre)
```

**Paso 3:** Obtén los géneros únicos:

```tsx
const genres = ['all', ...new Set(movies.map(m => m.genre))]
```

**Paso 4:** Agrega botones en el JSX:

```tsx
return (
  <div id="app">
    <header className="header">
      <h1>Cartelera de Cine</h1>
      <div className="filters">
        {genres.map(genre => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={selectedGenre === genre ? 'active' : ''}
          >
            {genre === 'all' ? 'Todas' : genre}
          </button>
        ))}
      </div>
    </header>
    <main className="billboard">
      {filteredMovies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </main>
  </div>
)
```

**Paso 5:** Agrega estilos en `App.css`:

```css
.filters {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.filters button {
  padding: 8px 16px;
  border: 2px solid #e94560;
  background: transparent;
  color: #eee;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s;
}

.filters button:hover {
  background: #e94560;
}

.filters button.active {
  background: #e94560;
}
```

**Desafío Extra:** Implementa lo mismo en Vanilla TypeScript. Pista: necesitarás event listeners.

---

### Ejercicio 7: Búsqueda en Tiempo Real (Difícil)

**Solo en React**, agrega un campo de búsqueda.

**Paso 1:** Agrega un nuevo estado:

```tsx
const [searchTerm, setSearchTerm] = useState('')
```

**Paso 2:** Filtra por búsqueda Y género:

```tsx
const filteredMovies = movies
  .filter(m => selectedGenre === 'all' || m.genre === selectedGenre)
  .filter(m => m.title.toLowerCase().includes(searchTerm.toLowerCase()))
```

**Paso 3:** Agrega el input:

```tsx
<div className="search">
  <input
    type="text"
    placeholder="Buscar película..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
</div>
```

**Paso 4:** Estilos:

```css
.search {
  margin-top: 20px;
  text-align: center;
}

.search input {
  padding: 10px 20px;
  width: 300px;
  border: 2px solid #e94560;
  background: #16213e;
  color: #eee;
  border-radius: 25px;
  font-size: 1rem;
}

.search input:focus {
  outline: none;
  box-shadow: 0 0 10px #e94560;
}
```

**Pregunta:** ¿Por qué esto es más fácil en React que en Vanilla?

<details>
<summary>Ver respuesta</summary>

Porque en React:
1. `useState` hace que cualquier cambio actualice automáticamente la UI
2. No necesitas manipular el DOM manualmente
3. No necesitas event listeners manuales (usas `onChange`)
4. La UI es declarativa: describes cómo se ve, React la actualiza

En Vanilla necesitarías:
1. `addEventListener` en el input
2. Volver a renderizar toda la lista manualmente
3. Manejar el estado de búsqueda en una variable
</details>

---

## 🧪 Ejercicios de Experimentación

### Ejercicio 8: Romper y Arreglar

**Vanilla TypeScript:**

1. En `main.ts`, comenta la línea `renderBillboard()`
   - ¿Qué pasa?
   - ¿Por qué?

2. Cambia `innerHTML` por `textContent`
   - ¿Qué ves?
   - ¿Cuál es la diferencia?

**React:**

1. En `App.tsx`, comenta el `useEffect`
   - ¿Qué pasa?
   - ¿Por qué?

2. En el `.map()`, quita el atributo `key`
   - ¿Ves un error en consola?
   - ¿Qué dice?

3. Cambia `className` por `class`
   - ¿Funciona?
   - Mira la consola

---

### Ejercicio 9: Debugging

**Tarea:** En AMBOS proyectos, agrega un `console.log` para ver cuándo se cargan los datos.

**Vanilla TypeScript** (`main.ts`):

```typescript
async function renderBillboard() {
  console.log('🎬 Cargando películas...')
  const movies = await getMovies()
  console.log('✅ Películas cargadas:', movies.length)
  // ...
}
```

**React** (`App.tsx`):

```typescript
useEffect(() => {
  async function loadMovies() {
    console.log('🎬 Cargando películas...')
    const data = await getMovies()
    console.log('✅ Películas cargadas:', data.length)
    setMovies(data)
    setLoading(false)
  }
  loadMovies()
}, [])
```

**Pregunta:** Abre la consola (F12) y recarga la página. ¿Cuántas veces se ejecuta cada log?

<details>
<summary>Ver respuesta</summary>

- **Vanilla:** Una vez (cuando se ejecuta `renderBillboard()`)
- **React:** Dos veces en desarrollo (porque `StrictMode` ejecuta los efectos dos veces para detectar bugs). En producción solo una vez.
</details>

---

## 🎓 Ejercicio Final: Proyecto Completo

**Objetivo:** Crear un formulario para agregar películas.

**Requisitos:**

1. Input para título
2. Input para URL de imagen
3. Textarea para descripción
4. Select para género
5. Al hacer submit, agregar la película a Supabase
6. Actualizar la lista automáticamente

**Pistas:**

- Necesitarás crear una función `addMovie` en `api/movies.ts`
- Usa `POST` con `fetch`
- En React, usa `useState` para los inputs
- Después de agregar, vuelve a cargar la lista

**Desafío:** Implementa esto en AMBOS proyectos y compara:
- ¿Cuál fue más fácil?
- ¿Cuál tiene menos código?
- ¿En cuál te equivocaste más?

---

## ✅ Checklist de Comprensión

Marca cuando puedas explicar cada concepto:

### Conceptos Generales
- [ ] Diferencia entre `class` y `className`
- [ ] Por qué algunos archivos son iguales en ambos proyectos
- [ ] Ventajas de separar en capas (config, types, api, components)
- [ ] Cuándo usar Vanilla vs React

### Vanilla TypeScript
- [ ] Qué hace `innerHTML`
- [ ] Cómo funcionan los template literals
- [ ] Por qué `.map().join('')`
- [ ] Cómo se ejecuta el código (secuencial)

### React
- [ ] Qué es JSX
- [ ] Cómo funciona `useState`
- [ ] Cuándo se ejecuta `useEffect`
- [ ] Por qué necesitamos `key` en listas
- [ ] Qué son las props
- [ ] Qué es el renderizado condicional
- [ ] Diferencia entre componente con/sin estado

---

## 🚀 Próximos Pasos

Una vez completes estos ejercicios:

1. **Compara tu código** con el original
2. **Pregunta a tus compañeros** cómo lo resolvieron
3. **Experimenta** con otras funcionalidades
4. **Lee la documentación** oficial de React
5. **Construye tu propio proyecto** desde cero

---

## 💡 Consejos

1. **No copies y pegues**: escribe el código para entenderlo mejor
2. **Usa console.log**: es tu mejor amigo para debugging
3. **Lee los errores**: TypeScript y React dan buenos mensajes de error
4. **Compara constantemente**: mira ambos proyectos lado a lado
5. **Pregunta**: si no entiendes algo, pregunta

---

¡Buena suerte con los ejercicios! 🎯
