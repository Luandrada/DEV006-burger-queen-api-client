import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService, Credentials } from './auth.service';
import { LoginResponse } from '../../interfaces';

class MockLocalStorageService {
  private storage: { [key: string]: any } = {};

  setItem(key: string, value: any): void {
    this.storage[key] = value;
  }

  getItem(key: string): any {
    return this.storage[key] || null;
  }
}

describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;
  let localStorageService: MockLocalStorageService;
  const mockCredentials: Credentials = {
    email: 'test@test.com',
    password: 'password',
  };

  const mockResponse: LoginResponse = {
    user: {
      id: 1,
      role: 'user',
      email: 'test@test.com',
    },
    accessToken: 'mockAccessToken',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, MockLocalStorageService],
    });

    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
    localStorageService = TestBed.inject(MockLocalStorageService);
  });

  describe('Login', () => {
    it('should make a POST request to the login endpoint with correct credentials ', () => {
      authService.login(mockCredentials);
      const req = httpTestingController.expectOne(
        `${authService['apiUrl']}/login`
      );

      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(mockCredentials);

      req.flush(mockResponse);
    });

    it('should handle login errors', () => {
      const errorMessage = 'Login failed';
      authService.login(mockCredentials);
      httpTestingController.expectOne(`${authService['apiUrl']}/login`).error(
        new ErrorEvent('Network error', {
          message: errorMessage,
        })
      );

      authService.systemUser$.subscribe((user) => {
        expect(user).toEqual({
          id: '',
          accessToken: '',
          role: '',
          email: '',
        });

        expect(localStorageService.getItem('accessToken')).toBe(null);
        expect(localStorageService.getItem('role')).toBe(null);
        expect(localStorageService.getItem('idUser')).toBe(null);
      });
    });
  });

  describe('Logout', () => {
    it('should clear systemUser$ when calling logout', () => {
      authService.logout();
      authService.systemUser$.subscribe((user) => {
        expect(user).toEqual({ id: '', accessToken: '', role: '', email: '' });

        expect(localStorageService.getItem('accessToken')).toBe(null);
        expect(localStorageService.getItem('role')).toBe(null);
        expect(localStorageService.getItem('idUser')).toBe(null);
      });
    });
  });

  afterEach(() => {
    httpTestingController.verify();
    authService.systemUser$.unsubscribe();
  });
});
