import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListItemComponent } from './product-list-item.component';
import { ProductItemList } from 'src/app/shared/models/Product';
import { EventEmitter } from '@angular/core';

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

  it('should create the ProductListItemComponent', () => {
    expect(component).toBeTruthy();
  });

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
  });

  it('should emit itemToAdd event with correct quantity', () => {
    spyOn(component.updateQuantity, 'emit');
    component.totalUnidad = 5;

    component.updateQuantity.emit({id: component.totalUnidad,qty: -1});

    expect(component.updateQuantity.emit).toHaveBeenCalledWith(5);
  });

  // it('should emit itemToDelete event with correct quantity', () => {
  //   spyOn(component.itemToDelete, 'emit');
  //   component.totalUnidad = 3;

  //   component.itemToDelete.emit(component.totalUnidad);

  //   expect(component.itemToDelete.emit).toHaveBeenCalledWith(3);
  // });

  it('should emit itemToRemove event with correct quantity', () => {
    spyOn(component.itemToRemove, 'emit');
    component.totalUnidad = 2;

    component.itemToRemove.emit(component.totalUnidad);

    expect(component.itemToRemove.emit).toHaveBeenCalledWith(2);
  });
});
