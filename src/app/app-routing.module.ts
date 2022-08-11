import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoIndexComponent } from './producto/producto-index/producto-index.component';
import { LoginIndexComponent } from './login/login-index/login-index.component';
const routes: Routes = [
  {
    path: '',
    component: ProductoIndexComponent,
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
