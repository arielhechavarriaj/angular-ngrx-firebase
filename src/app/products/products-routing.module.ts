import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListProductsComponent} from "./components/list-products/list-products.component";
import {AddEditProductsComponent} from "./components/add-edit-products/add-edit-products.component";


const routes: Routes = [
  {
    path: '',
    component: ListProductsComponent
  },
  {
    path: 'add-edit',
    component: AddEditProductsComponent
  }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
