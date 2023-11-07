import { TestBed, inject } from '@angular/core/testing';
import { OrdersService } from './orders.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from 'src/app/@core/authentication/services/auth.service';
import { Order } from 'src/app/shared/models/Product';
import { environment } from 'src/environments/environment';

describe('OrdersService', () => {
  let service: OrdersService;
  let httpMock: HttpTestingController;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrdersService, AuthService]
    });
    service = TestBed.inject(OrdersService);
    httpMock = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to create an order', () => {
    const mockOrder: Order = {
      userId: 1,
      client: 'Test Client',
      products: [],
      status: 'pending',
      dataEntry: new Date()
    };

    const expectedUrl = `${environment.apiUrl}/products`;
    const expectedHeaders = {
      'Authorization': `Bearer ${authService.getToken()}`
    };

    service.createOrder(mockOrder).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(expectedUrl);

    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe(expectedHeaders.Authorization);

    req.flush({}); // Simula una respuesta exitosa

    httpMock.verify();
  });
});

