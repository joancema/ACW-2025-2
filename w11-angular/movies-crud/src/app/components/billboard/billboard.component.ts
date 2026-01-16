// ============================================
// COMPONENTE BILLBOARD - Cartelera Pública
// ============================================
// Muestra las películas en formato de cartelera

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieService } from '../../services/movie.service';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { Movie } from '../../models/movie';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-billboard',
  standalone: true,
  imports: [MovieCardComponent, RouterLink],
  templateUrl: './billboard.component.html',
  styleUrl: './billboard.component.css'
})
export class BillboardComponent implements OnInit, OnDestroy {
  movies: Movie[] = [];
  loading = true;
  private subscription?: Subscription;

  constructor(private movieService: MovieService) {}

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
}
