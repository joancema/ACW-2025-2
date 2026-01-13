// ============================================
// COMPONENTE PRINCIPAL - APP (ANGULAR)
// ============================================
// Este es el componente raíz que orquesta toda la aplicación.
//
// DIFERENCIAS CON REACT/VUE:
// - Angular usa decoradores (@Component)
// - Inyección de dependencias para servicios
// - Lifecycle hooks como métodos de clase (ngOnInit)
// - Template separado del código TypeScript

import { Component, OnInit, inject } from '@angular/core';
import { MovieService } from './services/movie.service';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { Movie } from './models/movie';

@Component({
  // ============================================
  // METADATOS DEL COMPONENTE
  // ============================================
  selector: 'app-root',
  standalone: true,
  
  // imports: Componentes y módulos que usa este componente
  // Aquí importamos MovieCardComponent para usarlo en el template
  imports: [MovieCardComponent],
  
  // templateUrl: Archivo HTML separado
  templateUrl: './app.component.html',
  
  // styleUrl: Archivo CSS separado
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  // ============================================
  // INYECCIÓN DE DEPENDENCIAS
  // ============================================
  // inject() es la forma moderna de inyectar servicios en Angular 14+
  // También se puede usar el constructor tradicional:
  // constructor(private movieService: MovieService) {}
  
  private movieService = inject(MovieService);

  // ============================================
  // ESTADO DEL COMPONENTE
  // ============================================
  // En Angular, el estado son propiedades de la clase.
  //
  // Comparación:
  // React:   const [movies, setMovies] = useState<Movie[]>([])
  // Vue:     const movies = ref<Movie[]>([])
  // Angular: movies: Movie[] = []
  
  movies: Movie[] = [];
  loading = true;

  // ============================================
  // LIFECYCLE HOOK: ngOnInit
  // ============================================
  // Se ejecuta cuando el componente se inicializa.
  //
  // Comparación:
  // React:   useEffect(() => { loadMovies() }, [])
  // Vue:     onMounted(() => { loadMovies() })
  // Angular: ngOnInit() { this.loadMovies() }

  ngOnInit(): void {
    this.loadMovies();
  }

  // ============================================
  // MÉTODO PARA CARGAR PELÍCULAS
  // ============================================
  // La lógica es la misma que en React/Vue,
  // solo cambia la sintaxis para actualizar el estado.

  async loadMovies(): Promise<void> {
    this.loading = true;
    this.movies = await this.movieService.getMovies();
    this.loading = false;
  }
}
