import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent implements OnInit {
  show = false;
  constructor(private router :Router) { }

  ngOnInit(): void {
  }

  onClick() {
   this.show = !this.show;
   this.router.navigate(['/resetPassword'])
  }


}
