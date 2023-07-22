import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeDataService } from '../employee-data.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  getData: any[] = [];
  findData: any;
  filterData: any;
  id: any;
  forgotPassword = false;
  message: any;
  message1:any;
  submited =false;
  submited1 =false;
  resetPassword: FormGroup;
  constructor(public eds: EmployeeDataService, private router: Router) {
    this.resetPassword = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required])
    })
  }

  ngOnInit(): void {
    const datas = this.eds.getEmployeeData();
    if (datas) {
      const parseData = JSON.parse(datas);
      this.getData = this.getData.concat(parseData);
    }
  }
  goReset() {
    this.submited =true;
    if (this.resetPassword.valid) {
      for (let emp of this.getData) {
        if (emp.email == this.resetPassword.value.email) {
          // this.router.navigate(['/resetPassword']);
          this.id = emp.id;
          this.forgotPassword = true;
        }
        else {
          this.message = "Invalid Email..!"
        }
      }
    }
  }

  onSubmit(rsForm: any) {
    this.submited1 = true;
    if (rsForm.valid && rsForm.value.password === rsForm.value.confirmPassword) {
      this.findData = this.getData.findIndex((item: any) => item.id == this.id);
      this.getData[this.findData].password = rsForm.value.confirmPassword;
      let data = JSON.stringify(this.getData);
      this.eds.setEmployeeData(data);
      console.log(this.getData);
      // this.eds.setEmployeeData(JSON.stringify(this.getData));
      //  console.log(this.findData)
      // this.getData =this.findIndex.filter((item :any) => item.password =rsForm.value.password);
      // let data =JSON.stringify(this.getData);
      // console.log(data);
      // alert("Please Go And Login");
      this.router.navigate(['/login']);
    }
    else if(rsForm.valid && rsForm.value.password != rsForm.value.confirmPassword){
      this.message1 ='Confirm password must be same with your new password!!'
    }
  }

}
