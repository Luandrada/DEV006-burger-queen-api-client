import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../authentication/services/auth.service';
import { systemUser } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private systemUser: systemUser = { id: '', accessToken: '', role: ''};

  constructor(private router: Router, private authService: AuthService) {
    this.authService.systemUser$.subscribe(systemUser => {
      this.systemUser = systemUser;
      if(!this.systemUser.accessToken){
        this.router.navigate(['/sign-in']);
      } else {
        this.router.navigate([`orders/${this.systemUser.role}`]);
      }
    })
  }

  canActivate(): boolean {
    if (!this.systemUser.accessToken) {
      this.router.navigate(['/sign-in']);
      return false;
    } 
    return true;
  }
}
