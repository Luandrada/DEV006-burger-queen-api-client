import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService, Credentials } from './auth.service';
import { LoginResponse } from '../../../shared/models/Login';
import { of } from 'rxjs';
//import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';
//import { systemUser } from '../../interfaces'; 

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
  let httpClientSpy: { request: jasmine.Spy };
  //let localStorageService: MockLocalStorageService; 


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
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['request']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: MockLocalStorageService, useClass: MockLocalStorageService },
        { provide: HttpClient, useValue: httpClientSpy },
      ],    });
    
    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
    //localStorageService = TestBed.inject(MockLocalStorageService);
  });
  
  afterEach(()=>{
    authService.loginResponse$.unsubscribe()
    authService.systemUser$.unsubscribe()
  })

  it('call the method login must set isloading a true',
    (done: DoneFn) => {
      httpClientSpy.request.and.returnValue(of(mockResponse));   
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
      httpClientSpy.request.and.returnValue(of(mockResponse));   
      authService.login(mockCredentials);
      authService.systemUser$.
      subscribe(response => {
        expect(response).toEqual({id: '1', accessToken: 'mockAccessToken', role: 'user', email: 'test@test.com'});
        done();
      });
    }
  )

  it('should clear systemUser$ when calling logout', (done: DoneFn) => {
    authService.logout();
    authService.systemUser$.subscribe((user) => {
      expect(user).toEqual({ id: '', accessToken: '', role: '', email: '' });
      done();
    });
  });


  afterEach(() => {
    httpTestingController.verify();
  });
});
