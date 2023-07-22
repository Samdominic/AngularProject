import { JsonPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot } from '@angular/router';
import { isEmpty, Observable } from 'rxjs';
import { EmployeeDataService } from './employee-data.service';

@Injectable({
  providedIn: 'root'
})

export class TestCanActivate implements CanActivate{
  data: any;
  result :any 
  getData: any[] = [];
  date :any;
 newDate =new Date().getTime();
 newDate1 :any;
  constructor(public eds: EmployeeDataService, private router: Router) {
 
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):any {
   const data = this.eds.getLoginData();
   if(data){
   const parseData = JSON.parse(data);
   this.data = parseData;
   }
   const date = this.eds.getTime();
   if(date){
    const parstdate = JSON.parse(date);
    this.date = parstdate;
   
   }
   if(this.data){
    // if((this.date - new Date().getTime())/60000 >= 1){
    //   localStorage.removeItem('data1');
    //  }
    this.newDate1 =( new Date().getTime()- this.date)/60000;
    console.log(this.newDate1);
      if(this.newDate1 >= 4){
      localStorage.removeItem('data1');
      this.router.navigate(['/login'])
      }
    return true;
   }
   else{
    this.router.navigate(['/login']);
    return false;
   }

  //   const employees = this.eds.getEmployeeData();
  //   // const stringify =JSON.stringify(employees);
  //   this.data = this.eds.employeeData;
  //   if (employees) {
  //     const parseData = JSON.parse(employees);
  //     this.getData.push(parseData);
  //   }
  //     // this.getData.forEach((edata: any) => {
  //  for(let i =0 ;i<=this.getData.length-1;i++){

  //       if (this.data.id == this.getData[i].id) {
  //         // const filterData = edata.filter((e: any) => e.email === this.data.email)
  //         // if (filterData[0].password == this.data.password) {
  //         //   this.result = true;
  //         // }
  //          this.result = true;
  //         break;

  //       }
  //       else {
  //        this.result = false;
  //       }
  //     }
  //     // })
  //   // }
  //   if (this.result == true){
  //     return true;
  //   }
  //   else {
  //     return false;
  //   }
  // }

  }
}

