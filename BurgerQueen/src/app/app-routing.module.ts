import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './@core/authentication/sign-in/sign-in.component';

const routes: Routes = [
  { path: 'admin', loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule) },
  { path: 'orders', loadChildren: () => import('./features/waitress/waitress.module').then(m => m.WaitressModule) },

  { path: 'sign-in', component: SignInComponent},

  { path: '', redirectTo: '/sign-in', pathMatch: 'full' }, // Ruta por defecto
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
