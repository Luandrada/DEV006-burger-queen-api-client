import { Component, ElementRef, OnInit, OnDestroy, Renderer2, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/@core/authentication/services/auth.service';
import { systemUser } from 'src/app/@core/interfaces';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit , OnDestroy{
  @ViewChild("menuRef") menuRef: ElementRef | undefined;
  userEmail: string = ""
  userRole: string = ""
  activeLink: string = ""

  private routerSubscription: Subscription = new Subscription();;
  private systemUser: systemUser = { id: '', accessToken: '', role: '', email: ""};

  constructor(public router: Router,
    private renderer: Renderer2,
    private authService: AuthService ) { }

  ngOnInit(): void {
    this.routerSubscription =  this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.activeLink = event.url; 
      }
    })
    
    this.authService.systemUser$.subscribe(systemUser => {
      this.systemUser = systemUser;
      this.userEmail = this.systemUser.email;
      this.userRole =  this.systemUser.role;
    })
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
  
  showMenu () {
    const menuElement = this.menuRef?.nativeElement;
    const isVisible = menuElement.classList.contains('show');
    if (isVisible) {
      this.renderer.removeClass(menuElement, 'show');
    } else {
      this.renderer.addClass(menuElement, 'show');
    }
  }

  signOut() {
    this.authService.logout();
  }
}
