# 🎯 Ejercicios Prácticos - Vue vs React

Estos ejercicios te ayudarán a entender las diferencias entre Vue y React.

---

## 📝 Ejercicios de Observación

### Ejercicio 1: Comparar Archivos Idénticos

**Tarea:** Abre estos archivos en ambos proyectos (React y Vue) y confirma que son IDÉNTICOS:

1. `src/config/supabase.ts`
2. `src/types/movie.ts`
3. `src/api/movies.ts`

**Pregunta:** ¿Por qué estos archivos no cambian entre React y Vue?

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
- `w9-react/billboard/src/components/MovieCard.tsx` (React)
- `w10-vue/billboard/src/components/MovieCard.vue` (Vue)

**Preguntas:**

1. ¿Cómo se definen las props?
   - React: _________
   - Vue: _________

2. ¿Cómo se insertan las variables?
   - React: `{movie.title}`
   - Vue: _________

3. ¿Cómo se llama el atributo de clase CSS?
   - React: `className="..."`
   - Vue: _________

4. ¿Cómo se hace binding dinámico de atributos?
   - React: `src={movie.image}`
   - Vue: _________

<details>
<summary>Ver respuestas</summary>

1. React usa `interface + desestructuración`, Vue usa `defineProps<T>()`
2. Vue usa `{{ movie.title }}` (doble llave)
3. Vue usa `class="..."` (normal, sin `className`)
4. Vue usa `:src="movie.image"` (con dos puntos)
</details>

---

### Ejercicio 3: Comparar la Lógica Principal

**Tarea:** Compara estos archivos:
- `w9-react/billboard/src/App.tsx`
- `w10-vue/billboard/src/App.vue`

**Completa la tabla:**

| Aspecto | React | Vue |
|---------|-------|-----|
| ¿Cómo se guardan las películas? | useState | _________ |
| ¿Cómo se accede al valor? | movies | _________ |
| ¿Cómo se actualiza? | setMovies(data) | _________ |
| ¿Cuándo se cargan los datos? | useEffect | _________ |
| ¿Cómo se muestra "Cargando"? | if + return | _________ |
| ¿Cómo se itera la lista? | .map() | _________ |

<details>
<summary>Ver respuestas</summary>

| Aspecto | React | Vue |
|---------|-------|-----|
| ¿Cómo se guardan las películas? | useState | `ref()` |
| ¿Cómo se accede al valor? | movies | `movies.value` (en JS), `movies` (en template) |
| ¿Cómo se actualiza? | setMovies(data) | `movies.value = data` |
| ¿Cuándo se cargan los datos? | useEffect | `onMounted()` |
| ¿Cómo se muestra "Cargando"? | if + return | `v-if` |
| ¿Cómo se itera la lista? | .map() | `v-for` |
</details>

---

## 💻 Ejercicios de Código

### Ejercicio 4: Agregar un Contador (Fácil)

**En la versión Vue**, agrega un contador de películas.

**Pistas:**
1. En `App.vue`, dentro del template, debajo del `<h1>`, agrega:
   ```vue
   <p class="count">Total de películas: {{ movies.length }}</p>
   ```

2. Agrega estilos en `App.css`:
   ```css
   .count {
     text-align: center;
     color: #aaa;
     margin-top: 10px;
   }
   ```

**Pregunta:** ¿Notaste que no necesitas `.value` en el template?

<details>
<summary>Ver explicación</summary>

En el template de Vue, puedes acceder directamente a `movies.length` sin usar `.value`. Vue automáticamente "desenvuelve" los refs en los templates.

Solo necesitas `.value` cuando accedes a refs en el código JavaScript/TypeScript.
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

**Paso 2 (Vue):** Actualiza `MovieCard.vue`:

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
      <p class="movie-rating">{{ '⭐'.repeat(movie.rating) }}</p>  <!-- ⭐ Nuevo -->
      <p class="movie-description">{{ movie.description }}</p>
    </div>
  </div>
</template>
```

**Nota:** En Vue puedes usar expresiones JavaScript dentro de `{{ }}`.

---

### Ejercicio 6: Filtrar por Género (Difícil)

**Solo en Vue**, agrega botones para filtrar películas.

**Paso 1:** Agrega un nuevo estado en `App.vue`:

```vue
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { getMovies } from './api/movies'
import MovieCard from './components/MovieCard.vue'
import type { Movie } from './types/movie'
import './App.css'

const movies = ref<Movie[]>([])
const loading = ref(true)
const selectedGenre = ref<string>('all')  // ⭐ Nuevo

