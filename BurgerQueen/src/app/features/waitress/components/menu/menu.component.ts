import { Component, OnInit, Output,  EventEmitter } from '@angular/core';
import { ProductService } from 'src/app/@core/services/product.service';
import { Product } from 'src/app/shared/interfaces/Product';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Output() menuItemsSelected: EventEmitter<Product> = new EventEmitter<Product>();
  products: Array<Product> | undefined;
  selectedMenu: string = "Desayuno";

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.changeMenu(this.selectedMenu);
  }

  changeMenu(type: string) {
    this.selectedMenu = type; 
    switch (type) {
      case "Almuerzo":
        this.productService.getLunchProducts().subscribe((resp)=>  this.products = resp)
        break;
      case "Desayuno":
        this.productService.getBreakfastProducts().subscribe((resp)=>  this.products = resp)
        break;
      default:
        break;
    }
  }

  addProduct(product : Product) {
    this.menuItemsSelected.emit(product);
  }
}
