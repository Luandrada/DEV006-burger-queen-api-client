import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../../shared/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {  }

  canActivate(route: ActivatedRouteSnapshot) {
    const res = route.data.allowedRoles.includes(this.authService.getSystemUser().role);
    if (!res)
      return this.router.createUrlTree(['/sign-in']);
    return true;
  }
}
