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


    // (x=> console.log("system", x))

      // authService.login(mockCredentials);


  // it('send a POST request when calling login', () => new Promise((resolve) => {
    
  //   httpClientSpy.request.and.returnValue(of(mockResponse));

  //   authService.login(mockCredentials);
  //   // expect(httpClientSpy.post).toHaveBeenCalledWith(`${environment.apiUrl}/login`, mockCredentials);
  //   authService.loginResponse$.subscribe(x => {
  //     console.log("HOLAAAA",x)
  //     resolve("AQUI Se REsolvio")
  //   })
  //   // authService.loginResponse$.subscribe((response) => {
  //   //   console.log("loginResponse", response)
  //   //   // if(response.isLoading){
  //   //   //   expect(response.data).toBeNull()
  //   //   //   expect(response.error).toBeNull()
  //   //   // }
  //   //   // if(response.data){
  //   //   //   expect(response.isLoading).toBeFalse()
  //   //   //   expect(response.error).toBeNull()
  //   //   //   expect(response.data).toEqual(mockResponse)
  //   //   //   done()
  //   //   // }
  //   //   done()
  //   // });

  // }));

  // it('systemUSer$ is filled correctly', () => {
  //   httpClientSpy.post.and.returnValue(of(mockResponse));
  //   authService.login(mockCredentials);

  //   authService.systemUser$.subscribe((user: systemUser) => {
  //     expect(user.id).toBe('1');
  //     expect(user.role).toBe('user');
  //     expect(user.email).toBe('test@test.com');
  //   });
  // });

  // it('localStorage is filled correctly', () => {
  //   httpClientSpy.post.and.returnValue(of(mockResponse));
  //   authService.login(mockCredentials);

  //   expect(localStorageService.getItem('accessToken')).toBe('mockAccessToken');
  //   expect(localStorageService.getItem('role')).toBe('user');
  //   expect(localStorageService.getItem('idUser')).toBe('1');
  // });
 
  // it('should clear systemUser$ when calling logout', () => {
  //   authService.logout();
  //   authService.systemUser$.subscribe((user) => {
  //     expect(user).toEqual({ id: '', accessToken: '', role: '', email: '' });
  //   });
  // });

  // it('should clear localStorage when calling logout', () => {
  //   authService.logout();
  //   expect(localStorageService.getItem('accessToken')).toBe(null);
  //   expect(localStorageService.getItem('role')).toBe(null);
  //   expect(localStorageService.getItem('idUser')).toBe(null);
  // });

  afterEach(() => {
    httpTestingController.verify();
  });
});
