import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListProductsComponent} from "@app-products/components/list-products/list-products.component";
import {AddEditProductsComponent} from "@app-products/components/add-edit-products/add-edit-products.component";

const routes: Routes = [
  {
    path: '',
    component: ListProductsComponent
  },
  {
    path: 'add-edit/:id',
    component: AddEditProductsComponent
  }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
