import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../authentication/services/auth.service';
import { systemUser } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  private systemUser: systemUser = { id: '', accessToken: '', role: ''};

  constructor(private router: Router, private authService: AuthService) {
    this.authService.systemUser$.subscribe(systemUser => {
        this.systemUser = systemUser
      })
  }

  canActivate(route: ActivatedRouteSnapshot, state:RouterStateSnapshot): boolean {
    if (route.data.allowedRoles.includes(this.systemUser.role)) {
      return true;
    } else {
      this.router.navigate(['/sign-in']);
      return false;
    }
  }
}
