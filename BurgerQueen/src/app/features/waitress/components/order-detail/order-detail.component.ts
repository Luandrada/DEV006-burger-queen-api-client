import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Order, ProductItemList } from 'src/app/shared/models/Product';
import { OrdersService } from '../../services/orders.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit, OnDestroy {
  @Input() productList: Array<ProductItemList>  = [];
  @Output() updateQuantity: EventEmitter<{ id: number; qtyChange: number }> = new EventEmitter<{ id: number; qtyChange: number }>();
  @Output() itemToRemove: EventEmitter<number> = new EventEmitter<number>();
  @Output() clearOrder: EventEmitter<boolean> = new EventEmitter<boolean>();
  private orderSubscription: Subscription = new Subscription();

  constructor( private fb: FormBuilder, private ordersService: OrdersService) { }
  formOrderInfo!: FormGroup;

  ngOnInit(): void {
    this.createForm();
  }

  ngOnDestroy() {
    if (this.orderSubscription) {
      this.orderSubscription.unsubscribe();
    }
  }

  createForm(): void {
    this.formOrderInfo = this.fb.group({
      clientName: ["", Validators.required],
      table: ["", Validators.required]
    });
  }

  get totalAmount(): number {
    if (this.productList) { // editar : mejorar sacar return 0 cuando productlist tenga un length 0  va a return 0 . anaizar de resolver con un pipe 
      const total = this.productList.reduce((accumulator, item) => {
        const subtotal = item.product.price * item.qty;
        return accumulator + subtotal;
      }, 0);
      return total; 
    }
    return 0;
  }

  sendOrder(): void {
    if (this.formOrderInfo?.invalid) {
      return Object.values(this.formOrderInfo.controls)
        .forEach(control => control.markAsTouched());
    } else if (this.productList && this.productList?.length !== 0) {

      const newOrder: {client: string, products: ProductItemList[]} = {
        client: this.formOrderInfo.value.clientName,
        products: this.productList,
      }

      this.orderSubscription = this.ordersService.createOrder(newOrder).subscribe(
        () => {
          alert('Orden creada con éxito');
          this.formOrderInfo.reset();
          this.clearOrder.emit(true);
        },
        (error) => {
          console.error('Error al crear la orden:', error);
        }
      );
    }
  }

  
}
