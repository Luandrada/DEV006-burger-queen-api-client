import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService, Credentials } from './auth.service';
import { LoginResponse } from '../../../shared/models/Login';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { systemUser } from '../../interfaces';
import { first } from 'rxjs/operators';

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
    
    it('call the method login must set isloading a true',
    (done: DoneFn) => {
      httpClientSpy.post.and.returnValue(of(mockResponse));   
      authService.loginResponse$.pipe(first()).
      subscribe(response => {
        expect(response.isLoading).toBeTrue();
        done();
      });
      authService.login(mockCredentials);
    }
    )

    it('call the method login if the response is valid must set system user',
      (done: DoneFn) => {
        httpClientSpy.post.and.returnValue(of(mockResponse));   
        authService.login(mockCredentials);
        authService.systemUser$.
        subscribe(response => {
          expect(response).toEqual({id: '1', accessToken: 'mockAccessToken', role: 'user', email: 'test@test.com'});
          done();
        });
      }
    )
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
    authService.loginResponse$.unsubscribe()
    authService.systemUser$.unsubscribe()
  });
});
