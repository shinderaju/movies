import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MoviesService } from '../movies.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LocalstorageService} from '../../service/localstorage.service';

@Component({
  selector: 'app-update-movie',
  templateUrl: './update-movie.component.html',
  styleUrls: ['./update-movie.component.css']
})
export class UpdateMovieComponent implements OnInit {

  updateMovieForm: FormGroup;
  generList;
  dropdownSettings = {};
  constructor(
    public formBuilder: FormBuilder,
    private moviesService: MoviesService,
    private actRoute: ActivatedRoute,
    private router: Router,
    private localstorageService: LocalstorageService) { }

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
    this.createMovieForm();
    this.getMovieDetails();
    this.generList = this.moviesService.generList;
  }
  createMovieForm() {
    this.updateMovieForm = this.formBuilder.group({
      _id: ['', Validators.required],
      popularity: [''],
      name: ['', Validators.required],
      director: ['', Validators.required],
      genre: [''],
      imdb_score : [],
    });
  }
  initialiseForm(formValues) {
    const keys = Object.keys(this.updateMovieForm.controls);

    keys.forEach((key: string) => {
      this.updateMovieForm.controls[key].setValue(formValues[key]);
    });
    this.updateMovieForm.controls['id'].disable();
    this.updateMovieForm.controls['namme'].disable();
  }
  getMovieDetails() {
    // const id = this.actRoute.snapshot.paramMap.get('id');
    const id = this.localstorageService.getItem('updateMovieId');
    if (!id) {
      this.router.navigate(['/']);
      return;
    }
    this.moviesService.fetchMovieById(id).subscribe((data) => {
      this.initialiseForm(data);
    }, (err) => {
      console.log(err);
    });
  }
  updateMovie() {
    if (this.updateMovieForm.valid) {
      this.moviesService.updateMovieById(JSON.parse(JSON.stringify(this.updateMovieForm.value))).subscribe((response) => {
        this.router.navigate(['/movie']);
      });
    }
  }

}
