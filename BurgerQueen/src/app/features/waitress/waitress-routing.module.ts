import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateOrderComponent } from './views/create-order/create-order.component';

const routes: Routes = [
  // Aquí iran las rutas para el módulo Waitress 
  { path: 'waiter', component: CreateOrderComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WaitressRoutingModule { }
