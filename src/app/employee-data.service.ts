import { Injectable } from '@angular/core';
import { SignUpComponent } from './sign-up/sign-up.component';
@Injectable({
  providedIn: 'root'

})
export class EmployeeDataService {
  employeeData: any;
  constructor() { }
  getEmployeeData() {
    let data = localStorage.getItem('data');
    return data;
  }
  setEmployeeData(data: any) {
    localStorage.setItem('data', data);
  }
  setLoginData(data: any) {
    localStorage.setItem('data1',data);
  }
  getLoginData(){
   let data = localStorage.getItem('data1');
   return data;
  }
  setTime(time :any){
  localStorage.setItem('date' ,time);
  }
  getTime(){
  let time = localStorage.getItem('date');
  return time;
  }
}
