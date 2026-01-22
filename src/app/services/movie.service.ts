import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiUrl = 'http://localhost:8080/api/movies';

  constructor(private http: HttpClient) {}

  getMovies(searchText?: string): Observable<Movie[]> {
    if (searchText) {
      return this.http.get<Movie[]>(`${this.apiUrl}?search=${searchText}`);
    }
    return this.http.get<Movie[]>(this.apiUrl);
  }
}