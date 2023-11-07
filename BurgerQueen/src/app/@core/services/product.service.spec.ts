import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { AuthService } from '../authentication/services/auth.service';
import { of } from 'rxjs';

describe('ProductService', () => {
  let productService: ProductService;
  let httpTestingController: HttpTestingController;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ProductService,
        {
          provide: AuthService,
          useValue: {
            getToken: () => 'fakeToken',
          },
        },
      ],
    });
    productService = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(productService).toBeTruthy();
  });

  it('should fetch all products', () => {
    const mockProducts = [{ id: 1, name: 'Product 1',  price: 5, image: "", type: "lunch"}, { id: 2, name: 'Product 2', type: 'Almuerzo',price: 5, image: "" }];

    productService.getAllProducts().subscribe((products) => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpTestingController.expectOne(`http://localhost:8080/products`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should fetch breakfast products', () => {
    const mockProducts = [{ id: 1, name: 'Product 1', type: 'Desayuno',price: 5, image: "", }, { id: 2, name: 'Product 2', price: 5, image: "", type: 'Almuerzo' }];

    spyOn(productService, 'getAllProducts').and.returnValue(of(mockProducts));

    productService.getBreakfastProducts().subscribe((products) => {
      expect(products).toEqual([{ id: 1, name: 'Product 1', type: 'Desayuno',price: 5, image: "", }]);
    });
  });

  it('should fetch lunch products', () => {
    const mockProducts = [{ id: 1, name: 'Product 1', type: 'Desayuno',price: 5, image: "" }, { id: 2, price: 5, image: "", name: 'Product 2', type: 'Almuerzo' }];

    spyOn(productService, 'getAllProducts').and.returnValue(of(mockProducts));

    productService.getLunchProducts().subscribe((products) => {
      expect(products).toEqual([{ id: 2, name: 'Product 2', price: 5, image: "", type: 'Almuerzo' }]);
    });
  });
});
