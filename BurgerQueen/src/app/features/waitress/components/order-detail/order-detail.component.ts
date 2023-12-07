import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { newOrder } from 'src/app/shared/models/Product';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit, OnChanges {
  @Input() order!:newOrder; 
  @Output() orderChangeEmiter = new EventEmitter<newOrder>();
  @Output() saveOrderChangeEmiter = new EventEmitter();
  
  tmpOrder!:newOrder; 

  constructor() { }

  ngOnInit(): void {
    this.tmpOrder = {...this.order}
  }

  ngOnChanges(changes: SimpleChanges) {
    this.tmpOrder = {...changes.order.currentValue}
  }

  get items(){
    return Object.values(this.tmpOrder.items)
  }

  updateQuantity(data:{productId:number, newQty: number}){
    const item = this.tmpOrder.items[data.productId];
    if(!item){
      return;
    }
    item.qty =  data.newQty;
    this.orderChangeEmiter.emit(this.tmpOrder);
  }

  removeItem(idProduct : number){
    delete this.tmpOrder.items[idProduct];
    this.orderChangeEmiter.emit(this.tmpOrder);
  }

  onChangeTable(event: Event){
    this.tmpOrder.table = Number((event.target as HTMLSelectElement).value);
    this.orderChangeEmiter.emit(this.tmpOrder);
  }

  onChangeCustomer(event: Event){
    this.tmpOrder.customer = (event.target as HTMLInputElement).value;
    this.orderChangeEmiter.emit(this.tmpOrder);
  }  
}
