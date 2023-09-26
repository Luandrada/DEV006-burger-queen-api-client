import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { Credentials, LoginResponse } from '../../../shared/models/Login';

describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should return a token and role when calling getToken and getRole', () => {
    localStorage.setItem('accessToken', 'fakeAccessToken');
    localStorage.setItem('role', 'admin');

    const token = authService.getToken();
    const role = authService.getRole();

    expect(token).toBe('fakeAccessToken');
    expect(role).toBe('admin');
  });

  it('should send a POST request to the login endpoint and return a response', () => {
    const mockCredentials: Credentials = { email: 'user@prueba.com', password: 'password' };
    const mockResponse: LoginResponse = { accessToken: 'asdtoken', user:{ email: "hola@hola", id: 1, role: "admin"} };

    authService.sigIn(mockCredentials).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`http://localhost:8080/login`);
    expect(req.request.method).toEqual('POST');
    req.flush(mockResponse);

    httpTestingController.verify();
  });

  afterEach(() => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('role');
  });
});
