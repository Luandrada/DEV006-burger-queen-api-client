import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/@core/authentication/services/auth.service';
import { Credentials, LoginResponse } from 'src/app/shared/interfaces/Login';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})

export class SignInComponent implements OnInit {
  @ViewChild("password") password!: ElementRef;
  @ViewChild("show") show !: ElementRef ;
  @ViewChild("hide") hide !: ElementRef ;
  
  formLogin!: FormGroup;
  invalidCredentials: boolean = false;
  attrsToShowPassword = {
    inputPasswordType: 'password',
    iconClass: 'far fa-eye'
  };
  //singInCall!: ApiService;
  // data: any = null;
  // loading: any = false
  // count = 0

  constructor( private fb: FormBuilder,
    private renderer: Renderer2,
    private router: Router,
    private localStorageService: LocalStorageService,
    public authService: AuthService) { }

  ngOnInit(): void {
    this.createForm();
    this.authService.userInfo.subscribe(userInfo => {
      this.router.navigate([`orders/${userInfo.role}`])
    })
  }


  createForm(): void {
    this.formLogin = this.fb.group({
      email: ["", [Validators.required, Validators.pattern('[A-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ["", Validators.required]
    });
  }
  
  /***Getters para campos invalidos  **/
  get invalidEmail() {
    return this.formLogin?.get('email')?.invalid && this.formLogin.get('email')?.touched;
  }

  get invalidPassword() {
    return this.formLogin?.get('password')?.invalid && this.formLogin.get('password')?.touched;
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
      this.authService.sigIn(this.formLogin.value)
    }
  }
}
