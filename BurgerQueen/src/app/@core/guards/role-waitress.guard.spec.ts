import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RoleWaitressGuard } from './role-waitress.guard';
import { AuthService } from '../authentication/services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';

describe('RoleWaitressGuard', () => {
  let guard: RoleWaitressGuard;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [RoleWaitressGuard, AuthService]
    });
    guard = TestBed.inject(RoleWaitressGuard);
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true when user has "mesera" role', () => {
    spyOn(authService, 'getRole').and.returnValue('mesera');

    const canActivate = guard.canActivate();

    expect(canActivate).toBe(true);
    expect(authService.getRole).toHaveBeenCalled();
  });

  it('should return false and navigate to "/sign-in" when user does not have "mesera" role', () => {
    spyOn(authService, 'getRole').and.returnValue('admin');

    const navigateSpy = spyOn(TestBed.inject(Router), 'navigate');

    const canActivate = guard.canActivate();

    expect(canActivate).toBe(false);
    expect(authService.getRole).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/sign-in']);
  });
});
