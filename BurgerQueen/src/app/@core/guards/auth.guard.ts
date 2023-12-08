import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {}

  canActivate() {
      if(!this.authService.getSystemUser().accessToken){
        this.router.navigate(['/sign-in']);
        return false;
      }else{
        return true;
      }
  }
}
