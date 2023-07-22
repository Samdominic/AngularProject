import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var window : any;
declare var bootstrap :any;

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  toolTip :any;
  constructor(private router:Router) { }

  ngOnInit(): void {
 
  }

onLogout(){
  localStorage.removeItem('data1');
  this.router.navigate(['/login']);

}
 
tooltip(){
  this.toolTip =new window.bootstrap.Tooltip('#tooltip',{
  trigger :'hover focus'
 })
}
}
