import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../authentication/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {  }

  canActivate(route: ActivatedRouteSnapshot, state:RouterStateSnapshot): boolean {
    if (route.data.allowedRoles.includes(this.authService.systemUser$.getValue().role)) {
      return true;
    } else {
      this.router.navigate(['/sign-in']);
      return false;
    }
  }
}
