import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../authentication/services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {}

  canActivate() {
      if(!this.authService.systemUser$.getValue().accessToken){
        this.router.navigate(['/sign-in']);
        return false;
      }else{
        return true;
      }
  }
}
