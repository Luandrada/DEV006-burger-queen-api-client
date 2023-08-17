import { Component, OnInit } from '@angular/core';
import { ProductItemList } from 'src/app/shared/interfaces/Product';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {
  selectedItems: ProductItemList[] | undefined;
  
  constructor() { }

  ngOnInit(): void {
  }

  handleMenuItemSelected(items: ProductItemList[]) {
    this.selectedItems = items;
  }
}
