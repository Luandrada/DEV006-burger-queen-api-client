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


  

  isFieldInvalid(fieldName: string) {
    return (
      this.formLogin?.get(fieldName)?.invalid &&
      this.formLogin.get(fieldName)?.touched
    );
    
   redirectByRole(role: string) {
    const route = this.redirections[role];
    this.router.navigate([route]);
 }

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
