import { Component, ElementRef, OnInit, OnDestroy, Renderer2, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocalStorageService } from 'src/app/@core/services/local-storage.service';

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


  constructor(public router: Router,
    private renderer: Renderer2,
    private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.routerSubscription =  this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.activeLink = event.url; 
      }
    })

    this.setPersonalInfo();
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

  setPersonalInfo() {
    this.userEmail = this.localStorageService.getUserInfo().email;
    this.userRole = this.localStorageService.getUserInfo().role;
  }

  signOut() {
    this.localStorageService.clearStorage();
    this.router.navigate(["/sign-in"])
  }
}
