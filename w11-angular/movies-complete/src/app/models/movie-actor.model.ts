// ============================================
// INTERFACE MOVIE-ACTOR
// ============================================
// Define la relación muchos a muchos entre películas y actores.
// Esta tabla intermedia permite que:
// - Una película tenga muchos actores
// - Un actor pueda aparecer en muchas películas

export interface MovieActor {
  id: string;
  movie_id: string;
  actor_id: string;
  created_at?: string;
}
