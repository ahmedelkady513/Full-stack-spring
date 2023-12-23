import { Component, OnInit } from '@angular/core';
import { User } from './common/user';
import { AuthenticationService } from './services/Authentication.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent   {

  constructor(public authService : AuthenticationService){}



}
