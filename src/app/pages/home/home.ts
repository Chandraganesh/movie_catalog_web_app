import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent {

  searchText = '';

  movies = signal<Movie[]>([]);
  loading = false;

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies() {
    this.loading = true;

    this.movieService.getMovies().subscribe({
      next: (data) => {
        this.movies.set(data);
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load movies', err);
        this.loading = false;
      }
    });
  }

  search() {
    this.loading = true;

    this.movieService.getMovies(this.searchText).subscribe({
      next: (data) => {
        this.movies.set(data);
        this.loading = false;
      },
      error: (err) => {
        console.error('Search failed', err);
        this.loading = false;
      }
    });
  }
}