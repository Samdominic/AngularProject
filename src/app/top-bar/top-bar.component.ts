import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestCanActivate } from '../auth-guard.service';
import { EmployeeDataService } from '../employee-data.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  constructor(public eds :EmployeeDataService ,private router :Router,public ags :TestCanActivate) { }

  ngOnInit(): void {
  }
onLogout(){
  localStorage.removeItem('data1');
  this.router.navigate(['/login']);
}
Home(){
  // this.ags.delete();
}
}
