import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ProductService } from './product.service';
import { AuthService } from '../authentication/services/auth.service';
import { concat } from 'rxjs';
import { first, last } from 'rxjs/operators';

describe('ProductService', () => {
  let productService: ProductService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ProductService,
        {
          provide: AuthService,
          useValue: {
            getSystemUser: () => ({ id: '', accessToken: 'Token', role: '', email: ''}),
          },
        },
        { provide: HttpClient },
      ],
    });
    productService = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController);
    TestBed.inject(AuthService);
    
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('If we subscribe to getProducts the first value that we will get shloud be {isloading:true, data:null,error:null}', (done: DoneFn) => {
    productService.getProducts().pipe(first()).subscribe({
      next: (state) => {
        expect(state.isLoading).toBeTruthy()
        expect(state.data).toEqual([])
        expect(state.error).toBeNull()
      },
      complete() {
        done();
      }
    })
    httpTestingController.expectOne('http://localhost:8089/products');
  })

  it('If we subscribe to getProducts the last value that we will get shloud be {isloading:false,data:[product],error:null} ', (done: DoneFn) => {
    productService.getProducts().pipe(last()).subscribe({
      next: (state) => {
        expect(state.isLoading).toBeFalsy()
        expect(state.data).toEqual([{
          id: 1,
          name: 'hamburguesa',
          price: 500,
          image: "url de la imagen",
          type: 'Desayuno',
          dataEntry: "2022-03-05 15:14:10",
        }])
        expect(state.error).toBeNull()
      },
      complete() {
        done();
      }
    });

    const mock = httpTestingController.expectOne('http://localhost:8089/products');
    mock.flush([{
      id: 1,
      name: 'hamburguesa',
      price: 500,
      image: "url de la imagen",
      type: 'Desayuno',
      dataEntry: "2022-03-05 15:14:10",
    }]);
  })

  it('If we subscribe to getProducts multiple times just the one time should make api call', (done: DoneFn) => {  
    concat(productService.getProducts(),productService.getProducts()).pipe(last())
    .subscribe({
      next(state) {
        expect(state).toEqual({isLoading: false, error: null, data: [{
          id: 1,
          name: 'hamburguesa',
          price: 500,
          image: "url de la imagen",
          type: 'Desayuno',
          dataEntry: "2022-03-05 15:14:10",
        }]})
      },
      complete() {
        done();
      }
    });

    const mock = httpTestingController.expectOne('http://localhost:8089/products');
    mock.flush([{
      id: 1,
      name: 'hamburguesa',
      price: 500,
      image: "url de la imagen",
      type: 'Desayuno',
      dataEntry: "2022-03-05 15:14:10",
    }]);
  })

  it('If we subscribe to getProducts with the filters type we should received products of that type', (done: DoneFn) => {
    productService.getProducts({types:['comida']}).pipe(last()).subscribe({
      next: (state) => {
        expect(state.data?.length).toBe(1)
        expect((state.data?state.data[0]:[])).toEqual({
          id: 2,
          name: 'tacos',
          price: 1000,
          image: "url de la imagen",
          type: 'comida',
          dataEntry: "2022-03-05 15:14:10",
        })
      },
      complete() {
        done();
      }
    });

  const mock = httpTestingController.expectOne('http://localhost:8089/products');
    mock.flush([{
      id: 1,
      name: 'hamburguesa',
      price: 500,
      image: "url de la imagen",
      type: 'Desayuno',
      dataEntry: "2022-03-05 15:14:10",
    },
    {
      id: 2,
      name: 'tacos',
      price: 1000,
      image: "url de la imagen",
      type: 'comida',
      dataEntry: "2022-03-05 15:14:10",
    }
  ]);
  })

  it('If we subscribe to getProducts and the request fails we will get {isloading:false, data:[], error:Error}', (done: DoneFn) => {
  productService.getProducts({types:['comida']}).pipe(last()).subscribe({
    next: (state) => {
      expect(state.data).toEqual([])
      expect(state.isLoading).toBeFalsy()
      expect((state.error as HttpErrorResponse).status).toBe(404)
    },
    complete() {
      done();
    }
  })
  
    const mock = httpTestingController.expectOne('http://localhost:8089/products');
    mock.flush('',{status:404, statusText:""});
  })


})
