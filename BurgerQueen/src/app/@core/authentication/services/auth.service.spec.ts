import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService, Credentials } from './auth.service';
import { LoginResponse } from '../../../shared/models/Login';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../../services/local-storage.service';
import { HttpClient } from '@angular/common/http';

class MockLocalStorageService {
  setStorage() {}
}

describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;
  let httpClientSpy: { post: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: LocalStorageService, useClass: MockLocalStorageService },
        { provide: HttpClient, useValue: httpClientSpy },
      ],    });
    
    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });


  it('send a POST request when calling login', () => {
    const mockCredentials: Credentials = { email: 'test@test.com', password: 'password' };

    const mockResponse :LoginResponse = {
        user: {
          id: 1,
          role: 'user',
          email: 'test@test.com',
        },
        accessToken: 'mockAccessToken',
      };

    httpClientSpy.post.and.returnValue(of(mockResponse));

    authService.login(mockCredentials);

    expect(httpClientSpy.post).toHaveBeenCalledWith(`${environment.apiUrl}/login`, mockCredentials);
    
    authService.loginResponse$.subscribe((response) => {
      expect(response.data).toEqual(mockResponse);
    });
  });

  it('should clear systemUser$ when calling logout', () => {
    authService.logout();

    authService.systemUser$.subscribe((user) => {
      expect(user).toEqual({ id: '', accessToken: '', role: '', email: '' });
    });
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
