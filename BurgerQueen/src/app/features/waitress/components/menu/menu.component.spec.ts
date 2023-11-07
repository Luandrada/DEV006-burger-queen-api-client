import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MenuComponent } from './menu.component';
import { ProductService } from 'src/app/@core/services/product.service';
import { Product } from 'src/app/shared/models/Product';
import { of } from 'rxjs';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let productService: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuComponent],
      providers: [
        {
          provide: ProductService,
          useValue: {
            getLunchProducts: () => of([]),
            getBreakfastProducts: () => of([]),
          },
        },
      ],
    });
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
  });

  it('should create the MenuComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with "Desayuno" menu', () => {
    expect(component.selectedMenu).toBe('Desayuno');
  });
  

});
