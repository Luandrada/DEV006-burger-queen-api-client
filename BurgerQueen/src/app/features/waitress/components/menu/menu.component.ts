import { Component, OnInit, Output,  EventEmitter , OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/@core/services/product.service';
import { Product } from 'src/app/shared/models/Product';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit , OnDestroy{
  @Output() menuItemsSelected: EventEmitter<Product> = new EventEmitter<Product>();
  allProductsData: Array<Product> = [];
  products: Array<Product> = [];
  selectedMenu: string = "Desayuno";
  isLoading: boolean = true;

  private productSubscription: Subscription = new Subscription();

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productSubscription = this.productService.getAllProducts().subscribe((resp) => {
      this.allProductsData = resp;
      this.changeMenu(this.selectedMenu);
    })
  }

  ngOnDestroy() {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }

  changeMenu(type: string) {
    this.selectedMenu = type; 
    this.productService.getProductByCategory([type]).subscribe(resp => {
      this.products = resp;
      this.isLoading = false;
    });
  }

  addProduct(product : Product) {
    this.menuItemsSelected.emit(product);
  }
}
