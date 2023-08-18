import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Order, ProductItemList } from 'src/app/shared/interfaces/Product';
import { OrdersService } from '../../services/orders.service';

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
  @Output() clearOrder: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor( private fb: FormBuilder, private ordersService: OrdersService) { }
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
  
  /***Getters para campos invalidos  **/
  get invalidClientName() {
    return this.formOrderInfo?.get('clientName')?.invalid && this.formOrderInfo.get('clientName')?.touched;
  }

  get invalidTable() {
    return this.formOrderInfo?.get('table')?.invalid && this.formOrderInfo.get('table')?.touched;
  }
  /***FIN de Getters para campos invalidos  **/

  get totalAmount(): number {
    if (this.productList) {
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

      const newOrder: Order = {
        userId: Number(localStorage.getItem("idUser")),
        client: this.formOrderInfo.value.clientName,
        products: this.productList,
        status: 'pending',
        dataEntry: new Date()
      }

      this.ordersService.createOrder(newOrder).subscribe(
        (response) => {
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
