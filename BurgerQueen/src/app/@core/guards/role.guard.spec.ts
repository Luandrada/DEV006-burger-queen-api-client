// import {TestBed } from '@angular/core/testing';
// import { Router } from '@angular/router';
// import { AuthService } from 'src/app/shared/services/auth/auth.service';
// import { AuthGuard } from './auth.guard';

// describe('AuthGuard', () => {
//     let guard: AuthGuard;
//     let router = {
//         navigate: jasmine.createSpy('navigate')
//     };

//     // async beforeEach
//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             imports: [FormsModule, CommonModule, HttpModule],
//             providers: [LoggedInGuard, StorageService, CookieService,
//                 {provide: Router, useValue: router}
//             ]
//         })
//         .compileComponents(); // compile template and css
//     }));

//     // synchronous beforeEach
//     beforeEach(() => {
//         loggedInGuard = TestBed.get(LoggedInGuard);
//         storageService = TestBed.get(StorageService);
//     });

//     it('be able to hit route when user is logged in', () => {
//         storageService.isLoggedIn = true;
//         expect(loggedInGuard.canActivate()).toBe(true);
//     });

//     it('not be able to hit route when user is not logged in', () => {
//         storageService.isLoggedIn = false;
//         expect(loggedInGuard.canActivate()).toBe(false);
//     });
// });



import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { RoleGuard } from './role.guard';

describe('AuthGuard', () => {
  let router: Router;
  let guard: RoleGuard;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        {
          provide: AuthService,
          useValue: {
            getSystemUser: () => ({ id: '', accessToken: null, role: '', email: ''}),
          },
        }]
    });

    // Get the Router instance
    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService);
    guard = new RoleGuard(router, authService);
   
  });

  it('if in the AuthService does not exist a role should navigate to sign-in', async () => {
    const route: ActivatedRouteSnapshot = {data: { allowedRoles: ['ROLE'] }} as any;
    const result = await guard.canActivate(route);
    expect(result instanceof UrlTree).toBeTrue();
  });

  it('if in the AuthService exist a token should return true', async () => {
    const route: ActivatedRouteSnapshot = {data: { allowedRoles: ['ROLE'] }} as any;
    spyOn(authService, 'getSystemUser').and.callFake(() => ({ id: '', accessToken: '', role: 'ROLE', email: ''}));
    const result = await guard.canActivate(route);
    expect(result).toBeTrue();
  });
});