import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListItemComponent } from './product-list-item.component';
import { ProductItemList } from 'src/app/shared/models/Product';

describe('ProductListItemComponent', () => {
  let component: ProductListItemComponent;
  let fixture: ComponentFixture<ProductListItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductListItemComponent],
    });

    fixture = TestBed.createComponent(ProductListItemComponent);
    component = fixture.componentInstance;
  });

  describe('Calling Outputs correctly', () => {
    const productId = 1;
    const modify = 2;

    it('should emit the updateQuantity event with the correct parameters', () => {
      const spy = spyOn(component.updateQuantity, 'emit');
      component.modifyQuantity(productId, modify);
  
      expect(spy).toHaveBeenCalledWith({ id: productId, qtyChange: modify });
    });
  
    it('should emit the itemToRemove event with the correct parameter', () => {
      const spy = spyOn(component.itemToRemove, 'emit');
      component.itemToRemove.emit(productId);
  
      expect(spy).toHaveBeenCalledWith(productId);
    });
  })

 describe('Calculate subtotal', () => {
    it('should calculate subtotal correctly when product is defined', () => {
      const testProduct: ProductItemList = {
        product: { id: 1, name: 'Test Product', price: 10 , image:"...", type:"breakfast"},
        qty: 3,
      };
      component.product = testProduct;

      const subtotal = component.subtotal;
      expect(subtotal).toEqual(30); 
    });
    
    it('should calculate subtotal as 0 when product is null', () => {
      component.product = null;

      const subtotal = component.subtotal;
      expect(subtotal).toEqual(0);
    })
 })
});
