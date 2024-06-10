import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { UserService } from '../services/user.service';
import { map } from 'rxjs';

export const userGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  return userService.currentUser$.pipe(
    map((user) => {
      if (user) {
        return true;
      } else {
        router.navigate(['/login']); // Redirect to login if user is null
        return false;
      }
    })
  );
};
