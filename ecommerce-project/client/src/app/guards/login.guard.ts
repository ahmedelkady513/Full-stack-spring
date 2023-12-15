import { CanActivateFn, Router } from '@angular/router';
import { User } from '../common/user';
import { inject } from '@angular/core';
import { AuthenticationService } from '../services/Authentication.service';

export const LoginGuard: CanActivateFn = (route, state) => {
  let user: User | null = null;
  const authService = inject(AuthenticationService)
  const router = inject(Router);

  if (!authService.tokenValid()) {
    return true;
  }
  router.navigate(['/home']);
  return false;
};
