import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { User } from '../common/user';
import { inject } from '@angular/core';
import { AuthenticationService } from '../services/Authentication.service';
import { catchError, map, of } from 'rxjs';
export const AuthenticationGuard: CanActivateFn = (route, state) => {

  let user: User | null = null;
  const authService = inject(AuthenticationService)
  const router = inject(Router);

    return authService.tokenValid().pipe(
      map(isValid => {

        if(!isValid) {
          router.navigate(['/login']);
          return false;
        }
        return true;
      })
    );
  };

