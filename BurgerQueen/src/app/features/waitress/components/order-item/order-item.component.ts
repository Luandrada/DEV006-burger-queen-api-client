import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from 'src/app/shared/models/Product';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements OnInit {
  @Input() item!: Item; 
  @Output() updateQuantity: EventEmitter<{ productId: number; newQty: number }> = new EventEmitter<{ productId: number; newQty: number }>();
  @Output() itemToRemove: EventEmitter<number> = new EventEmitter<number>();

  showDeleteModal = false

  constructor() { }

  ngOnInit(): void { }

  get subtotal(): number{
    return this.item.qty * this.item.product.price;
  }
 
  modifyQuantity(productId: number, modify: number) {
    const newQty = this.item.qty + modify;
    if(newQty < 1) {
      this.showDeleteModal = true;
      return;
    }
    this.updateQuantity.emit({ productId, newQty });
  }

  removeItem(){
    this.showDeleteModal = false;
    this.itemToRemove.emit(this.item.product.id)
  }
}
