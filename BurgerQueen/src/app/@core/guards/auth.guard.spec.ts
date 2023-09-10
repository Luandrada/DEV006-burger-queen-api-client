import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../authentication/services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [AuthGuard, AuthService]
    });
    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true when there is a token', () => {
    spyOn(authService, 'getToken').and.returnValue('fakeAccessToken');

    const canActivate = guard.canActivate();

    expect(canActivate).toBe(true);
    expect(authService.getToken).toHaveBeenCalled();
  });

  it('should return false and navigate to "/sign-in" when there is no token', () => {
    spyOn(authService, 'getToken').and.returnValue(null);

    const navigateSpy = spyOn(TestBed.inject(Router), 'navigate');

    const canActivate = guard.canActivate();

    expect(canActivate).toBe(false);
    expect(authService.getToken).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/sign-in']);
  });
});
