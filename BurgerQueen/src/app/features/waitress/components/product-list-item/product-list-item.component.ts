import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ProductItemList } from 'src/app/shared/interfaces/Product';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss']
})
export class ProductListItemComponent implements OnInit , OnChanges {
  @Input() product: ProductItemList | undefined; 
  @Output() itemToAdd: EventEmitter<number> = new EventEmitter<number>();
  @Output() itemToDelete: EventEmitter<number> = new EventEmitter<number>();
  @Output() itemToRemove: EventEmitter<number> = new EventEmitter<number>();

  totalUnidad: number = 0;
  constructor() { }

  ngOnInit(): void {
    if (this.product) {
      this.totalUnidad = this.product?.price * this.product?.quantity;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("hubo un cAMBIO", changes);
    
    if (changes.product && this.product) {
      this.totalUnidad = this.product.price * this.product.quantity;
    }
  }

  get subtotal(): number{
    if (this.product) {
      return this.product.quantity * this.product.price;
    }
    return 0;
  }

  deleteProduct(idProduct: number| undefined) {

  }
  removeProduct(idProduct: number| undefined) {

  }
 
}
