import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ApiService} from '../../service/api.service';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.css']
})
export class SingInComponent implements OnInit {
  submitted = false;
  employeeForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) {
  }
  ngOnInit() {
    this.mainForm();
  }

  mainForm() {
    this.employeeForm = this.fb.group({
        email: ['', [Validators.required]],
        password: ['', [Validators.required]],
      });
  }

  // Getter to access form control
  get myForm() {
    return this.employeeForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.employeeForm.valid) {
      return false;
    } else {
      const newEmp = {
        email: this.employeeForm.value.email,
        password: this.employeeForm.value.password,
      };
      this.apiService.login(newEmp).subscribe(
        (res) => {
          console.log('Employee successfully created!');
          this.ngZone.run(() => this.router.navigateByUrl('/movie'));
        }, (error) => {
          console.log(error);
        });
    }
  }
}
