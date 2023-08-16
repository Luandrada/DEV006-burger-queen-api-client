import { Component, OnInit } from '@angular/core';
import { ProductItemList } from 'src/app/shared/interfaces/Product';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  productList: Array<ProductItemList> = [
    {
      id: 1,
      name: "Café",
      price: 10,
      cantidad:3,
    },
    {
      id: 2,
      name:  "Café con leche",
      price: 13,
      cantidad:5,
    },
    {
      id: 3,
      name:  "Té",
      price: 8,
      cantidad:1,
    },
  ]
  constructor() { }

  ngOnInit(): void {
  }
}
