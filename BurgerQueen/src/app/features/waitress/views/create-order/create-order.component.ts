import { Component } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { requestResponse } from 'src/app/shared/interfaces';
import { Subscription } from 'rxjs';
import { Order, Product, newOrder  } from 'src/app/shared/models/Product';
import { OrdersService } from '../../services/orders.service';
import { ToastType, ToastPosition } from '../../../../shared/components/toast/toast.model';
import { ToastService } from '../../../../shared/components/toast/toast.service';


@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent {
  newOrder: newOrder = {
    customer:'',
    table:1,
    items:{},
  }

  createOrderRequest: requestResponse<Order> = {
    isLoading: false,
    error:null,
    data:null
  }
  private createOrderSubscription: Subscription = new Subscription();

  constructor(
    private orderService:OrdersService, 
    private spinner: NgxSpinnerService,
    private toastService:ToastService) {

  }

  ngOnDestroy() {
    if (this.createOrderSubscription) {
      this.createOrderSubscription.unsubscribe();
    }
  }

  addItemToOrder(newProduct: Product) { 
    const item = this.newOrder.items[newProduct.id];
    if(!item){
      this.newOrder.items[newProduct.id] = {
        qty: 1,
        product: newProduct
      }
      return;
    }
    item.qty =  item.qty + 1;
  }

  updateOrder(newOrder:newOrder){
    this.newOrder = {...newOrder}
  }

  saveOrder(){
    this.orderService.createOrder(this.newOrder)
    .subscribe(requestState => {
      this.createOrderRequest = requestState;
      if(this.createOrderRequest.isLoading){
        this.spinner.show();
      }

      if(this.createOrderRequest.data){
        this.newOrder = {
          customer:'',
          table:1,
          items:{},
        }
      }

      if(this.createOrderRequest.error){
        this.toastService.show("Error", "No fue posible guardar la orden por favor intenta de nuevo.", 5, ToastType.Warning, ToastPosition.TopRight);
      }
    })
  }
}
