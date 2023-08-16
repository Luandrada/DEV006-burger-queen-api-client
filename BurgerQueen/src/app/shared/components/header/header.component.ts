import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@core/authentication/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild("menuRef") menuRef: ElementRef | undefined;
  imgRole: string | undefined;

  constructor(public router: Router,private renderer: Renderer2, private authService : AuthService) { }

  ngOnInit(): void {
    this.setImgRole();
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

  setImgRole (){
    switch (this.authService.getRole()) {
      case "mesera":
        this.imgRole = "../../../../assets/img/camarera.png"
        break;
      case "cocinera":
        this.imgRole = "../../../../assets/img/cocinera.png"
        break;
      case "admin":
        this.imgRole = "../../../../assets/img/admin.png"
        break;
      default:
        break;
    }
  }
}
