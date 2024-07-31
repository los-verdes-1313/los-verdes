import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.authService.getUser().pipe(
      take(1),
      map(user => {
        const isAuthenticated = !!user;
        if (isAuthenticated) {
          return true;
        } else {
          console.log('User not authenticated, redirecting to login');
          return this.router.createUrlTree(['/login']);
        }
      })
    );
  }
}