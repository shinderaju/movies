import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MoviesService} from '../movies.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.css']
})
export class CreateMovieComponent implements OnInit {

  updateMovieForm: FormGroup;
  generList;
  dropdownSettings = {};
  constructor(
    public formBuilder: FormBuilder,
    private moviesService: MoviesService,
    private actRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      // selectAllText: 'Select All',
      // unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: false,
      enableCheckAll: false
    };
    this.generList = this.moviesService.generList;
    this.createMovieForm();
  }
  createMovieForm() {
    this.updateMovieForm = this.formBuilder.group({
      popularity: [''],
      name: ['', Validators.required],
      director: ['', Validators.required],
      genre: [''],
      imdb_score : [],
    });
  }
  addMovie() {
    if (this.updateMovieForm.valid) {
      const movie = JSON.parse(JSON.stringify(this.updateMovieForm.value));
      movie.genre = movie.genre.map((genre) => {
        return genre.item_text;
      });
      this.moviesService.addMovie(movie).subscribe((response) => {
        this.router.navigate(['/movie']);
      });
    }
  }

}
