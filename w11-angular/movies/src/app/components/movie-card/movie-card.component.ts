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
// - Template y estilos pueden estar en archivos separados

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
  
  // template: El HTML del componente (inline para componentes pequeños)
  // También se puede usar templateUrl: './movie-card.component.html'
  template: `
    <!-- ============================================
         TEMPLATE - HTML DEL COMPONENTE
         ============================================
         DIFERENCIAS CON REACT/VUE:
         - Binding de propiedades: [src]="movie.image"
           React: src={movie.image}
           Vue: :src="movie.image"
         - Interpolación: {{ movie.title }}
           React: {movie.title}
           Vue: {{ movie.title }}
         - class normal (igual que Vue, diferente de React className)
    -->
    
    <div class="movie-card">
      <img 
        [src]="movie.image" 
        [alt]="movie.title" 
        class="movie-poster"
      />
      <div class="movie-info">
        <h3 class="movie-title">{{ movie.title }}</h3>
        <span class="movie-genre">{{ movie.genre }}</span>
        <p class="movie-description">{{ movie.description }}</p>
      </div>
    </div>
  `,
  
  // styles: Estilos del componente (encapsulados por defecto)
  styles: [`
    /* ============================================
       ESTILOS DEL COMPONENTE
       ============================================
       Angular encapsula los estilos por defecto,
       así que estos estilos NO afectan otros componentes.
    */
    
    .movie-card {
      background-color: #16213e;
      border-radius: 10px;
      overflow: hidden;
      transition: transform 0.3s;
    }

    .movie-card:hover {
      transform: scale(1.03);
    }

    .movie-poster {
      width: 100%;
      height: 350px;
      object-fit: cover;
    }

    .movie-info {
      padding: 15px;
    }

    .movie-title {
      font-size: 1.2rem;
      margin-bottom: 8px;
      color: #fff;
    }

    .movie-genre {
      display: inline-block;
      background-color: #e94560;
      color: #fff;
      padding: 4px 10px;
      border-radius: 15px;
      font-size: 0.8rem;
      margin-bottom: 10px;
    }

    .movie-description {
      font-size: 0.9rem;
      color: #aaa;
      line-height: 1.4;
    }
  `]
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
