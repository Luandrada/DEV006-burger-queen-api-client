import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SignInComponent } from './sign-in.component';
import { AuthService } from 'src/app/@core/authentication/services/auth.service';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignInComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [AuthService],
    });
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    spyOn(authService, 'login').and.callFake(() => {
      return;
    });
    fixture.detectChanges();
  });

  it(' initialize the form', () => {
    fixture.detectChanges();
    expect(component.formLogin).toBeTruthy();
    expect(component.formLogin.get('email')).toBeTruthy();
    expect(component.formLogin.get('password')).toBeTruthy();
  });

  it('should call signIn when the form is valid', () => {
    spyOn(component, 'signIn');
    component.formLogin.setValue({
      email: 'test@example.com',
      password: 'password',
    });
    component.signIn();
    expect(component.signIn).toHaveBeenCalled();
  });

  it('should not call signIn when the form is invalid', () => {
    spyOn(component, 'signIn');
    component.formLogin.setValue({
      email: 'test@example.com',
      password: '', 
    });
    component.signIn();
    expect(component.signIn).not.toHaveBeenCalled();
  });

  it('handle login errors', () => {
    const errorResponse = new HttpErrorResponse({ error: 'Incorrect password' });
    spyOn(authService, 'login').and.callFake(() => {
      return of(errorResponse);
    });

    component.formLogin.setValue({
      email: 'test@example.com',
      password: 'password',
    });

    component.signIn();

    expect(component.errorMessage).toBe('Credenciales Inválidas');
  });

});
