import { Component, OnInit } from '@angular/core';
import { MoviesInterface } from './movies.interface';
import {Router} from '@angular/router';
import { MoviesService } from '../movies.service';
import {ApiService} from '../../service/api.service';
import set = Reflect.set;
import {AuthorizationService} from '../../service/authorization.service';
import {LocalstorageService} from '../../service/localstorage.service';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  sortType: string;
  sortReverse = false;
  filteredMovies: MoviesInterface [];
  allMovies: MoviesInterface [];
  selectedItems = [];
  dropdownSettings = {};
  generList;
  title = 'List of Movies';
  loggedIn = false;
  constructor(public router: Router,
              private moviesService: MoviesService,
              private apiService: ApiService,
              private authorizationService: AuthorizationService,
              private localstorageService: LocalstorageService) { }

  ngOnInit() {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      // selectAllText: 'Select All',
      // unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      enableCheckAll: false
    };
    this.generList = this.moviesService.generList;
    this.getMoviesList();
    this.apiService.loginLogoutEvent.subscribe((value) => {
      this.loggedIn = this.authorizationService.isAuthenticated();
    });
    // @ts-ignore
    // @ts-ignore
    // this.allMovies = [
    //   {
    //   'popularity': 84.0,
    //   'director': 'Fritz Lang',
    //   // @ts-ignore
    //   'genre': [
    //     'Adventure',
    //     ' Drama',
    //     ' Sci-Fi'
    //   ],
    //   'imdb_score': 8.4,
    //   'name': 'Metropolis'
    // },
    //   {
    //     'popularity': 86.0,
    //     'director': 'Marc Daniels',
    //     // @ts-ignore
    //     'genre': [
    //       'Adventure',
    //       ' Sci-Fi'
    //     ],
    //     'imdb_score': 8.6,
    //     'name': 'Star Trek'
    //   },
    //   {
    //     'popularity': 88.0,
    //     'director': 'Michael Curtiz',
    //     // @ts-ignore
    //     'genre': [
    //       'Drama',
    //       ' Romance',
    //       ' War'
    //     ],
    //     'imdb_score': 8.8,
    //     'name': 'Casablanca'
    //   },
    //   {
    //     'popularity': 79.0,
    //     'director': 'William Cottrell',
    //     // @ts-ignore
    //     'genre': [
    //       'Animation',
    //       ' Family',
    //       ' Fantasy',
    //       ' Musical',
    //       ' Romance'
    //     ],
    //     'imdb_score': 7.9,
    //     'name': 'Snow White and the Seven Dwarfs'
    //   },
    //   {
    //     'popularity': 84.0,
    //     'director': 'Stanley Kubrick',
    //     // @ts-ignore
    //     'genre': [
    //       'Adventure',
    //       ' Mystery',
    //       ' Sci-Fi'
    //     ],
    //     'imdb_score': 8.4,
    //     'name': '2001 : A Space Odyssey'
    //   },
    //   {
    //     'popularity': 92.0,
    //     'director': 'Francis Ford Coppola',
    //     // @ts-ignore
    //     'genre': [
    //       'Crime',
    //       ' Drama'
    //     ],
    //     'imdb_score': 9.2,
    //     'name': 'The Godfather'
    //   },
    // ];
    // this.filteredMovies = [
    //   {
    //     'popularity': 84.0,
    //     'director': 'Fritz Lang',
    //     // @ts-ignore
    //     'genre': [
    //       'Adventure',
    //       ' Drama',
    //       ' Sci-Fi'
    //     ],
    //     'imdb_score': 8.4,
    //     'name': 'Metropolis'
    //   },
    //   {
    //     'popularity': 86.0,
    //     'director': 'Marc Daniels',
    //     // @ts-ignore
    //     'genre': [
    //       'Adventure',
    //       ' Sci-Fi'
    //     ],
    //     'imdb_score': 8.6,
    //     'name': 'Star Trek'
    //   },
    //   {
    //     'popularity': 88.0,
    //     'director': 'Michael Curtiz',
    //     // @ts-ignore
    //     'genre': [
    //       'Drama',
    //       ' Romance',
    //       ' War'
    //     ],
    //     'imdb_score': 8.8,
    //     'name': 'Casablanca'
    //   },
    //   {
    //     'popularity': 79.0,
    //     'director': 'William Cottrell',
    //     // @ts-ignore
    //     'genre': [
    //       'Animation',
    //       ' Family',
    //       ' Fantasy',
    //       ' Musical',
    //       ' Romance'
    //     ],
    //     'imdb_score': 7.9,
    //     'name': 'Snow White and the Seven Dwarfs'
    //   },
    //   {
    //     'popularity': 84.0,
    //     'director': 'Stanley Kubrick',
    //     // @ts-ignore
    //     'genre': [
    //       'Adventure',
    //       ' Mystery',
    //       ' Sci-Fi'
    //     ],
    //     'imdb_score': 8.4,
    //     'name': '2001 : A Space Odyssey'
    //   },
    //   {
    //     'popularity': 92.0,
    //     'director': 'Francis Ford Coppola',
    //     // @ts-ignore
    //     'genre': [
    //       'Crime',
    //       ' Drama'
    //     ],
    //     'imdb_score': 9.2,
    //     'name': 'The Godfather'
    //   }, ];
  }
  sortMovies(property) {
    this.sortType = property;
    this.sortReverse = !this.sortReverse;
    this.filteredMovies.sort(this.dynamicSort(property));
  }
  dynamicSort(property) {
    let sortOrder = -1;

    if (this.sortReverse) {
      sortOrder = 1;
    }

    return function (a, b) {
      const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;

      return result * sortOrder;
    };
  }
  filterMovies(selectedItems) {
    if (selectedItems.length == 0) {
      this.filteredMovies = this.allMovies;
      return;
    }
    // @ts-ignore
    this.filteredMovies = this.allMovies.filter((movie) => {
      return movie['genre'].some((genre) => {

        return selectedItems.some(item => {
          return genre.toLowerCase() == item.item_text.toLowerCase();
        })
      });
    });
  }
  onItemSelect(item) {
    console.log('item')
    this.filterMovies(this.selectedItems);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  searchMovies(search: string) {
    this.filteredMovies = this.allMovies.filter((movie) => {
      if (movie.name.toLowerCase().includes(search.toLowerCase())) {
        return true;
      }
      if (movie.director.toLowerCase().includes(search.toLowerCase())) {
        return true;
      }
      return false;
    });
  }
  updateMovie(id) {
    this.localstorageService.setItem('updateMovieId', id);
    this.router.navigate(['movie/update-movie']);
  }
  getMoviesList() {
    this.apiService.showLoader.next(true);
    this.moviesService.getMoviesList().subscribe((movies:  MoviesInterface[]) => {
      this.allMovies = movies;
      this.filteredMovies = JSON.parse(JSON.stringify(movies));
      this.apiService.showLoader.next(false);
      this.apiService.showLoader.next(false);
    });
  }
  deleteMovieById(id) {
    this.apiService.showLoader.next(true);
    this.moviesService.deleteMovieById(id).subscribe((response) => {
      this.getMoviesList();
    });
  }
  addNewMovie() {
    this.router.navigate(['movie/add-movie']);
  }
}
