import { Employee } from './../../model/Employee';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from './../../service/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";


@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})

export class EmployeeEditComponent implements OnInit {
  submitted = false;
  editForm: FormGroup;
  employeeData: Employee[];
  imagePath;

  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.updateEmployee();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getEmployee(id);
    this.editForm =  this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      profileImg: [''],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }
  // choose image for profile
  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const selectedFile = event.target.files[0];
      const idxDot = selectedFile.name.lastIndexOf(".") + 1;
      const extFile = selectedFile.name.substr(idxDot, selectedFile.name.length).toLowerCase();
      if (extFile == 'jpg' || extFile == 'jpeg' || extFile == 'png') {
        this.imagePath = selectedFile.name;
        this.editForm.get('profileImg').setValue(selectedFile);
      }
    }
  }

  // Getter to access form control
  get myForm() {
    return this.editForm.controls;
  }

  getEmployee(id) {
    this.apiService.getEmployee(id).subscribe(data => {
      console.log('data[\'profileImg\']', data['profileImg']);
      // this.editForm.setValue({
      //   firstName: data['firstName'],
      //   lastName: data['lastName'],
      //   email: data['email'],
      //   phoneNumber: data['phoneNumber'],
      //   // profileImg: data['profileImg'],
      // });
      this.editForm.patchValue({
          firstName: data['firstName'],
          lastName: data['lastName'],
          email: data['email'],
          phoneNumber: data['phoneNumber'],
      });
      this.imagePath = data['profileImg'];
    });
  }

  updateEmployee() {
    this.editForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      profileImg: [],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.apiService.updateEmployee(id, this.editForm.value)
          .subscribe(res => {
            this.router.navigateByUrl('/employees-list');
            console.log('Content updated successfully!')
          }, (error) => {
            console.log(error)
          })
      }
    }
  }

}
