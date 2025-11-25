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

