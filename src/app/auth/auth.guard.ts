import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // We use the observable user$ and take(1) to wait for Firebase to initialize 
  // its state on page load before deciding to activate the route or redirect.
  return authService.user$.pipe(
    take(1),
    map(user => {
      if (user) {
        return true;
      }
      console.log('AuthGuard: Access denied, redirecting to /login');
      return router.createUrlTree(['/login']);
    })
  );
};
