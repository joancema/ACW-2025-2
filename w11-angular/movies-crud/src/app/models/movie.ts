// ============================================
// INTERFACE MOVIE
// ============================================
// Define la estructura de datos de una película.
// Esto permite que TypeScript valide que estamos
// usando los campos correctos en todo el código.
//
// ✅ IGUAL que en React y Vue - Las interfaces TypeScript
// son independientes del framework.

export interface Movie {
  id: string
  title: string
  image: string
  description: string
  genre: string
}
