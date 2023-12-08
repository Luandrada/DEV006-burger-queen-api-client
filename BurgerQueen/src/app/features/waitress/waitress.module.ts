import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { WaitressRoutingModule } from './waitress-routing.module';
import { CreateOrderComponent } from './views/create-order/create-order.component';
import { MenuComponent } from './components/menu/menu.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { OrderItemComponent } from './components/order-item/order-item.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ModalComponent } from './components/modal/modal.component';
import { CalculateTotalPipe } from './pipes/calculate-total.pipe';
import { ToastComponent } from '../../shared/components/toast/toast.component';

@NgModule({
  declarations: [
    CreateOrderComponent,
    MenuComponent,
    OrderDetailComponent,
    OrderItemComponent,
    ProductCardComponent,
    ModalComponent,
    CalculateTotalPipe,
    ToastComponent,

  ],
  imports: [
    CommonModule,
    WaitressRoutingModule,
    NgxSpinnerModule,
  ]
})
export class WaitressModule { }
