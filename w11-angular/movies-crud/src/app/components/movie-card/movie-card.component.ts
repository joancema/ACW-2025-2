// ============================================
// COMPONENTE MOVIE CARD (ANGULAR)
// ============================================
// Este componente recibe los datos de una película
// y los muestra en una tarjeta visual.
//
// DIFERENCIAS CON REACT/VUE:
// - Angular usa decoradores (@Component, @Input)
// - Los componentes son clases TypeScript
// - Las props se definen con @Input()
// - Template y estilos están en archivos separados

import { Component, Input } from '@angular/core';
import { Movie } from '../../models/movie';

@Component({
  // ============================================
  // METADATOS DEL COMPONENTE
  // ============================================
  
  // selector: Cómo se usa el componente en HTML
  // Equivalente a: <MovieCard /> en React/Vue
  selector: 'app-movie-card',
  
  // standalone: true permite usar el componente sin módulos
  // (característica moderna de Angular 14+)
  standalone: true,
  
  // imports: Otros componentes/módulos que usa este componente
  imports: [],
  
  // templateUrl: Archivo HTML separado (generado por el CLI)
  templateUrl: './movie-card.component.html',
  
  // styleUrl: Archivo CSS separado (generado por el CLI)
  styleUrl: './movie-card.component.css'
})
export class MovieCardComponent {
  // ============================================
  // INPUT: PROPS DEL COMPONENTE
  // ============================================
  // @Input() define una propiedad que se puede pasar desde el padre
  //
  // Comparación:
  // React:  function MovieCard({ movie }: { movie: Movie })
  // Vue:    defineProps<{ movie: Movie }>()
  // Angular: @Input() movie!: Movie
  //
  // El ! indica que TypeScript debe confiar en que
  // siempre se pasará un valor (required input)

  @Input() movie!: Movie;
}
