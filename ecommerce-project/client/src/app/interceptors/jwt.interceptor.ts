import { HttpInterceptorFn } from '@angular/common/http';
import { User } from '../common/user';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  let user: User | null = null;
  const userJson = localStorage.getItem('user');
  if (userJson) {
    user = JSON.parse(userJson) as User;
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${user.token}`
      }
    });
  }
  return next(req);
};
