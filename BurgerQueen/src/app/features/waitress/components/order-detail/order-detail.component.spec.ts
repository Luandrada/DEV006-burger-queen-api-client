import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderDetailComponent } from './order-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductItemList } from 'src/app/shared/models/Product';

describe('OrderDetailComponent', () => {
  let component: OrderDetailComponent;
  let fixture: ComponentFixture<OrderDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderDetailComponent],
      imports: [ReactiveFormsModule], 
    });

    fixture = TestBed.createComponent(OrderDetailComponent);
    component = fixture.componentInstance;
  });

  describe('Form', () => {
    it('should initialize the form', () => {
      component.ngOnInit();
      expect(component.formOrderInfo).toBeDefined();
    });
  
    it('should mark form controls as touched when submitting with invalid form', () => {
      component.sendOrder();
  
      Object.values(component.formOrderInfo.controls).forEach((control) => {
        expect(control.touched).toBeTruthy();
      });
    });

    it('should disable the submit button when form is invalid or productList is empty', () => {
      component.formOrderInfo.setValue({
        clientName: 'María',
        table: '1',
      });
      component.productList = [];
      fixture.detectChanges(); 
  
      const submitButton = fixture.nativeElement.querySelector('.btnSend');
      expect(submitButton.disabled).toBe(true);
    });
  })

  describe('Create Order', () => {
    it('should not emit createOrder event with invalid form', () => {
      const createOrderSpy = spyOn(component.createOrder, 'emit');
      component.sendOrder();
      expect(createOrderSpy).not.toHaveBeenCalled();
    });
  
    it('should emit createOrder event with the correct order data', () => {
      component.formOrderInfo.setValue({
        clientName: 'María',
        table: '1',
      });
  
      const productList: ProductItemList[] = [
        { qty: 2, product: { id: 1, name: 'Product 1', price: 10, image: "", type: "" } },
        { qty: 3, product: { id: 2, name: 'Product 2', price: 15, image: "", type: "" } },
      ];
  
      component.productList = productList;
  
      const createOrderSpy = spyOn(component.createOrder, 'emit');
  
      component.sendOrder();
  
      expect(createOrderSpy).toHaveBeenCalledWith({
        client: 'María',
        products: productList,
      });
    });
  })
});
