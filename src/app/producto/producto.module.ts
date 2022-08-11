import { NgModule, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoRoutingModule } from './producto-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
// Componentes
import { ProductoIndexComponent } from './producto-index/producto-index.component';
import { ProductoShowComponent } from './producto-show/producto-show.component';
import { ProductoUpdateComponent } from './producto-update/producto-update.component';
import { ProductoCreateComponent } from './producto-create/producto-create.component';

@NgModule({
  declarations: [
    ProductoIndexComponent,
    ProductoShowComponent,
    ProductoUpdateComponent,
    ProductoCreateComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, ProductoRoutingModule],
})
export class ProductoModule implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
