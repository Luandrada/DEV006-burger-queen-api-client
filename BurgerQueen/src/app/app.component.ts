import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './@core/authentication/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BurgerQueen';
  constructor( public router: Router, private authService: AuthService ){}
  
  ngOnInit(): void {
    this.authService.systemUser$.subscribe((user)=>{
      if(!user.accessToken) { 
        this.router.navigate(['/sign-in']);
        return
      } 
      this.router.navigate([`orders/${user.role}`])

    })
  }
}
