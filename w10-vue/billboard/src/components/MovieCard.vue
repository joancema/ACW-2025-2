<!-- ============================================
     COMPONENTE MOVIE CARD (VUE)
     ============================================
     Este componente recibe los datos de una película
     y los muestra en una tarjeta visual.
     
     DIFERENCIA CON REACT:
     - En lugar de una función que retorna JSX,
       Vue usa Single File Components (.vue)
     - Template HTML puro en lugar de JSX
     - defineProps en lugar de interface + desestructuración
     - {{ }} para interpolación en lugar de { }
     - class en lugar de className
     - :src en lugar de src={}
-->

<script setup lang="ts">
// ============================================
// IMPORTS
// ============================================
import type { Movie } from '../types/movie'

// ============================================
// PROPS
// ============================================
// defineProps: Macro de Vue para definir las props
// Es equivalente a:
// interface MovieCardProps { movie: Movie }
// function MovieCard({ movie }: MovieCardProps)

defineProps<{
  movie: Movie
}>()
</script>

<template>
  <!-- ============================================
       TEMPLATE
       ============================================
       HTML puro con directivas de Vue
       
       Diferencias con React JSX:
       - class en lugar de className
       - :src="movie.image" en lugar de src={movie.image}
       - {{ movie.title }} en lugar de {movie.title}
  -->
  
  <div class="movie-card">
    <!-- 
      :src es atajo de v-bind:src
      Enlaza dinámicamente el atributo src con el valor de movie.image
    -->
    <img 
      :src="movie.image" 
      :alt="movie.title" 
      class="movie-poster"
    />
    <div class="movie-info">
      <!-- 
        {{ }} es la sintaxis de interpolación de Vue (mustache syntax)
        Equivalente a {movie.title} en React
      -->
      <h3 class="movie-title">{{ movie.title }}</h3>
      <span class="movie-genre">{{ movie.genre }}</span>
      <p class="movie-description">{{ movie.description }}</p>
    </div>
  </div>
</template>

