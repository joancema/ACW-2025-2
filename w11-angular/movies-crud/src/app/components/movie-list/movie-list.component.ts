// ============================================
// COMPONENTE MOVIE LIST - Administración
// ============================================
// Lista de películas con opciones de crear, editar y eliminar

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent implements OnInit, OnDestroy {
  movies: Movie[] = [];
  loading = true;
  private subscription?: Subscription;

  constructor(
    private movieService: MovieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadMovies(): void {
    this.loading = true;
    
    this.subscription = this.movieService.getMovies().subscribe({
      next: (data) => {
        this.movies = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar películas:', error);
        this.loading = false;
      }
    });
  }

  onEdit(movie: Movie): void {
    this.router.navigate(['/admin/edit', movie.id]);
  }

  onDelete(movie: Movie): void {
    if (confirm(`¿Estás seguro de eliminar "${movie.title}"?`)) {
      this.movieService.deleteMovie(movie.id).subscribe({
        next: (success) => {
          if (success) {
            this.loadMovies(); // Recargar la lista
          }
        },
        error: (error) => {
          console.error('Error al eliminar película:', error);
          alert('Error al eliminar la película');
        }
      });
    }
  }

  onCreate(): void {
    this.router.navigate(['/admin/new']);
  }
}
