import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../../shared/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const res = route.data.allowedRoles.includes(this.authService.getSystemUser().role);
    if (!res)
      this.router.navigate(['/sign-in']);
    return res;
  }
}
