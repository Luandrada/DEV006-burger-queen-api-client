import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../authentication/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const res = route.data.allowedRoles.includes(this.authService.systemUser$.getValue().role);
    if (!res)
      this.router.navigate(['/sign-in']);
    return res;
  }
}
