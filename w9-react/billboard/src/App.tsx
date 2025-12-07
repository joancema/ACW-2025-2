// ============================================
// COMPONENTE PRINCIPAL - APP (REACT)
// ============================================
// Este es el componente raíz que orquesta toda la aplicación.
//
// DIFERENCIAS CON VANILLA TS:
// - Usa hooks (useState, useEffect) para manejar estado y efectos
// - React maneja el DOM automáticamente
// - No necesitamos innerHTML ni manipulación directa del DOM

import { useState, useEffect } from 'react'
import { getMovies } from './api/movies'
import { MovieCard } from './components/MovieCard'
import type { Movie } from './types/movie'
import './App.css'

function App() {
  // ============================================
  // ESTADO DEL COMPONENTE
  // ============================================
  // useState: Hook que guarda datos que pueden cambiar
  
  // Estado para guardar las películas
  const [movies, setMovies] = useState<Movie[]>([])
  
  // Estado para saber si está cargando
  const [loading, setLoading] = useState(true)

  // ============================================
  // EFECTOS (Side Effects)
  // ============================================
  // useEffect: Hook que ejecuta código cuando el componente se monta
  // Similar a hacer la petición al cargar la página en Vanilla
  
  useEffect(() => {
    // Función asíncrona para cargar las películas
    async function loadMovies() {
      setLoading(true)
      const data = await getMovies()
      setMovies(data)
      setLoading(false)
    }

    // Ejecutamos la función
    loadMovies()
  }, []) // [] significa: ejecutar solo una vez al montar el componente

  // ============================================
  // RENDERIZADO CONDICIONAL
  // ============================================
  
  // Mientras carga, mostramos mensaje
  if (loading) {
    return (
      <div id="app">
        <p className="loading">Cargando cartelera...</p>
      </div>
    )
  }

  // Si no hay películas, mostramos mensaje
  if (movies.length === 0) {
    return (
      <div id="app">
        <p className="empty">No hay películas en cartelera</p>
      </div>
    )
  }

  // ============================================
  // RENDERIZADO PRINCIPAL
  // ============================================
  // JSX: sintaxis similar a HTML pero con superpoderes
  // - Podemos usar {} para insertar código JavaScript
  // - .map() para iterar y crear componentes
  // - className en lugar de class (porque class es palabra reservada en JS)
  
  return (
    <div id="app">
      <header className="header">
        <h1>Cartelera de Cine</h1>
      </header>
      <main className="billboard">
        {/* 
          .map(): Por cada película, creamos un componente MovieCard
          key: React necesita una key única para optimizar el renderizado
        */}
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </main>
    </div>
  )
}

export default App
