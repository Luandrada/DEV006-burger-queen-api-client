import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/@core/authentication/services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse, HttpResponseBase } from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})

export class SignInComponent implements OnInit {
  // @ViewChild("password") password!: ElementRef;
  // @ViewChild("show") show !: ElementRef ;
  // @ViewChild("hide") hide !: ElementRef ;
  
  formLogin!: FormGroup;
  invalidCredentials: boolean = false;
  attrsToShowPassword = {
    inputPasswordType: 'password',
    iconClass: 'far fa-eye'
  };
  isLoading: Boolean = false;
  error: HttpErrorResponse | null = null;

  constructor( private fb: FormBuilder,
    private router: Router,
    public authService: AuthService) { }

  ngOnInit(): void {
    this.createForm();
    this.authService.userInfo.subscribe(userInfo => {
      this.router.navigate([`orders/${userInfo.role}`])
    })
    this.authService.loginRequest$.subscribe(state => {
      this.isLoading = state.isLoading
      this.error = state.error
    })
  }


  createForm(): void {
    this.formLogin = this.fb.group({
      email: ["", [Validators.required, Validators.pattern('[A-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ["", Validators.required]
    });
  }

  isInputInvalid(inputName:string){
   return this.formLogin?.get(inputName)?.invalid && this.formLogin.get(inputName)?.touched;
  }
  
  /***Getters para campos invalidos  **/
  get invalidEmail() {
    return this.isInputInvalid('email')
  }

  get invalidPassword() {
    return this.isInputInvalid('password')
  }
  /***FIN de Getters para campos invalidos  **/

  showPsw() {
    if (this.attrsToShowPassword.inputPasswordType == "password") {
      this.attrsToShowPassword = {
        inputPasswordType: 'text',
        iconClass: 'far fa-eye-slash'
        
     }
    }
    else{
      this.attrsToShowPassword = {
        inputPasswordType: 'password',
        iconClass: 'far fa-eye'
     }
    }
  }

  signIn(): void {
    this.invalidCredentials = false;

    if (this.formLogin?.invalid) {
      return Object.values(this.formLogin.controls)
        .forEach(control => control.markAsTouched());
    } else {
      this.authService.login(this.formLogin.value)
    }
  }
}