// ... resto del código
</script>
```

**Paso 2:** Crea una computed property para filtrar:

```typescript
const filteredMovies = computed(() => {
  if (selectedGenre.value === 'all') {
    return movies.value
  }
  return movies.value.filter(m => m.genre === selectedGenre.value)
})
```

**Paso 3:** Obtén los géneros únicos:

```typescript
const genres = computed(() => {
  return ['all', ...new Set(movies.value.map(m => m.genre))]
})
```

**Paso 4:** Agrega botones en el template:

```vue
<template>
  <div id="app">
    <p v-if="loading" class="loading">Cargando cartelera...</p>

    <p v-else-if="movies.length === 0" class="empty">
      No hay películas en cartelera
    </p>

    <template v-else>
      <header class="header">
        <h1>Cartelera de Cine</h1>
        <div class="filters">
          <button
            v-for="genre in genres"
            :key="genre"
            @click="selectedGenre = genre"
            :class="{ active: selectedGenre === genre }"
          >
            {{ genre === 'all' ? 'Todas' : genre }}
          </button>
        </div>
      </header>
      <main class="billboard">
        <MovieCard 
          v-for="movie in filteredMovies" 
          :key="movie.id" 
          :movie="movie" 
        />
      </main>
    </template>
  </div>
</template>
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

**Conceptos nuevos de Vue:**
- `computed()`: Propiedades calculadas que se actualizan automáticamente
- `@click`: Atajo para `v-on:click` (eventos)
- `:class="{ active: condition }"`: Clases dinámicas

---

### Ejercicio 7: Búsqueda en Tiempo Real (Difícil)

**Solo en Vue**, agrega un campo de búsqueda.

**Paso 1:** Agrega un nuevo estado:

```typescript
const searchTerm = ref('')
```

**Paso 2:** Actualiza la computed property para filtrar por búsqueda Y género:

```typescript
const filteredMovies = computed(() => {
  let result = movies.value

  // Filtrar por género
  if (selectedGenre.value !== 'all') {
    result = result.filter(m => m.genre === selectedGenre.value)
  }

  // Filtrar por búsqueda
  if (searchTerm.value) {
    result = result.filter(m => 
      m.title.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
  }

  return result
})
```

**Paso 3:** Agrega el input en el template:

```vue
<div class="search">
  <input
    type="text"
    placeholder="Buscar película..."
    v-model="searchTerm"
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

**Concepto nuevo de Vue:**
- `v-model`: Two-way data binding (enlace bidireccional)

**Pregunta:** ¿Notaste lo simple que es con `v-model`?

<details>
<summary>Ver explicación</summary>

En Vue, `v-model` es un atajo para:
```vue
<input 
  :value="searchTerm" 
  @input="searchTerm = $event.target.value"
/>
```

Es mucho más simple que en React donde necesitas:
```jsx
<input 
  value={searchTerm} 
  onChange={(e) => setSearchTerm(e.target.value)}
/>
```
</details>

---

## 🧪 Ejercicios de Experimentación

### Ejercicio 8: Romper y Arreglar

**Vue:**

1. En `App.vue`, en el script, intenta acceder a `movies` sin `.value`
   - ¿Qué pasa?
   - ¿Por qué?

2. En el template, intenta usar `movies.value`
   - ¿Funciona?
   - ¿Es necesario?

3. Cambia `class` por `className`
   - ¿Funciona?
   - ¿Qué pasa?

4. En el `v-for`, quita el atributo `:key`
   - ¿Ves un warning en consola?
   - ¿Qué dice?

5. Olvida importar `ref` de 'vue'
   - ¿Qué error ves?

---

### Ejercicio 9: Debugging

**Tarea:** En Vue, agrega un `console.log` para ver cuándo se cargan los datos.

```typescript
onMounted(() => {
  console.log('🎬 Montando componente...')
  loadMovies()
})

async function loadMovies() {
  console.log('📡 Cargando películas...')
  loading.value = true
  const data = await getMovies()
  console.log('✅ Películas cargadas:', data.length)
  movies.value = data
  loading.value = false
}
```

**Pregunta:** Abre la consola (F12) y recarga la página. ¿Cuántas veces se ejecuta cada log?

---

### Ejercicio 10: Computed vs Methods

**Tarea:** Compara estas dos formas de filtrar películas:

**Opción A: Computed (Recomendado)**
```typescript
const filteredMovies = computed(() => {
  return movies.value.filter(m => m.genre === selectedGenre.value)
})
```

**Opción B: Method**
```typescript
function getFilteredMovies() {
  return movies.value.filter(m => m.genre === selectedGenre.value)
}
```

**En el template:**
```vue
<!-- Computed -->
<MovieCard v-for="movie in filteredMovies" ... />

