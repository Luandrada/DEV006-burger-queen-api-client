import { Component, OnInit, Output,  EventEmitter } from '@angular/core';
import { ProductService } from 'src/app/@core/services/product.service';
import { Product, ProductItemList } from 'src/app/shared/interfaces/Product';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Output() menuItemsSelected: EventEmitter<ProductItemList[]> = new EventEmitter<ProductItemList[]>();

  products: Array<Product> | undefined;
  selectedMenu: string = "Desayuno";
  orderDetail: ProductItemList[] = [];

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
    const newProduct: ProductItemList = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1
    }

    const existingProductIndex = this.orderDetail.findIndex(item => item.id === newProduct.id);

    if (existingProductIndex !== -1) {
      // Si el producto ya existe en orderDetail, actualiza la cantidad
      this.orderDetail[existingProductIndex].quantity += 1;
    } else {
      // Si el producto no existe en orderDetail, agrégalo
      this.orderDetail.push(newProduct);
    };

    this.menuItemsSelected.emit(this.orderDetail);
  }
}
