import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductItemList } from 'src/app/shared/interfaces/Product';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  @Input() productList: Array<ProductItemList> | undefined;
  @Output() itemToAdd: EventEmitter<number> = new EventEmitter<number>();
  @Output() itemToDelete: EventEmitter<number> = new EventEmitter<number>();
  @Output() itemToRemove: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {}
  
  get totalAmount(): number {
    if (this.productList) {
      const total = this.productList.reduce((accumulator, item) => {
        const subtotal = item.price * item.quantity;
        return accumulator + subtotal;
      }, 0);
      return total; 
    }
    return 0;
  }
}
