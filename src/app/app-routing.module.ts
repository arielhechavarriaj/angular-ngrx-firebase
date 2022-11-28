import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IntroTaskComponent} from "./components/intro-task/intro-task.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";

const routes: Routes = [
  {
    path: 'task',
    component: IntroTaskComponent
  },
  { path: '',
    redirectTo: 'task',
    pathMatch: 'full'
  },

// { path: '**', component: PageNotFoundComponent },
  {
    path: 'products',
    loadChildren: () => import('./products/products.module').then(mod => mod.ProductsModule),
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
