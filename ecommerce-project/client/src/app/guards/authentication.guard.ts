import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { User } from '../common/user';
import { inject } from '@angular/core';
import { AuthenticationService } from '../services/Authentication.service';
export const AuthenticationGuard: CanActivateFn = (route, state) => {

  let user: User | null = null;
  const authService = inject(AuthenticationService)
  const router = inject(Router);

    if (authService.tokenValid()) {
      return true;
    }
    authService.logout();
    router.navigate(['/login']);
    return false;
};