<!-- Method -->
<MovieCard v-for="movie in getFilteredMovies()" ... />
```

**Pregunta:** ¿Cuál es mejor y por qué?

<details>
<summary>Ver respuesta</summary>

**Computed es mejor** porque:
1. Se cachea: Solo se recalcula cuando cambian sus dependencias
2. Más eficiente: No se ejecuta en cada renderizado
3. Más declarativo: Describe qué es, no cómo calcularlo

**Methods** se ejecutan cada vez que el componente se renderiza, incluso si las dependencias no cambiaron.
</details>

---

## 🎓 Ejercicio Final: Proyecto Completo

**Objetivo:** Crear un formulario para agregar películas.

**Requisitos:**

1. Input para título (con `v-model`)
2. Input para URL de imagen (con `v-model`)
3. Textarea para descripción (con `v-model`)
4. Select para género (con `v-model`)
5. Al hacer submit, agregar la película a Supabase
6. Actualizar la lista automáticamente

**Pistas:**

- Necesitarás crear una función `addMovie` en `api/movies.ts`
- Usa `POST` con `fetch`
- En Vue, usa `ref()` para cada campo del formulario
- Usa `v-model` para enlazar inputs con refs
- Usa `@submit.prevent` para prevenir el comportamiento por defecto

**Estructura del formulario:**

```vue
<script setup lang="ts">
const newMovie = ref({
  title: '',
  image: '',
  description: '',
  genre: ''
})

async function handleSubmit() {
  // Agregar película a Supabase
  // Recargar lista
  // Limpiar formulario
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="newMovie.title" placeholder="Título" />
    <input v-model="newMovie.image" placeholder="URL imagen" />
    <textarea v-model="newMovie.description" placeholder="Descripción" />
    <select v-model="newMovie.genre">
      <option value="Acción">Acción</option>
      <option value="Drama">Drama</option>
      <!-- más opciones -->
    </select>
    <button type="submit">Agregar</button>
  </form>
</template>
```

---

## ✅ Checklist de Comprensión

Marca cuando puedas explicar cada concepto:

### Conceptos Generales
- [ ] Diferencia entre `class` y `className` (React vs Vue)
- [ ] Por qué algunos archivos son iguales en ambos proyectos
- [ ] Ventajas de separar en capas
- [ ] Cuándo usar Vue vs React

### Vue Específico
- [ ] Qué es un Single File Component (.vue)
- [ ] Cómo funciona `ref()` y cuándo usar `.value`
- [ ] Cuándo se ejecuta `onMounted()`
- [ ] Qué son las props y cómo se definen con `defineProps`
- [ ] Por qué necesitamos `:key` en `v-for`
- [ ] Qué es el renderizado condicional con `v-if`
- [ ] Qué es `v-model` y cómo funciona
- [ ] Diferencia entre `computed` y `methods`
- [ ] Qué son las directivas (`v-if`, `v-for`, `v-bind`, `v-on`)
- [ ] Atajos: `:` para `v-bind`, `@` para `v-on`

### Comparación React vs Vue
- [ ] `useState` vs `ref()`
- [ ] `useEffect` vs `onMounted()`
- [ ] JSX vs Template
- [ ] `{variable}` vs `{{ variable }}`
- [ ] `.map()` vs `v-for`
- [ ] Eventos en React vs Vue

---

## 🚀 Próximos Pasos

Una vez completes estos ejercicios:

1. **Compara tu código** con el original
2. **Pregunta a tus compañeros** cómo lo resolvieron
3. **Experimenta** con otras funcionalidades
4. **Lee la documentación** oficial de Vue
5. **Construye tu propio proyecto** desde cero

---

## 💡 Consejos

1. **No copies y pegues**: escribe el código para entenderlo mejor
2. **Usa console.log**: es tu mejor amigo para debugging
3. **Lee los errores**: Vue da buenos mensajes de error
4. **Compara constantemente**: mira React y Vue lado a lado
5. **Pregunta**: si no entiendes algo, pregunta
6. **Usa Vue DevTools**: Extensión de navegador para debugging

---

## 🔧 Vue DevTools

Instala la extensión Vue DevTools en tu navegador:
- [Chrome](https://chrome.google.com/webstore/detail/vuejs-devtools/)
- [Firefox](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)

Te permite:
- Ver el estado de los componentes
- Inspeccionar props
- Ver eventos
- Time-travel debugging

---

## 📚 Recursos Adicionales

- [Vue 3 Docs (Español)](https://es.vuejs.org/)
- [Vue School](https://vueschool.io/) - Cursos gratuitos
- [Vue Mastery](https://www.vuemastery.com/) - Tutoriales avanzados

---

¡Buena suerte con los ejercicios! 🎯

