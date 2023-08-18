import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './@core/authentication/sign-in/sign-in.component';
import { AuthGuard } from './@core/guards/auth.guard';
import { RoleAdminGuard } from './@core/guards/role-admin.guard';
import { RoleWaitressGuard } from './@core/guards/role-waitress.guard';

const routes: Routes = [
  { path: 'admin', loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGuard, RoleAdminGuard] },
  { path: 'orders', loadChildren: () => import('./features/waitress/waitress.module').then(m => m.WaitressModule), canActivate: [AuthGuard, RoleWaitressGuard] },

  { path: 'sign-in', component: SignInComponent},
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
