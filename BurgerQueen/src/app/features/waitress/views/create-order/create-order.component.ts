import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product, ProductItemList } from 'src/app/shared/models/Product';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {
  selectedItems: ProductItemList[] = [];
  itemSelected: ProductItemList | null = null;
  orderDetail: ProductItemList[] = [];
  showDeleteModal: boolean = false;

  orderSubscription : Subscription = new Subscription();

  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
  }

  handleAddItemToOrder(product: Product) {
    const newProduct: ProductItemList = {
      qty: 1,
      product
    }
    const existingProductIndex = this.orderDetail.findIndex(item => item.product.id === newProduct.product.id);
    
    if (existingProductIndex !== -1) {
      // Si el producto ya existe en orderDetail, actualiza la cantidad
      this.orderDetail[existingProductIndex].qty += 1;
    } else {
      // Si el producto no existe en orderDetail, agrégalo
      this.orderDetail.push(newProduct);
    };
    
   this.selectedItems = this.orderDetail;
  }

  updateQuantity(data: {id: number , qtyChange: number}){
    const existingProduct = this.orderDetail.find(item => item.product.id === data.id);
    if(existingProduct) {
      if(existingProduct.qty !== 1 || data.qtyChange === 1){
        existingProduct.qty += data.qtyChange;
      } else if(data.qtyChange === -1) {
        this.showDeleteModal = true;
        this.itemSelected = existingProduct ? existingProduct : null;
      }
    }
  }

  handleRemoveItem(idProduct : number){
    const index = this.orderDetail.findIndex(item => item.product.id === idProduct);
    if (index !== -1)this.orderDetail.splice(index, 1);
  }

  handleClearOrder(){
    this.selectedItems = [];
    this.orderDetail = [];
  }

  handleCloseModal(){
    this.showDeleteModal = false;
  }

  handleCreateOrder(newOrder : {client: string, products: ProductItemList[]}){
    this.orderSubscription = this.ordersService.createOrder(newOrder).subscribe(
        () => {
          alert('Orden creada con éxito');
          this.handleClearOrder();
        },
        (error) => {
          console.error('Error al crear la orden:', error);
        }
      );
  }
}
