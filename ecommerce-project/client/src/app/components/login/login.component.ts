import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { LoginInfo } from 'src/app/common/login-info';
import { User } from 'src/app/common/user';
import { AuthenticationService } from 'src/app/services/Authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  faUser = faUser;
  faLock = faLock;
  loginInfo: LoginInfo = {
    username: '',
    password: '',
  };

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private authenticationService: AuthenticationService
  ) { }

  login() {
    this.authenticationService.login(this.loginInfo).subscribe({
      next: (user: User) => {
        this.toastr.success(user.username, 'Login Success');
        this.router.navigateByUrl("/home");
      },
      error: (errorMessage: string) => {
        this.toastr.error(errorMessage, 'Authentication Failed');
      },
    });
  }
}
