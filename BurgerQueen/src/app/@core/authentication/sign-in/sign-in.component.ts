import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/@core/authentication/services/auth.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})

export class SignInComponent implements OnInit, OnDestroy {
  @ViewChild("password") password!: ElementRef;
  @ViewChild("show") show !: ElementRef ;
  @ViewChild("hide") hide !: ElementRef ;
  
  formLogin!: FormGroup;
  invalidCredentials: boolean = false;

  private authSubscription: Subscription = new Subscription();

  redirections: { [key: string]: string } = {
    mesera: 'orders/create',
    cocinera: '',
    admin: '',
  };

  constructor( private fb: FormBuilder,
    private renderer: Renderer2,
    private router: Router,
    private localStorageService: LocalStorageService,
    private authService: AuthService) {}

  ngOnInit(): void {
    this.createForm();
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  createForm(): void {
    this.formLogin = this.fb.group({
      email: ["", [Validators.required, Validators.pattern('[A-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ["", Validators.required]
    });
  }
  
  isFieldInvalid(fieldName: string) {
    return (
      this.formLogin?.get(fieldName)?.invalid &&
      this.formLogin.get(fieldName)?.touched
    );
  }

  showPsw() {
    if (this.password?.nativeElement.type == "password") {
      this.renderer.setAttribute(this.password.nativeElement, "type", "text");
      this.renderer.setStyle(this.show?.nativeElement, "visibility", "hidden");
      this.renderer.setStyle(this.hide?.nativeElement, "visibility", "visible")
    } else {
      this.renderer.setAttribute(this.password?.nativeElement, "type", "password");
      this.renderer.setStyle(this.show?.nativeElement, "visibility", "visible");
      this.renderer.setStyle(this.hide?.nativeElement, "visibility", "hidden")
    }
  }

  redirectByRole(role: string) {
    const route = this.redirections[role];
    this.router.navigate([route]);
  }

  signIn(): void {
    this.invalidCredentials = false;

    if (this.formLogin?.invalid) {
      return Object.values(this.formLogin.controls)
        .forEach(control => control.markAsTouched());
    } else {

      this.authSubscription = this.authService.sigIn(this.formLogin.value).subscribe((resp)=> {
        this.localStorageService.setStorage("accessToken", resp.accessToken);
        this.localStorageService.setStorage("userInfo", JSON.stringify(resp.user));

        this.redirectByRole(resp.user.role);
      },(error) => {

        if (error.error === "Cannot find user" || error.error === "Incorrect password") {
          this.invalidCredentials = true;
        }
      })
    }
  }

}
