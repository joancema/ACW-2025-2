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

