import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { isEmpty } from 'rxjs';
import { TestCanActivate } from '../auth-guard.service';
import { EmployeeDataService } from '../employee-data.service';
declare var bootstrap :any;
declare var window :any;

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  getData: any[] = [];
  submited =false;
  message: any;
  message1 :any;
  // employeeData =['sam','5sal','bala','magesh'];
  loginForm: FormGroup;
  constructor(private router: Router, private eds: EmployeeDataService,public ags : TestCanActivate) {
    this.loginForm = new FormGroup(
      {
        email: new FormControl('', [Validators.email, Validators.required]),
        password: new FormControl('',[Validators.required ])
      }
    )
  }
  ngOnInit(): void {
    const datas = this.eds.getEmployeeData();
    if (datas) {
      const parseData = JSON.parse(datas);
      this.getData = this.getData.concat(parseData);
    }

    //tooltip
    // var x = [].slice.call(document.querySelectorAll('[data-bs-toogle="tooltip"]'));
    // x.map(function(y){
    //   return new bootstrap.Tooltip(y)
    // })
  }
 //Login submit button
  goHome() {
    this.submited = true;
    if (this.loginForm.valid ) {
      if(localStorage.getItem('data') == null){
        this.message ="Invalid Email or Password"
        console.log(this.message1);
      }
      for (let emp of this.getData) {
       if(emp.email == this.loginForm.value.email && emp.password == this.loginForm.value.password) {
          this.message = "Invalid Username or Password!!";
          //Give the value for empdetail service 
          const data = this.loginForm.value;
          this.eds.setLoginData(JSON.stringify(data));
          const time = new Date().getTime();
          this.eds.setTime(JSON.stringify(time))
          this.router.navigate(['/homePage']);
        }
        else {
          this.message = "Invalid Username or Password!!";
        }
      }
    }
  //  setTimeout(()=>localStorage.removeItem('data1'),1000,);
  //   setTimeout(() =>this.router.navigate(['login']) ,1000);
    // let data:any= this.employeeData.filter((eData:any) =>eData=='magesh');
    // console.log(data);
    
  }

  // tooltip(){
  //   const tt =new bootstrap.Tooltip('#tooltip');
  //  tt.show();
  // } 
//  tooltip(){
//   const tooltip = new window.bootstrap.Tooltip('#tooltip', {
//     trigger: 'hover focus'
//   });
//   tooltip.show();
//  }

}
