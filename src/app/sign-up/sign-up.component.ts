import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeDataService } from '../employee-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  submited = false;
  employeeLength = '';
  datas: any;
  signUpForm: FormGroup;
  genders = ['Male', 'Female', 'Others'];

  constructor(public eds: EmployeeDataService, private router: Router) {
    this.signUpForm = new FormGroup(
      {
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.email, Validators.required]),
        password: new FormControl('', [Validators.required,Validators.minLength(6)]),
        dob: new FormControl('', Validators.required),
        gender: new FormControl('', Validators.required)
      }
    )
  }

  ngOnInit(): void {
    const empLength = this.eds.getEmployeeData();
    if (empLength) {
      const data = JSON.parse(empLength);
      this.employeeLength = data.length;
    }
  }

  submitBtn() {
    this.submited = true;
    if (this.signUpForm.valid) {
      let data = [];
      const employeeData = {
        id: Math.floor(Math.random() * 1000) + 1,
        firstName: this.signUpForm.value.firstName,
        lastName: this.signUpForm.value.lastName,
        email: this.signUpForm.value.email,
        password: this.signUpForm.value.password,
        dob: this.signUpForm.value.dob,
        gender: this.signUpForm.value.gender
      };
      data.push(employeeData);
      const datas = this.eds.getEmployeeData();
      if (datas) {
        const parseData = JSON.parse(datas);
        data = data.concat(parseData)
      }
      this.eds.setEmployeeData(JSON.stringify(data));
      window.alert("Please Login to Enter the HOME PAGE.");
      this.router.navigate(['/login']);
    }
  }
}
