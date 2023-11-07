import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderDetailComponent } from './order-detail.component';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OrdersService } from '../../services/orders.service';
import { ProductItemList } from 'src/app/shared/models/Product';
import { of } from 'rxjs';

describe('OrderDetailComponent', () => {
  let component: OrderDetailComponent;
  let fixture: ComponentFixture<OrderDetailComponent>;
  let ordersService: OrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderDetailComponent],
      imports: [ReactiveFormsModule, FormsModule],
      providers: [
        FormBuilder,
        {
          provide: OrdersService,
          useValue: {
            createOrder: () => of({}),
          },
        },
      ],
    });
    fixture = TestBed.createComponent(OrderDetailComponent);
    component = fixture.componentInstance;
    ordersService = TestBed.inject(OrdersService);
  });

  it('should create the OrderDetailComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    component.ngOnInit();
    expect(component.formOrderInfo).toBeDefined();
  });

  it('should mark form controls as touched when sendOrder is called with invalid form', () => {
    component.ngOnInit();
    component.sendOrder();
    expect(component.formOrderInfo.get('clientName')?.touched).toBeTrue();
    expect(component.formOrderInfo.get('table')?.touched).toBeTrue();
  });

  it('should call createOrder when sendOrder is called with valid form and productList is not empty', () => {
    const mockProductList: ProductItemList[] = [
      { product: { id: 1, name: 'Product 1', price: 10 , image: "...", type:"breakfast"}, qty: 2 },
    ];
    component.ngOnInit();
    component.formOrderInfo.patchValue({ clientName: 'Client', table: 'Table' });
    component.productList = mockProductList;

    spyOn(ordersService, 'createOrder').and.callThrough();
    component.sendOrder();

    expect(ordersService.createOrder).toHaveBeenCalledOnceWith({
      userId: Number(localStorage.getItem('idUser')),
      client: 'Client',
      products: mockProductList,
      status: 'pending',
      dataEntry: jasmine.any(Date),
    });
  });

  it('should not call createOrder when sendOrder is called with valid form but productList is empty', () => {
    component.ngOnInit();
    component.formOrderInfo.patchValue({ clientName: 'Client', table: 'Table' });
    component.productList = [];

    spyOn(ordersService, 'createOrder').and.callThrough();
    component.sendOrder();

    expect(ordersService.createOrder).not.toHaveBeenCalled();
  });

});
