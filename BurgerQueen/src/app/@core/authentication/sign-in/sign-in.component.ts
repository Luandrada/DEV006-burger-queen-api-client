import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/@core/authentication/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})

export class SignInComponent implements OnInit {

  formLogin!: FormGroup;
  invalidCredentials: boolean = false;
    attrsToShowPassword = {
    inputPasswordType: 'password',
    iconClass: 'far fa-eye'
  };
  isLoading: Boolean = false;
  error: HttpErrorResponse | Error | null = null;

  constructor( private fb: FormBuilder, public authService: AuthService) { }

  ngOnInit(): void {
    this.createForm();
    this.authService.loginResponse$.subscribe(state => {
      this.isLoading = state.isLoading
      this.error = state.error
      if(this.error instanceof HttpErrorResponse){
        if(this.error.error === "Incorrect password"){
          this.invalidCredentials = true;
        }
      }
    })
  }

  ngOnDestroy() {
    // if (this.authSubscription) {
    //   this.authSubscription.unsubscribe();
    // }
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

  signIn() {
    if (this.formLogin?.invalid) {
      return Object.values(this.formLogin.controls)
        .forEach(control => control.markAsTouched());
    } else {
      this.authService.login(this.formLogin.value)
    }
  }
}
