import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SignInComponent } from './sign-in.component';
import { AuthService } from 'src/app/@core/authentication/services/auth.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let authService: AuthService;
  let localStorageService: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignInComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        {
          provide: AuthService,
          useValue: {
            sigIn: () => of({ accessToken: 'fakeToken', user: { role: 'mesera', id: 1 } }),
          },
        },
        {
          provide: LocalStorageService,
          useValue: {
            setStorage: () => {},
          },
        },
      ],
    });
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    localStorageService = TestBed.inject(LocalStorageService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    fixture.detectChanges();
    expect(component.formLogin).toBeTruthy();
    expect(component.formLogin.get('email')).toBeTruthy();
    expect(component.formLogin.get('password')).toBeTruthy();
  });

});
