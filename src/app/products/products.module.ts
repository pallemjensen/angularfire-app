import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import {ReactiveFormsModule} from '@angular/forms';
import {FilesModule} from '../files/files.module';

@NgModule({
  declarations: [ProductListComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    FilesModule
  ]
})
export class ProductsModule { }
