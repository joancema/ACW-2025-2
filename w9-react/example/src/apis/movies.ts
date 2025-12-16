import type { IMovie } from "../interfaces/movie";



export async function get<T>(url: string): Promise<T[]> {
  const response = await fetch(url);
  const data: T[] = await response.json();
  return data;
}
export  function getMoviesArray(): IMovie[] {
    return [
        {id: '1', title: 'Movie 1', description: 'Description 1', image: 'image 1', rating: 1},
        {id: '2', title: 'Movie 2', description: 'Description 2', image: 'image 2', rating: 2},
    ] 
}