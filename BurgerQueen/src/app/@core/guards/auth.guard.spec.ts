import {TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
    let guard: AuthGuard;
    let router = {
        navigate: jasmine.createSpy('navigate')
    };

    // async beforeEach
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, CommonModule, HttpModule],
            providers: [LoggedInGuard, StorageService, CookieService,
                {provide: Router, useValue: router}
            ]
        })
            .compileComponents(); // compile template and css
    }));

    // synchronous beforeEach
    beforeEach(() => {
        loggedInGuard = TestBed.get(LoggedInGuard);
        storageService = TestBed.get(StorageService);
    });

    it('be able to hit route when user is logged in', () => {
        storageService.isLoggedIn = true;
        expect(loggedInGuard.canActivate()).toBe(true);
    });

    it('not be able to hit route when user is not logged in', () => {
        storageService.isLoggedIn = false;
        expect(loggedInGuard.canActivate()).toBe(false);
    });
});