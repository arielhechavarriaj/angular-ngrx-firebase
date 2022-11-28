import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { AddEditProductsComponent } from './components/add-edit-products/add-edit-products.component';
import { DialogMessageComponent } from './components/dialog-message/dialog-message.component';
import {ProductsRoutingModule} from "./products-routing.module";
import {MaterialModule} from "../../shared/material.module";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    ListProductsComponent,
    AddEditProductsComponent,
    DialogMessageComponent
  ],
    imports: [
        CommonModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        ProductsRoutingModule,
        MaterialModule,
        ReactiveFormsModule
    ]
})
export class ProductsModule { }
