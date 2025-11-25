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
