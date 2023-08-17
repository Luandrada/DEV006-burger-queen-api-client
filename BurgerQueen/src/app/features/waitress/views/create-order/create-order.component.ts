import { Component, OnInit } from '@angular/core';
import { Product, ProductItemList } from 'src/app/shared/interfaces/Product';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {
  selectedItems: ProductItemList[] | undefined;
  orderDetail: ProductItemList[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  handleAddItemToOrder(product: Product) {
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
    
   this.selectedItems = this.orderDetail;
  }

  handleAddItem(idProduct : number){
    const existingProduct = this.orderDetail.find(item => item.id === idProduct);
    if(existingProduct) existingProduct.quantity += 1;
  }

  handleDeleteItem(idProduct : number){
    const existingProduct = this.orderDetail.find(item => item.id === idProduct);
    if(existingProduct && existingProduct.quantity > 1){
      existingProduct.quantity -= 1;
    } else {
      this.handleRemoveItem(idProduct)
    }
  }

  handleRemoveItem(idProduct : number){
    const index = this.orderDetail.findIndex(item => item.id === idProduct);
    if (index !== -1)this.orderDetail.splice(index, 1);
  }
}
