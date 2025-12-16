import type { IMovie } from "../interfaces/movie";

interface MovieCardProps {
    movie: IMovie;
}

export function MovieCard({ movie }: MovieCardProps ) {
    return (
    <div>
        <h1>{movie.title}</h1>
        <p>{movie.description}</p>
        <img src={movie.image} alt={movie.title} />
        <p>{movie.rating}</p>
    </div>  
    )
}