import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../authentication/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleWaitressGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): boolean {
    const role = this.authService.getRole();
    if (role === 'mesera') {
      return true;
    } else {
      this.router.navigate(['/sign-in']);
      return false;
    }
  }
}
