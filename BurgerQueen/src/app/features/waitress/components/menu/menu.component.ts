import { Component, OnInit, Output,  EventEmitter , OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/@core/services/product.service';
import { requestResponse } from 'src/app/shared/interfaces';
import { Product, menu } from 'src/app/shared/models/Product';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit , OnDestroy{
  @Output() selectProduct: EventEmitter<Product> = new EventEmitter<Product>();
  productsResponse: requestResponse<Product[]> = {
    isLoading: false,
    error: null,
    data: []
  }
  selectedMenu: menu = "Desayuno";
  

  private productSubscription: Subscription = new Subscription();

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.productSubscription = this.productService.getProducts({types:[this.selectedMenu]})
    .subscribe(response => {
      this.productsResponse = response
    })
  }

  ngOnDestroy() {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }

  changeMenu(type: menu) {
    this.selectedMenu = type; 
    this.getProducts();
  }

  addProduct(product : Product) {
    this.selectProduct.emit(product);
  }
}
