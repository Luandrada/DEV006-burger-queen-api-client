import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductItemList } from 'src/app/shared/models/Product';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss']
})
export class ProductListItemComponent implements OnInit {
  @Input() product: ProductItemList | null = null; 
  @Output() updateQuantity: EventEmitter<{ id: number; qtyChange: number }> = new EventEmitter<{ id: number; qtyChange: number }>();
  @Output() itemToRemove: EventEmitter<number> = new EventEmitter<number>();

  totalUnidad: number = 0;
  constructor() { }

  ngOnInit(): void {}

  get subtotal(): number{
    if (this.product) {
      return this.product.qty * this.product.product.price;
    }
    return 0;
  }
 
  modifyQuantity(productId: number | null, modify: number) {
    if (productId) {
      this.updateQuantity.emit({ id: productId, qtyChange: modify });
    }
  }
}
