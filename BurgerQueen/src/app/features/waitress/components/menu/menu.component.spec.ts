import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuComponent } from './menu.component';
import { ProductService } from 'src/app/@core/services/product.service';
import { of, Subscription } from 'rxjs';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let productService: jasmine.SpyObj<ProductService>;

  beforeEach(() => {
    productService = jasmine.createSpyObj('ProductService', ['getAllProducts', 'getProductByCategory']);
    TestBed.configureTestingModule({
      declarations: [MenuComponent],
      providers: [{ provide: ProductService, useValue: productService }],
    });
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
  });

  it('should load products from ProductService and initialize the selected menu', () => {
    const mockProducts = [{ id: 1, name: 'Product 1' , image:"", type: "Desayuno", price: 10}, { id: 2, name: 'Product 2', image:"", type: "Desayuno", price: 3 }];
    productService.getAllProducts.and.returnValue(of(mockProducts));

    fixture.detectChanges(); 

    expect(component.isLoading).toBe(false);
    expect(component.allProductsData).toEqual(mockProducts);
    expect(component.selectedMenu).toBe('Desayuno');
    expect(productService.getProductByCategory).toHaveBeenCalledWith(['Desayuno']);
  });
  
  it('should change the menu and load products for the selected menu', () => {
    const mockProducts = [{ id: 3, name: 'Product 3', image:"", type: "Almuerzo", price: 10 }, { id: 4, name: 'Product 4', image:"", type: "Almuerzo", price: 1 }];
    productService.getProductByCategory.and.returnValue(of(mockProducts));

    component.changeMenu('Almuerzo');

    expect(component.selectedMenu).toBe('Almuerzo');
    expect(component.products).toEqual(mockProducts);
  });

  it('should emit menuItemsSelected event when adding a product', () => {
    const mockProduct = { id: 5, name: 'Product 5' , image:"", type: "Almuerzo", price: 10 };
    const menuItemsSelectedSpy = spyOn(component.menuItemsSelected, 'emit');

    component.addProduct(mockProduct);

    expect(menuItemsSelectedSpy).toHaveBeenCalledWith(mockProduct);
  });

  it('should handle ngOnDestroy and unsubscribe from productSubscription', () => {
    const productSubscription = component['productSubscription'];
    const unsubscribeSpy = spyOn(productSubscription, 'unsubscribe');

    component.ngOnDestroy();

    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
