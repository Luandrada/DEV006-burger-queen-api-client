import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewOrder, ProductItemList } from 'src/app/shared/models/Product';
@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  @Input() productList: Array<ProductItemList>  = [];
  @Output() updateQuantity: EventEmitter<{ id: number; qtyChange: number }> = new EventEmitter<{ id: number; qtyChange: number }>();
  @Output() itemToRemove: EventEmitter<number> = new EventEmitter<number>();
  @Output() createOrder: EventEmitter<NewOrder> = new EventEmitter<NewOrder>();

  constructor( private fb: FormBuilder) { }
  formOrderInfo!: FormGroup;

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.formOrderInfo = this.fb.group({
      clientName: ["", Validators.required],
      table: ["", Validators.required]
    });
  }
  
  sendOrder(): void {
    if (this.formOrderInfo?.invalid) {
      return Object.values(this.formOrderInfo.controls)
        .forEach(control => control.markAsTouched());
    } else if (this.productList && this.productList?.length !== 0) {      
      const newOrder: NewOrder = {
        client: this.formOrderInfo.value.clientName,
        products: this.productList,
      }
      this.formOrderInfo.reset();
      this.createOrder.emit(newOrder);
    }
  }
}
