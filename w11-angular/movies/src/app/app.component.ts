// ============================================
// COMPONENTE PRINCIPAL - APP (ANGULAR)
// ============================================
// Este es el componente raíz que orquesta toda la aplicación.
//
// DIFERENCIAS CON REACT/VUE:
// - Angular usa decoradores (@Component)
// - Inyección de dependencias para servicios
// - Lifecycle hooks como métodos de clase (ngOnInit, ngOnDestroy)
// - Trabaja con Observables (patrón reactivo)

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
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
export class AppComponent implements OnInit, OnDestroy {
  // ============================================
  // INYECCIÓN DE DEPENDENCIAS
  // ============================================
  // MovieService se inyecta automáticamente por Angular
  // No necesitamos importarlo manualmente como en React/Vue
  
  private movieService = MovieService;
  private subscription?: Subscription;

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

  // Constructor: Se ejecuta cuando se crea la instancia
  constructor(private movieServiceInstance: MovieService) {
    this.movieService = MovieService;
  }

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
  // LIFECYCLE HOOK: ngOnDestroy
  // ============================================
  // Se ejecuta cuando el componente se destruye.
  // Es importante cancelar las suscripciones para evitar memory leaks.

  ngOnDestroy(): void {
    // Cancelar la suscripción si existe
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // ============================================
  // MÉTODO PARA CARGAR PELÍCULAS
  // ============================================
  // Usa Observables (patrón reactivo de Angular)
  //
  // Comparación:
  // React/Vue: async loadMovies() { const data = await getMovies(); setMovies(data) }
  // Angular:   loadMovies() { this.service.getMovies().subscribe(data => this.movies = data) }

  loadMovies(): void {
    this.loading = true;
    
    // subscribe() es como .then() en Promises
    // Pero con más control: next, error, complete
    this.subscription = this.movieServiceInstance.getMovies().subscribe({
      // next: Se ejecuta cuando llegan los datos
      next: (data) => {
        this.movies = data;
        this.loading = false;
      },
      
      // error: Se ejecuta si hay un error
      error: (error) => {
        console.error('Error al cargar películas:', error);
        this.loading = false;
      },
      
      // complete: Se ejecuta cuando el Observable termina (opcional)
      complete: () => {
        console.log('Carga de películas completada');
      }
    });
  }
}
