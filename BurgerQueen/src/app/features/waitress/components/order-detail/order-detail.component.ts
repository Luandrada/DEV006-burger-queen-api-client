import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Order, ProductItemList } from 'src/app/shared/models/Product';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  @Input() productList: Array<ProductItemList>  = [];
  @Output() itemToAdd: EventEmitter<number> = new EventEmitter<number>();
  @Output() itemToDelete: EventEmitter<number> = new EventEmitter<number>();
  // cambiar nombre de los que borran que se entienda mejor o update(1 o -1) y remove y qeu sean solo 2 y no 3 metodos 
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

      const newOrder: Order = {
        userId: Number(JSON.parse(localStorage.getItem("userInfo") || "").id), // este dato lo debe obtener el servicio
        client: this.formOrderInfo.value.clientName,
        products: this.productList,
        status: 'pending',  // este dato lo debe obteenr el servicio
        dataEntry: new Date() // ver si no lo agrega el back y sino lo lelvo al servicio
      }

      this.ordersService.createOrder(newOrder).subscribe( // en el ngondestroy desuscribirme
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
