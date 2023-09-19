import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@core/authentication/services/auth.service';
import { LocalStorageService } from 'src/app/@core/services/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild("menuRef") menuRef: ElementRef | undefined;
  imgRole: string | undefined;

  constructor(public router: Router,
    private renderer: Renderer2,
    private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
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
    this.localStorageService.clearStorage();
    window.location.reload()
  }
}
