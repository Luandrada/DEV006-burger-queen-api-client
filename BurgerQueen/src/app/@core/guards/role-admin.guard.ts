import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../authentication/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleAdminGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): boolean {
    // const accessToken = this.authService.getToken();
    // const role = this.authService.getRole();
    // if (role === 'admin') {
    //   return true;
    // } else {
    //   this.router.navigate(['/sign-in']);
      return false;
    // } return
  }
}
