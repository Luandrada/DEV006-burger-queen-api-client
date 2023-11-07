import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SignInComponent } from './sign-in.component';
import { AuthService } from 'src/app/@core/authentication/services/auth.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let authService: AuthService;

  beforeEach(() => {
    const httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);

    TestBed.configureTestingModule({
      declarations: [SignInComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        AuthService,
        { provide: HttpClient, useValue: httpClientSpy },
      ],
    });
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('initialize the form', () => {
    expect(component.formLogin).toBeTruthy();
    expect(component.formLogin.get('email')).toBeTruthy();
    expect(component.formLogin.get('password')).toBeTruthy();
  });

  it('should call login when the form is valid', () => {
    const credentials = {
      email: 'test@example.com',
      password: 'myRealPassword',
    };
    component.formLogin.setValue(credentials);

    spyOn(authService, 'login');

    component.signIn();
    expect(authService.login).toHaveBeenCalledWith(credentials);
  });

  it('should not call login when the form is invalid', () => {
    const credentials = {
      email: 'test@example.com',
      password: '',
    };
    component.formLogin.setValue(credentials);

    spyOn(authService, 'login');

    component.signIn();
    expect(authService.login).not.toHaveBeenCalled();
  });

  it('should set errorMessage to "Credenciales Inválidas" for "Incorrect password" error', () => {
    
    const errorResponse: HttpErrorResponse = new HttpErrorResponse({
      error: 'Incorrect password',
    });

    authService.loginResponse$.next({
      isLoading: false,
      error: errorResponse,
      data: null,
    });

    component.authService.loginResponse$.subscribe(() => {
      expect(component.errorMessage).toEqual('Credenciales Inválidas');
    });
  });
});
