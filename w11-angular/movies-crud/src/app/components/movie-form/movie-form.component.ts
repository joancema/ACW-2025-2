// ============================================
// COMPONENTE MOVIE FORM - Crear/Editar
// ============================================
// Formulario reactivo para crear o editar películas

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './movie-form.component.html',
  styleUrl: './movie-form.component.css'
})
export class MovieFormComponent implements OnInit {
  movieForm: FormGroup;
  isEditMode = false;
  movieId: string | null = null;
  loading = false;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private movieService: MovieService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Inicializar el formulario con validaciones
    this.movieForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      genre: ['', [Validators.required]],
      image: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/)]],
      description: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    // Verificar si estamos en modo edición
    this.movieId = this.route.snapshot.paramMap.get('id');
    
    if (this.movieId) {
      this.isEditMode = true;
      this.loadMovie(this.movieId);
    }
  }

  loadMovie(id: string): void {
    this.loading = true;
    
    this.movieService.getMovie(id).subscribe({
      next: (movie) => {
        if (movie) {
          this.movieForm.patchValue({
            title: movie.title,
            genre: movie.genre,
            image: movie.image,
            description: movie.description
          });
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar película:', error);
        this.loading = false;
        alert('Error al cargar la película');
        this.router.navigate(['/admin']);
      }
    });
  }

  onSubmit(): void {
    if (this.movieForm.invalid) {
      // Marcar todos los campos como tocados para mostrar errores
      Object.keys(this.movieForm.controls).forEach(key => {
        this.movieForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.submitting = true;
    const movieData = this.movieForm.value;

    if (this.isEditMode && this.movieId) {
      // Actualizar película existente
      this.movieService.updateMovie(this.movieId, movieData).subscribe({
        next: (result) => {
          if (result) {
            alert('Película actualizada exitosamente');
            this.router.navigate(['/admin']);
          }
          this.submitting = false;
        },
        error: (error) => {
          console.error('Error al actualizar película:', error);
          alert('Error al actualizar la película');
          this.submitting = false;
        }
      });
    } else {
      // Crear nueva película
      this.movieService.createMovie(movieData).subscribe({
        next: (result) => {
          if (result) {
            alert('Película creada exitosamente');
            this.router.navigate(['/admin']);
          }
          this.submitting = false;
        },
        error: (error) => {
          console.error('Error al crear película:', error);
          alert('Error al crear la película');
          this.submitting = false;
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/admin']);
  }

  // Métodos auxiliares para validaciones en el template
  isFieldInvalid(fieldName: string): boolean {
    const field = this.movieForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getErrorMessage(fieldName: string): string {
    const field = this.movieForm.get(fieldName);
    
    if (field?.hasError('required')) {
      return 'Este campo es requerido';
    }
    if (field?.hasError('minlength')) {
      const minLength = field.errors?.['minlength'].requiredLength;
      return `Mínimo ${minLength} caracteres`;
    }
    if (field?.hasError('pattern')) {
      return 'Debe ser una URL válida (http:// o https://)';
    }
    
    return '';
  }
}
