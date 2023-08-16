import { Component, Input, OnInit } from '@angular/core';
import { ProductItemList } from 'src/app/shared/interfaces/Product';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss']
})
export class ProductListItemComponent implements OnInit {
  @Input() product: ProductItemList | undefined; 
  totalUnidad: number = 0;
  constructor() { }

  ngOnInit(): void {
    if (this.product) {
      this.totalUnidad = this.product?.price * this.product?.cantidad;
    }
  }
}
