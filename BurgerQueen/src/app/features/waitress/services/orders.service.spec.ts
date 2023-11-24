import { TestBed } from '@angular/core/testing';
import { OrdersService } from './orders.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from 'src/app/@core/authentication/services/auth.service';
import { item} from 'src/app/shared/models/Product';
import { first, last } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
describe('OrdersService', () => {
  let service: OrdersService;
  let httpTestingController: HttpTestingController;

  const items = new Map<string, item>();
  items.set('1', {
    qty:1,
    product:{
      id: 1,
      name: 'hamburguesa',
      price: 500,
      image: "url de la imagen",
      type: 'Desayuno',
      dataEntry: "2022-03-05 15:14:10"
    }
  })

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrdersService, 
        {
          provide: AuthService,
          useValue: {
            getSystemUser: () => ({ id: '', accessToken: 'Token', role: '', email: ''}),
          },
      },]
    });
    service = TestBed.inject(OrdersService);
    httpTestingController = TestBed.inject(HttpTestingController);
    TestBed.inject(AuthService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it("make call to create order the first value that we should received is loading true {is loading: treu, data:null, error:null}", 
    (done:DoneFn) => {
        service.createOrder({client:"Carlos", items: items })
        .pipe(first())
        .subscribe({
          next: response => {
            expect(response.isLoading).toBeTruthy()
            expect(response.data).toBeNull()
            expect(response.error).toBeNull()
          },
          complete() {
            done();
          }
        });

        httpTestingController.expectOne('http://localhost:8089/orders');
    }
  )

  it("make call to create order and the request fails we should received is error {is loading: false, data:null, error:{}}", 
    (done:DoneFn) => {
        service.createOrder({client:"Carlos", items: items })
        .pipe(last())
        .subscribe({
          next: response => {
            expect((response.error as HttpErrorResponse).status).toBe(500)
          },
          complete() {
            done();
          }
        });
        const mock = httpTestingController.expectOne('http://localhost:8089/orders');
        mock.flush('',{status:500, statusText:""});
    }
  )

  it("make call to create order and the request is ok we should received the data {is loading: true, data:Order, error:null}", 
    (done:DoneFn) => {
        service.createOrder({client:"Carlos", items: items })
        .pipe(last())
        .subscribe({
          next: response => {
            console.log("HOLAA")
            expect(response.isLoading).toBeFalse()
            expect(response.data).toEqual({
              userId: 1,
              client: "Carlos",
              items: items,
              status: "pending",
            })
            expect(response.error).toBeNull()
          },
          complete() {
            done();
          }
        });

        const mock = httpTestingController.expectOne('http://localhost:8089/orders');
        mock.flush({
            userId: 1,
            client: "Carlos",
            items: items,
            status: "pending",
          });
    }
  )

});
