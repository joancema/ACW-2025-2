<!-- ============================================
     COMPONENTE PRINCIPAL - APP (VUE)
     ============================================
     Este es el componente raíz que orquesta toda la aplicación.
     
     DIFERENCIAS CON REACT:
     - Usa Composition API (ref, onMounted) en lugar de hooks
     - Template HTML puro en lugar de JSX
     - Directivas (v-if, v-for) en lugar de JavaScript
     - class en lugar de className
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
// ref: Crea una referencia reactiva (similar a useState de React)
// En JavaScript usamos .value, en el template Vue lo hace automático

// Estado para guardar las películas
const movies = ref<Movie[]>([])

// Estado para saber si está cargando
const loading = ref(true)

// ============================================
// FUNCIONES
// ============================================

// Función para cargar las películas desde Supabase
async function loadMovies() {
  loading.value = true
  const data = await getMovies()
  movies.value = data
  loading.value = false
}

// ============================================
// LIFECYCLE HOOKS
// ============================================
// onMounted: Se ejecuta cuando el componente se monta en el DOM
// Similar a useEffect(() => {}, []) en React

onMounted(() => {
  loadMovies()
})
</script>

<template>
  <!-- ============================================
       RENDERIZADO CONDICIONAL
       ============================================
       Vue usa directivas (v-if, v-else-if, v-else)
       en lugar de operadores ternarios o if + return
  -->
  
  <div id="app">
    <!-- Mientras carga, mostramos mensaje -->
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
          v-for: Directiva para iterar sobre arrays (similar a .map() en React)
          :key: Vue necesita una key única para optimizar el renderizado
          :movie: Pasamos la prop movie al componente (equivalente a movie={movie})
          
          Nota: En el template no necesitamos movies.value, Vue lo hace automático
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
