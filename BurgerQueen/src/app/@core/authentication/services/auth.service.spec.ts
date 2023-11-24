import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService, Credentials } from './auth.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { first, skip, last } from 'rxjs/operators';
import { Observable, concat } from 'rxjs';

describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;
  const mockCredentials: Credentials = { email: 'test@test.com', password: 'password' };

  const mockResponse = {
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
      providers: [
        AuthService,
        { provide: HttpClient },
      ],    });
    
    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
  
  it('call the method login must set isloading a true',
    (done: DoneFn) => {
      authService.login(mockCredentials).pipe(first()).subscribe({
        next(state){
          expect(state.isLoading).toBeTrue();
        },
        complete(){
          done();
        }
      });
      httpTestingController.expectOne('http://localhost:8089/login');
    }
  )

  it('call the method login if the request fails must populate prop error',
  (done: DoneFn) => {
    authService.login(mockCredentials).pipe(last()).subscribe({
      next(state){
        expect((state.error as HttpErrorResponse).status).toEqual(404);
      },
      complete(){
        done();
      }
    });
    const mock = httpTestingController.expectOne('http://localhost:8089/login');
    mock.flush('',{status:404, statusText:""});
  }
)

  it('call the method login if the response is valid must push a systemUser into the observer and method getSystemUser must retrun the current user',
    (done: DoneFn) => { 
      concat(authService.login(mockCredentials),authService.systemUser$)
      .pipe(skip(2))
      .subscribe({
        next:(response) => {
          expect(response).toEqual({id: '1', accessToken: 'mockAccessToken', role: 'user', email: 'test@test.com'});
          expect(authService.getSystemUser()).toEqual({id: '1', accessToken: 'mockAccessToken', role: 'user', email: 'test@test.com'});
          done();
        }
      });
      const mock = httpTestingController.expectOne('http://localhost:8089/login');
      mock.flush(mockResponse)
    }
  )

  it('should clear systemUser$ when calling logout', (done: DoneFn) => {
    const observable = new Observable(s => {
      authService.systemUser$.subscribe(state => {
        if(state.id){
          s.complete()
          authService.logout()
        }
      })
    })
    concat(authService.login(mockCredentials), observable, authService.systemUser$)
    // I skip 3 values because first i make a login and the  when the login is complete and we have information in the systemUser$ make a logut call to clean it 
      .pipe(skip(3))
      .subscribe({
        next:(response) => {
          expect(response).toEqual({ id: '', accessToken: '', role: '', email: '' });
          done();
        }
      });
      const mock = httpTestingController.expectOne('http://localhost:8089/login');
      mock.flush(mockResponse)
  });
});
