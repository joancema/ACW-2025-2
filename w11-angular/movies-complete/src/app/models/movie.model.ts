// ============================================
// INTERFACE MOVIE
// ============================================
// Define la estructura de datos de una película.
// Incluye referencia a la categoría mediante category_id

export interface Movie {
  id: string;
  title: string;
  image: string;
  description: string;
  category_id: string;
  created_at?: string;
}

// ============================================
// INTERFACE MOVIE WITH DETAILS
// ============================================
// Película con información completa de categoría y actores
// Útil para mostrar en la lista de películas

export interface MovieWithDetails extends Movie {
  category?: {
    id: string;
    name: string;
  };
  actors?: Array<{
    id: string;
    name: string;
  }>;
}
