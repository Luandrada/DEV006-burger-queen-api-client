import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RoleAdminGuard } from './role-admin.guard';
import { AuthService } from '../authentication/services/auth.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RoleAdminGuard', () => {
  let guard: RoleAdminGuard;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [RoleAdminGuard, AuthService]
    });
    guard = TestBed.inject(RoleAdminGuard);
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true when user has "admin" role', () => {
    spyOn(authService, 'getToken').and.returnValue('fakeAccessToken');
    spyOn(authService, 'getRole').and.returnValue('admin');

    const canActivate = guard.canActivate();

    expect(canActivate).toBe(true);
    expect(authService.getToken).toHaveBeenCalled();
    expect(authService.getRole).toHaveBeenCalled();
  });

  it('should return false and navigate to "/sign-in" when user does not have "admin" role', () => {
    spyOn(authService, 'getToken').and.returnValue('fakeAccessToken');
    spyOn(authService, 'getRole').and.returnValue('user'); 

    const navigateSpy = spyOn(TestBed.inject(Router), 'navigate');

    const canActivate = guard.canActivate();

    expect(canActivate).toBe(false);
    expect(authService.getToken).toHaveBeenCalled();
    expect(authService.getRole).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/sign-in']);
  });
});
