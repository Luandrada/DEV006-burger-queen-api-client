import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../authentication/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private accessToken: string = ''

  constructor(private router: Router, private authService: AuthService) {
    this.authService.userInfo.subscribe(userInfo => {
      this.accessToken = userInfo.accessToken
    })
  }

  canActivate(): boolean {
    const accessToken = this.accessToken;
    if (accessToken) {
      return true;
    } else {
      this.router.navigate(['/sign-in']);
      return false;
    }
  }
}
