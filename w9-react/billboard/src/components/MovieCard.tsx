// ============================================
// COMPONENTE MOVIE CARD (REACT)
// ============================================
// Este componente recibe los datos de una película
// y retorna JSX (similar a HTML pero en React).
// 
// DIFERENCIA CON VANILLA TS:
// - En lugar de retornar un string de HTML,
//   retorna elementos JSX
// - React re-renderiza automáticamente cuando cambian los datos

import type { Movie } from '../types/movie'

// Props: parámetros que recibe el componente
interface MovieCardProps {
  movie: Movie
}

// Componente funcional de React
export function MovieCard({ movie }: MovieCardProps) {
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
        <p className="movie-description">{movie.description}</p>
      </div>
    </div>
  )
}
