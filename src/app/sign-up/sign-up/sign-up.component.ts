import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ApiService} from '../../service/api.service';
import {CustomValidators} from '../../classes/custom-validators';
import { EmployeesClass } from '../classes/employees.class';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  submitted = false;
  employeeForm: FormGroup;
  EmployeeProfile: any = ['Finance', 'BDM', 'HR', 'Sales', 'Admin'];
  private newEmployee: EmployeesClass = new EmployeesClass();
  dropdownSettings = {};
  generList: [{ item_id: number; item_text: string }, { item_id: number; item_text: string }];
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) {
  }

  ngOnInit() {
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      // selectAllText: 'Select All',
      // unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: false,
      enableCheckAll: false
    };
    this.generList = [
      { item_id: 1, item_text: 'Admin' },
      { item_id: 2, item_text: 'User' }
    ];
    this.mainForm();
  }

  mainForm() {
    this.employeeForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$') ]],
      confirmPassword: [null, Validators.compose([Validators.required])],
      role: ['', [Validators.required]]
    },
      {
        // check whether our password and confirm password match
        validator: CustomValidators.passwordMatchValidator
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
        firstName: this.employeeForm.value.firstName,
        lastName: this.employeeForm.value.lastName,
        email: this.employeeForm.value.email,
        phoneNumber: this.employeeForm.value.phoneNumber,
        password: this.employeeForm.value.password,
        role: this.employeeForm.value.role[0].item_text
    };
      this.apiService.createEmployee(newEmp).subscribe(
        (res) => {
          console.log('Employee successfully created!');
          this.ngZone.run(() => this.router.navigateByUrl('/sign-in'));
        }, (error) => {
          console.log(error);
        });
    }
  }
}
