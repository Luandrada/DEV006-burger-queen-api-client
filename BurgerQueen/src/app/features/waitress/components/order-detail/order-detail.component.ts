import { Component, Input, OnInit } from '@angular/core';
import { ProductItemList } from 'src/app/shared/interfaces/Product';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  @Input() productList: Array<ProductItemList> | undefined;
  
  constructor() { }

  ngOnInit(): void {
  }
}
