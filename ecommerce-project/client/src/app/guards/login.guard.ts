import { CanActivateFn, Router } from '@angular/router';
import { User } from '../common/user';
import { inject } from '@angular/core';
import { AuthenticationService } from '../services/Authentication.service';
import { map } from 'rxjs';

export const LoginGuard: CanActivateFn = (route, state) => {
  let user: User | null = null;
  const authService = inject(AuthenticationService)
  const router = inject(Router);

  return authService.tokenValid().pipe(
    map(isValid => {
      if (!isValid) {
        return true;
      }
      router.navigate(['/home']);
      return false;
    })
  );
};
