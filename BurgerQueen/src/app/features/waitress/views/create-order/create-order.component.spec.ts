import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateOrderComponent } from './create-order.component';
import { Product } from 'src/app/shared/models/Product';

describe('CreateOrderComponent', () => {
  let component: CreateOrderComponent;
  let fixture: ComponentFixture<CreateOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateOrderComponent]
    });
    fixture = TestBed.createComponent(CreateOrderComponent);
    component = fixture.componentInstance;
  });

  it('should create the CreateOrderComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should add item to order when handleAddItemToOrder is called', () => {
    const mockProduct: Product = { id: 1, name: 'Test Product', price: 10, image:"", type:"breakfast" };
    component.handleAddItemToOrder(mockProduct);

    expect(component.orderDetail.length).toBe(1);
    expect(component.orderDetail[0].product).toEqual(mockProduct);
    expect(component.orderDetail[0].qty).toBe(1);
  });

  it('should remove item from order when handleRemoveItem is called', () => {
    const mockProduct: Product = { id: 1, name: 'Test Product', price: 10, image:"", type:"breakfast" };
    component.orderDetail = [{ product: mockProduct, qty: 1 }];

    component.handleRemoveItem(mockProduct.id);

    expect(component.orderDetail.length).toBe(0);
  });

  it('should clear order when handleClearOrder is called', () => {
    const mockProduct: Product = { id: 1, name: 'Test Product', price: 10, image:"", type:"breakfast" };
    component.orderDetail = [{ product: mockProduct, qty: 1 }];

    component.handleClearOrder();

    expect(component.orderDetail.length).toBe(0);
    expect(component.selectedItems?.length).toBe(0);
  });
});
