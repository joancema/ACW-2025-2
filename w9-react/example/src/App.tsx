import type { IMovie } from './interfaces/movie'
import { useState, useEffect } from 'react'
import { MovieCard } from './components/movie'
import { getMoviesArray } from './apis/movies'
import './App.css'

function App() {
  const [movies, setMovies] = useState<IMovie[]>([]);

  useEffect(() => {
    setMovies(getMoviesArray());
  }, []);

  if (movies.length === 0) {
    return (
      <div>
        <h1>No hay películas</h1>
      </div>
    )
  }

  return (
    <div>
      {
      movies.map((movie: IMovie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))
      }
    </div>
  )
}

export default App
