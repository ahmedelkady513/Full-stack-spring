import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/Authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private authService: AuthenticationService) { }



}
