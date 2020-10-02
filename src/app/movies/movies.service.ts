import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment} from '../../environments/environment';

@Injectable()
export class MoviesService {
  apiUrl = environment.apiUrl;
  generList = [
    { item_id: 1, item_text: 'Comedy' },
    { item_id: 2, item_text: 'Drama' },
    { item_id: 3, item_text: 'Action' },
    { item_id: 4, item_text: 'Adventure' },
    { item_id: 5, item_text: 'Fantasy' },
    {item_id: 6, item_text: 'Sci-Fi'},
    {item_id: 7, item_text: 'War'},
    {item_id: 8, item_text: 'Horror'},
    {item_id: 9, item_text: 'Mystery'},
    {item_id: 10, item_text: 'Thriller'},
    {item_id: 11, item_text: 'Animation'}
  ];
  constructor(private http: HttpClient) { }
  fetchMovieById(id) {
    const url = `${this.apiUrl}/movies/getMovies/${id}`;
    return this.http.get(url);
  }
  updateMovieById(movieData) {
    const url = `${this.apiUrl}/movies/update/${movieData._id}`;
    return this.http.put(url, movieData);
  }
  addMovie(movieData) {
    const url = `${this.apiUrl}/movies/addMovie`;
    return this.http.post(url, movieData);
  }
  getMoviesList() {
    const url = `${this.apiUrl}/movies/getMovies`;
    return this.http.get(url);
  }
  deleteMovieById(id) {
    const url = `${this.apiUrl}/movies/delete/${id}`;
    return this.http.delete(url);
  }
}
