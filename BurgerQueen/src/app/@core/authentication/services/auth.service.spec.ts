import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService, Credentials } from './auth.service';
import { LoginResponse } from '../../../shared/models/Login';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { systemUser } from '../../interfaces';

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
  let httpClientSpy: { post: jasmine.Spy };
  let localStorageService: MockLocalStorageService; 

  const mockCredentials: Credentials = { email: 'test@test.com', password: 'password' };

  const mockResponse :LoginResponse = {
      user: {
        id: 1,
        role: 'user',
        email: 'test@test.com',
      },
      accessToken: 'mockAccessToken',
    };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: MockLocalStorageService, useClass: MockLocalStorageService },
        { provide: HttpClient, useValue: httpClientSpy },
      ],    });
    
    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
    localStorageService = TestBed.inject(MockLocalStorageService);
  });

  describe('Login', () => {
    beforeEach(()=> {
      httpClientSpy.post.and.returnValue(of(mockResponse));
      authService.login(mockCredentials);
    });

    it('should send a POST request when calling login', () => {
      expect(httpClientSpy.post).toHaveBeenCalledWith(`${environment.apiUrl}/login`, mockCredentials);
      
      authService.loginResponse$.subscribe((response) => {
        expect(response.data).toEqual(mockResponse);
      });
    });

    it('should verify if systemUSer$ is filled correctly when login was executed', () => {
      authService.systemUser$.subscribe((user: systemUser) => {
        expect(user.id).toBe('1');
        expect(user.role).toBe('user');
        expect(user.email).toBe('test@test.com');

        expect(localStorageService.getItem('accessToken')).toBe('mockAccessToken');
        expect(localStorageService.getItem('role')).toBe('user');
        expect(localStorageService.getItem('idUser')).toBe('1');
      });
    });
  })
  
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
  })
 
  afterEach(() => {
    httpTestingController.verify();
  });
});
