import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductoIndexComponent } from './producto-index/producto-index.component';
import { ProductoShowComponent } from './producto-show/producto-show.component';
import { ProductoUpdateComponent } from './producto-update/producto-update.component';
import { ProductoCreateComponent } from './producto-create/producto-create.component';

const routes: Routes = [
//  { path: '', component: ProductoIndexComponent },
  { path: 'producto/show/:id', component: ProductoShowComponent },
  { path: 'producto/create', component: ProductoCreateComponent },
  { path: 'producto/update/:id', component: ProductoUpdateComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductoRoutingModule {}
