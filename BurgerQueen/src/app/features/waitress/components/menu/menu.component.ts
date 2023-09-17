import { Component, OnInit, Output,  EventEmitter } from '@angular/core';
import { ProductService } from 'src/app/@core/services/product.service';
import { Product } from 'src/app/shared/models/Product';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Output() menuItemsSelected: EventEmitter<Product> = new EventEmitter<Product>();
  allProductsData: Array<Product> = [];
  products: Array<Product> | undefined;
  selectedMenu: string = "Desayuno";
  isLoading: boolean = true;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((resp) => {
      this.allProductsData = resp;
      this.changeMenu(this.selectedMenu);
    })

  }

  changeMenu(type: string) {
    this.selectedMenu = type; 
    this.products = this.allProductsData.filter(item => item.type === type);
    this.isLoading = false;
  }

  addProduct(product : Product) {
    this.menuItemsSelected.emit(product);
  }
}
